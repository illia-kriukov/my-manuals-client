$(document).ready(function ($) {
    var url = window.location.href;
    var pid = location.search.split('id=')[1];
    var authority = window.localStorage.getItem('authority');

    if (authority == "ROLE_USER") {
        //Get subscriptions for product ID
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/consumer/product/' + pid + '/subscriptions',
            crossOrigin: true,
            dataType: "JSON",
            cache: false,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('access_token')
            },
            success: function (response) {
                console.log(response);
                $.each(response, function (index, value) {
                    console.log(value);
                    $('#subButton' + value).bootstrapToggle('on');

                });


            },
            error: function (xhr, status, error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Something is wrong',
                });
            }
        });


        $('.subscriptionKinds').on('click', function () {
            var subID = this.id;

            var button = $(this).find("#subButton" + this.id);
            if (button.prop('checked')) {
             $.ajax({

                    type: 'DELETE',
                    url: 'http://localhost:8080/product/' + pid + '/subscribe/' + subID,
                    crossOrigin: true,
//                    dataType: "JSON",
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {
                        iziToast.info({
                            title: 'Sucess',
                            message: 'You have unsubscribed.',
                        });
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong',
                        });
                    }
                });
            } else {
                $.ajax({

                    type: 'POST',
                    url: 'http://localhost:8080/product/' + pid + '/subscribe/' + subID,
                    crossOrigin: true,
//                    dataType: "JSON",
                    cache: false,
                    headers: {
                        "Authorization": "Bearer " + window.localStorage.getItem('access_token')
                    },
                    success: function (response) {
                        iziToast.info({
                            title: 'Sucess',
                            message: 'Thank you for subscribing.',
                        });
                        console.log(response);
                    },
                    error: function (xhr, status, error) {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something is wrong',
                        });
                    }
                });
            }







        });


    }
});
