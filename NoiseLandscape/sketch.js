var gradient;

function setup() {
    createCanvas(600, 700, WEBGL);
    angleMode(DEGREES);
    noiseDetail(.5);

    // Create gradient
    gradient = new LinearGradient();
    gradient.addStop(0, color(20, 180, 255));
    gradient.addStop(.2, color(255, 210, 20));
    gradient.addStop(.25, color(110, 255, 20));
    gradient.addStop(.5, color(110, 255, 20));
    gradient.addStop(.7, color(150, 150, 150));
    gradient.addStop(.8, color(150, 150, 150));
    gradient.addStop(1, color(255, 255, 255));

    background(30);  
    translate(0, 0, -400);
    rotateX(60);
    rotateZ(45);
    noStroke();
    directionalLight([255], createVector(0, 0, -1));
    directionalLight([255], createVector(0, 0, -1));

    var w = 8;
    var start = frameCount / 100;
    var xoff = 0;
    for (var x = -width / 2; x <= width / 2; x += w) {
        yoff = 0;
        for (var y = -height / 2; y <= height / 2; y += w) {
            var h = map(noise(xoff + start, yoff + start), 0, 1, 0, 200);
            var terrainColor = gradient.sample(map(h, 0, 200 * .5, 0, 1));
            push();
            fill(terrainColor);
            h2 = h * 1.5;
            translate(x, y, h2 * .5);
            box(w, w, h2);
            pop();

            yoff += 0.1;
        }
        xoff += 0.1;
    }
}


