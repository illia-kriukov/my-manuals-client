/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
(function ($) {
    "use strict";
    var $name = $('#repFullName');
    var $email = $('#repEmail');
    var $password = $('#repPassword');
    var $companyEmail = $('#repMasterEmail');
    var $companyPassword = $('#repMasterPassword');

    $('#register-submit-btn').on('click', function () {
        var representative = {
            email: $email.val(),
            password: $password.val(),
            name: $name.val(),
            companyEmail: $companyEmail.val(),
            companyPassowrd: $companyPassword.val()
        };
    
  
    
    //Ajax call to the backend API
        $.ajax({
            type: 'POST',
        //dataType: 'jsonp',
            url: 'http://localhost:8080/representative',
            data: JSON.stringify(representative),
//        data: JSON.stringify({ "email": $email,
//            "password": $password,
//            "name": $name,
//            "companyEmail": $companyEmail,
//            "companyPassword": $companyPassword }),
//        data ={
//        "email": $email,
//        "password": $password,
//        "name": $name,
//        "companyEmail": $companyEmail,
//        "companyPassword": $companyPassword
//        
//    },
            contentType: "application/json",
            success: function () {
                alert(representative.name + "Was added");
            },
            error: function () {
                alert("Error");
            }
        });
    });
})(jQuery);
 
 