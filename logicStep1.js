// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite Streets": satelliteStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
})


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
	console.log(data);
	
	
    
 // Grabbing our GeoJSON data.
	L.geoJson(data, {
		//style:{
			//fillColor: "orange",
			//color:"blue",
			//weight: 1
		//},
		pointToLayer: function(feature, latlong) {
			console.log(feature);
			//return L.marker(latlng)
            //L.circle().bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
            return L.circle(latlong, {
                fillColor: "orange",
                radius: 20

            });

		  }
    // We turn each feature into a marker on the map.
     // onEachFeature: function(feature, latlng) {
      //	console.log(feature);
      //	return L.marker(latlng);
   // }
  }).addTo(map); ;
});

