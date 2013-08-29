rince.item = (function(){
	function Item(itemName, imgItem, w, h, x, y, hitAction){
		this.initialize(itemName, imgItem, w, h, x, y, hitAction);
	}
	Item.prototype = new createjs.BitmapAnimation();
	
	Item.prototype.bounds = 0;
	Item.prototype.hit = 0;
	
	Item.prototype.BitmapAnimation_initialize = Item.prototype.initialize;

	var cols = rince.settings.cols;
	var cellSize = rince.settings.cellSize;
	
	var frameSize;
	var speed = rince.settings.speed;

	var level;

	Item.prototype.initialize = function (itemName, imgItem, w, h, x, y, hitAction) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgItem], //image to use
            frames: {width: w, height: h, regX: x, regY: y},
            animations: {
                init: {
                	frames: [0],
                	next: 'init'
                }
            }
        });

        this.taken = false;

        this.hitAction = hitAction;
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        
        frameSize = this.spriteSheet.getFrame(0).rect.width;
        level = rince.level;
        
        this.gotoAndPlay('init');
        
        this.name = itemName;
        
        // frame width / 2
        this.w2 = w/2;
        
        this.x = cols * cellSize + this.w2;
	}
	
	Item.prototype.tick = function(){
		if (!level.isStopped()){
			this.x -= speed;
		}
	}
	
	Item.prototype.hitPoint = function(tX, tY){
		return this.hitRadius(tX, tY, 0)
	}
	
	Item.prototype.hitRadius = function(tX, tY, tHit){
		if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }
        
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}
	
	return {
		Item: Item
    }
})();