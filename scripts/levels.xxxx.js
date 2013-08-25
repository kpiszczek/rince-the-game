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
            image;

        var landscape = rince.images["images/landscapeXXXX"+cellSize+".png"];
        var sky = rince.images["images/clouds"+cellSize+".png"];

        image = rince.images["images/cangaroo"+cellSize+".png"];
        monster_types.push({
            name: "cangaroo",
            image: image,
            h: image.height,
            w: image.width/30,
            x: Math.floor(image.width/60),
            y: 95,
            animName: 'punch',
            monsterAnimations: {
                move_left: [0, 29, 'punch', 2]
            },
            hitAction: function(player, level) {
                audio.play("body-fall");
                player.immune = 2*fps;
                player.idle = fps;
                player.gotoAndPlay("fall");
                level.stop = fps;
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

        image = rince.images["images/lizard"+cellSize+".png"];
        monster_types.push({
            name: "lizard",
            image: image,
            h: image.height,
            w: image.width/24,
            x: Math.floor(image.width/48),
            y: -20,
            animName: 'punch',
            monsterAnimations: {
                move_left: [0, 23, 'punch', 1]
            },
            hitAction: function(player, level) {
                audio.play("body-fall");
                player.immune = 2*fps;
                player.idle = fps;
                player.gotoAndPlay("fall");
                level.stop = fps;
            },
            tickAction: function(){
                if (!level.isStopped()){
                    this.x -= speed;
                }
            },
            hitArea: function(tX, tY, tHit) {
                if (tX - tHit > this.x + this.hit - 80) { return; }
                if (tX + tHit < this.x - this.hit - 80) { return; }
                if (tY - tHit > this.y + this.hit) { return; }
                if (tY + tHit < this.y - this.hit) { return; }

                if (this.currentFrame > 12 && this.currentFrame < 18) {
                    return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
                } else {
                    return false;
                }
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
            y: -20,
            animName: 'move_left',
            monsterAnimations: {
                move_left: [0, 23, 'move_left', 1],
                move_right: [24, 47, 'move_right', 1]
            },
            hitAction: function(player, level) {
                audio.play("body-fall");
                player.immune = 2*fps;
                player.idle = fps;
                player.gotoAndPlay("fall");
                level.stop = fps;
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
                if (tY - tHit > this.y + this.hit + 20) { return; }
                if (tY + tHit < this.y - this.hit + 20) { return; }
                
                return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
            },
            probability: 0.2
        });

        function spawnObsatacles(){
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
            //console.log(monsters)
            return monsters;
        }

        function spawnBoss() {
            var b;
            b = new Boss(boss.name, boss.image, boss.w, boss.h, boss.x, boss.y, boss.animName,
                        boss.bossAnimations, boss.hitAction, boss.tickAction, boss.hitArea);
            b.y = 100;
            return b;
        }

        return {
            name: "XXXX",
            landscape: landscape,
            sky: sky,
            obstacle_types: obstacle_types,
            spawnObstacles: spawnObsatacles,
            spawnItems: spawnItems,
            spawnMonsters: spawnMonsters,
            spawnBoss: spawnBoss
        }
    }

    return {
    	initialize: initialize,
    	createLevel: createLevel
    }
})();