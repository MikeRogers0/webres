var bgMap = function(){
	this.image = null;
	//this.image.crossOrigin = '';
	
	// When this object is done, run the next object via cal
	this.callback = function(){};
}

/**
 *  Run this function when you want to update the map.
 */
bgMap.prototype.updateCanvas = function(){
	// Set the google maps URL up.
	var gStaticMapURL = 'gmap.php?url='+encodeURIComponent('size=640x400&maptype=terrain&style=feature:all&sensor=false&markers='
	+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+encodeURIComponent(latLngs.start.value)
	+'&markers='
	+'color:blue%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+encodeURIComponent(latLngs.end.value));
	
	this.image = new Image();
	// Now load that image into the DOM
    this.image.onload = function(){backgroundMap.draw();}; // This will fire when the above is ready
    this.image.src = gStaticMapURL;
}

bgMap.prototype.draw = function(){
	background.ctx.drawImage(this.image, 0, 0);
	
	this.cleanUp();
	
	this.callback();
}

bgMap.prototype.cleanUp = function(){
	this.image = null;
}

bgMap.prototype.initialize = function(){
	backgroundMap.updateCanvas();
}

var backgroundMap = new bgMap();