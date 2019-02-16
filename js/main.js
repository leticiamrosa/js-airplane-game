var canvas, ctx, width, height, frames, currentState = 0;

var maxJumps = 5;
var setSpeed = 6;
var difficult = 80;

// states 
var state = {
    play: 0,
    playing: 1,
    loss: 2,
}

// create a obj for floor
var floor = {
    y: 550,
    height: 50,
    cor: "#ffdf70",
    draw: function() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(0, this.y, width, this.height);
    }
}

// create a obj for square (element)
var square = {
    x: 50,
    y: 0,
    height: 50,
    width: 50,
    cor: "#ff4e4e",
    speed: 0,
    gravity: 1.5,
    powerJump: 15,
    jumps: 0,
    score: 0,

    // refresh event
    refresh: function() {
        this.speed += this.gravity;
        this.y += this.speed;

        if(this.y > floor.y - this.height && currentState != state.loss) {
            this.y = floor.y - this.height;
            this.jumps = 0;
            this.speed = 0;
        }
    },

    // jump event
    jump: function() {
        if(this.jumps < maxJumps) {
            this.speed = -this.powerJump;
            this.jumps++;
        }
    },

    reset() {
        square.speed = 0;
        square.y = 0;
        this.score = 0;
    },

    // draw at canvas event
    draw: function() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.height, this.width);
    }
}

var barrier = {
    _obs: [],
    colors: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
    time: 0,

    setElement: function() {
        this._obs.push({
            x: width,
            // define random square barrier
            // width: 30 + Math.floor(20 * Math.random()),
            width: 40,
            height: 30 + Math.floor(100 * Math.random()),
            cor: this.colors[Math.floor(5 * Math.random())]
        });

        this.time = 30 + Math.floor(difficult * Math.random());
        // console.log(this.time);
    },

    refresh: function() {
        if (this.time == 0) {
            this.setElement();
        } else {
            this.time--;
        }

        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];

            obs.x -= setSpeed;

            console.log(currentState)
            // console.log(obs.x)
            var cond1 = square.x < obs.x + obs.width;
            var cond2 = square.x + square.width >= obs.x;
            var cond3 = square.y + square.height >= floor.y - obs.height;
            
            if (cond1 && cond2 && cond3) {
                console.log(' oi')
                currentState = state.loss;
            }

            else if (obs.x == 0) {
                square.score++;
            }

            else if(obs.x <= -obs.width) {
                this._obs.splice(i, 1);
                tam--;
                i--;
            }
        }
    },

    clear: function() {
        this._obs = [];
    },

    draw: function() {
        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, floor.y - obs.height, obs.width, obs.height);
        }
    }
}

// Event for one click at canvas
function click(event) {

    if(currentState == state.playing) {
        square.jump();
    } else if(currentState == state.play) {
        currentState = state.playing;
    } else if(currentState == state.loss && square.x <= (2 * square.height)) {
        currentState = state.play;
        square.y = 0;
        square.speed = 0;
    }
}

// get the dimensons of the canvas size
function main() {
// get dimensons
height = window.innerHeight;
width = window.innerWidth;

// console.log(width)
if(width >= 500) {
    width = 600;
    height = 600;
}

// create canvas
canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
canvas.style.border = '1px solid #000';

ctx = canvas.getContext('2d');
// console.log(canvas);

document.body.appendChild(canvas)
document.addEventListener("mousedown", click);
document.addEventListener("keypress", click);

 currentState = state.play;
roll();
}

// request the main functions
function roll() {
    refresh();
    draw();
    window.requestAnimationFrame(roll);
}

// Refresh all the game
function refresh() {
    frames++;
    square.refresh();

    if(currentState == state.playing) {
        barrier.refresh();
    } else if(currentState == state.loss) {
        barrier.clear();
    }
}

// create the element at canvas
function draw() {

    // create a background
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(square.score, 30, 68);

    // set state of game
    if(currentState == state.play) {
        ctx.fillStyle = "green";
        ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
    } else if(currentState == state.loss) {
        ctx.fillStyle = "red";
        ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.fillStyle = "#fff";

        
        if(square.score < 10 ) {
            ctx.fillText(square.score, -13, 19);
            console.log('Score >0')
        } else if(square.score >= 10 || square.score < 100) {
            ctx.fillText(square.score, -26, 19);
            console.log('score <10')
        } else if (square.score >= 100) {
            ctx.fillText(square.score, -39, 19);
            console.log('score >100')
        }
        ctx.restore();

    } else if(currentState == state.playing) {
        barrier.draw();
    }

    // call floor and square
    floor.draw();
    square.draw();
}

main();

