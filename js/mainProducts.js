/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    var authority = window.localStorage.getItem('authority');

    var queries = {};
    $.each(document.location.search.substr(1).split('&'), function (c, q) {
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
        return queries;
    });
    var productID = queries.id;


    if (productID == "") {
        iziToast.warning({
            title: 'Caution',
            message: 'There is something wrong with the ID of the product',
        });
    } else {
        //        $('#test').attr('id', 'acrylic');
        $('#acrylic').show();
        event.preventDefault();

        //Ajax call to the backend API receive products
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/products?categories=' + productID + '&page=0&count=10',
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

                    var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);
                    if (authority !== "ROLE_ADMIN") {
                        var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</td>').appendTo(tr);



                        //                        '<button type="submit" class="btn btn-danger btn-circle favButton">' + '<i class="glyphicon glyphicon-heart">' + '</i>' + '</button>'



                    }
                    var purl = "./product-detail.html?id=" + product.id;
                    var td = $('<td><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
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
