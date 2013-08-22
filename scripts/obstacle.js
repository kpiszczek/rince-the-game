rince.obstacle = (function(){
	function Obstacle(obstacleName, imgObstacle, w, h, x, y, hitAction){
		this.initialize(obstacleName, imgObstacle, w, h, x, y, hitAction);
	}
	Obstacle.prototype = new createjs.BitmapAnimation();
	
	Obstacle.prototype.bounds = 0;
	Obstacle.prototype.hit = 0;
	
	Obstacle.prototype.BitmapAnimation_initialize = Obstacle.prototype.initialize;
	
	var frameSize;
	var speed = rince.settings.speed;
	
	Obstacle.prototype.initialize = function (obstacleName, imgObstacle, w, h, x, y, hitAction) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgObstacle], //image to use
            frames: {width: w, height: h, regX: x, regY: y},
            animations: {
                left: {
                	frames: [0],
                	next: 'left'
                },
                right: {
                	frames: [1],
                	next: 'right'
                }
            }
        });

        this.hitAction = hitAction;
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        
        frameSize = this.spriteSheet.getFrame(0).rect.width;
        
        (Math.random() > 0.5) ? this.gotoAndPlay('left') : this.gotoAndPlay('right');
        
        this.name = obstacleName;
        
        // frame width / 2
        this.w2 = w/2;
        
        this.x = rince.settings.cols * rince.settings.cellSize + this.w2;
	}
	
	Obstacle.prototype.tick = function(){
		if (!rince.level.isStopped()){
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