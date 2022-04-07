var squareSize = 400;
var gradient;
let theta = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);  
    rectMode(CENTER);
    squareSize = min(windowWidth, windowHeight) * .5;
    noStroke();
    
    // Create gradient
    gradient = new LinearGradient();
    gradient.addStop(0, color("magenta"));
    gradient.addStop(.25, color("white"));
    gradient.addStop(.5, color("green"));
    gradient.addStop(.75, color("black"));
    gradient.addStop(1, color("blue"));

    // Draw a gradient bar at the bottom of the window
    var barHeight = windowHeight * .3;
    for (let i = 0; i < windowWidth; i++) {
        fill(gradient.sample(map(i, 0, windowWidth, 0, 1)))
        rect(i, windowHeight, barHeight);
    }
}

function draw() {

    // Pingpong across all values
    // coloring the rect.
    theta += .01;
    var val = map(sin(theta), -1, 1, 0, 1);
    fill(gradient.sample(val));
    rect(width * .5, 
        height * .5, 
        squareSize, squareSize, 
        squareSize / 8);
}

// clamp a value to within 0 and 1
const clamp01 = (num) => Math.min(Math.max(num, 0), 1);

class LinearGradient
{
    constructor() {  
        // initialize with extremes established, but default white
        this.map = new Map([[0, color("white")], [1, color("white")]]);
    }

    // Add a color stop to gradient
    addStop(pos, color)
    {
        pos = clamp01(pos);
        this.map.set(pos, color);
    }
    sample(pos)
    {
        pos = clamp01(pos);
        if (this.map.has(pos))
        {
            return this.map.get(pos);
        }

        var closestBelow = 0;
        var closestAbove = 1;
        this.map.forEach((value, key) => 
        {
            if (key < pos && key > closestBelow)
            {
                closestBelow = key;
            }
            if (key > pos && key < closestAbove)
            {
                closestAbove = key;
            }
        });
        var normalizedPos = map(pos, closestBelow, closestAbove, 0, 1);
        var result = lerpColor(this.map.get(closestBelow), this.map.get(closestAbove), normalizedPos);
        return result;
    }
    getCanvasGradient(x0, y0, x1, y1)
    {
        let canvasGradient = drawingContext.createLinearGradient(x0, y0, x1, y1);
        this.map.forEach((value, key) => 
        {
            canvasGradient.addColorStop(key, value);
        });
        return canvasGradient;
    }
    getCanvasRadialGradient(x0, y0, r0, x1, y1, r1)
    {
        let canvasRadGradient = drawingContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
        this.map.forEach((value, key) => 
        {
            canvasRadGradient.addColorStop(key, value);
        });
        return canvasRadGradient;
    }
}