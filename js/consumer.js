$(document).ready(function () {
    //Ajax call to get user name
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/account/current/consumer',
        crossOrigin: true,
        cache: false,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('access_token')
        },
        success: function (response) {
            console.log(response);
            $("#GreetingsUser").html("Hello " + response.name);

        }


    });



});
