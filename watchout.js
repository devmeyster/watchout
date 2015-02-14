
var astroid = "./asteroid.png";
var width = 200;
var height = 200;


var createEnemies = function(n){
  return _.range(0, n).map(function(i){
    return {
      'id': i,
      'x' : Math.random()* 1000,
      'y' : Math.random()* 1000
    };
  });
};


d3.select ('body')
 .append ('svg')
 .attr ({ id : 'mySvg', width : 80, height : 80})
 .append ('defs')
 .attr ({ id : 'mdef'})
 .append ('pattern')
 .attr ({ id : 'image', x : 0, y : 0, height: 40, width : 40})
 .append ('image')
 .attr ({ x : 0, y : 0, width : 40, height : 40,
            'xlink:href' : './asteroid.png'});


var board = d3.select("body")
            .append("svg")
            .attr("height", "750px")
            .attr("width", "750px");


var circles = board.selectAll('circle').data(createEnemies(30));
circles.enter().append("circle")
   .attr("class", "enemy")
   .attr("cx", function(d){return d.x})
   .attr("cy", function(d){return d.y})
   .attr("r", 10)
   .style("fill", "url(#image)")       // this code works OK
   .style("stroke", "black")     // displays small black dot
   .style("stroke-width", 0.25);

board.append("circle").attr("class", "player").attr("r", 10).attr("cx", 375).attr("cy", 375).style("fill", "orange");

board.selectAll('.player').drag();


var move = function(){
  var circlesToMove = board.selectAll('.enemy').data(createEnemies(30));
  circles.transition().duration(1500).attr("cx", function(d){return d.x})
         .attr("cy", function(d){return d.y});
};

setInterval(move, 1000);











// var move = function(num){
//   var circles = board.selectAll('circle').data(createEnemies(num));
//     circles.enter().append("circle")
//        .attr("class", "logo")
//        .attr("cx", function(d){return d.x})
//        .attr("cy", function(d){return d.y})
//        .attr("r", 20)
//        .style("fill", "url(#image)")       // this code works OK
//        .style("stroke", "black")     // displays small black dot
//        .style("stroke-width", 0.25);

//     circles.exit().remove();
// };




// setInterval(function(){move(Math.floor(Math.random()*100))}, 1000);

