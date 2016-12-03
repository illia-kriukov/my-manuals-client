/*jslint browser: true*/
/*global $, jQuery, alert*/
//Mount the onclick Function of Sign Up **representatives
$(document).ready(function () {
    "use strict";
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products',
        crossOrigin: true,
        dataType: "JSON",
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            var tableBody = $('#TableBody');
            $.each(response, function (index, product) {
                var tr = $('<tr/>');
                tableBody.append(tr);
                var td = $('<td>' + product.name + '</td>').appendTo(tr);
                var td = $('<td>' + product.model + '</td>').appendTo(tr);
                var td = $('<td>' + product.company.name + '</td>').appendTo(tr);
                var categoriesTd = $('<td/>').appendTo(tr);
                $.each(product.categories, function (index1, category) {
                    var span = $('<span>' + " " + category.name + '</span>').appendTo(categoriesTd);
                });
            });
        }
    });    
});
$('#btnfilter').on('click', function () {    
    if ($("#category").val() == "" || $("#category").val() == null) {        
        iziToast.warning({
            title: 'Caution',
            message: 'Please First Select Category',
        });
    }
    else {
        event.preventDefault();
        //Ajax call to the backend API receive products
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/products?categories=' + $("#category").val() + '&page=0&count=10',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {               
                var tableBody = $('#TableBody');
                tableBody.empty();
                $.each(response, function (index, product) {
                    var tr = $('<tr/>');
                    tableBody.append(tr);
                    var td = $('<td>' + product.name + '</td>').appendTo(tr);
                    var td = $('<td>' + product.model + '</td>').appendTo(tr);
                    var td = $('<td>' + product.company.name + '</td>').appendTo(tr);
                    var categoriesTd = $('<td/>').appendTo(tr);
                    $.each(product.categories, function (index1, category) {
                        var span = $('<span>' + " " + category.name + '</span>').appendTo(categoriesTd);
                    });
                });              
            }
        });
    }
});