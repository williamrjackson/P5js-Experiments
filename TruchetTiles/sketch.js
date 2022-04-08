var cellSize = 40;
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background(30);  
    stroke(150)
    strokeWeight(3)
    noFill();
    
    for (var x = 0; x < width; x+=cellSize){
        for (var y = 0; y < height; y+=cellSize){
            drawCell(x,y, random() < 0.5)
        }
    }
    drawCell(40, 40, true);
}

function draw() {
}

function drawCell(x, y, flip)
{
    push();
    translate(x, y);
    if (flip)
    {
        arc(0, 0, cellSize, cellSize, 0, 90);
        arc(cellSize, cellSize, cellSize, cellSize, 180, 270);
    }
    else
    {
        arc(cellSize, 0, cellSize, cellSize, 90, 180);
        arc(0, cellSize, cellSize, cellSize, 270, 360);
    }
    pop();
}