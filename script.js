var canvas, ctx;
var fps = 60;
window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    for(i = 0; i < numberOfBalls; i++){
        balls.push(new Ball());
    }
    interval();
    loop();
};

var width = 1360;
var height = 768;

var balls = [];
var numberOfBalls = 40;
var speed = 5;
var minSize = 10;
var maxSize = 80;
var randSpeed = true;
var randColor = false;
function Ball(){
    this.color = this.randomColor();
    this.size = 50;
    this.x = Math.floor((Math.random() * (width - this.size)) + this.size);
    this.y = Math.floor((Math.random() * (height - this.size)) + this.size);
    this.randX = 0;
    this.randY = 0;
    this.randomSpeed();
    this.radius = Math.floor((Math.random() * 2));
    this.textX = false;
    this.textY = false;
}

Ball.prototype.update = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    
    this.x += this.randX;
    this.y += this.randY;
    this.size += this.radius;
    
    if(this.x >= width - this.size){
        this.x = width - this.size;
        this.randX = -this.randX
        this.testX = true;
    }else if(this.x <= this.size){
        this.x = this.size;
        this.randX = -this.randX;
        this.testX = false;
    }
    
    if(this.y >= height - this.size){
        this.y = height - this.size;
        this.randY = -this.randY;
        this.testY = true;
    }else if(this.y <= this.size){
        this.y = this.size;
        this.randY = -this.randY;
        this.testY = false;
    }
    
    this.updateSize();
};

Ball.prototype.updateSize = function() {
    if(this.size >= maxSize){
        this.radius = -this.radius;
    }else if(this.size <= minSize){
        this.radius = -this.radius;
    }
};

function interval(){
    setTimeout(function(){
        for(i = 0; i < numberOfBalls; i++){
            if(randSpeed){
                balls[i].randomSpeed();
            }
            if(randColor){
                balls[i].randomColor();
            }
        }
        interval();
    }, 1000);
};

Ball.prototype.randomSpeed = function(){
    this.randX = Math.floor((Math.random() * speed) + 1);
    this.randY = Math.floor((Math.random() * speed) + 1);
    if(this.testX) this.randX = -this.randX;
    if(this.testY) this.randY = -this.randY;
};

Ball.prototype.randomColor = function(){
    var r = Math.floor((Math.random() * 255) + 1);
    var g = Math.floor((Math.random() * 255) + 1);
    var b = Math.floor((Math.random() * 255) + 1);
    return this.color = "rgb(" + r +"," + g + "," + b + ")";
};

function clearCanvas(){
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function loop(){
    setTimeout(function(){
        clearCanvas();
        
        for(i = 0; i < numberOfBalls; i++){
            balls[i].update();
        }
        
        loop();
    }, 1000/fps);
}
