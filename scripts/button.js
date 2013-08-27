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
	    this.alwaysOnTop = true;
	    this.state = 'off';

	    this.addEventListener('click', clickAction(this));
	}	

	Button.prototype.toggle = function() {
		console.log
		if (this.state === 'off') {
			this.switchOn();
		} else if (this.state === 'on') {
			this.switchOff();
		}
	}

	Button.prototype.switchOn = function() {
		this.state = 'on';
		this.sourceRect = new createjs.Rectangle(this.w, 0, this.w, this.h);
	}

	Button.prototype.switchOff = function() {
		this.state = 'off';
		this.sourceRect = new createjs.Rectangle(0, 0, this.w, this.h);
	}

	return {
		Button: Button
	};
})()