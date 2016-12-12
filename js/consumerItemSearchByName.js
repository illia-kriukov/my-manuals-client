$(document).ready(function () {
    "use strict";
    var productName = $('#searchBox').val();


    $('#searchButton').on('click', function () {

        var authority = window.localStorage.getItem('authority');

        if ($('#searchBox').val() == "1") {
            $('#acrylic').hide();
        } else {

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/products/search?query=' + $('#searchBox').val() + '&page=0&count=10',
                crossOrigin: true,
                dataType: "json",
                cache: false,
                headers: {
                    "Content-Type": "application/json"
                },
                success: function (response) {

                    var authority = window.localStorage.getItem('authority');
                    $('#acrylic').show();
                    $('#heartFavorite').show();
                    $('#TableBody').empty();

                    var tableBody = $('#TableBody');
                    $.each(response, function (index, product) {
                        var tr = $('<tr/>');
                        tableBody.append(tr);
                        var td = $('<td id="pID">' + product.id + '</td>').appendTo(tr);

                        // Here I will check which of the items are already saved and which are not
                        //                        if (authority !== "ROLE_ADMIN") {
                        //                            var td = $('<td>' + '<button type="button" class="btn btn-danger btn-number"  data-type="minus" "><span class="glyphicon glyphicon-minus"></span></button>' + '</td>').appendTo(tr);
                        // }

                        //                            <button class="btn btn-success btn-add favButton" type="button"><span class="glyphicon glyphicon-plus"></span></button>



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




});
