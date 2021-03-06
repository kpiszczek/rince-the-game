rince.boss = (function(){

	function Boss(bossName, img, w, h, x, y, animName, bossAnimations, hitAction, tickAction, hitArea){
		this.initialize(bossName, img, w, h, x, y, animName, bossAnimations, hitAction, tickAction, hitArea);
	}
	
	Boss.prototype = new createjs.BitmapAnimation();
	
	Boss.prototype.bounds = 0;
	Boss.prototype.hit = 0;
	
	Boss.prototype.BitmapAnimation_initialize = Boss.prototype.initialize;

	var cols = rince.settings.cols;
	var cellSize = rince.settings.cellSize;
	
	var frameSize;
	var speed = rince.settings.speed;
	
	Boss.prototype.initialize = function (bossName, img, w, h, x, y, animName, bossAnimations, hitAction, tickAction, hitArea) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [img], //image to use
            frames: {width: w, height: h, regX: x, regY: y},
            animations: bossAnimations
        });

        this.hitAction = hitAction;
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        
        frameSize = this.spriteSheet.getFrame(0).rect.width;
        
        this.gotoAndPlay(animName);
        
        this.name = bossName;
        
        // frame width / 2
        this.w2 = w/2;
        
        this.x = cols * cellSize + this.w2;

        this.tick = tickAction;

        this.hitArea = hitArea;
	};
	
	Boss.prototype.hitPoint = function(tX, tY){
		return this.hitRadius(tX, tY, 0);
	};
	
	Boss.prototype.hitRadius = function(tX, tY, tHit){
		return this.hitArea(tX, tY, tHit);
	};
	
	return {
		Boss: Boss
   };
})();