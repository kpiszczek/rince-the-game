rince.popover = (function() {
	function Popover(img) {
		if (!(this instanceof Popover)) {
			return new Popover();
		}
		this.initialize(img);
	}

	Popover.prototype = new createjs.Bitmap();
	Popover.prototype.Bitmap_initialize = Popover.prototype.initialize;

	Popover.prototype.initialize = function(img) {
		this.image = img;

		this.sourceRect = new createjs.Rectangle(0, 0, img.width, img.height);

		this.alwaysOnTop = true;
	};
})();