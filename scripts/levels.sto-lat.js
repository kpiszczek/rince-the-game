rince.level1 = (function(){

	var speed,
		cellSize,
		Boss,
		Obstacle,
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

	function createLevel() {
        var obstacle_types = [],
            monster_types = [],
            image;

        var landscape = rince.images["images/landscape"+cellSize+".png"];
        var sky = rince.images["images/clouds"+cellSize+".png"];

        image = rince.images["images/2flowersprite"+cellSize+".png"];

        var boss = {
            name: "Twoflower",
            image: image,
            w: image.width/24,
            h: image.height,
            x: Math.floor(image.width/48),
            y: 45,
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
        obstacle_types.push({
            name: "tree",
            image: image,
            h: image.height,
            w: image.width,
            x: Math.floor(image.width/2),
            y: 195,
            hitAction: function(player, level) {
                audio.play("body-fall");
                player.immune = 2*fps;
                player.idle = fps;
                player.gotoAndPlay("fall");
                level.stop = fps;
            },
            probability: 0.25
        });

        image = rince.images["images/hedgehog"+cellSize+".png"];
        monster_types.push({
            name: "hedgehog",
            image: image,
            h: image.height,
            w: image.width/24,
            x: Math.floor(image.width/48),
            y: 10,
            animName: 'move-left',
            monsterAnimations: {

            },
            hitAction: function(player, level) {
                audio.play("body-fall");
                player.immune = 2*fps;
                player.idle = fps;
                player.gotoAndPlay("fall");
                level.stop = fps;
            },
            tickAction: function(){

            },
            hitArea: function(){

            },
            probability: 0.3
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
                //monster = new Monster(m.name, m.image, m.w, m.h, m.x, m.y, m.hitAction);
                //monsters.push(monster);
                //monster.y = Math.floor(Math.random()*(0.75*rows*cellSize - (m.h - m.y)) + 0.25*rows*cellSize);
            }
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
            name: "Sto Lat",
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