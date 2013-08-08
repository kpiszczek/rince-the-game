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