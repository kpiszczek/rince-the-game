rince.level2 = (function(){

	var speed,
        cellSize,
        Boss,
        Obstacle,
        Monster,
        rows,
        audio,
        fps,
        level;

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
    }

	function createLevel(){
        var obstacle_types = [],
            monster_types = [],
            item_types = [],
            image;

        var needed_potatoes = 15;

        var landscape = rince.images["images/landscapeXXXX"+cellSize+".png"];
        var sky = rince.images["images/clouds"+cellSize+".png"];

        image = rince.images["images/bumerang"+cellSize+".png"];
        boss = {
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
        }

        image = rince.images["images/cangaroo"+cellSize+".png"];
        monster_types.push({
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
        monster_types.push({
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
        monster_types.push({
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
        monster_types.push({
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

        function spawnObstacles(){
            var obstacles = [],
                obstacle,
                o;

            for (var i = 0; i < obstacle_types.length; i++){
                o = obstacle_types[i];
                if (o.probability > Math.random()){
                    obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y, o.hitAction)
                    obstacles.push(obstacle);
                    obstacle.y = Math.floor(Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize);
                }
            }
            return obstacles;
        }

        function spawnItems(){
            var items = [];
            return items;
        }

        function spawnMonsters(){
            var monsters = [],
                monster,
                m;

            for (var i = 0; i < monster_types.length; i++) {
                m = monster_types[i];
                if (m.probability > Math.random()){
                    monster = new Monster(m.name, m.image, m.w, m.h, m.x, m.y, m.animName, 
                        m.monsterAnimations, m.hitAction, m.tickAction, m.hitArea);
                    monsters.push(monster);
                    monster.y = Math.floor(Math.random()*(0.75*rows*cellSize - (m.h - m.y)) + 0.25*rows*cellSize);
                }
            }
            return monsters;
        }

        function spawnBoss() {
            var b;
            b = new Boss(boss.name, boss.image, boss.w, boss.h, boss.x, boss.y, boss.animName,
                        boss.bossAnimations, boss.hitAction, boss.tickAction, boss.hitArea);
            b.y = Math.random()*250 + 100;
            return b;
        }

        return {
            name: "XXXX",
            landscape: landscape,
            sky: sky,
            obstacle_types: obstacle_types,
            item_types: item_types,
            spawnObstacles: spawnObstacles,
            spawnItems: spawnItems,
            spawnMonsters: spawnMonsters,
            spawnBoss: spawnBoss,
            needed_potatoes: needed_potatoes
        }
    }

    return {
    	initialize: initialize,
    	createLevel: createLevel
    }
})();