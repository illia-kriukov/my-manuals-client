/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
var $fullname = $('#repFullName');
var $email = $('#repEmail');
var $password = $('#repPassword');
var $masterEmail = $('#repMasterEmail');
var $masterPassword = $('#repMasterPassword');

$('#register-submit-btn').on('click', function () {
    "use strict";
    var representative = {
        fullname: $fullname.val(),
        email: $email.val(),
        password: $password.val(),
        masterEmail: $masterEmail.val(),
        masterPassword: $masterPassword.val()
          //more stuff here
    };
    
    //Ajax call to the backend API
    $.ajax({
        type: 'Post',
        url: 'http://localhost:8080/representative',
        data: representative,
        headers: {
            //This line throws an error, I am not sure how does the header should be presented
            "Content-Type" : (representative.masterEmail + representative.masterPassword),
            //This is for my part I will take it later
            //"Authorization": "Basic " + btoa(representative.email + ":" + representative.password),
       
            error: function () {
                alert('Error pushing the representative');
            }
        });
});