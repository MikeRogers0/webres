var bgMap = function(){
	this.image = new Image();
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
	//+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.start.lat.value+','+latLngs.start.lng.value
	+'&markers='
	//+'color:blue%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.end.lat.value+','+latLngs.end.lng.value);
	
	// Now load that image into the DOM
    this.image.onload = function(){backgroundMap.draw();}; // This will fire when the above is ready
    this.image.src = gStaticMapURL;
}

bgMap.prototype.draw = function(){
	background.ctx.drawImage(this.image, 0, 0);
	
	this.callback();
}

bgMap.prototype.initialize = function(){
	backgroundMap.updateCanvas();
}

var backgroundMap = new bgMap();