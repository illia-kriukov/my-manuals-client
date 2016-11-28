/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/account/current/representative',
        crossOrigin: true,
        cache: false,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
        },
        success: function (response) {
            console.log(response);
            $("#GreetingsRep").html("Hello " + response.name);

        }


    });



    //Ajax call to get user Name
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/account/current/representative',
        crossOrigin: true,
        cache: false,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
        },
        success: function (response) {

            console.log(response);
        }


    });









    "use strict";
    var $name = $('#ProductName');
    var $model = $('#ModelNumber');
    var $category = $('#category');
    var $video = $('#video');

    $('#submit-btn-prod').on('click', function () {
        event.preventDefault();
        var product = new FormData();
        product.append('name', $name.val());
        product.append('model', $model.val());
        product.append('category', $category.val());
        product.append('video', $video.val());
        // Allow to upload several manuals
        jQuery.each(jQuery('#file')[0].files, function (i, file) {
            product.append('file', file);
        });

        //Ajax call to the backend API receive products
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
            //dataType: 'json',
            data: product,
            processData: false,
            contentType: false,
            success: function () {
                // Clear the form
                $('form :input').val('');
                return true;
            },

            error: function (error) {
                console.log(error);
                $("#popBackground").fadeIn();
                $("#popBox").fadeIn();
                return false;
            }
        });
    });
});
