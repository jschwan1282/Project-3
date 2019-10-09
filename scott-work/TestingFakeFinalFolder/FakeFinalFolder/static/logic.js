// This is a javascript to see how to nest and call csv files within a geojson file
// This is a test so that we can see how it works before calling the csv files through flask.

// Just adding map stuff 
// var map = L.map("map", {
//     center: [0, 0],
//     zoom: 3,
//     layers: [base2000, map2008, map2017]
// });
  // Adding tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(map);


// -- new stuff from 10.8
var base2000 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Second Layer - 2008 data
var map2008 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Third Layer - 2017 data
var map2017 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// -- new stuff from 10.8 end

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


// Link to geojson file
var link = "static/countries.geojson";

// Try to get csv data to print within the d3.geojson

d3.json(link, function(geoData) {
    console.log(geoData);
    // This csv will just be replaced by the flask link to the csv
    // d3.json("http://localhost:5000/api", function(error, data2000) {  // this pull to the flask endpoint isnt working
    d3.json('/api', function(error, data2000) {  // try this pull to flask endpoint
    // d3.csv("data2000.csv", function(error, data2000) { // this is the test with csv stuff
        console.log(data2000); 

        // Here filter the data into three different year variables. ***** -- works like a charm
        // testing stuff 10.8
        var year2000 = [];
        var year2008 = [];
        var year2017 = [];

        for (yearsIndex = 0; yearsIndex < data2000.length; yearsIndex++) {
            if (data2000[yearsIndex]["year"] == "2000") {
                year2000.push(data2000[yearsIndex]);
            }
            else if (data2000[yearsIndex]["year"] == "2008") {
                year2008.push(data2000[yearsIndex]);
            }
            else {
                year2017.push(data2000[yearsIndex]);
            }
        };

        console.log(year2000);
        console.log(year2008);
        console.log(year2017);

        // testing stuff 10.8 end + fil


    
        // Trying to make a function that will grab csv/flask data based on a name
        function matchedNames(country) {
            var csvCountries = []
            for (var csvIndex = 0; csvIndex < data2000.length; csvIndex++) {
                var csvCountryNames = data2000[csvIndex];
                csvCountries.push(csvCountryNames);
                var countryName = csvCountries[csvIndex]["country"];
                var countryDeaths = csvCountries[csvIndex]["deaths"];
                // console.log(`${countryName},${countryDeaths}`);
                // for this part when we need to filter I think i can just add an and statement to the 
                // countries. e.g. index == country & column year == 2000 or 2008 etc.
                if (csvCountries[csvIndex]["country"] == country) {
                    // change the == Brazil to whatever the argument will be in the function
                    // console.log(`${csvCountries[csvIndex]["country"]}, ${csvCountries[csvIndex]["deaths"]}`)
                    return( `<h1>${csvCountries[csvIndex]["country"]}:${csvCountries[csvIndex]["gdp_per_capita"]}</h1> <hr>\n
                             <h2>Total Deaths: ${csvCountries[csvIndex]["total_deaths"]}</h2> <hr>\n
                             <h2>Deaths Under 5: ${csvCountries[csvIndex]["under_5"]}</h2>\n
                             <h2>Deaths 5-14: ${csvCountries[csvIndex]["age_5_14"]}</h2>\n
                             <h2>Deaths 15-49: ${csvCountries[csvIndex]["age_15_49"]}</h2>\n
                             <h2>Deaths 50-69: ${csvCountries[csvIndex]["age_50_69"]}</h2>\n
                             <h2>Deaths Over 70: ${csvCountries[csvIndex]["over_70"]}</h2>\n`);
                } 
                // else {
                //     return(`<h1>Nothing Was Returned<h1>`);
                // };
            };
        };

        function gdpColor(country) {
            var csvGDP = [];
            for (var csvIndex = 0; csvIndex < data2000.length; csvIndex++) {
                var csvCountryData = data2000[csvIndex];
                csvGDP.push(csvCountryData);
                if (csvGDP[csvIndex]["country"] == country) {
                    return(`${csvCountries[csvIndex]["gdp_per_capita"]}`)
                    // I think I need to add another if statement here that grabs the 
                };
            };
        };
        // this function to be used for GDP coloring
        function getColor(d) {
            // return d > 50000 ? '#FF0000' :
            //        d > 25000 ? '#FF3300' :
            //        d > 20000  ? '#ff6600' :
            //        d > 10000  ? '#ff9900' :
            //        d > 8000   ? '#FFCC00' :
            //        d > 5000   ? '#7FFF00' :
            //        d > 2500   ? '#ccff00' :
            //        d > 1000   ? '#99ff00' :
            //        d > 500   ? '#66ff00' :
            //                 //   '#33ff00'; // put countries that don't appear as white
            //                   '#FFFFFF'; // put countries that don't appear as white
            return d > 50000 ? '#66ff00' :
                   d > 25000 ? '#99ff00' :
                   d > 20000  ? '#ccff00' :
                   d > 10000  ? '#7FFF00' :
                   d > 8000   ? '#FFCC00' :
                   d > 5000   ? '#ff9900' :
                   d > 2500   ? '#ff6600' :
                   d > 1000   ? '#FF3300' :
                   d > 500   ? '#FF0000' :
                            //   '#33ff00'; // put countries that don't appear as white
                              '#FFFFFF'; // put countries that don't appear as white

        };



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
            var countryName = csvCountries[csvIndex]["country"];
            var countryDeaths = csvCountries[csvIndex]["deaths"];
            // console.log(`${countryName},${countryDeaths}`);
            if (csvCountries[csvIndex]["country"] == "Brazil") {
                // change the == Brazil to whatever the argument will be in the function
                console.log(`${csvCountries[csvIndex]["country"]}, ${csvCountries[csvIndex]["deaths"]}`)
            }
            // console.log(csvCountries[csvIndex]["country"]);
        };
        // console.log(csvCountries[0])
        // -------------------------------------------------------

        // Trying to combine the country names and csv country names together
        // console.log(csvCountries);
        // -------------------------------------------------------

        // Leaflet Stuff Turning Colors and Making On Features
        L.geoJson(geoData, {
            style: function(feature) {
                return{
                    color: "white",
                    // fillColor: chooseColor(feature.properties.ADMIN),
                    fillColor: getColor(gdpColor(feature.properties.ADMIN)),
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
                // layer.bindPopup("<h1>" + feature.properties.ISO_A3 + "</h1> <hr> <h2>" + feature.properties.ADMIN + "</h2>");
                layer.bindPopup(matchedNames(feature.properties.ADMIN));
                // This above is trying to do the function that will return data based on 
                // function in here for bindpop that will take in the
                // create a function in here that pulls a name of a country
                // that function
                // im on argentina, now send that country name to the function that loops through csv/flask data and constructs
                // html based on data that wants to be displayed 
            }
        }).addTo(map);

    });
});

var mapLayers = {
    "Year 2000": base2000,
    "Year2008": map2008,
    "Year 2017": map2017
};
var map = L.map("map", {
    center: [0, 0],
    zoom: 3,
    layers: [base2000, map2008, map2017]
});
L.control.layers(mapLayers).addTo(map);