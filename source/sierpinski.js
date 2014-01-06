function sierpinski() {
  var canvasId;
  var canvas;
  var speed;
  var numDots;
  var width;
  var height;
  var triangle;
  var point;
  var timeBetweenDots = 100;

  var setCanvasId = function(id) {
    canvas = document.getElementById(id);
    width = canvas.width;
    height = canvas.height;
  }

  var drawPoint = function() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#000";
    context.fillRect(point['x'],point['y'],1,1);

  }

  var alertPoints = function(vertex) {
    alert("Point: " + point.x.toString() +", "+ point.y.toString());
    alert("Vertex: " + triangle[vertex].x.toString() +", "+ triangle[vertex].y.toString());
  }

  var iterate = function() {
    var vertex = Math.floor(Math.random() * 3)  ;
    if (vertex == 0) {
      vertex = "a";
    } else if (vertex == 1) {
      vertex = "b";
    } else {
      vertex = "c";
    }
    //alertPoints(vertex);
    point.x = Math.floor((point.x + triangle[vertex].x)/2);
    point.y = Math.floor((point.y + triangle[vertex].y)/2);
    //alertPoints(vertex);
    drawPoint();
  }

  this.start = function() {
    setInterval(function(){iterate()}, 1);

  }

  this.init = function(canvas) {
    canvasId = canvas;
    setCanvasId(canvasId);
    triangle = new Object();
    triangle['a'] = new Object();
    triangle.a['x'] = 0;
    triangle.a['y'] = height;
    
    triangle['b'] = new Object();
    triangle.b['x'] = Math.floor(width / 2);
    triangle.b['y'] = 0;

    triangle['c'] = new Object();
    triangle.c['x'] = width;
    triangle.c['y'] = height;

    point = new Object();
    point['x'] = width /2;
    point['y'] = height /2;
  }


}

function start() {
  var sierp = new sierpinski();
  sierp.init('mainCan');
  sierp.start();
}
