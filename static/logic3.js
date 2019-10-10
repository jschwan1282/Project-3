var queryUrl = "/api";



// Perform a GET request to the query URL
d3.json(queryUrl, function(malariaData) {
    console.log(malariaData);

    malariaData.forEach(function(DoIt) {
        DoIt.total_deaths = +DoIt.total_deaths;
        DoIt.gdp_per_capita = +DoIt.gdp_per_capita;
    });

    var ctx = document.getElementById('myChart').getContext('2d');

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
});