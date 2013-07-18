monster = (function(){
	function Monster(monsterName, monsterSpriteSheet, w, h, x, y, hitAction){
		this.initailize(monsterName, monsterSpriteSheet, w, h, x, y, hitAction);
	}
	
	Monster.prototype = new createjs.BitmapAnimation();
	Monster.prototype.bounds = 0;
	Monster.prototype.hit = 0;
	Monster.prototype.BitmapAnimation_initialize = Monster.prototype.initialize;

	var frameSize;
	var speed = [0,0];

	Monster.prototype.initailize = function (monsterName, monsterSpriteSheet, w, h, x, y, hitAction){
		var localSpriteSheet = new createjs.SpriteSheet({
			images: [monsterSpriteSheet],
			frames: {width: w, height: h, regX: x, regY: y},
			animations: {
				idle: {
					frames: [0],
					next: 'idle',
				}
			}
		})
	}
})();