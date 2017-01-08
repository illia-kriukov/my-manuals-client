
$(document).ready(function ($) {
    var counter = 0;
    var pid = location.search.split('id=')[1];
    $("#upProdId").val(pid);
    var allCategories;
    //get all categories
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories',
        crossOrigin: true,
        dataType: "JSON",
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            allCategories = response;
        }
    });
    //Show Product Detail
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/product?productId=' + pid,
        crossOrigin: true,
        dataType: "JSON",
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            $("#ProductName").val(response.name);
            $("#ModelNumber").val(response.model);
            var selectBox = $('.selectpicker').selectpicker();
            $.each(allCategories, function (id, val) {
                selectBox.append('<option value="' + val.id + '">' + val.name + '</option>');
                $('.selectpicker').selectpicker("refresh");
            });
            $.each(response.categories, function (name, val) {
                var fd = $("ul.inner li").eq(val.id - 1);
                fd.addClass("selected");
                $("ul li a").attr("aria-selected", true);
                $("div button.dropdown-toggle").removeClass('bs-placeholder');
                $(".pull-left").prepend(val.name + ",");
            });
            var videoss = $("#prodVideos").empty();
            $.each(response.videos, function (name, val) {
                counter++;
                videoss.append(' <span id="btnV' + val.id + '" ><a title="Manual Video" href="' + val.link + '" target="_blank">' + "Link" +counter+ '</a><a type="button"  title="Remove" onclick="deleteRecord(111,' + val.id + ');" class="closebox btn btn-danger fa fa-times rePadding"></a></span><br>');
            });
            var manualss = $("#prodManuals").empty();
            $.each(response.manuals, function (name, val) {
                manualss.append(' <span id="btnM' + val.id + '" ><a title="Manual" href="#" onclick="getManual(' + val.id + ');">' + val.name + '</a><button type="button" title="Remove" onclick="deleteRecord(112,' + val.id + ');"   class="closebox  btn btn-danger fa fa-times rePadding"></button></span><br>');
            });
        },
        error: function (xhr, status, error) {
            iziToast.error({
                title: 'Error',
                message: 'Something is wrong',
            });
        }
    });
})
//Show Manual
function getManual(id) {
    window.open('http://localhost:8080/manual/' + id);
}
//confirmation modal for video and  manual
function deleteRecord(typId, vId) {
    $("#cModalType").val(typId);
    $("#cModalReId").val(vId);
    $('#confirmdelete').modal('show');
}
//confirm delete
$('#confirmdelete').on('click', '.btn-ok', function () {
    $('#confirmdelete').modal('hide');
    var typId = $("#cModalType").val();
    var vId = $("#cModalReId").val();
    if (typId == 111) {
        $("#btnV" + vId).remove();
        var $delVid = $('#delVideoId');
        $delVid.val($delVid.val() + vId + ',');
    }
    else if (typId == 112) {
        $("#btnM" + vId).remove();
        var $delMid = $('#delManualId');
        $delMid.val($delMid.val() + vId + ',');
    }
});
//show new video button or Manual button
function showNbtn(id) {
    if (id == 1) {
        $("#pvideo").show();
        $("#nVideobtn").hide();
    }
    else if (id == 2) {
        $("#file").show();
        $("#nManualbtn").hide();
    }
}
function updateProduct() {
    $("#errordivs").empty();
    var videoString = $('#delVideoId').val();
    var videoFinlString = videoString.substr(0, (videoString.length - 1));
    var ManualString = $('#delManualId').val();
    var manualFinlString = ManualString.substr(0, (ManualString.length - 1));
    GetValue();
    var prodNewVideo = $('#pvideo').val();
    var prodNVideos = prodNewVideo.substr(0, (prodNewVideo.length - 1));

    var product = new FormData();
    product.append('id', $("#upProdId").val());
    product.append('name', $("#ProductName").val());
    product.append('model', $("#ModelNumber").val());
    product.append('category', $("#category").val());
    product.append('video', prodNVideos);
    // Allow to upload several manuals  
    $("#fileUploadContainer :file").each(function (i, file) {        
        product.append('file', file.files[0]);
    });
    product.append('removedVideos', videoFinlString);
    product.append('removedManuals', manualFinlString);    
    //Ajax call to the backend API receive products
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/product/update',
        crossOrigin: true,
        cache: false,
        async: false,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
        },
        data: product,
        processData: false,
        contentType: false,
        success: function () {
            // Clear the form
            //$('form :input').val('');
            iziToast.success({
                title: 'OK',
                message: 'Product Successfully Updated!',
            });
            return true;
        },
        error: function (xhr, status, error) {            
            var jsonResponseText = $.parseJSON(xhr.responseText);
            var count = 0;
            $.each(jsonResponseText, function (name, val) {
                if (name == "errors") {
                    $('#errordivs').append('Validation error(s)');
                    $.each(val, function (index, value) {
                        count++;
                        $('#errordivs').append('</br> ' + count + '. ' + value);
                    });
                    $("#errordivs").show();
                    $('#errordivs').delay(5000).fadeOut('slow');
                    $(function () {
                        setTimeout(function () {
                            $("#errordivs").hide('blind', {}, 500)
                        }, 5000);
                    });
                }
            });
        }
    });
    return false;
}
$(function () {
    $("#btnAdd").bind("click", function () {
        var div = $("<div />");
        div.html(createDynamicTextBox(""));
        $("#TextBoxContainer").append(div);
    });
    $("body").on("click", ".remove", function () {
        $(this).closest("div").remove();
    });
});

function createDynamicTextBox(value) {
    return '<div class="input-group form-group"><input class="form-control" placeholder="Paste Video Link here" required name="DynamicTextBox" type="text"><span class="input-group-btn"><button class="btn btn-warning remove" type="button">X</button></span></div>'
}
function GetValue() {
    var Contain = "";
    $("#TextBoxContainer :text").each(function () {
        Contain += $(this).val() + ",";
    });
    $("#pvideo").val(Contain);
}

$("#nManualbtn").bind("click", function () {
        var div = $("<div />");
        div.html(createDynamicFile(""));
        $("#fileUploadContainer").append(div);
    });   
    function createDynamicFile(value) {
        return '<div class="input-group form-group"><input  required type="file" placeholder="Upload File" /><span class="input-group-btn"><button class="btn btn-warning remove" type="button">X</button></span></div>'
}
