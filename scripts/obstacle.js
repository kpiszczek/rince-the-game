rince.obstacle = (function(){
	function Obstacle(obstacleName, imgObstacle){
		this.initialize(obstacleName, imgObstacle);
	}
	Obstacle.prototype = new createjs.BitmapAnimation();
	
	Obstacle.prototype.bounds = 0;
	Obstacle.prototype.hit = 0;
	
	Obstacle.prototype.BitmapAnimation_initialize = Obstacle.prototype.initialize;
	
	var frameSize;
	var speed = rince.settings.speed;
	
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
	
	Obstacle.prototype.tick = function(){
		if (!landscape.isStopped()){
			this.x -= speed;
		}
	}
	
	Obstacle.prototype.hitPoint = function(tX, tY){
		return this.hitRadius(tX, tY, 0)
	}
	
	Obstacle.prototype.hitRadius = function(tX, tY, tHit){
		if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }
        
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}	
	
	return {
		Obstacle: Obstacle
   }
})();