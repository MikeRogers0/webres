/* Load up the JS stuff. The new Date() * 1 stuff is just the break the cache */
head.js(
	'js/core/config.js?'+new Date() * 1, // The main variables we're going to use.
	'js/objects/convoy.js?'+new Date() * 1, // convoy - So we can have images of trucks and what not?
	'js/objects/terrain.js?'+new Date() * 1, // terrain object
	'js/objects/weather.js?'+new Date() * 1,  // weather object
	'js/objects/mines.js?'+new Date() * 1,  // mines object
	'js/objects/griddot.js?'+new Date() * 1, // gridDot object
	'js/objects/grid.js?'+new Date() * 1, // grid object
	'js/objects/bgmap.js?'+new Date() * 1, // The google map background
	'js/objects/dijkstras.js?'+new Date() * 1, // dijkstras object
	'js/core/runSimulation.js?'+new Date() * 1, // This runs the above objects
	function(){
		runSimulation();
	}
);