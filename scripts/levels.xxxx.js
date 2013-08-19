rince.level2 = (function(){

	var speed,
		cellSize,
		Boss,
		Obstacle,
		rows,
        audio;

	function initialize() {
		cellSize = rince.settings.cellSize;
		Obstacle = rince.obstacle.Obstacle;
        Boss = rince.boss.Boss;
        rows = rince.settings.rows;
        speed = rince.settings.speed;
        audio = rince.audio;
	}

	function createLevel(){
        var image;
        var obstacle_types = [];

        var landscape = rince.images["images/landscapeXXXX"+cellSize+".png"];
        var sky = rince.images["images/clouds"+cellSize+".png"];

        image = rince.images["images/2flowersprite"+cellSize+".png"];

        var boss = {
            name: "Twoflower",
            image: image,
            w: image.width/24,
            h: image.height,
            x: Math.floor(image.width/48),
            y: 100,
            animName: "photo",
            bossAnimations: {
                photo: [0, 23, "photo", 2]
            },
            hitAction: function(player, level){
            	rince.levels.nextLevel();
            },
            tickAction: function() {
                if (!rince.level.isStopped()){
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
            w: image.width,
            h: image.height,
            x: Math.floor(image.width/2),
            y: 195,
            hitAction: function(player, level){
                audio.play("body-fall");
                player.immune = 2*rince.settings.fps;
                player.idle = rince.settings.fps;
                player.gotoAndPlay("fall");
                level.stop = rince.settings.fps;
            }
        });
        
        function spawnObsatacles(tick){
            var obstacles = [];
            if (tick % 300 === 0){
                var o = obstacle_types[0];
                var obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y, o.hitAction)
                obstacles.push(obstacle);
                obstacle.y = Math.floor(Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize);
            }
            return obstacles;
        }

        function spawnItems(tick){
            var items = [];
            return items;
        }

        function spawnMonsters(tick){
            var monsters = []
            return monsters;
        }

        function spawnBoss(tick) {
            var b;
            if (tick % 500 === 0){
                b = new Boss(boss.name, boss.image, boss.w, boss.h, boss.x, boss.y, boss.animName,
                             boss.bossAnimations, boss.hitAction, boss.tickAction, boss.hitArea);
                b.y = 250;
            }
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