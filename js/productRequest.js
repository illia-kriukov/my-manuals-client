/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
     $("#close").click(function(){
            
                $("#popBackground").fadeOut();
                $("#popBox").fadeOut();
        });
      $("#popBackground").click(function(){
            
                $("#popBackground").fadeOut();
                $("#popBox").fadeOut();
        });
    "use strict";
    var $name = $('#ProductName');
    var $model = $('#ModelNumber');
    var $category = $('#category');
    var $video = $('#video');

    $('#submit-btn-prod').on('click', function () {
        event.preventDefault();
        var product = new FormData();
        product.append( 'name', $name.val() );
        product.append( 'model', $model.val() );
        product.append( 'category', $category.val() );
        product.append( 'video', $video.val() );
        // Allow to upload several manuals
        jQuery.each(jQuery('#file')[0].files, function(i, file) {
            product.append('file', file);
        });

        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/product',
            crossOrigin: true,
            cache: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            //datatype json creates the crossorigin problem because of JSONP
//            dataType: 'json',
            data: product,
            processData: false,
            contentType: false,
            success: function () {
               
//          clear the form
$('form :input').val('');
return true;
            },

             
            error: function (error) {
                console.log(error)    ;            
                $("#popBackground").fadeIn();
                $("#popBox").fadeIn();
                return false;
            }
        });
    });
});