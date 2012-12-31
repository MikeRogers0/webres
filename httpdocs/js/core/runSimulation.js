// Set up the semantic objects.
var semanticData = {
	bgMap: {
		elm: document.querySelector('#bgMapCBX'),
		object: backgroundMap
	},
	climb: {
		elm: document.querySelector('#climbCBX'),
		object: climbMap
	},
	buildings: {
		elm: document.querySelector('#buildingsCBX'),
		object: buildingsMap
	},
	water: {
		elm: document.querySelector('#waterCBX'),
		object: waterMap
	},
	weather: {
		elm: document.querySelector('#weatherCBX'),
		object: new Weather()
	},
	mines: {
		elm: document.querySelector('#minesCBX'),
		object: new Mines()
	},
	startend: {
		elm: document.querySelector('#minesCBX'),
		object: StartEndMap
	},
	grid: {
		elm: document.querySelector('#gridCBX'),
		object: new Grid()
	},
	gridDot: {
		elm: document.querySelector('#gridDotCBX'),
		object: new GridDot()
	}
};

/**
 * Draws all the canvaes ticked & finds the best route.
 */
var runSimulation = function(){
	// Turn on the loading gif
	document.querySelector('.canvas-maps').className = "canvas-maps loading";

	// Clear the combined map
	canvas.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	// Reset the plotting points
	semanticData.startend.object.reset();
	
	//canvas.ctx.save();
	// Itterate through each canvas updating their maps via the callback.
	for(i in semanticData){
		if(semanticData[i].elm.checked){
			semanticData[i].object.updateCanvas();
		}
	}
	//canvas.ctx.restore();
	
	// Set the start / end points.
	semanticData.startend.object.setPoints(function(){
		// Do the dijkstras stuff here.
	
		// Now remove the loading gif.
		document.querySelector('.canvas-maps').className = "canvas-maps";
	});
}

// Add the listners
document.querySelector('#updateMap').addEventListener('click', runSimulation, false);
for(i in semanticData){
	semanticData[i].elm.addEventListener('click', runSimulation, false);
}