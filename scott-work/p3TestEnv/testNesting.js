// This is a javascript to see how to nest and call csv files within a geojson file
// This is a test so that we can see how it works before calling the csv files through flask.

// Just adding map stuff 
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

// Choose Color
function chooseColor(country) {
  switch(country) {
    case "Afghanistan":
      return "yellow";
    default:
      // what the default color will be 
      return "aqua";
  }
};

// function gdpColor(gdp) {
//     switch(gdp) {
//         case gdp > 0:
//             return "yellow";
//         case gdp = 0:
//             return "black";
//         default:
//             return "aqua";
//     }
// };



// Link to geojson file
var link = "../countries.geojson";

// Try to get csv data to print within the d3.geojson

d3.json(link, function(geoData) {
    console.log(geoData);
    // This csv will just be replaced by the flask link to the csv 
    d3.csv("data2000.csv", function(error, data2000) {
        console.log(data2000);
        // -----------------Not working--------------------------
        // var gdp = data2000.forEach(function(country) {
        //     country.gdp_per_capita = +country.gdp_per_capita;
        // }); 
        // console.log(gdp);
        // ------------------------------------------------------- 
        // ----------------Interesting------------------------- 
        // console.table(data2000, 9)
        // ------------------------------------------------------- 

        // Trying to make a function that will grab csv/flask data based on a name
        function matchedNames(country) {
            
        }




        // Grabbing Country Names from GeoJson --success
        var countriesGeoJson = []
        for (var index = 0; index < geoData.features.length; index++) {
            // if (geoData.features.ADMIN ==
            // var countryNames = geoData.features.ADMIN;
            var countryNames = geoData.features[index].properties.ADMIN;
            countriesGeoJson.push(countryNames);
        };
        console.log(countriesGeoJson);
        // -------------------------------------------------------

        // Trying to Grab Info from CSV --success
        var csvCountries = []
        for (var csvIndex = 0; csvIndex < data2000.length; csvIndex++) {
            var csvCountryNames = data2000[csvIndex];
            csvCountries.push(csvCountryNames);
            console.log(csvCountries[csvIndex]["country"]);
        };
        console.log(csvCountries[0])
        // -------------------------------------------------------

        // Trying to combine the country names and csv country names together
        // console.log(csvCountries);
        // -------------------------------------------------------

        // Leaflet Stuff Turning Colors and Making On Features
        L.geoJson(geoData, {
            style: function(feature) {
                return{
                    color: "white",
                    fillColor: chooseColor(feature.properties.ADMIN),
                    // fillColor: gdpColor(gdp),
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    click: function(event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                layer.bindPopup("<h1>" + feature.properties.ISO_A3 + "</h1> <hr> <h2>" + feature.properties.ADMIN + "</h2>");
                // function in here for bindpop that will take in the
                // create a function in here that pulls a name of a country
                // that function
                // im on argentina, now send that country name to the function that loops through csv/flask data and constructs
                // html based on data that wants to be displayed 
            }
        }).addTo(map);
    });
});