$(document).ready(function () {
    "use strict";
    //Hide log in and register if session in progress
    if (window.localStorage.length != 0) {
        $("#regForm").hide();
    }

});
