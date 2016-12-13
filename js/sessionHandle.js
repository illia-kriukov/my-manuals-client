/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {

    "use strict";

    //Hide log in and register if session in progress
    var length = window.localStorage.length;
    var authority = window.localStorage.getItem('authority');

    if (length > 0) {



        if (authority == "ROLE_ADMIN") {

            $("#tablePrices").hide();
            $("#homeButton").attr("href", "./representative.html");
            $("#heartFavorite").hide();
            $("#rightListItems").prepend('<li><a href="./new-product.html">Upload Manual</a></li>');




        } else {
            $("#homeButton").attr("href", "./consumer.html");
            $("#UserEnter").hide();
            $("#UserExit").show();
        }


    } else if (length == 0) {
        $("#homeButton").attr("href", "./index.html");
        $("#userRightArea").hide();
        $("#productListMarketingParagraph").append(' Log in to save them to your account.');
        $("#topSearchBar").hide();
        $("#UserEnter").show();
        $("#userPanel").hide();

    }

});
