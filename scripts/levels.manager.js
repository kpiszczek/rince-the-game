rince.manager = (function(){
	var numOfLevels = 1;
    
	var Obstacle = function(name, image, w, h, x, y, hitRadius, prob){
		this.name = name;
		this.image = image;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.r = hitRadius;
		this.prob = prob;
	}
	
	var Level = function(name){
		this.name = name;
		this.delay = 500;
		this.obstacles = [];
		this.monsters = [];
		this.finalAction = null;
	}
	
    var levels = [];
    
    function init(){
    	var cellSize = rince.settings.cellSize;
    	
    	var img = rince.images["tree" + cellSize + ".png"]
    	var lev = Level("Sto lat");
    	lev.obstacles.push(Obstacle("tree", img, img.width, img.height, Math.floor(img.width/2), 195, 30, 0.2));
    	levels.push(lev);
    		
    }
    
    function getLevelData(index){
    	if (index < numOfLevels){
    		return levels[index];
    	} else {
    		return levels[levels.length - 1];
    	}
    }
    
    return {
    	init: init,
    	getLevelData: getLevelData
    }
})();