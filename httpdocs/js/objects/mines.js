var Mines = function(){
	this.callback = function(){};
}

Mines.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(0,0,0,'+((Math.random() * 0.5) + 0.5)+')';
}

/**
 *  Run this function when you want to update the map.
 */
Mines.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	this.draw();
	this.callback();
}

/**
 *  Draw a bunch of random mines.
 */
Mines.prototype.draw = function(){
	for(var i = 0; i < (Math.random() * 5); i++){
		// We are going to make some areas which varing dangers.
		canvas.ctx.fillStyle = this.getFillStyle();
		canvas.ctx.beginPath();
		canvas.ctx.arc(Math.random() * 650, Math.random() * 400, Math.random() * 30, 0, Math.PI*2, true); 
		canvas.ctx.closePath();
		canvas.ctx.fill();
	}
}

Mines.prototype.initialize = function(){
	minesMap.updateCanvas();
}

var minesMap = new Mines();