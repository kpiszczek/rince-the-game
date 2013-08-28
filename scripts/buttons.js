rince.buttons = (function(){
	function ToggleButton(image, w, h, x, y, clickHandler){
		this.initialize(image, w, h, x, y, clickHandler);
	}
	
	ToggleButton.prototype = new createjs.Bitmap();
	ToggleButton.prototype.Bitmap_initialize = ToggleButton.prototype.initialize;
	
	ToggleButton.prototype.initialize = function(image, w, h, x, y, clickHandler){
	    this.image = image;
	    this.w = w;
	    this.h = h;
	    this.x = x;
	    this.y = y;

	    this.sourceRect = new createjs.Rectangle(0, 0, this.w, this.h);
	    this.mouseEnabled = true;

	    this.alwaysOnTop = true;
	    this.state = 'off';

	    this.addEventListener('click', (function(scope) {
	    	return function(){
	    		clickHandler();
	    		scope.toggle();
	    	};
	    })(this));
	}	

	ToggleButton.prototype.toggle = function() {
		if (this.state === 'off') {
			this.switchOn();
		} else if (this.state === 'on') {
			this.switchOff();
		}
	}

	ToggleButton.prototype.switchOn = function() {
		this.state = 'on';
		this.sourceRect = new createjs.Rectangle(this.w, 0, this.w, this.h);
	}

	ToggleButton.prototype.switchOff = function() {
		this.state = 'off';
		this.sourceRect = new createjs.Rectangle(0, 0, this.w, this.h);
	}

	function Button(image, x, y, clickHandler){
		this.initialize(image, x, y, clickHandler);
	}
	
	Button.prototype = new createjs.Bitmap();
	Button.prototype.Bitmap_initialize = Button.prototype.initialize;
	
	Button.prototype.initialize = function(image, x, y, clickHandler){
	    this.image = image;
	    this.x = x;
	    this.y = y;

	    this.sourceRect = new createjs.Rectangle(0, 0, image.width, image.height);
	    this.mouseEnabled = true;

	    this.alwaysOnTop = true;

	    this.addEventListener('click', clickHandler);
	}	

	return {
		ToggleButton: ToggleButton,
		Button: Button
	};
})()