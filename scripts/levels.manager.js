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
        if (current_level_idx < (levels.length - 1)){
            current_level_idx += 1;
        }

        setTimeout(function(){
            rince.level.initialize(function (){
                rince.display.reset(function(){});
            })
        }, 500);
    }

    function setLevel(id) {
        if (id < (levels.length+1)) {
            current_level_idx = id - 1;
        } else {
            // do nothing
        }
    }


    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel,
        setLevel: setLevel
    }
})();