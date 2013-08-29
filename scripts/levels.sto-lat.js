rince.level1 = (function(){

	var speed,
		cellSize,
		Boss,
		Obstacle,
        Monster,
        Item,
		rows,
        audio,
        fps,
        level,
        Level;

	function initialize() {
		cellSize = rince.settings.cellSize;
		Obstacle = rince.obstacle.Obstacle;
        Monster = rince.monster.Monster;
        Item = rince.item.Item;
        Boss = rince.boss.Boss;
        rows = rince.settings.rows;
        speed = rince.settings.speed;
        audio = rince.audio;
        fps = rince.settings.fps;
        level = rince.level;
        Level = rince.level_prototype.Level;
	}

	function createLevel() {
        var sto_lat = new Level(),
            image;

        sto_lat.name = "Sto Lat";
        sto_lat.needed_potatoes = 10;

        sto_lat.landscape = rince.images["images/landscape"+cellSize+".png"];
        sto_lat.sky = rince.images["images/clouds"+cellSize+".png"];

        image = rince.images["images/2flowersprite"+cellSize+".png"];
        sto_lat.boss = {
            name: "Twoflower",
            image: image,
            w: image.width/24,
            h: image.height,
            x: Math.floor(image.width/48),
            y: image.height/2,
            animName: "photo",
            bossAnimations: {
                photo: [0, 23, "photo", 2]
            },
            hitAction: function(player, level){
                player.immune = 2*fps;
                player.idle = fps;
                level.stop = fps;
            	rince.levels.nextLevel();
            },
            tickAction: function() {
                if (!level.isStopped()){
                    this.x -= speed;
                }
            },
            hitArea: function(tX, tY, tHit) {
            	if (tX - tHit > this.x + this.hit) { return; }
		        if (tX + tHit < this.x - this.hit) { return; }
		        if (tY - tHit > this.y + this.hit) { return; }
		        if (tY + tHit < this.y - this.hit) { return; }
		        
		        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            }
        }

        image = rince.images["images/tree"+cellSize+".png"];
        sto_lat.obstacle_types.push({
            name: "tree",
            image: image,
            h: image.height,
            w: image.width/2,
            x: Math.floor(image.width/4),
            y: 195,
            hitAction: function(player, level) {
                level.stop = 6;
            },
            probability: 0.2
        });

        image = rince.images["images/cabbage"+cellSize+".png"];
        sto_lat.obstacle_types.push({
            name: "cabbage",
            image: image,
            h: image.height,
            w: image.width/2,
            x: Math.floor(image.width/4),
            y: -25,
            hitAction: function(player, level) {
                level.stop = 6;
            },
            probability: 0.4
        });

        image = rince.images["images/stone"+cellSize+".png"];
        sto_lat.obstacle_types.push({
            name: "stone",
            image: image,
            h: image.height,
            w: image.width/2,
            x: Math.floor(image.width/4),
            y: -25,
            hitAction: function(player, level) {
                level.stop = 6;
            },
            probability: 0.05
        });

        image = rince.images["images/bush"+cellSize+".png"];
        sto_lat.obstacle_types.push({
            name: "bush",
            image: image,
            h: image.height,
            w: image.width/2,
            x: Math.floor(image.width/4),
            y: -25,
            hitAction: function(player, level) {
                level.stop = 6;
            },
            probability: 0.1
        });

        image = rince.images["images/hedgehog"+cellSize+".png"];
        sto_lat.monster_types.push({
            name: "hedgehog",
            image: image,
            h: image.height,
            w: image.width/48,
            x: Math.floor(image.width/96),
            y: -40,
            animName: 'move_left',
            monsterAnimations: {
                move_left: [0, 23, 'move_left', 1],
                move_right: [24, 47, 'move_right', 1]
            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    player.immune = 2*fps;
                    player.idle = fps;
                    player.gotoAndPlay("fall");
                    level.stop = fps;
                }
            },
            tickAction: function(){
                if (!level.isStopped()){
                    this.x -= speed;
                }
                if (this.currentFrame == 23 || this.currentFrame == 47) {
                    this.speed[0] = choose([-1, 1]);
                    this.speed[1] = choose([-1, 1]);

                    if (this.speed[0] < 0){
                        this.gotoAndPlay('move_left');
                    } else {
                        this.gotoAndPlay('move_right');
                    }
                }
                this.x += this.speed[0];
                if (isInside(this.y)) {
                    this.y += this.speed[1];
                } else {
                    this.y += 1;
                }
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit) { return; }
                if (tX + tHit < this.x - this.hit) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            },
            probability: 0.2
        });

        image = rince.images["images/budger"+cellSize+".png"];
        sto_lat.monster_types.push({
            name: "budger",
            image: image,
            h: image.height,
            w: image.width/48,
            x: Math.floor(image.width/96),
            y: -20,
            animName: 'move_left',
            monsterAnimations: {
                move_left: [0, 23, 'move_left', 1],
                move_right: [24, 47, 'move_right', 1]
            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    player.immune = 2*fps;
                    player.idle = fps;
                    player.gotoAndPlay("fall");
                    level.stop = fps;
                }
            },
            tickAction: function(){
                if (!level.isStopped()){
                    this.x -= speed;
                }
                if (this.currentFrame == 23 || this.currentFrame == 47) {
                    this.speed[0] = choose([-1, 1]);
                    this.speed[1] = choose([-1, 1]);

                    if (this.speed[0] < 0){
                        this.gotoAndPlay('move_left');
                    } else {
                        this.gotoAndPlay('move_right');
                    }
                }
                this.x += this.speed[0];
                if (isInside(this.y)) {
                    this.y += this.speed[1];
                } else {
                    this.y += 1;
                }
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit) { return; }
                if (tX + tHit < this.x - this.hit) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            },
            probability: 0.2
        });

        image = rince.images["images/heroin"+cellSize+".png"];
        sto_lat.monster_types.push({
            name: "heroin",
            image: image,
            h: image.height,
            w: image.width/36,
            x: Math.floor(image.width/72),
            y: image.height/2,
            animName: 'stab',
            monsterAnimations: {
                stab: [0, 35, 'stab', 2]
            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    player.immune = 2*fps;
                    player.idle = fps;
                    player.gotoAndPlay("fall");
                    level.stop = fps;
                }
            },
            tickAction: function(){
                if (!level.isStopped()){
                    this.x -= speed;
                }
                this.x -= 2;
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit) { return; }
                if (tX + tHit < this.x - this.hit) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            },
            probability: 0.05
        });

        image = rince.images["images/errol"+cellSize+".png"];
        sto_lat.monster_types.push({
            name: "errol",
            image: image,
            h: image.height,
            w: image.width/36,
            x: Math.floor(image.width/72),
            y: 5,
            animName: 'standby',
            monsterAnimations: {
                standby: [35, 35, 'standby', 1],
                breathe: [0, 35, 'standby', 1],

            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    this.gotoAndPlay('breathe');
                    player.immune = 2*fps;
                    player.idle = fps;
                    player.gotoAndPlay("fall");
                    level.stop = fps;
                }
            },
            tickAction: function(){
                if (!level.isStopped()){
                    this.x -= speed;
                }
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit) { return; }
                if (tX + tHit < this.x - this.hit) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            },
            probability: 0.05
        });

        image = rince.images["images/potato"+cellSize+".png"];
        sto_lat.item_types.push({
            name: "potato",
            image: image,
            x: Math.floor(image.width/2),
            y: -10,
            hitAction: function(player, level) {
                player.items[this.name] += 1;
            },
            probability: 0.25
        });

        return sto_lat;
    }

    return {
    	initialize: initialize,
    	createLevel: createLevel
    }
})();