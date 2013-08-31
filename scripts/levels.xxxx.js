rince.level2 = (function(){

	var speed,
        cellSize,
        Boss,
        Obstacle,
        Monster,
        rows,
        audio,
        fps,
        level,
        Level;

    function initialize() {
        cellSize = rince.settings.cellSize;
        Obstacle = rince.obstacle.Obstacle;
        Monster = rince.monster.Monster;
        Boss = rince.boss.Boss;
        rows = rince.settings.rows;
        speed = rince.settings.speed;
        audio = rince.audio;
        fps = rince.settings.fps;
        level = rince.level;
        Level = rince.level_prototype.Level;
    }

    function addMonsters(xxxx) {
        var image;

        image = rince.images["images/cangaroo"+cellSize+".png"];
        xxxx.monster_types.push({
            name: "cangaroo",
            image: image,
            h: image.height,
            w: image.width/30,
            x: Math.floor(image.width/60),
            y: image.height/2,
            animName: 'punch',
            monsterAnimations: {
                punch: [0, 29, 'punch', 2]
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
            probability: 0.2
        });

        image = rince.images["images/lizzard"+cellSize+".png"];
        xxxx.monster_types.push({
            name: "lizzard",
            image: image,
            h: image.height,
            w: image.width/30,
            x: Math.floor(image.width/60),
            y: -3,
            animName: 'standby',
            monsterAnimations: {
                standby: [0, 0, 'standby', 1],
                lick: [1, 29, 'standby', 1]
            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    this.gotoAndPlay('lick');
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
            probability: 0.2
        });

        image = rince.images["images/dropbear"+cellSize+".png"];
        xxxx.monster_types.push({
            name: "dropbear",
            image: image,
            h: image.height,
            w: image.width/24,
            x: Math.floor(image.width/48),
            y: 195,
            animName: 'hidden',
            monsterAnimations: {
                hidden: [0, 0, 'hidden', 1],
                drop: [1, 23, 'hidden', 2]
            },
            hitAction: function(player, level) {
                if (player.immune === 0) {
                    audio.play("body-fall");
                    this.gotoAndPlay('drop');
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
            probability: 0.2
        });

        image = rince.images["images/sheep"+cellSize+".png"];
        xxxx.monster_types.push({
            name: "sheep",
            image: image,
            h: image.height,
            w: image.width/48,
            x: Math.floor(image.width/96),
            y: 0,
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
    }

    function addObstacles(xxxx) {

    }

    function addItems(xxxx) {
        var image;

        image = rince.images["images/potato"+cellSize+".png"];
        xxxx.item_types.push({
            name: "potato",
            image: image,
            x: Math.floor(image.width/2),
            y: -7,
            h: image.height,
            w: image.width,
            hitAction: function(player, level) {
                if (!this.taken) {
                    player.items[this.name] += 1;
                    this.visible = false;
                    this.taken = true;
                }
            },
            probability: 0.25
        });
    }

    function addBoss(xxxx) {
        var image = rince.images["images/bumerang"+cellSize+".png"];
        xxxx.boss = {
            name: "bumerang",
            image: image,
            w: image.width/11,
            h: image.height,
            x: Math.floor(image.width/48),
            y: image.height/2,
            animName: "spin",
            bossAnimations: {
                spin: [0, 10, "spin", 1]
            },
            hitAction: function(player, level){
                player.immune = 2*fps;
                player.idle = fps;
                level.stop = fps;
                rince.levels.nextLevel();
            },
            tickAction: function() {
                if (!level.isStopped()){
                    this.x -= 2*speed;
                }
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit) { return; }
                if (tX + tHit < this.x - this.hit) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            }
        };
    }

	function createLevel(){
        var xxxx = new Level();

        xxxx.name = "XXXX";
        xxxx.needed_potatoes = 15;

        xxxx.landscape = rince.images["images/landscapeXXXX"+cellSize+".png"];
        xxxx.sky = rince.images["images/clouds"+cellSize+".png"];

        addMonsters(xxxx);
        addObstacles(xxxx);
        addItems(xxxx);
        addBoss(xxxx);

        return xxxx;
    }

    return {
        initialize: initialize,
        createLevel: createLevel
    };
})();