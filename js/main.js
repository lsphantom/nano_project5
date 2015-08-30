//Model
// Define your locations with GoogleMaps: HTML content for the info window, latitude, longitude
var locations = [
    ['<h4>The Laughing Goat Coffeehouse</h4>', 40.019604, -105.273141],
    ['<h4>Ozo Cafe</h4>', 40.014190, -105.294955],
    ['<h4>Espresso Roma</h4>', 40.007397, -105.276331],
    ['<h4>Trident Booksellers and Cafe</h4>', 40.016968, -105.282887],
    ['<h4>Red Rock Cafe</h4>', 40.034895, -105.260033]
];
//Defines Open Weather Map info 
function b() {
        var apiKey = '5222045741e8792041d7a9f8afc89168';
        var url = 'https://api.forecast.io/forecast/';
        var lati = 40.0149900;
        var longi = -105.2705500;
        var data;
        $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?",
            function(data) {
                $('#weather').html('Temp: ' + data.currently.temperature +
                    ' ' + 'degrees');
            });
    }
//ViewModel
// Setup the different icons and shadows
var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
var icons = [
    iconURLPrefix + 'red-dot.png',
    iconURLPrefix + 'green-dot.png',
    iconURLPrefix + 'blue-dot.png',
    iconURLPrefix + 'orange-dot.png',
    iconURLPrefix + 'yellow-dot.png'
]
var iconsLength = icons.length;
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(40.010786, -105.274274),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
    }
});
var infowindow = new google.maps.InfoWindow({
    maxWidth: 160
});
var markers = new Array();
var iconCounter = 0;
// Add the markers and infowindows to the map
for (var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][
            2
        ]),
        map: map,
        icon: icons[iconCounter]
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
    iconCounter++;
    // We only have a limited number of possible icon colors, so we may have to restart the counter
    if (iconCounter >= iconsLength) {
        iconCounter = 0;
    }
}
$(function() {
    var shops = [{
        name: "Red Rock Cafe"
    }, {
        name: "The Laughing Goat Coffeehouse"
    }, {
        name: "Trident Booksellers and Cafe"
    }, {
        name: "Expresso Roma"
    }, {
        name: "Ozo Cafe"
    }, ];
    var viewModel = {
        shops: ko.observableArray(shops),
        query: ko.observable(''),
        search: function(value) {
            viewModel.shops.removeAll();
            for (var x in shops) {
                if (shops[x].name.toLowerCase().indexOf(value.toLowerCase()) >=
                    0) {
                    viewModel.shops.push(shops[x]);
                }
            }
        }
    };
    viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);
});

//View
// Will let the user know when Google Maps fails to load.
function failedToLoad() {
    $('#map').html("Google Maps Failed to Load");
}