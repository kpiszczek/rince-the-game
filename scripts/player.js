rince.player = (function(){
	
	function Player(imgPlayer, x_start, x_end) {
        this.initialize(imgPlayer, x_start, x_end);
    }
	Player.prototype = new createjs.BitmapAnimation();
	
	Player.prototype.bounds = 0;
	Player.prototype.hit = 0;
	Player.prototype.idle = false;
		
	Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize;
	
	var quaterFrameSize;
	
	Player.prototype.initialize = function (imgPlayer, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgPlayer], //image to use
            frames: { width: 90, height:120, regX:45, regY: 60 },
            animations: {
                run: {
                	frames: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
                	next: "run"
                }
            }
        });
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;
        
        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        // start playing the first sequence:
        this.gotoAndPlay("run"); 	//animate
        this.name = "Player";
        
        // 1 = right/up & -1 = left/down
        this.direction = [0,0];
        
        this.vX = 0;
        this.vY = 0;
        
        this.currentFrame = 0;
        this.bounds = 28;
        this.hit = this.bounds;
	}
	
	Player.prototype.tick = function () {
        if (!this.idle) {
            // Hit testing the screen width, otherwise our sprite would disappear
            // The player is blocked at each side but we keep the walk_right or walk_animation running
            if ((this.x + this.direction > quaterFrameSize) && 
            		(this.x + (this.direction * 2) < this.x_end - quaterFrameSize + 1)) {
                // Moving the sprite based on the direction & the speed
                this.x += this.vX * this.direction[0];
                this.y += this.vY * this.direction[1];
            }
        }
    }
	
	return {
		Player: Player
	};
})();