var gradient;

function setup() {
    // Create gradient
    gradient = new LinearGradient();
    gradient.addStop(0, color("magenta"));
    gradient.addStop(.25, color("white"));
    gradient.addStop(.5, color("green"));
    gradient.addStop(.75, color("black"));
    gradient.addStop(1, color("blue"));
}

function draw() {
    createCanvas(windowWidth, windowHeight);
    squareSize = min(windowWidth, windowHeight) * .5;
    background(30);  
    
    noStroke();
    // Pingpong across all values
    // coloring the rect.
    var triwaveSpeed = .005;
    var triwaveMax = 1;
    var triwave = abs((frameCount * triwaveSpeed % (triwaveMax * 2)) - triwaveMax);

    fill(gradient.sample(triwave));
    rect(width * .5 - squareSize * .5, 
        height * .4 - squareSize * .5, 
        squareSize, squareSize, 
        squareSize / 8);

    // Draw a gradient bar at the bottom of the window
    var barHeight = windowHeight * .2;
    for (let i = 0; i < windowWidth; i++) {
        fill(gradient.sample(map(i, 0, windowWidth, 0, 1)))
        rect(i, windowHeight - barHeight, barHeight);
    }

    // Draw marker at sample point on gradient
    stroke(color("white"));
    noFill();
    rect(map(triwave, 0, 1, 0, windowWidth), windowHeight - barHeight - 3, 3, barHeight + 2);
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