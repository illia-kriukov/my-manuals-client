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

                        //Imran Add some success popup Here
                        console.log("success added" + pID);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }


        } else if (length == 0) {

            // Imran Add a popup suggesting the user to log in
            // and possibly move the page lower to the pricing table
            console.log("please Log in");

        }





    });



});
