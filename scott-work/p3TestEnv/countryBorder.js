// Testing to see if I can get borders to show up around countries

var map = L.map("map", {
  center: [0, 0],
  zoom: 3
});
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "../countries.geojson";

function chooseColor(country) {
  switch(country) {
    case "Afghanistan":
      return "yellow";
    default:
      // what the default color will be 
      return "aqua";
  }
};

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.ADMIN),
        // fillColor: "red",
        
        // What the default color opacity
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        // resets the map to rebind everything to where you are looking currently 
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ISO_A3 + "</h1> <hr> <h2>" + feature.properties.ADMIN + "</h2>");

    }
  }).addTo(map);
});
// d3.json(link, function(data) {
//   console.log(data);
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(map);
// });

var data2000 = "data2000.csv";

d3.csv(data2000, function(countryData) {
  // console.log(countryData);
  countryData.forEach(function(data) {
    data.country = data.country;
    data.year = +data.year;
    data.deaths = +data.deaths;
    console.log(data.deaths);

  })
});

