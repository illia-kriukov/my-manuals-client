/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    var repQuery = window.localStorage.getItem('externalSearch');
    var authority = window.localStorage.getItem('authority');


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
                if (response.length == 0) {
                    console.log("it is null");
                    $('#acrylic').hide();
                    $('#TableBody').empty();
                    iziToast.info({
                        title: 'Hello',
                        message: 'No product found by this name',
                    });
                } else {
                    $('#acrylic').show();
                    $('#TableBody').empty();

                    var tableBody = $('#TableBody');
                    $.each(response, function (index, product) {
                        var tr = $('<tr/>');
                        tableBody.append(tr);
                        var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);

                        if (authority !== "ROLE_ADMIN") {
                            var td = $('<td>' + '<button type="button" class="btn btn-danger btn-number"  data-type="minus" "><span class="glyphicon glyphicon-minus"></span></button>' + '</td>').appendTo(tr);
                        }


                        var purl = "./product-detail.html?id=" + product.id;
                        var td = $('<td class="pName"><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
                        var td = $('<td class="pModel">' + product.model + '</td>').appendTo(tr);
                        var td = $('<td class="pCompany">' + product.company.name + '</td>').appendTo(tr);
                        var categoriesTd = $('<td/>').appendTo(tr);

                        $.each(product.categories, function (index1, category) {
                            var span = $('<span class="pCategories">' + " " + category.name + '</span>').appendTo(categoriesTd);
                        });
                    });

                }
            }

        });
        //        window.localStorage.setItem('externalSearch', $('#searchBox').val());
        localStorage.removeItem('externalSearch');
    } else {


        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/consumer/products',
            crossOrigin: true,
            dataType: "json",
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {

                var authority = window.localStorage.getItem('authority');
                $('#acrylic').show();
                //            $('#heartFavorite').hide();
                $('#TableBody').empty();

                var tableBody = $('#TableBody');
                $.each(response, function (index, product) {
                    var tr = $('<tr/>');
                    tableBody.append(tr);
                    var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);



                    //minus button
                    if (authority !== "ROLE_ADMIN") {
                        var td = $('<td>' + '<button type="button" class="btn btn-danger btn-number"  data-type="minus" "><span class="glyphicon glyphicon-minus"></span></button>' + '</td>').appendTo(tr);
                    }

                    var purl = "./product-detail.html?id=" + product.id;
                    var td = $('<td class="pName"><a href="' + purl + '">' + product.name + '</a></td>').appendTo(tr);
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
