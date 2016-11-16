/*jslint browser: true*/
/*global $, jQuery, alert*/
//Send Post request to server with credentials 

var $username = $('#fpUsername');
var $password = $('#fpPassword');

//Mount the onclick Function of Signin  
$('#fpSignIN').on('click', function () {
    "use strict";
    var credentials = {
            username: $username.val(),
            password: $password.val(),
            grant_type: "password",
            scope: "mymanuals",
            client_id: "clientapp"
        };
    
    //Ajax call to the backend API
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/oauth/token',
        
        headers: {
            "Accept":"application/json",
            "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password)
                 },
        dataType: 'json',
        data: JSON.stringify(credentials),
        error: function () {
            alert('Error pushing the credentials');
        }
    });
    
    //Include the token for future calls.
    // beforeSend : function( xhr ) {
      //  xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
    //},
    
    
});


