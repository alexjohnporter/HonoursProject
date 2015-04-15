var gotLoc = false; //if geolocation is off, assumes app doesn't have location

$(document).ready(function () {

    $('.home').click(function () {
        $('.info-container').empty();
        $('#googleMap').empty();
        $('#map-page').hide('slow');
        $('#main-page').show('slow');
        $('#address-success').hide('slow');
        $('#address-error').hide('slow');
        $('#review-container').html('');
        window.scrollTo(0, 0); //ensures it displays the page from the top
    });

    $('#write-review').click(function () {
        getIP.viewIP();
    });

    $('#review-form').submit(function () {
        var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        var email = $('#reviewer-email').val();
        if ($('#review-form :input').val() === "" || regEmail.test(email) === false || $('#review-comment').val() === "" || $('#review-comment').val() > 500) {
            $('#review-message').html('Please enter valid information');
            $('#review-alert').show('fast');
            return false;
        } else {
            var formData = $(this).serialize();
            var postReview = $.post('php/insert/review.php', formData, function (data) {

                var response;
                console.log(data.status);
                if (data.status == '0') {
                    response = 'You have already left a review';
                } else if (data.status == '1') {
                    response = 'Success. Your review has been uploaded and is awaiting moderation';
                } else if (data.status == '2') {
                    response = 'No data entered';
                } else if (data.status == '3') {
                    response = 'Invalid data';
                }
                console.log('response = ' + response);
                $('#review-message').html(response);
                $('#review-alert').show('fast').fadeOut(3000);
            });

            postReview.fail(function (status, err) {
                console.log('form submission failed');
                $('#review-message').html('There has been an error');
                $('#review-alert').show('fast');

            });

            document.getElementById('review-form').reset();
            return false; //make sure page doesn't refresh on form submit
        }
    });
});

//object.create method for creating functions so the IP value cannot be changed
var getIP = {
    retrieveIP: $.getJSON("http://api.ipify.org?format=jsonp&callback=?",

        function (json) {
            ip = json.ip;
        }),
    viewIP: function () {
        $('#reviewer-ip').val(ip);
        return ip;
    }
};

//parses json from php file into HTML
var firstPageJson = $.getJSON("php/select/json.php", function (data) {
    $.each(data, function (i, ent) {
        $("<div class='item-group row'><div class='col-lg-6 item-left'><h3 class='item-name'>" + ent['itemName'] + "</h3>" +
        "<img src='" + ent['itemImg'] + "'class='item-img'/>" +
        "</div><div class='col-lg-6 item-right'><p class='item-name'>" + ent['itemTxt'] + "</p>" +
        "<p class='item-id'>" + ent['itemID'] + "</p><button type='button' class='item-next-page btn btn-primary btn-lg'>Click here for more information</button></div></div>").appendTo(".item-container");

    });
    firstPageJson.done(function () {
        console.log('JSON has parsed successfully');

        $('.item-next-page').on('click', function () {
            var itemID = parseInt($(this).parent().find('.item-id').text());
            $('#review-item-id').val(itemID);
            console.log('clicked ' + itemID);
            $('#map-page').show('slow');
            $('#main-page').hide('slow');
            window.scrollTo(0, 0);
            $('#review-container').html('');

            var fullPageJson = $.getJSON("php/select/json.php?q=" + itemID, function (data) {
                $.each(data, function (i, ent) {
                    $("<div class='row'><div class='col-lg-12' id='main-image-container'>" +
                    "<img src='" + ent['itemImg'] + "'class='header-img'/>" +
                    "</div></div>" +
                    "<div class='row'>" +
                    "<div class='col-lg-6' id='main-description'><h1 class='page-header'>" + ent['itemName'] + "</h1><p>" + ent['itemTxt'] + "</p></div>" +
                    "<div class='col-lg-6' id='main-info'>" +
                    "<h1 class='page-header'>Opening Hours</h1>" +
                    "<ul><li id='monday'>Monday: " + ent['Mon'] + " - " + ent['MonClose'] + "</li>" +
                    "<li id='tuesday'>Tuesday: " + ent['Tues'] + " - " + ent['TuesClose'] + "</li>" +
                    "<li id='wednesday'>Wednesday: " + ent['Wed'] + " - " + ent['WedClose'] + "</li>" +
                    "<li id='thursday'>Thursday: " + ent['Thurs'] + " - " + ent['ThursClose'] + "</li>" +
                    "<li id='friday'>Friday: " + ent['Fri'] + " - " + ent['FriClose'] + "</li>" +
                    "<li id='saturday'>Saturday: " + ent['Sat'] + " - " + ent['SatClose'] + "</li>" +
                    "<li id='sunday'>Sunday: " + ent['Sun'] + " - " + ent['SunClose'] + "</li></ul>" +
                    "<div id='address-container'><h1 class='page-header'>Address</h1>" +
                    "<p id='address-one'>" + ent['AddressOne'] + "</p>" +
                    "<p id='address-two'>" + ent['AddressTwo'] + "</p>" +
                    "<p id='postcode'>" + ent['Postcode'] + "</p></div>" +
                    "</div></div>").appendTo(".info-container");

                });
            });
            fullPageJson.done(function () {

                var lineOne = $('#address-container').children().eq(1).text();
                var lineTwo = $('#address-container').children().eq(2).text();
                var postcode = $('#address-container').children().eq(3).text();
                var fullAddress = lineOne + "," + lineTwo + "," + postcode;
                console.log(fullAddress);
                init(fullAddress); //jQuery promises for Async map load


                var startAddress;

                $('#address-submit').click(function (lineOne, lineTwo, postcode) {
                    lineOne = $('#address-form').find('#first-line').val();
                    lineTwo = $('#address-form').find('#second-line').val();
                    postcode = $('#address-form').find('#postcode').val();
                    startAddress = lineOne + ',' + lineTwo + ',' + postcode;
                    getLatLong(startAddress);
                    document.getElementById('address-form').reset();
                    $('#geo-error').hide('fast');
                    gotLoc = true;
                    $('#walk').prop('disabled', false);
                    $('#drive').prop('disabled', false);
                });


                function getLatLong(address) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var coords = new google.maps.LatLng(
                                results[0]['geometry']['location'].lat(),
                                results[0]['geometry']['location'].lng());
                            $('#address-success').show('fast');
                            $('#address-error').hide('fast');
                            $('#lat-lng').html("<p>Your location: <span id='lat'>" + coords.lat() + "</span>, <span id='lng'>" + coords.lng() + "</span></p>");

                        } else {
                            console.log("Unable to find address: " + status);
                            $('#address-error').show('fast');
                        }

                    });
                }

                if (geoStatus === false && gotLoc === false) {
                    $('#geo-error').show('fast');
                    $('#walk').prop('disabled', true);
                    $('#drive').prop('disabled', true);
                }


                $('#walk').click(function () {
                    $('#directions-panel').empty();
                    if (geoStatus == false) {
                        var startLat = parseFloat($('#lat').text());
                        var startLng = parseFloat($('#lng').text());
                        var startCoords = (startLat + ',' + startLng);
                        calcRoute(startCoords, fullAddress, google.maps.TravelMode.WALKING);

                    } else {
                        calcRoute((currLat + ',' + currLong), fullAddress, google.maps.TravelMode.WALKING);
                    }
                });
                $('#drive').click(function () {
                    $('#directions-panel').empty();
                    if (geoStatus === false) {
                        var startLat = parseFloat($('#lat').text());
                        var startLng = parseFloat($('#lng').text());
                        var startCoords = (startLat + ',' + startLng);
                        calcRoute(startCoords, fullAddress, google.maps.TravelMode.DRIVING);
                    } else {
                        calcRoute((currLat + ',' + currLong), fullAddress, google.maps.TravelMode.DRIVING);
                    }
                });

                $.getJSON("php/select/viewReview.php?q=" + itemID, function (data) {
                    $.each(data, function (i, ent) {
                        $("<div class='row'><div class='col-lg-12' class='review-items'>" +
                        "<p class='review-details'> <b>Name: </b>" + ent['reviewerName'] + " <b>Time Posted: </b>" + ent['reviewDate'] + "</p>" +
                        "<p class='review-comment-header'><b>Comment:</b></p>" +
                        "<p class='review-comment'>" + ent['reviewComment'] + '</p>' +
                        "</div></div>").appendTo("#review-container");

                    });
                });

            });

            fullPageJson.fail(function () {
                console.log('JSON has failed to parse');
            });
        });


        firstPageJson.fail(function () {
            document.write('<h1>JSON has failed to parse</h1>');
        });
    });

});
var currentYear = new Date();

var headerJson = $.getJSON("php/select/jsonHeader.php", function (data) {
    $.each(data, function (i, ent) {
        $("<a  class='navbar-brand site-name'>" + ent['hdrTxt'] + "</a>").appendTo('#site-header');
        $("<p>Copyright &copy; " + ent['author'] + " " + currentYear.getFullYear() + "</p>").appendTo('#author');
        $('#facebook').attr('href', ent['fbIcon']);
        $('#twitter').attr('href', ent['twitIcon']);

    });
    headerJson.fail(function () {
        document.write('<h1>Header JSON has failed to parse</h1>');
    });
});