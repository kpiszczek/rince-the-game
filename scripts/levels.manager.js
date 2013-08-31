rince.levels = (function(){
    var current_level_idx = 0,
        levels = [],
        score = 0,
        level;

    function initialize(){
        rince.level1.initialize();
        levels.push(rince.level1.createLevel());

        rince.level2.initialize();
        levels.push(rince.level2.createLevel());

        level = rince.level;
    }

    function currentLevel(){
        return levels[current_level_idx];
    }

    function nextLevel() {
        if (current_level_idx < (levels.length - 1)){
            current_level_idx += 1;
            score += level.getPotatoes();
            console.log(score);
        } else {
            score += level.getPotatoes();    
            rince.game.showScreen('credits-screen');
        }

        setTimeout(function(){
            rince.level.initialize(function (){
                rince.display.reset(function(){});
            });
        }, 500);
    }

    function setLevel(id) {
        if (id < (levels.length+1)) {
            current_level_idx = id - 1;
            console.log(current_level_idx);
        } else {
            // do nothing
        }
    }

    function getScore() {
        return score;
    }


    return {
        initialize: initialize,
        currentLevel: currentLevel,
        nextLevel: nextLevel,
        setLevel: setLevel,
        getScore: getScore
    };
})();