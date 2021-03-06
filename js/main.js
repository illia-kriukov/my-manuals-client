/*jslint browser: true*/
/*global $, jQuery, alert*/
//Send Post request to server with credentials
$(document).ready(function () {

    // Consumer & Representative registration dropdown menu
    $('.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn();
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
    });
    $('.dropdown-menu').hover(function () {
        $(this).stop(true, true);
    }, function () {
        $(this).stop(true, true).delay(200).fadeOut();
    });


    "use strict";
    var $username = $('#fpUsername');
    var $password = $('#fpPassword');
    var $scope = "mymanuals";
    var $grant_type = "password";
    var $client_id = "mymanuals";
    var $secret = "secret";


    //All Categories populate menu
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
         

            var Names = response.map(function (obj) {
                return obj.name;
            });
            var IDz = response.map(function (obj) {
                return obj.id;
            });
            $.each(Names, function (i) {


                $("#allCategories ").append('<li class="menuCategoryButtons"><a href="./products.html?id=' + IDz[i] + '"><span>' + Names[i] + '</span></a> </li>');



            });
        }
    });





    // Mount the onclick Function of Sign In
    $('#fpSignIN').on('click', function () {
        event.preventDefault();
        var credentials = new FormData();
        credentials.append('username', $username.val());
        credentials.append('password', $password.val());
        credentials.append('scope', $scope);
        credentials.append('grant_type', $grant_type);

        // Ajax call to the backend API to receive Token
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


                // Ajax call to get user role
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/account/authorities',
                    crossOrigin: true,
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {

                        window.localStorage.setItem('authority', response.authority);

                        if (response.authority == "ROLE_ADMIN") {

                            window.location.href = "new-product.html";
                        } else if (response.authority == "ROLE_USER") {
                            window.location.href = "consumer.html";

                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                var jsonResponseText = $.parseJSON(xhr.responseText);
                $.each(jsonResponseText, function (name, val) {
                    if (name == "error_description") {
                        iziToast.error({
                            title: 'Error',
                            message: val,
                        });
                    }
                });
            }
        });
    });
});
