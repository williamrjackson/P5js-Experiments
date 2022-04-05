var points = [];
var mult = 0.01;
var density = 50;
var radius = 350;

// Random color ranges
var r1, r2, g1, g2, b1, b2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);  
    angleMode(DEGREES);
    noiseDetail(1);
    radius = min(windowWidth, windowHeight) / 4;
    var space = width / density;

    for (var x = 0; x < width; x+=space) {
        for (var y = 0; y < height; y+=space) {
            var p = createVector(x + random(-10, 10), y + random(-10, 10));
            points.push(p);           
        }
    }

    r1 = random(255);
    r2 = random(255);
    g1 = random(255);
    g2 = random(255);
    b1 = random(255);
    b2 = random(255);
}
  
  function draw() {
    noStroke();
    
    for(var i = 0; i < points.length; i++)
    {
        var distance = dist(width / 2, height / 2, points[i].x, points[i].y);
        var r = map(points[i].x, 0, width, r1, r2);
        var g = map(points[i].y, 0, height, g1, g2);
        var b = map(points[i].x, 0, width, b1, b2);
        var a = map(distance, 0, radius * 2, 255, 0);
        
        fill(r, g, b, a);
        var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
        points[i].add(createVector(cos(angle), sin(angle)));

        if (distance < radius * 2)
        {
            // ellipse(points[i].x, points[i].y, 1);
            ellipse(points[i].x, points[i].y, map(distance, 0, radius * 2, 1, 0));
        }
    }    
  }