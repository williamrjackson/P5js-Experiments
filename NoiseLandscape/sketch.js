
function setup() {
    createCanvas(600, 700, WEBGL);
    angleMode(DEGREES);
    noiseDetail(1);
}

function draw() {
    background(30);  
    translate(0, 0, -400);
    rotateX(90);
    rotateZ(frameCount / 4);
    rotateX(map(cos(frameCount/4), -1, 1, 30, -30));
    rotateY(map(sin(frameCount/4), -1, 1, -30, 30));
    noStroke();
    directionalLight([255], createVector(0, 0, -1));
    directionalLight([255], createVector(0, 0, -1));

    var w = 20;
    var start = frameCount / 100;
    var xoff = 0;
    for (var x = -width / 2; x <= width / 2; x += w) {
        yoff = 0;
        for (var y = -height / 2; y <= height / 2; y += w) {
            var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 100);
            
            var r = map(x, -width/2, width/2, 0, 255);
            var g = map(y, -height/2, height/2, 255, 0);
            var b = map(h, -100, 100, 0, 255);
            push();
            fill(r,g,b);
            translate(x, y, -h / 2);
            box(w, w, h);
            pop();

            yoff += 0.1;
        }
        xoff += 0.1;
    }
}