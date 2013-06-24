rince.levels = (function(){
    var current_level_idx = 0;
    var levels = [];
    var cellSize;

    function initialize(){
        cellSize = rince.settings.cellSize;
        levels.push(createLevel1());
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
                alert("player got hit!");
            }
        });

        return {
            name: "Sto Lat",
            obstacle_types: obstacle_types
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