$(document).ready(function () {
    "use strict";
    //Get name of user depending role
  
    //Ajax call to get user Role
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/account/authorities',
        crossOrigin: true,
        cache: false,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
        },
        success: function (response) {


            if (response.authority == "ROLE_ADMIN") {
                $("#UserLink").attr("href", "./new-product.html");
                //Ajax call to get representative user name
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/account/current/representative',
                    crossOrigin: true,
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {

                        $("#GreetingsUser").html("Hello, " + response.name);

                    }


                });

            } else if (response.authority == "ROLE_USER") {
                $("#UserLink").attr("href", "./consumer.html");
                //Ajax call to get consumer user name
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/account/current/consumer',
                    crossOrigin: true,
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {

                        $("#GreetingsUser").html("Hello, " + response.name);

                    }
                });
            }
        }
    });









});
