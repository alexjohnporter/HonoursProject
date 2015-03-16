var geocoder, map, myLat, myLong, currLat, currLong, currPos, directionsDisplay, marker;
var directionsService = new google.maps.DirectionsService();

var mapOptions = {
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

function init(address) {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    google.maps.event.trigger(map, 'resize');
    getCoords(address);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    setTimeout(function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }, 500);
}


google.maps.event.addDomListener(window, "resize", function () {
    if (map) {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
        console.log('map resized');
        return center;
    } else {
        console.log('map not loaded');
    }
});


function getCoords(address) {

    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            google.maps.event.trigger(window.map, 'resize');
            if (marker) marker.setMap(null);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

            });

        } else {
            console.log('failure: ' + status);
            alert("Map location not found - Please try a valid address.");
        }
    });
}

var geoStatus = true;

if (navigator.geolocation) {
    console.log('geolocation is on!');

    window.onload = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
                myLat = pos.coords.latitude;
                myLong = pos.coords.longitude; //start  lat and long
                return parseFloat(myLat) + ',' + parseFloat(myLong);
            },

            function (err) {
                console.log(err + ": Geolocation is disabled. Please turn it on and try again.");
                geoStatus = false;

            });
        navigator.geolocation.watchPosition(function (pos) {
            currLat = pos.coords.latitude;
            currLong = pos.coords.longitude; //current lat and long
            currPos = parseFloat(currLat) + ',' + parseFloat(currLong);
        });
    };

} else {
    geoStatus = false;
    console.log("geolocation isn't available");
}

function calcRoute(startLoc, endLoc, transportMethod) { //standard google-maps directions function adapted to my project
    var request = {
        origin: startLoc,
        destination: endLoc,
        travelMode: transportMethod
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            console.log(status);
        }
    });

}