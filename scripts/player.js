rince.player = (function(){
	
	function Player(imgPlayer, x_start, x_end, y_end) {
        this.initialize(imgPlayer, x_start, x_end, y_end);
    }

	Player.prototype = new createjs.BitmapAnimation();
	
	Player.prototype.bounds = 0;
	Player.prototype.hit = 0;
	Player.prototype.idle = 0;
    Player.prototype.immune = 0;
		
	Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize;
	
	var quaterFrameSize;
	var previousDir = 0;
	
	Player.prototype.initialize = function (imgPlayer, x_end, y_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgPlayer], //image to use
            frames: { width: 152, height: 130, regX:75, regY: 65 },
            animations: {
                run: [0, 27, "run", 2],
                faster: [0, 27, "faster", 1],
                slower: [0, 27, "slower", 3],
                fall: [28, 63, "lie", 1],
                lie: [63, 63, "run", 1]
            }
        });
        
        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;
        this.y_end = y_end;
        this.quaterYEnd = y_end/4;
        
        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;
        halfFrameHeight = this.spriteSheet.getFrame(0).rect.height / 2;

        this.gotoAndPlay("run");
        this.name = "Player";
        
        // 1 = right/down & -1 = left/up
        this.direction = [0,0];
        
        this.vX = 2;
        this.vY = 2;
        this.items = [];
        
        this.currentFrame = 0;
        this.bounds = 28;
        this.hit = this.bounds;
	}
	
	Player.prototype.tick = function () {
        if (this.idle == 0) {
            if (this.immune > 0) {
                this.immune -= 1;
            }
            
            if ((this.x + this.direction[0] > quaterFrameSize) && 
            		(this.x + (this.direction[0] * 2) < this.x_end - quaterFrameSize + 1)){
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
        } else {
            if (this.idle == 1) {
                this.gotoAndPlay("run");
            }
            this.idle -= 1;
        }
    }
	
	return {
		Player: Player
	};
})();