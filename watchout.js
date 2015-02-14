
var astroid = "./asteroid.png";
var width = 200;
var height = 200;
var score = d3.select(".current").select('span');
var high = d3.select(".high").select('span');
var totalCollisions = 0;
var currentScore = 0;
var highScore = 0;

var createEnemies = function(n){
  return _.range(0, n).map(function(i){
    return {
      'id': i,
      'x': 10+Math.random()* 710,
      'y': 10+Math.random()* 500
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

 d3.select ('body')
  .append ('svg')
  .attr ({ id : 'playerSvg', width : 80, height : 80})
  .append ('defs')
  .attr ({ id : 'mdef'})
  .append ('pattern')
  .attr ({ id : 'playerImage', x : 0, y : 0, height: 40, width : 40})
  .append ('image')
  .attr ({ x : 0, y : 0, width : 40, height : 40,
             'xlink:href' : './yoda.gif'});





var board = d3.select("body")
            .append("svg")
            .attr("height", "500px")
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

var player = board.append("circle").attr("class", "player").attr("r", 20).attr("cx", 150).attr("cy", 150).style("fill", "url(#playerImage)");

var dragListener = d3.behavior.drag()
  .on("drag", function(){
    player.attr('cx', d3.event.x);
    player.attr('cy' , d3.event.y);
  })
  .on("dragstart", function(){
    player.style('opacity', .5);
  })
  .on("dragend", function(){
    player.style('opacity', 1);
  });

player.call(dragListener);

var move = function(){
  var circlesToMove = board.selectAll('.enemy').data(createEnemies(30));
  circles.transition().duration(1500).attr("cx", function(d){return d.x})
         .attr("cy", function(d){return d.y});
};

setInterval(move, 1000);

var detector = function(){
  d3.selectAll('.enemy').each(function(d){
    var pX = player[0][0].cx.animVal.value;
    var pY = player[0][0].cy.animVal.value;
    var pR = player[0][0].r.animVal.value;
    var math = Math.sqrt(Math.pow(pX-this.cx.animVal.value,2) + Math.pow(pY-this.cy.animVal.value,2));

    if(math <= 1.5*pR){
      if(highScore < currentScore){
        high.text(currentScore);
        highScore = currentScore;
      }
      currentScore = 0;
    }
    score.text(currentScore);
    currentScore++;
  });
};

d3.timer(detector);
