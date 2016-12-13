$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();
    var authority = window.localStorage.getItem('authority');

    $('#searchButton').on('click', function () {
        if (authority == "ROLE_ADMIN") {
            window.localStorage.setItem('externalSearch', $('#searchBox').val());
            window.location.href = "./representative.html";
        } else {
            window.localStorage.setItem('externalSearch', $('#searchBox').val());
            window.location.href = "./consumer.html";
        }

    });




});
