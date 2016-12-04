$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();

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

                    $('#acrylic').show();
                    $('#TableBody').empty();

                    var tableBody = $('#TableBody');
                    $.each(response, function (index, product) {
                        var tr = $('<tr/>');
                        tableBody.append(tr);
                        var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);
                        var td = $('<td>' + '<button type="submit" class="btn btn-danger btn-circle favButton">' + '<i class="glyphicon glyphicon-heart">' + '</i>' + '</button>' + '</td>').appendTo(tr);

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




});
