var bgMap = function(){
	this.bgImage = new Image();
}

/**
 *  Run this function when you want to update the map.
 */
bgMap.prototype.updateCanvas = function(){
	// Set the google maps URL up.
	var gStaticMapURL = 'http://maps.googleapis.com/maps/api/staticmap?size=770x350&maptype=terrain&style=feature:road&sensor=false&markers='
	+latLngs.start.lat.value+','+latLngs.start.lng.value+'&markers='+latLngs.end.lat.value+','+latLngs.end.lng.value;
	
	// Now load that image into the DOM
    this.bgImage.onload = function(){backgroundMap.draw();}; // This will fire when the above is ready
    this.bgImage.src = gStaticMapURL;
}

bgMap.prototype.draw = function(){
	background.ctx.drawImage(this.bgImage, 0, 0);
}

var backgroundMap = new bgMap();