/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {

    "use strict";

    //Hide log in and register if session in progress
    var length = window.localStorage.length;

    if (length > 0) {
        var authority = window.localStorage.getItem('authority');
        if (authority == "ROLE_ADMIN") {

            $("#heartFavorite").hide();
        }

        $("#UserEnter").hide();
        $("#UserExit").show();


    } else if (length == 0) {


        $("#UserEnter").show();
        $("#UserExit").hide();

    }

});
