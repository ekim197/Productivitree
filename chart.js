
/*
Graph code

Notes
1.Check color
2.Check that the animation starts from middle or zooms into screeeeeen
3.Check different scales
4.Check speed with full tree, I could make it faster
5.Check where it should end up
6.I can't seem to change color
7.Change title font and size?
8.Maybe add button to hide graph? - save in other tabs too
9.Can click on the link on the bubble
10.Display visit count
*/


function getData(callback) {
  var data = [];


  chrome.runtime.sendMessage({method: "getWebsites"}, function(response) {
    responseData = response.status;
    responseData = responseData.substring(0, responseData.length - 1)
    var tempData = responseData.split(",");
    
    for(var i = 0; i < tempData.length; i++) {
      const obj = {
        Name: tempData[i],
        Rank: i + 1
      };

      data[i] = obj
    }

    callback(data)
}); 
}


function makeChart(data) {
  //Width and Height of
var width = 700
var height = 700

var title = "Top 15 Most Visited Websites"
var titleX = width/2 - 50
var titleY = 70
var titleSize = 25  

//should be radius of circle if perfect spaced
var forceCollideSpace = 10

//between 0 and 1
var collideSpeed = 0.05
var radius = 10

//Updating bubbleSizeMultiplier - also update min/max Domain
var bubbleSizeMultiplier = 1

var minDomain = 1
var maxDomain = 16

var smallestCircle = 10
var largestCircle = 100

var endHeightOffset = 100
var fontSizeMultiplier = 5

//Check d3 website for different color schemes
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//For collision
var radiusScale = d3.scaleSqrt().domain([minDomain, maxDomain]).range([smallestCircle, largestCircle])

/*
// create dummy data -> just one element per circle
var data2 = [{ "Name": "Web A", "Rank": 1}, { "Name": "Web B", "Rank": 2}, { "Name": "Web C", "Rank": 3}, 
            { "Name": "Web D", "Rank": 4}, { "Name": "Web E", "Rank": 5}, { "Name": "Web F", "Rank": 6}, 
            { "Name": "Web G", "Rank": 7}, { "Name": "Web H", "Rank": 8}, { "Name": "Web H", "Rank": 9}, 
            { "Name": "Web H", "Rank": 10}]

*/

data.forEach(function(d, i) {
  d.Rank = d.Rank * bubbleSizeMultiplier
})

var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")

svg.append("text")
  .attr("x", titleX)
  .attr("y", titleY)
  .style("text-anchor", "middle")
  .text(title)
  .attr("font-size", titleSize)
  .attr("font-weight", "bold")

var node= svg.selectAll(".node")
  .data(data)
  .enter()
  .append("g")
  .classed("node", true)

node.append("circle")
  .attr("r", function(data) {return radiusScale(data.Rank)})
  .style("fill", function(data, i) {
    return colorScale(i)
  })
  .text(function (data) {return data.Name})

node.append("text")
  .text(function(data) {return data.Name})
  .style("text-anchor", "middle")
  .attr("font-faily", "sans-serif")
  .attr("font-size", function(data) {
    return radiusScale(data.Rank) / fontSizeMultiplier
  })
  .attr("fill", "white")

//Force collide radius should match with radius to be perfect spaced
var simulation = d3.forceSimulation()
  .force("forceX", d3.forceX(width/2).strength(collideSpeed))
  .force("forceY", d3.forceY(height/2 + endHeightOffset).strength(collideSpeed))
  .force("forceCollide", d3.forceCollide(function(data) { return radiusScale(data.Rank) + 1 }))

simulation.nodes(data)
  .on("tick", ticked)

function ticked() {
  node.attr("transform", function(data) {
    return "translate(" + [data.x, data.y] + ")"
  })
}
}

getData(makeChart);
