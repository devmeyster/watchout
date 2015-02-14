
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
            .attr("height", "450px")
            .attr("width", "450px");


var playData = [{id: 1, 'x': 300, 'y': 300}, {id: 1, 'x': 200, 'y': 200}];



board.selectAll('circle').data(createEnemies(90)).enter().append("circle")
  .attr("class", "logo")
  .attr("cx", function(d){return d.x})
  .attr("cy", function(d){return d.y})
  .attr("r", 20)
  .style("fill", "url(#image)")       // this code works OK
  .style("stroke", "black")     // displays small black dot
  .style("stroke-width", 0.25);




// var update = function(data){
//   board.selectAll('circle').data(data)
//     .enter().append('circle')
//     .attr("class", "logo")
//     .attr('cx', function(d){return d.x})
//     .attr('cy', function(d){return d.y})
//     .attr('r', 20)
//     .style('fill', "url(#image")
//     .style('stroke', "black")
//     .style("stroke-width", 0.25);

//     // .attr('class', 'enemy');
//     // .style('top', function(d){return d.y})
//     // .style('left', function(d){return d.x})
//     // .attr('class', 'enemy')
//     // // .style('width', 25)
//     // .style('height', 25);
// };

// var enemies = createEnemies(10);
// update(enemies);














