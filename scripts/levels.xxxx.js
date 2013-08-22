rince.level2 = (function(){

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

	function createLevel(){
        var image;
        var obstacle_types = [];

        var landscape = rince.images["images/landscapeXXXX"+cellSize+".png"];
        var sky = rince.images["images/clouds"+cellSize+".png"];

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