var queryUrl = "http://localhost:5000/api";

// Perform a GET request to the query URL
var deathData = d3.json(queryUrl, function(malariaData) {
    console.log(malariaData);
    return
});

//options
var barOptions = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Bar Graph",
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#333",
      fontSize: 16
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        min: 0
      }
    }]
  }
};

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2000', '2008', '2017'],
        datasets: [{
            label: 'Years of Data',
            data: [851798, 874094, 619826],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'                
            ],
            borderWidth: 1
        }]
    },
    options: {
        barOptions
    }
});
