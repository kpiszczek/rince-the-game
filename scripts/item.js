rince.item = (function(){
	function Item(itemName, imgItem, x, y, hitAction){
		this.initialize(itemName, imgItem, x, y, hitAction);
	}
	Item.prototype = new createjs.Bitmap();
	
	Item.prototype.bounds = 0;
	Item.prototype.hit = 0;
	
	Item.prototype.Bitmap_initialize = Item.prototype.initialize;
	
	var frameSize;
	var speed = rince.settings.speed;
	
	Item.prototype.initialize = function (itemName, imgItem, x, y, hitAction) {
		this.name = itemName;
        this.image = imgItem;

        this.hitAction = hitAction;
        
        frameSize = this.image.width;
        
        // frame width / 2
        this.w2 = this.image.width/2;

        this.regX = x;
        this.regY = y;
        
        this.x = rince.settings.cols * rince.settings.cellSize + this.w2;
	}
	
	Item.prototype.tick = function(){
		if (!rince.level.isStopped()){
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
