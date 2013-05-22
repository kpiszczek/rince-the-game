rince.obstacle = (function(){
	function Obstacle(obstacleName, imgObstacle){
		this.initialize(obstacleName, imgObstacle);
	}
	Obstacle.prototype = new createjs.BitmapAnimation();
	
	Obstacle.prototype.bounds = 0;
	Obstacle.prototype.hit = 0;
	
	Obstacle.prototype.BitmapAnimation_initialize = Obstacle.prototype.initialize;
	
	var frameSize;
	
	Obstacle.prototype.initialize = function (obstacleName, imgObstacle) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgObstacle], //image to use
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                idle: {
                	frames: [0],
                	next: "idle"
                }
            }
        });
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        
        frameSize = this.spriteSheet.getFrame(0).rect.width;
        
        this.gotoAndPlay("idle");
        
        this.name = obstacleName;
	}
	
	return {
		Obstacle: Obstacle
   }
})();