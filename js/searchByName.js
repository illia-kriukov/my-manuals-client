/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();
    var authority = window.localStorage.getItem('authority');



    $('#searchButton').on('click', function () {
        if ($('#searchBox').val() == "") {
            $('#acrylic').hide();
        } else {

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products/search?query=' + $('#searchBox').val() + '&page=0&count=10',
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
                        // Imran put a toast here to say no results or something like that
                    } else {
                        $('#acrylic').show();
                        $('#TableBody').empty();

                        var tableBody = $('#TableBody');
                        $.each(response, function (index, product) {
                            var tr = $('<tr/>');
                            tableBody.append(tr);
                            var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);

                            if (authority !== "ROLE_ADMIN") {
                                var td = $('<td>' + '<button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>' + '</td>').appendTo(tr);

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

        }
    });




});
