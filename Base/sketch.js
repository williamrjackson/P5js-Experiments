
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(30);  
    angleMode(DEGREES);
}

function draw() {
    fill(0, 0, 139)
    var squareSize = 100;
    rect(width / 2 - squareSize / 2, 
        height / 2 - squareSize / 2, 
        squareSize);
}