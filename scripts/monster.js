rince.monster = (function(){
	function Monster(monsterName, monsterSpriteSheet, w, h, x, y, animName, monsterAnimations, hitAction, tickAction, hitArea){
		this.initailize(monsterName, monsterSpriteSheet, w, h, x, y, animName, monsterAnimations, hitAction, tickAction, hitArea);
	}
	
	Monster.prototype = new createjs.BitmapAnimation();
	Monster.prototype.bounds = 0;
	Monster.prototype.hit = 0;
	Monster.prototype.BitmapAnimation_initialize = Monster.prototype.initialize;

	var cols = rince.settings.cols;
	var cellSize = rince.settings.cellSize;

	var frameSize;

	Monster.prototype.initailize = function (monsterName, monsterSpriteSheet, w, h, x, y, animName, monsterAnimations, hitAction, tickAction, hitArea){
		var localSpriteSheet = new createjs.SpriteSheet({
			images: [monsterSpriteSheet],
			frames: {width: w, height: h, regX: x, regY: y},
			animations: monsterAnimations
		});

		this.speed = [-1, 0];

        this.hitAction = hitAction;
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        
        frameSize = this.spriteSheet.getFrame(0).rect.width;
        
        this.gotoAndPlay(animName);
        
        this.name = monsterName;
        
        // frame width / 2
        this.w2 = w/2;
        
        this.x = cols * cellSize + this.w2;

        this.tick = tickAction;

        this.hitArea = hitArea;
	};

	Monster.prototype.hitPoint = function(tX, tY){
		return this.hitRadius(tX, tY, 0);
	};
	
	Monster.prototype.hitRadius = function(tX, tY, tHit){
		return this.hitArea(tX, tY, tHit);
	};

	return {
		Monster: Monster
	};
})();