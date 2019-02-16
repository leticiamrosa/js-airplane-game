function Sprite(x,y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.width, this.height, xCanvas, yCanvas, this.width, this.height);
    }

    // this.draw = function(xCanvas, yCanvas) {
    //     ctx.drawImage(img, xCanvas, yCanvas);
    // }
}

function drawFloor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(xCanvas, yCanvas) {
        ctx.drawImage(imgFloor, this.x, this.y, this.width, this.height, xCanvas, yCanvas, this.width, this.height);
    }

}

function drawChar(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(xCanvas, yCanvas) {
        ctx.drawImage(imgChar, this.x, this.y, this.width, this.height, xCanvas, yCanvas, this.width, this.height);
    }

}

var background = new Sprite(0,0,600,600);
var floorBg = new drawFloor(0,0,600,600);
var char = new drawChar(0,0,100,100);