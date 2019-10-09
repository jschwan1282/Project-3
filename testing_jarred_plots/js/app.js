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
d3.csv("/data/cleaned_17.csv").then(function(DoTheThing) {
    
    // convert to numbers
    DoTheThing.forEach(function(DoIt) {
        DoIt.total_deaths = +DoIt.total_deaths;
        DoIt.gdp_per_capita = +DoIt.gdp_per_capita;
    });

    // set x scale function
    var scalex = d3.scaleLinear()
        .domain([d3.min(DoTheThing, d => d.total_deaths), 
            d3.max(DoTheThing, d => d.total_deaths)])
        .range([0, width]);

    // set y scale function
    var scaley = d3.scaleLinear()
        .domain([0, d3.max(DoTheThing, d => d.gdp_per_capita)])
        .range([height, 0]);

    // axes
    var bottomAxis = d3.axisBottom(scalex);
    var leftAxis = d3.axisLeft(scaley);

    // append x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "16px")
        .call(bottomAxis);

    // append y-axis
    chartGroup.append("g")
        .style("font-size", "16px")
        .call(leftAxis);
  
    // circle attributes
    chartGroup.selectAll("circle")
        .data(DoTheThing)
        .enter()
        .append("circle")
        .attr("cx", d => scalex(d.total_deaths))
        .attr("cy", d => scaley(d.gdp_per_capita))
        .attr("r", 18)
        .attr("fill", "coral")
        .attr("opacity", ".7");

    // // text in circles
    chartGroup.selectAll("text.text-circles")
        .data(DoTheThing)
        .enter()
        .append("text")
        .classed("text-circles",true)
        .text(d => d.code)
        .attr("font-weight", "bold")
        .attr("x", d => scalex(d.total_deaths))
        .attr("y", d => scaley(d.gdp_per_capita))
        .attr("dy",5)
        .attr("text-anchor","middle")
        .attr("font-size","14px");

    // y-axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("font-weight", "bold")
        .text("GDP per capita ($)");

    // x-axis label
    chartGroup.append("text")
        .attr("y", height + margin.bottom / 2)
        .attr("x", width / 2)
        .attr("font-weight", "bold")
        .text("Total Deaths");


});
