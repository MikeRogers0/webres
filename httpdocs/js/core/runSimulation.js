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
		object: WeatherMap
	},
	//mines: {
	//	elm: document.querySelector('#minesCBX'),
	//	object: new Mines()
	//},
	grid: {
		elm: document.querySelector('#gridCBX'),
		object: GridMap
	},
	gridDot: {
		elm: document.querySelector('#gridDotCBX'),
		object: GridDotMap
	}
};

/**
 * Draws all the canvaes ticked & finds the best route.
 */
var runSimulation = function(){
	// Turn on the loading gif
	//document.querySelector('.canvas-maps').className = "canvas-maps loading";

	// Clear the combined maps
	background.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	canvas.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	flare.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	
	
	// Itterate through each canvas updating their maps via the callback.
	var lastSemanticObject = null;
	var firstSemanticObject = null;
	
	// Loop through the objects, listing all the enabled ones & logging the first & last objects.
	for(i in semanticData){
		if(semanticData[i].elm.checked){
			if(lastSemanticObject == null){
				firstSemanticObject = i;
			} else {
				semanticData[lastSemanticObject].object.callback = semanticData[i].object.initialize;
			}
			
			lastSemanticObject = i;
		}
	}
	
	// Make the last object enable show the map.
	semanticData[lastSemanticObject].object.callback = function(){
	
		StartEndMap.setPoints(function(){
			// Do the dijkstras stuff here.
			
			//debugger;
			findRoute(dijkstras.start.x, dijkstras.start.y, dijkstras.end.x, dijkstras.end.y);
			
			
			// Now remove the loading gif.
			document.querySelector('.canvas-maps').className = "canvas-maps";	
		});
		
	};
	
	// Run the first object.
	semanticData[firstSemanticObject].object.initialize();
}

// Add the listners
document.querySelector('#updateMap').addEventListener('click', runSimulation, false);
for(i in semanticData){
	semanticData[i].elm.addEventListener('click', runSimulation, false);
}