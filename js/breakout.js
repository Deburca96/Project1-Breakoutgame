
//setting up the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
// setting the paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// setting brick variables
var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//setting the startpoint
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballColour = "green";
var rightPressed = false;
var leftPressed = false;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x:0, y:0, status:1};
	}
}

var score = 0;
//adding lives
var lives = 3;

// adding sounds
var winningSound = new Audio('sounds/woohoo.wav');
var scoreSound = new Audio('sounds/success.wav');
var gameOverSound = new Audio('sounds/gameover.wav');
// function to draw the ball 
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColour;
	ctx.fill();
	ctx.closePath();
}
//function to draw the paddle 
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.closePath();
}
//function to draw the bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "pink";
				ctx.fill();
				ctx.closePath;
			}
		}
	}
}
// function to moove ball
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetect();
	drawBricks();
	x += dx;
	y += dy;
	// if statements to bounce ball 
	if(x + dx > canvas.width-ballRadius || x+dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		// game over alert
				else {
					lives--;
					if(!lives) {
					gameOverSound.play();
					alert("Game Over");
					document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2;
				}
			}
		}	
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 5;
		}
		else if(leftPressed && paddleX > 0) {
		paddleX -= 5;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
// moving the paddle 
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
// ball bouncing off the bricks
function collisionDetect() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score+=10;
					scoreSound.play();
					if(score == brickRowCount*brickColumnCount*10) {
						winningSound.play();
						alert("You Win! Congratulations!");
						document.location.reload();
					}
				}
			}
		}
	}
}
// fuction for the score
function drawScore() {
	ctx.font = "16px Ariel";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score: " + score;
}
// function for lives
function drawLives() {
	ctx.font = "16px Ariel";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	document.getElementById("gamelives").innerHTML = "Lives: "+lives;
}
// function to move paddle with mouse
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}
// recall every 10 ms
setInterval(draw,10);
