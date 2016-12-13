$(document).ready(function ($) {
    var url = window.location.href;
    var pid = location.search.split('id=')[1];
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
                manualss.append('<a title="Manual" href="#" onclick="getManual(' + val.id + ');">' + val.name + '</a>');
            });
            var videoss = $("#prodVideo").empty();
            for (var i = 0; i < response.videos.length; i++) {
                var myId = getId(response.videos[i]);
                videoss.append('<div class="col-md-6"><iframe width="560" height="315" src="http://www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe></div>');
            }
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