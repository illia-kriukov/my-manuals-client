/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {

    "use strict";

    //Hide log in and register if session in progress
    var length = window.localStorage.length;
    var authority = window.localStorage.getItem('authority');

    if (length > 0) {

     
      
        if (authority == "ROLE_ADMIN") {
            $("#homeButton").attr("href", "./representative.html");
            $("#heartFavorite").hide();
         

        } else {
            $("#homeButton").attr("href", "./consumer.html");
            $("#UserEnter").hide();
            $("#UserExit").show();
        }


    } else if (length == 0) {


        $("#UserEnter").show();
        $("#userPanel").hide();

    }

});
