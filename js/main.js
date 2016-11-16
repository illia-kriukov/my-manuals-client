/*jslint browser: true*/
/*global $, jQuery, alert*/
//Send Post request to server with credentials 
$(document).ready(function () {
    "use strict";
    var $username = $('#fpUsername');
    var $password = $('#fpPassword');

//Mount the onclick Function of Signin  
    $('#fpSignIN').on('click', function () {
    
        var credentials = {
            username: $username.val(),
            password: $password.val(),
            grant_type: "password",
            scope: "mymanuals",
            client_id: "clientapp",
        };
    
    //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/oauth/token',
            crossOrigin: true,
            cache: false,
            header: ('Access-Control-Allow-Origin: *'),
//            beforeSend: function (xhr) {
//                xhr.setRequestHeader("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password));
//            },
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + btoa($username + ":" + $password)
            },
            dataType: 'json',
            data: JSON.stringify(credentials),
            error: function () {
                alert('Error pushing the credentials' + JSON.stringify(credentials));
            }
        });
    
    //Include the token for future calls.
    // beforeSend : function( xhr ) {
      //  xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
    //},
    
    
    });

});
