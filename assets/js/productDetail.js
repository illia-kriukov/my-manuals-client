$(function () {
    $('#ExistComment').slimScroll({
        height: '150px'
    });
});
$(document).ready(function ($) {
            var url = window.location.href;
            var pid = location.search.split('id=')[1];
            var authority = window.localStorage.getItem('authority');


            //Create the subscription buttons
            if (authority == "ROLE_USER") {
                $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8080/subscriptions',
                        crossOrigin: true,
                        dataType: "JSON",
                        cache: false,
                        headers: {
                            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                        },
                        success: function (response) {


                            $.each(response, function (i, subscription) {
                                        $('<li id="' + subscription.id + '"' + ' class="subscriptionKinds"><label><input class="subscriptionButtons" id="subButton' + subscription.id + '"' + 'type="checkbox" data-toggle="toggle"><span id="subscriptionType' + subscription.id +'"'+ '>  Subscribe to ' + subscription.name + '</span></label></li>').appendTo("#productSubscribeList");

                                            $('#subButton' + subscription.id).bootstrapToggle('off');

                                        });




                                },


                                error: function (xhr, status, error) {
                                    iziToast.error({
                                        title: 'Error',
                                        message: 'Something is wrong',
                                    });
                                }
                        });


                }









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
                        $("#name").text(response.name);
                        $("#model").text(response.model);
                        $("#CompName").text(response.company.name);
                        var categorie = $("#categories").empty();
                        $.each(response.categories, function (name, val) {
                            categorie.append(val.name + ',');
                        });
                        var manualss = $("#LinksManual").empty();
                        $.each(response.manuals, function (name, val) {
                            manualss.append(' <a title="Manual" href="#" onclick="getManual(' + val.id + ');">' + val.name + '</a>&nbsp;<i class="fa fa-comment-o hovered" onclick="getComments(100,' + val.id + ')"></i><br>');
                        });
                        var videoss = $("#prodVideo").empty();
                        $.each(response.videos, function (name, val) {
                            var myId = getId(val.link);
                            videoss.append('<div class="col-md-6"><a class="close-ribbon"><i class="fa fa-comment-o hovered" onclick="getComments(101,' + val.id + ')"></i></a><iframe width="100%" height="315" src="https:\\www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe></div>');
                        });
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong',
                        });
                    }
                });

                function getId(url) {
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        return match[2];
                    } else {
                        return 'error';
                    }
                }
            });

        function getManual(id) {
            window.open('http://localhost:8080/manual/' + id);
        }

        function getComments(type, id) {
            $("#newComment").val('');
            var comURL; //1 method for both Manual and Video
            if (type == 100) {
                comURL = 'http://localhost:8080/manual/' + id + '/' + 'annotation'
            } else if (type == 101) {
                comURL = 'http://localhost:8080/video/' + id + '/' + 'annotation'
            }
            $("#recrdId").val(id);
            $("#rType").val(type); //rType: Request Type (Manual or Video)
            $.ajax({
                type: 'GET',
                url: comURL,
                dataType: "JSON",
                cache: false,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                },
                success: function (response) {
                    var pcomments = $("#yComments").empty();
                    $.each(response, function (name, val) {
                        pcomments.append('<li>' + val.annotation + '</li>');
                    });
                    $('#commentsModal').modal('show');
                },
                error: function (xhr, status, error) {
                    iziToast.warning({
                        title: 'Caution',
                        message: 'Please Login First',
                    });
                }
            });
            return false;
        }

        function submitNewComment() {

            var maID = $("#recrdId").val();
            var reType = $("#rType").val();
            var newcomment = $("#newComment").val();
            if (newcomment == null || newcomment == "") {
                $("#errordivs").show();
                $('#errordivs').delay(5000).fadeOut('slow');
                $(function () {
                    setTimeout(function () {
                        $("#errordivs").hide('blind', {}, 500)
                    }, 5000);
                });
            } else {
                var commdata = {
                    annotation: newcomment,
                }
                var submitURL; //1 method for both Manual and Video only change URL
                if (reType == 100) {
                    submitURL = 'http://localhost:8080/manual/' + maID + '/' + 'annotation'
                } else if (reType == 101) {
                    submitURL = 'http://localhost:8080/video/' + maID + '/' + 'annotation'
                }
                //Ajax call to the backend  
                $.ajax({
                    type: 'POST',
                    url: submitURL,
                    cache: false,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    data: JSON.stringify(commdata),
                    success: function () {
                        iziToast.success({
                            title: 'OK',
                            message: 'Comment Successfully Added!',
                        });
                        $('#commentsModal').modal('hide');
                        // Clear the textbox
                        $("#newComment").val('');
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong',
                        });
                    }
                });
            }
            return false;
        }
