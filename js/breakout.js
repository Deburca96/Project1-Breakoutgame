var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;


function drawBall() {
	ctx.beginPath();
	ctx.arc(x,y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	
}


function drawBall() {
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0,0,480,320);
	drawBall();
	x += dx;
	y += dy;
	
	//making change colour
	if(y + dy >= 320 || y+dy <= 0) {
		dy = -dy;
		ctx.fillStyle ="pink";
		ctx.fill();
	}
	
	if(x + dx == 470 || x+dx <= ballRadius) {
		dx = -dx;
		ctx.fillStyle = "pink";
		ctx.fill();
	}
}

setInterval(draw,50);
