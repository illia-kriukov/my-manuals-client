/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    var repQuery = window.localStorage.getItem('representativeSearch');

    if (repQuery != null) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/products/search?query=' + repQuery + '&page=0&count=10',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                console.log(repQuery);
                console.log("executed query search");

                $('#acrylic').show();
                $('#TableBody').empty();

                var tableBody = $('#TableBody');
                $.each(response, function (index, product) {
                    var tr = $('<tr/>');
                    tableBody.append(tr);
                    var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);
                    var td = $('<td class="pName">' + product.name + '</td>').appendTo(tr);
                    var td = $('<td class="pModel">' + product.model + '</td>').appendTo(tr);
                    var td = $('<td class="pCompany">' + product.company.name + '</td>').appendTo(tr);
                    var categoriesTd = $('<td/>').appendTo(tr);

                    $.each(product.categories, function (index1, category) {
                        var span = $('<span class="pCategories">' + " " + category.name + '</span>').appendTo(categoriesTd);
                    });
                });

            }
        });
        window.localStorage.setItem('representativeSearch', $('#searchBox').val());
    } else {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/company/products',
            crossOrigin: true,
            dataType: "json",
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {
                console.log('query is empty');
                var authority = window.localStorage.getItem('authority');
                $('#acrylic').show();
                $('#heartFavorite').hide();
                $('#TableBody').empty();

                var tableBody = $('#TableBody');
                $.each(response, function (index, product) {
                    var tr = $('<tr/>');
                    tableBody.append(tr);
                    var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);

                    //                        if (authority !== "ROLE_ADMIN") {
                    //                            var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</td>').appendTo(tr);
                    //
                    //                        }

                    var td = $('<td class="pName">' + product.name + '</td>').appendTo(tr);
                    var td = $('<td class="pModel">' + product.model + '</td>').appendTo(tr);
                    var td = $('<td class="pCompany">' + product.company.name + '</td>').appendTo(tr);
                    var categoriesTd = $('<td/>').appendTo(tr);

                    $.each(product.categories, function (index1, category) {
                        var span = $('<span class="pCategories">' + " " + category.name + '</span>').appendTo(categoriesTd);
                    });
                });
            }
        });

    }
});
