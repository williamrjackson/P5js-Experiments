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
}