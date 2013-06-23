rince.player = (function(){
	
	function Player(imgPlayer, x_start, x_end, y_end) {
        this.initialize(imgPlayer, x_start, x_end, y_end);
    }
	Player.prototype = new createjs.BitmapAnimation();
	
	Player.prototype.bounds = 0;
	Player.prototype.hit = 0;
	Player.prototype.idle = false;
    Player.prototype.immune = false;
		
	Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize;
	
	var quaterFrameSize;
	var previousDir = 0;
	
	Player.prototype.initialize = function (imgPlayer, x_end, y_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgPlayer], //image to use
            frames: { width: 90, height:120, regX:45, regY: 60 },
            animations: {
                run: {
                	frames: [0,1,2,3,4,3,2,1],
                	next: "run",
                	frequency: 3
                },
            	faster: {
            		frames: [0,1,2,3,4,3,2,1],
                	next: "faster",
                	frequency: 2
            	},
            	slower: {
            		frames: [0,1,2,3,4,3,2,1],
                	next: "slower",
                	frequency: 4
            	}
            }
        });
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;
        this.y_end = y_end;
        this.quaterYEnd = y_end/4;
        
        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;
        halfFrameHeight = this.spriteSheet.getFrame(0).rect.height / 2;

        // start playing the first sequence:
        this.gotoAndPlay("run"); 	//animate
        this.name = "Player";
        
        // 1 = right/down & -1 = left/up
        this.direction = [0,0];
        
        this.vX = 3;
        this.vY = 3;
        
        this.currentFrame = 0;
        this.bounds = 28;
        this.hit = this.bounds;
	}
	
	Player.prototype.tick = function () {
        if (!this.idle) {
            // Hit testing the screen width, otherwise our sprite would disappear
            // The player is blocked at each side but we keep the walk_right or walk_animation running
            if ((this.x + this.direction[0] > quaterFrameSize) && 
            		(this.x + (this.direction[0] * 2) < this.x_end - quaterFrameSize + 1)){
                // Moving the sprite based on the direction & the speed
                this.x += this.vX * this.direction[0];
            }
            
            if ((this.y + this.vY*this.direction[1] + halfFrameHeight < this.y_end) &&
            		(this.y + this.vY*this.direction[1] > this.quaterYEnd)){
            	this.y += this.vY * this.direction[1];
            }
            
            if (this.direction[0] == 1 && this.direction[0] != previousDir){
            	previousDir = 1;
            	this.gotoAndPlay("faster");            	
            } else if (this.direction[0] == -1 && this.direction[0] != previousDir){
            	previousDir = -1;
            	this.gotoAndPlay("slower");       	
            } else if (this.direction[0] != previousDir){
            	previousDir = 0;
            	this.gotoAndPlay("run");  	
            }
        }
    }
	
	return {
		Player: Player
	};
})();