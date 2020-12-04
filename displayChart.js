function getData(callback) {
  var data = [];

  chrome.runtime.sendMessage({ method: "getWebsites" }, function (response) {
    responseData = response.status;
    responseData = responseData.substring(0, responseData.length - 1)
    var tempData = responseData.split(",");

    for (var i = 0; i < tempData.length; i++) {
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
  //Width and Height of chart

  var width = document.getElementById("my_dataviz").offsetWidth
  var height = document.getElementById("my_dataviz").offsetHeight

  //Title properties
  var title = "Your Recent Websites"
  var titleX = width / 2 - 50
  var titleY = 40
  var titleSize = 25
  var titleFont = "sans-serif"

  //between 0 and 1
  var collideSpeed = 0.05

  //Updating bubbleSizeMultiplier - also update min/max Domain
  var bubbleSizeMultiplier = 1

  var minDomain = 1
  var maxDomain = 15

  var smallestCircle = 25
  var largestCircle = 80

  //Where the circles ends up
  var endHeightOffset = 25

  //Label properties
  var fontSizeMultiplier = 5
  var circleLabelColor = "black"

  //Check d3 website for different color schemes
  //var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  var colorScale = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF"]

  //For collision
  var radiusScale = d3.scaleSqrt().domain([minDomain, maxDomain]).range([smallestCircle, largestCircle])

  data.forEach(function (d, i) {
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
    .attr("font-family", titleFont)

  var node = svg.selectAll(".node")
    .data(data)
    .enter()
    .append("g")
    .classed("node", true)

  node.append("circle")
  .attr("r", function (data) { return radiusScale(data.Rank) })
  .style("fill", function (data, i) {
    return colorScale[i % colorScale.length]
  })
  .text(function (data) { return data.Name })


  node.append("text")
    .text(function (data) { return data.Name })
    .style("text-anchor", "middle")
    .attr("font-faily", "sans-serif")
    .attr("font-size", function (data) {
      return radiusScale(data.Rank) / fontSizeMultiplier
    })
    .attr("fill", circleLabelColor)

  //Force collide radius should match with radius to be perfect spaced
  var simulation = d3.forceSimulation()
    .force("forceX", d3.forceX(width / 2).strength(collideSpeed))
    .force("forceY", d3.forceY(height / 2 + endHeightOffset).strength(collideSpeed))
    .force("forceCollide", d3.forceCollide(function (data) { return radiusScale(data.Rank) + 1 }))

  simulation.nodes(data)
    .on("tick", ticked)

  function ticked() {
    node.attr("transform", function (data) {
      return "translate(" + [data.x, data.y] + ")"
    })
  }
}

getData(makeChart);
