/*
*	education.js
*	DATS 6401-Final Project: Analysis of Crime Rates based on U.S. data
*/
(function eduChart(){
	// set the dimensions and margins of the graph
	var margin = {top: 50, right: 20, bottom: 100, left: 80},
		width = 750 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#eduChart")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

	//Read the data
	d3.csv("Data/education_tab.csv", function(data) {

	// Add X axis
	var xScale = d3.scaleLinear()
		.domain([0, 100])
		.range([ 0, width ]);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale));

  // Add Y axis
	var yScale = d3.scaleLinear()
		.domain([0.001, 0.02])
		.range([ height, 0]);
	svg.append("g")
		.call(d3.axisLeft(yScale));

  // Add a scale for bubble size
	var z = d3.scaleLinear()
		.domain([190000, 12000000])
		.range([ 4, 40]);
	

  // Add a scale for bubble color
	var myColor = d3.scaleOrdinal()
		.domain([d.State])
		.range(d3.schemeSet2)
	
  //Labels
	var xLabel = svg.append("text")
		.attr("x", width / 2)
		.attr("y", height + 50)
		.attr("font-size", "18px")
		.attr("text-anchor", "middle")
		.text("Education Score");
	
	var yLabel = svg.append("text")
		.attr("x", -200)
		.attr("y", -50)
		.attr("transform", "rotate(-90)")
		.attr("font-size", "18px")
		.attr("text-anchor", "middle")
		.text("Crime Rates");
		
	var title = svg.append("text")
		.attr("x", width / 2)
		.attr("y", -10 - (margin.top/2))
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.style("text-decoration", "underline")
		.text("Crime Rates vs. Education Score");
	  
   //Tooltip		
	var tip = d3.tip().attr("class", "d3-tip")
		.html(function(d){
			var text = "<strong>State: </strong><span style='color:orange'>"
					+ d.State + "</span><br>";
		text += "<strong>Education Score: </strong><span style='color:orange; text-transform:capitalize;'>"
					+ d.education_score + "</span><br>";	
		text += "<strong>Crime Rate: </strong><span style='color:orange'>"
					+ d3.format("0.3%")(d.total_crime_rate) + "</span><br>";
		text += "<strong>Population: </strong><span style='color:orange'>"
					+ d3.format(",.0f")(d.Population) + "</span>";
		
			return text;
	})

	svg.call(tip); 

  // Add dots
	svg.append('g')
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
			.on("mouseover", tip.show )
			.on("mouseout", tip.hide )
			.attr("class", "bubbles")
			.attr("cx", function (d) { return xScale(d.education_score); } )
			.attr("cy", function (d) { return yScale(d.total_crime_rate); } )
			.attr("r", function (d) { return z(d.Population); } )
			.style("fill", function (d) { return myColor(d.State); } )
    // -3- Trigger the functions  

 })
}())