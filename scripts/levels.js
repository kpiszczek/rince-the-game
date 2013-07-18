rince.levels = (function(){
    var current_level_idx = 0;
    var levels = [];
    var cellSize;
    var Obstacle;
    var rows;
    var cellSize;

    function initialize(){
        cellSize = rince.settings.cellSize;
        levels.push(createLevel1());

        Obstacle = rince.obstacle.Obstacle;
        rows = rince.settings.rows;
        cellSize = rince.settings.cellSize;
    }

    function createLevel1(){
        var image = rince.images["images/tree"+cellSize+".png"];

        var obstacle_types = [];

        obstacle_types.push({
            name: "tree",
            image: image,
            w: image.width,
            h: image.height,
            x: Math.floor(image.width/2),
            y: 195,
            hitAction: function(player){
                player.immune = rince.settings.fps;
                alert("player got hit!");
            }
        });

        function spawnObsatacles(tick){
            var obstacles = [];
            if (tick % 150 === 0){
                var o = obstacle_types[0];
                var obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y, o.hitAction)
                obstacles.push(obstacle);
                obstacle.y = Math.floor(Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize);
            }
            return obstacles;
        }

        return {
            name: "Sto Lat",
            obstacle_types: obstacle_types,
            spawnObstacles: spawnObsatacles
        }

    }

    function currentLevel(){
        return levels[current_level_idx];
    }

    function nextLevel(){
        if (current_level_idx < levels.length){
            current_level_idx += 1;
        }
        return currentLevel();
    }

    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel
    }
})();