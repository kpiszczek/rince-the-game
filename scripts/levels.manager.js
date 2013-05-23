rince.manager = (function(){
	var numOfLevels = 1;
	
	var statusCanvas = null;
    var statusCanvasCtx = null;
    var overlayEnabled = true;
    var scoreText = null;
    
    var levels = [];
    
    
    
    function init(){
    	
    }
    
    function getLevelData(index){
    	return levels[index];
    }
    
    return {
    	init: init,
    	getLevelData: getLevelData
    }
})();