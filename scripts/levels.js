rince.levels = (function(){
    var current_level_idx = 0,
        levels = [];

    function initialize(){
        rince.level1.initialize();
        levels.push(rince.level1.createLevel());
    }

    function currentLevel(){
        return levels[current_level_idx];
    }

    function nextLevel(){
        if (this.current_level_idx < (levels.length - 1)){
            this.current_level_idx += 1;
        }
        setTimeout(function(){
            rince.level.initialize(function (){
                rince.display.reset(function(){});
            })
        }, 1000);
    }


    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel
    }
})();