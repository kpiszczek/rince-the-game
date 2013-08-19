rince.levels = (function(){
    var current_level_idx = 0,
        levels = [];

    function initialize(){
        rince.level1.initialize();
        levels.push(rince.level1.createLevel());

        rince.level2.initialize();
        levels.push(rince.level2.createLevel());
    }

    function currentLevel(){
        return levels[current_level_idx];
    }

    function nextLevel(){
        console.log("previus level: " + current_level_idx);
        if (current_level_idx < (levels.length - 1)){
            current_level_idx += 1;
        }
        console.log("next level: " + current_level_idx);
        setTimeout(function(){
            rince.level.initialize(function (){
                rince.display.reset(function(){});
            })
        }, 500);
    }


    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel
    }
})();