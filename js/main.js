 
 



//Model
// Define your locations with GoogleMaps: HTML content for the info window, latitude, longitude
var locations = [
    ['<h4>Red Rock Cafe</h4><p> 3325 28th St, Boulder</p><p>Easygoing hangout offering espresso drinks,</br> tea, baked goods, sandwiches & free Wi-Fi.</p>', 40.034895, -105.260033],
    ['<h4>The Laughing Goat Coffeehouse</h4><p>1998 Pleasant St, Boulder</p><p> Modern coffeehouse serving organic brews</p>', 40.019604, -105.273141],
    ['<h4>Trident Booksellers and Cafe</h4><p> 940 Pearl St, Boulder</p><p>Local bookstore-cafe with </br>outdoor seating, plus readings, live concerts & plays</p>', 40.016968, -105.282887],
    ['<h4>Espresso Roma</h4><p>1101 13th St, Boulder</p><p>The coffee is good and</br> the atmosphere is psychedelic!</p>', 40.007397, -105.276331],
    ['<h4>Ozo Coffee Company</h4><p>1015 Pearl St, Boulder</p><p>Homey daytime cafe with light fare</p>', 40.014190, -105.294955],
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
// Setup the different icons and add them to the map

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
var map;



  var infowindow = new google.maps.InfoWindow();
  var iconURLPrefix = 'https://www.google.com/mapfiles/';
  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: iconURLPrefix + 'marker_black.png',
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0], locations[i][6]);
        infowindow.open(map, marker);

        for (var j = 0; j < markers.length; j++) {
          markers[j].setIcon("https://www.google.com/mapfiles/marker_black.png");
        }
        marker.setIcon("https://www.google.com/mapfiles/marker_white.png");
      };
    })(marker, i));
    markers.push(marker);

  }

$(function() {
    var shops = [{
        name: "Red Rock Cafe",
       
        }, {
        name: "The Laughing Goat Coffeehouse",
       
        }, {
        name: "Trident Booksellers and Cafe",
        

    }, {
        name: "Expresso Roma",
        
    }, {
        name: "Ozo Coffee Company",
        
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

var showMarker = function () {
  console.log('showMarker printing to console');

  for(var i=0, l = locations.length; i < l; i++){
    console.log(locations[i]);
}
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.DROP);
  }
};




    

