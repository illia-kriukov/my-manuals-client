$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();
    $('#searchButton').on('click', function () {
        window.localStorage.setItem('representativeSearch', $('#searchBox').val());
        window.location.href = "./representative.html";
    });




});
