/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {

    "use strict";

    //Hide log in and register if session in progress
    var length = window.localStorage.length;

    if (length > 0) {
     
        $("#UserEnter").hide();
        $("#UserExit").show();


    } else if (length == 0) {


        $("#UserEnter").show();
        $("#UserExit").hide();

    }

});