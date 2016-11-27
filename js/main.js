/*jslint browser: true*/
/*global $, jQuery, alert*/
//Send Post request to server with credentials 
$(document).ready(function () {
    $('.dropdown').hover(function () { $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(); },
            function () { $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(); });
    $('.dropdown-menu').hover(function () { $(this).stop(true, true); },
      function () { $(this).stop(true, true).delay(200).fadeOut(); }
    );
    $("#close").click(function () {

        $("#popBackground").fadeOut();
        $("#popBox").fadeOut();
    });
    $("#popBackground").click(function () {

        $("#popBackground").fadeOut();
        $("#popBox").fadeOut();
    });

    "use strict";
    var $username = $('#fpUsername');
    var $password = $('#fpPassword');
    var $scope = "mymanuals";
    var $grant_type = "password";
    var $client_id = "mymanuals";
    var $secret = "secret";

    //Mount the onclick Function of Signin
    $('#fpSignIN').on('click', function () {
        event.preventDefault();
        var credentials = new FormData();
        credentials.append('username', $username.val());
        credentials.append('password', $password.val());
        credentials.append('scope', $scope);
        credentials.append('grant_type', $grant_type);

        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/oauth/token',
            crossOrigin: true,
            cache: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + btoa($client_id + ":" + $secret)
            },
            dataType: 'json',
            data: credentials,
            processData: false,
            contentType: false,
            success: function (response) {

                window.localStorage.setItem('access_token', response.access_token);
                window.location.href = "upload-material.html";


            },

            error: function () {
                $("#popBackground").fadeIn();
                $("#popBox").fadeIn();
                return false;
            }

        });


    });

});