var ringCount = 50;
var radiusScale = 3;

function setup() {
    createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(30);  
    rotateX(60);
    noFill();
    stroke(255)
    for (var i = 0; i < ringCount; i++) {
        var r = map(sin(frameCount), -1, 1, 0, 255);
        var g = map(i, 0, ringCount, 100, 200);
        var b = map(sin(frameCount), -1, 1, 255, 0);
        stroke(r,g,b);
        rotate(frameCount / 50);
        beginShape();
        for (var j = 0; j < 360; j+=60)
        {
            // var rad = i * 3.3;
            var rad = i * 3;
            var x = rad * cos(j);
            var y = rad * sin(j);
            var z = sin(frameCount * 2 + i * 5) * ringCount;

            vertex(x, y, z);
        }
        endShape(CLOSE);
    }
}