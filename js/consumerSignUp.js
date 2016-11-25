
$(document).ready(function () {
    "use strict";
    var $name = $('#consumerFullName');
    var $email = $('#consumerEmail');
    var $password = $('#consumerPassword'); 

    $('#registerbtn').on('click', function () {        
        //event.preventDefault();
        var consumer = {
            email: $email.val(),
            password: $password.val(),
            name: $name.val()          
        };      
        //Ajax call to the backend API
        $.ajax({
            type: 'POST',
            crossOrigin: true,
            url: 'http://localhost:8080/consumer',            
            cache: false,
            header: ('Access-Control-Allow-Origin: *'),
            data: JSON.stringify(consumer),
            contentType: "application/json",
            headers: {
                "Content-Type": "application/json "
            },
            success: function (data) {
                //alert(consumer.name + " Was added");
                window.location.href = "index.html";              
            },
            error: function (xhr, status, error) {              
                alert(xhr.responseText);
            }
        });

    });
});


