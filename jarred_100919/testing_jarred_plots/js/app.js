var svgWidth = 750;
var svgHeight = 500;

var margin = {
  top: 50,
  right: 25,
  bottom: 125,
  left: 85
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// setup svg
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// chart group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// read csv
d3.csv("/data/cleaned_17.csv").then(function(year2017) {
    

// d3.json('/api', function(error, data2000) {  // try this pull to flask endpoint
//    // d3.csv("data2000.csv", function(error, data2000) { // this is the test with csv stuff
//        console.log(data2000);
//        // Here filter the data into three different year variables. ***** -- works like a charm
//        // testing stuff 10.8
//        var year2000 = [];
//        var year2008 = [];
//        var year2017 = [];
//        for (yearsIndex = 0; yearsIndex < data2000.length; yearsIndex++) {
//            if (data2000[yearsIndex]["year"] == "2000") {
//                year2000.push(data2000[yearsIndex]);
//            }
//            else if (data2000[yearsIndex]["year"] == "2008") {
//                year2008.push(data2000[yearsIndex]);
//            }
//            else {
//                year2017.push(data2000[yearsIndex]);
//            }
//        };
//        console.log(year2000);
//        console.log(year2008);
//        console.log(year2017);
    
    
       // convert to numbers
    year2017.forEach(function(DoIt) {
        DoIt.total_deaths = +DoIt.total_deaths;
        DoIt.gdp_per_capita = +DoIt.gdp_per_capita;
    });



    // set x scale function
    var scalex = d3.scaleLinear()
        .domain([d3.min(year2017, d => d.total_deaths), 
            d3.max(year2017, d => d.total_deaths - 450000)])
        .range([0, width]);


    // set y scale function
    var scaley = d3.scaleLinear()
        .domain([0, d3.max(year2017, d => d.gdp_per_capita - 102000)])
        .range([height, 0]);


    // axes
    var bottomAxis = d3.axisBottom(scalex);
    var leftAxis = d3.axisLeft(scaley);

    // append x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "16px", "rotate(180)")
        .call(bottomAxis);

    // append y-axis
    chartGroup.append("g")
        .style("font-size", "16px")
        .call(leftAxis);
  
    // circle attributes
    chartGroup.selectAll("circle")
        .data(year2017.filter(d => d.total_deaths > 1000 && d.total_deaths < 200000))
        .enter()
        .append("circle")
        .attr("cx", d => scalex(d.total_deaths))
        .attr("cy", d => scaley(d.gdp_per_capita))
        .attr("r", 10)
        .attr("fill", "coral")
        .attr("opacity", ".7");

    // // // text in circles
    // chartGroup.selectAll("text.text-circles")
    //     .data(year2017)
    //     .enter()
    //     .append("text")
    //     .classed("text-circles",true)
    //     .text(d => d.code)
    //     .attr("font-weight")
    //     .attr("x", d => scalex(d.total_deaths))
    //     .attr("y", d => scaley(d.gdp_per_capita))
    //     .attr("dy",5)
    //     .attr("text-anchor","middle")
    //     .attr("font-size","10px");

    // y-axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 12 - margin.left)
        .attr("x", 0 - (height / 1.75))
        .attr("font-weight", "bold")
        .text("GDP per capita ($)");

    // x-axis label
    chartGroup.append("text")        
        .attr("y", height + margin.bottom / 2)
        .attr("x", width / 3)
        .attr("font-weight", "bold")
        .text("Total Deaths (countries with more than 1000)");


});
