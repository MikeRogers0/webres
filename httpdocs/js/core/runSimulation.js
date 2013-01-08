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
	startend: {
		elm: document.querySelector('#minesCBX'),
		object: StartEndMap
	},
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
	document.querySelector('.canvas-maps').className = "canvas-maps loading";

	// Clear the combined map
	canvas.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	
	// Reset the plotting points
	semanticData.startend.object.reset();
	
	
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
	
		// Do the dijkstras stuff here.
			// Run the first object.
	semanticData[firstSemanticObject].object.initialize();

	// set dimensions
	var map = $('#canvasMap');
	var width = map.width()/10
	var height = map.height()/10;
	var posX = 5;
	var posY = 5;
	var count = 0;
	var _id = 1;
	
	//populate graph
	var graph = new Array(height);
	
	// Rebuild graph as 2 dimensional array of objects
	for(i=0;i<width;i++){
		graph[i] = new Array(height);
		posX = 5;
		for(j=0;j<height;j++){
			graph[i][j] = {};
			graph[i][j].danger = dijkstras.getDangerLevel(posX, posY);
			graph[i][j]._id = _id;
			graph[i][j].x = i;
			graph[i][j].xPix = i*10+5;
			graph[i][j].y = j;
			graph[i][j].yPix = j*10+5;
			graph[i][j].val = Infinity;
			_id += 1;
			posX += 10;
		}
		posY += 10;
	}
	return graph;


function moveCost(p){
	if(p%2 == 0){
		return 0.10;
	}else{
		return 0.14142;
	}
}

function findIndex(x, y){
	for(var i=0; i<adj.length; i++){
		if(adj[i].x == x && adj[i].y == y){
			return i;
		}
	}
}

function findRoute(sx, sy, fx, fy){
	
	//get graph data
	var graph = runSimulation();
	
	var currentSquare;
	var startX = sx; //between 0 - 76
	var startY = sy; //between 0 - 34
	var endX = fx; //between 0 - 76
	var endY = fy; //between 0 - 34
	var map = $('#canvasMap');
	var xLimit = map.width()/10-1;
	var yLimit = map.height()/10-1;
	
	var openlist = new Array();
	var closedlist = new Array();
	var arrayPos; //current square array position
	
	
	
	//set start square to current square, reset value to 0
	currentSquare = graph[startX][startY];
	currentSquare.val = 0;
	currentSquare.perm = true;
	
	
	function addAdj(x, y, p){
		//check if within boundaries of map
		if(x <= xLimit && x >= 0 && y >= 0 && y <= yLimit){
			if(graph[x][y].perm != true){
				
				//work out movement cost
				var mc = moveCost(p);
				
				if(currentSquare.val + graph[x][y].danger + mc < graph[x][y].val){
					if(graph[x][y].val == Infinity){ //not yet been visited, set value and add to adj array
						//alert('not on list');
						graph[x][y].val = currentSquare.val + graph[x][y].danger + mc;
						graph[x][y].parent = p;
						adj.push(graph[x][y]);
						//console.log(adj[adj.length-1].val + ', ' + adj[adj.length-1].x + ', ' + adj[adj.length-1].y);
					}else{ // already has a value set and must update obj in adj array
						//alert('graph' + x + ',' + y +' has a new lower value');
						var newValue = currentSquare.val + graph[x][y].danger + mc;
						//alert('graph' + x + ',' + y +' old val = ' + graph[x][y].val + ' New val = ' + newValue);
						//alert('old parent = ' + graph[x][y].parent + '. New parent = ' + p);
						updateSquare(x, y, newValue, p);
					}
				}
			}
		}
	}
	
	function updateSquare(x, y, v, p){
		var index = findIndex(x, y);
		adj[index].parent = p;
		adj[index].val = v;
		graph[x][y].parent;
		graph[x][y].val = v;
	}

	
	
	
	/****************
	*
	* START LOOP HERE
	*
	****************/
	
	while(currentSquare.x !== endX || currentSquare.y !== endY){
		//canvas.ctx.fillRect(currentSquare.xPix, currentSquare.yPix,1,1);
		
		//find adjacent node with smallest val
		for(sq=0; sq < 8; sq++){
			var newX;
			var newY;
			var parent;
			switch(sq){
				case 0: //above
					newX = currentSquare.x;
					newY = currentSquare.y-1;
					parent = 4;
					addAdj(newX, newY, parent);
					break;
				case 1: //above-right
					newX = currentSquare.x+1;
					newY = currentSquare.y-1;
					parent = 5;
					addAdj(newX, newY, parent);
					break;
				case 2: //right
					newX = currentSquare.x+1;
					newY = currentSquare.y;
					parent = 6;
					addAdj(newX, newY, parent);
					break;
				case 3: //bottom-right
					newX = currentSquare.x+1;
					newY = currentSquare.y+1;
					parent = 7;
					addAdj(newX, newY, parent);
					break;
				case 4: //bottom
					newX = currentSquare.x;
					newY = currentSquare.y+1;
					parent = 0;
					addAdj(newX, newY, parent);
					break;
				case 5: //bottom-left
					newX = currentSquare.x-1;
					newY = currentSquare.y+1;
					parent = 1;
					addAdj(newX, newY, parent);
					break;
				case 6: //left
					newX = currentSquare.x-1;
					newY = currentSquare.y;
					parent = 2;
					addAdj(newX, newY, parent);
					break;
				case 7: //top-left
					newX = currentSquare.x-1;
					newY = currentSquare.y-1;
					parent = 3;
					addAdj(newX, newY, parent);
					break;
				default:
					break;	
				
			}
		}
		adj.sort(function(a,b){
			return a.val - b.val;
		});
		
		adj[0].perm = true;

		
		currentSquare = adj[0];
		adj.splice(0,1);


	} //END LOOP


	function getParentCoords(x, y, p){
		switch(p){
			case 0:
				x = x;
				y = y-1;
				break;
			case 1:
				x = x+1
				y = y-1;
				break;
			case 2: 
				x = x+1;
				y = y;
				break;
			case 3:
				x = x+1;
				y = y+1;
				break;
			case 4: 
				x = x;
				y = y+1;
				break;
			case 5: 
				x = x-1;
				y = y+1;
				break;
			case 6: 
				x = x-1;
				y = y;
				break;
			case 7: 
				x = x-1;
				y = y-1;
				break;
		}
		
		return [x,y];
	}



var path = currentSquare;
	var counter = 0;
	while(path.x !== startX || path.y !== startY){ //path.x != startX && path.y != startY
		
		//find pathX parent
		pathParent = getParentCoords(path.x, path.y, path.p);
		//alert('Path = ' + path.x*10+5 + ',' + path.y*10+5);
		//alert('Parent = ' + pathParent[0] + ',' + pathParent[1]);
		
		//draw path to parent
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(path.x*10+5, path.y*10+5);
		canvas.ctx.lineTo(pathParent[0]*10+5, pathParent[1]*10+5);
		canvas.ctx.stroke();
		
		
		path.x = pathParent[0];
		path.y = pathParent[1];
		path.p = graph[path.x][path.y].parent;
		

		
		
		
		
		//make parent pathX
		//counter++;
		//return;
	
	
	
			// Now remove the loading gif.
			document.querySelector('.canvas-maps').className = "canvas-maps";	
		});
		
	}
	

}

// Add the listners
document.querySelector('#updateMap').addEventListener('click', runSimulation, false);
for(i in semanticData){
	semanticData[i].elm.addEventListener('click', runSimulation, false);
}