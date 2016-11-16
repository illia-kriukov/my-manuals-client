/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
    "use strict";
    var $name = $('#repFullName');
    var $email = $('#repEmail');
    var $password = $('#repPassword');
    var $companyEmail = $('#repMasterEmail');
    var $companyPassword = $('#repMasterPassword');

    $('#register-submit-btn').on('click', function () {
        event.preventDefault();
        var representative = {
            email: $email.val(),
            password: $password.val(),
            name: $name.val(),
            companyEmail: $companyEmail.val(),
            companyPassword: $companyPassword.val()
        };
    
    //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            crossOrigin: true,
            url: 'http://localhost:8080/representative',
            dataType: 'json',
            cache: false,
            header: ('Access-Control-Allow-Origin: *'),
            data: JSON.stringify(representative),
            contentType: "application/json",
            headers:{
                "Content-Type": "application/json "
            },
            
            success: function () {
                alert(representative.name + " Was added");
            },
            error: function () { alert("Error"+ JSON.stringify(representative)); }
        });
        
    });
});
 
 
 