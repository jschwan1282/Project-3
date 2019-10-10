var svgWidth = 1080;
    var svgHeight = 720;

    var margin = {
            top: 50,
    bottom: 150,
    right: 50,
    left: 150
};

var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
        var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

        var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
        d3.csv("./cleaned_17.csv").then(function(malaria_data) {

        var year2017 = [];

        for (yearsIndex = 0; yearsIndex < data2000.length; yearsIndex++) {
            if (data2000[yearsIndex]["year"] == "2017") {
                year2017.push(data2000[yearsIndex]);

            }
            console.log(year2017);

            // Step 1: Parse Data/Cast as numbers
            // ==============================
            malaria_data.forEach(function(data) {
                data.total_deaths = +data.total_deaths;
                data.gdp_per_capita = +data.gdp_per_capita;
            });

            // Step 2: Create scale functions
            // ==============================
            var xLinearScale = d3.scaleLinear()
            .domain([20, d3.max(malaria_data, d => d.total_deaths)])
            .range([0, width]);

            var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(malaria_data, d => d.gdp_per_capita)])
            .range([height, 0]);

            // Step 3: Create axis functions
            // ==============================
            var bottomAxis = d3.axisBottom(xLinearScale);
            var leftAxis = d3.axisLeft(yLinearScale);

            // Step 4: Append Axes to the chart
            // ==============================
            chartGroup.append("g")
                    .attr("transform", `translate(0, $ {
                height
            })`)
            .call(bottomAxis);

            chartGroup.append("g")
                    .call(leftAxis);

            // Step 5: Create Circles
            // ==============================
            var circlesGroup = chartGroup.selectAll(".stateCircle")
                    .data(malaria_data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => xLinearScale(d.total_deaths))
            .attr("cy", d => yLinearScale(d.gdp_per_capita))
            .attr("r", "20")
                    .attr("opacity", ".8")
                    .classed("stateCircle", true);

            var textGroup = chartGroup.selectAll(".stateText")
                    .data(malaria_data)
                    .enter()
                    .append("text")
                    .classed("stateText", "True")
                    .attr("x", d => xLinearScale(d.total_deaths))
            .attr("y", d => yLinearScale(d.gdp_per_capita) + 6)
            .text(d => d.abbr);

            chartGroup.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left + 40)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .attr("class", "axisText")
                    .text("Total Deaths");

            chartGroup.append("text")
                    .attr("transform", `translate($ {
                width / 2
            },$ {
                height + margin.top + 30
            })`)
            .attr("class", "axisText")
                    .text("Gross Domestic Product");

            var toolTip = d3.select("body").append("div")
                    .attr("class", "d3-tip");

            circlesGroup.on("mouseover", function(d) {
                toolTip.style("display", "block");
                toolTip.html(`Country:<strong > $ {
                    d.code
                }</strong > Total Deaths:<strong > $ {
                    d.total_deaths
                }</strong > GDP_PER_CAPITA:<strong > $ {
                    d.gdp_per_capita
                }</strong >`)
                .style("left", d3.event.pageX + "px")
                        .style("top", d3.event.pageY + "px");
            })
            .on("mouseout", function() {
                toolTip.style("display", "none");
            });

        }})
        .catch(function(error) {
        console.log(error);
        });
