/*jslint browser: true*/
/*global $, jQuery, alert*/
/*global $, jQuery, console*/
$(document).ready(function () {
    "use strict";

    var length = window.localStorage.length;
    $(document).on("click", ".favButton", function (e) {

        if (length > 0) {

            var pID = $(this).closest("tr") // Finds the closest row <tr> 
                .find("#pID") // Gets a descendent with class I want
                .text(); // Retrieves the text within <td>
            if (pID !== "") {

                //Ajax call to favorite product.
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/products/favourites?productId=' + pID,
                    crossOrigin: true,
                    cache: false,
                    processData: false,
                    contentType: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {                       
                        iziToast.success({
                            title: 'OK',
                            message: 'Product Successfully Added to Favourities!',
                        });
                    },
                    error: function (error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'While submitting your request',
                        });
                    }
                });
            }


        } else if (length == 0) {            
            iziToast.warning({
                title: 'Caution',
                message: 'Please first Login',
            });
            $('html, body').animate({
                scrollTop: $("#tablePrices").offset().top
            }, 2000);
            return false;



        }





    });



});
