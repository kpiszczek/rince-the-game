rince.levels = (function(){
    var current_level_idx = 0;
    var levels = [];

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
        rince.level.initialize(function (){
            rince.display.reset()
        });
    }


    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel
    }
})();