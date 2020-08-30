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
	center: [43.7, -79.3],
	zoom: 11,
	layers: [satelliteStreets]
})


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/mlsterl1/Mapping_Earthquakes/master/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
	console.log(data);
	
	
    
 // Grabbing our GeoJSON data.
	L.geoJson(data, {
		style:{
			fillColor: "yellow",
			color:"blue",
			weight: 1
		},
		onEachFeature: function(feature, layer) {
			console.log(feature);
			//return L.marker(latlng)
			layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>");

		  }
    // We turn each feature into a marker on the map.
     // onEachFeature: function(feature, latlng) {
      //	console.log(feature);
      //	return L.marker(latlng);
   // }
  }).addTo(map); ;
});

