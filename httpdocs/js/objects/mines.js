var Mines = function(){
	this.callback = function(){};
}

Mines.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(0,0,0,0.8)';
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
 *  
 */
Mines.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	canvas.ctx.fillStyle = this.getFillStyle(0.5);
	canvas.ctx.beginPath();
	canvas.ctx.arc(175, 75, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(75, 175, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.3);
	canvas.ctx.beginPath();
	canvas.ctx.arc(375, 175, 10, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
}

Mines.prototype.initialize = function(){
	minesMap.updateCanvas();
}

var minesMap = new Mines();