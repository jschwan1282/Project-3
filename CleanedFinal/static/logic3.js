var queryUrl = "/api";

// Perform a GET request to the query URL
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

        var xValues2000 = [];
        var yValues2000 = [];

        var xValues2008 = [];
        var yValues2008 = [];

        var xValues2017 = [];
        var yValues2017 = [];

        // var tooltipLabels = [];
    
    // for (yearsIndex = 0; yearsIndex < data2000.length; yearsIndex++) {
    //     tooltipLabels.push(data2000[yearsIndex]["code"]);
        

    for (yearsIndex = 0; yearsIndex < year2000.length; yearsIndex++) {
        xValues2000.push(year2000[yearsIndex]["gdp_per_capita"]),
        yValues2000.push(year2000[yearsIndex]["total_deaths"])};
    for (yearsIndex = 0; yearsIndex < year2008.length; yearsIndex++) {
        xValues2008.push(year2008[yearsIndex]["gdp_per_capita"]),
        yValues2008.push(year2008[yearsIndex]["total_deaths"])};
    for (yearsIndex = 0; yearsIndex < year2017.length; yearsIndex++) {
        xValues2017.push(year2017[yearsIndex]["gdp_per_capita"]),
        yValues2017.push(year2017[yearsIndex]["total_deaths"])};

    // console.log(xValues);

    // const toolTips = tooltipLabels.map((i) => {
    //     return {i}
    // });

    const scatterStuff2017 = xValues2017.map((x, i) => {
        return {
            x: x,
            y: yValues2017[i]
        }
    });
    const scatterStuff2008 = xValues2008.map((x, i) => {
        return {
            x: x,
            y: yValues2008[i]
        }
    });
    const scatterStuff2000 = xValues2000.map((x, i) => {
        return {
            x: x,
            y: yValues2000[i]
        }
    });
    var ctx = document.getElementById('myChart').getContext('2d');

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'GDP versus Total Deaths in 2000',
                data: 
                    scatterStuff2000,
                    pointBackgroundColor: "#FF3F33",
                    backgroundColor: "#FF3F33"
                },
                {
                label: 'GDP versus Total Deaths in 2008',
                data: 
                    scatterStuff2008,
                    pointBackgroundColor: "#FFF233",
                    backgroundColor: "#FFF233"
                    
                },
                {
                label: 'GDP versus Total Deaths in 2017',
                data: 
                    scatterStuff2017,
                    pointBackgroundColor: "#33FF3E",
                    backgroundColor: "#33FF3E"
                    
                }]
        },
        options: {
            // tooltips: {
            //     callbacks: {
            //         toolTips
            //      },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        
        }
    });
});