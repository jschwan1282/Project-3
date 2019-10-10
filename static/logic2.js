var queryUrl = "/api";

// Perform a GET request to the query URL
d3.json(queryUrl, function(malariaData) {
    console.log(malariaData);
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2000', '2008', '2017'],
            datasets: [{
                label: 'Total Deaths',
                data: [malariaData[227]["total_deaths"], malariaData[458]["total_deaths"], malariaData[689]["total_deaths"], 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 0, 0, 0)'                
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 0, 0, 0)'             
                ],
                borderWidth: 1
            },
            {
                label: 'Sub-Saharan Continent Deaths',
                data: [malariaData[194]["total_deaths"], malariaData[425]["total_deaths"], malariaData[656]["total_deaths"], 0],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(0, 0, 0, 0)'                
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(0, 0, 0, 0)'             
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
    title: {
        display: true,
        position: "top",
        text: "Total Deaths for Years 2000, 2008, 2017",
        fontSize: 18,
        fontColor: "#111"
    },
    legend: {
        display: true,
        position: "top",
        labels: {
        fontColor: "#111",
        fontSize: 16
        }
    },
    scales: {
        xAxes: [{
            type: 'category',
            display: true,
            scaleLabel: {
            display: true,
            labelString: 'Years', 
            fontColor: "#111",
            fontSize: 16
            },
            ticks: {
            major: {
                fontStyle: 'bold',
                fontColor: '#FF0000'
            }
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
            display: true,
            labelString: 'Number of Deaths', 
                fontColor: "#111",
                fontSize: 16
            }
        }]
        }
        }
    });
});
