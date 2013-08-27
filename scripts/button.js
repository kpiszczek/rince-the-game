rince.button = (function(){
	function Button(image, w, h, x, y, clickAction){
		this.initialize(image, w, h, x, y, clickAction);
	}
	
	Button.prototype = new createjs.Bitmap();
	Button.prototype.Bitmap_initialize = Button.prototype.initialize;
	
	Button.prototype.initialize = function(image, w, h, x, y, clickAction){
	    this.image = image;
	    this.w = w;
	    this.h = h;
	    this.sourceRect = new createjs.Rectangle(0, 0, w, h);
	    this.mouseEnabled = true;

	    this.x = x;
	    this.y = y;

	    this.addEventListener('click', clickAction(this));
	}

	return {
		Button: Button
	};
})()