rince.levels = (function(){
    var current_level_idx = 0,
        levels = [],
        score = 0,
        level,
        db;

    function initialize(){
        rince.level1.initialize();
        levels.push(rince.level1.createLevel());

        rince.level2.initialize();
        levels.push(rince.level2.createLevel());

        level = rince.level;
        db = rince.storage;
    }

    function currentLevel(){
        return levels[current_level_idx];
    }

    function nextLevel() {
        if (current_level_idx < (levels.length - 1)) {

            score += level.getPotatoes();

            var data = db.get('gameData');

            var current_score = data.levelScores[current_level_idx];

            if (current_score === undefined) {
                data.levelScores.push(score);
            } else if (current_score < score) {
                data.levelScores[current_level_idx] = score;
            }

            db.set('gameData', data);

            current_level_idx += 1;

        } else {
            score += level.getPotatoes();    
            rince.game.showScreen('credits-screen');
        }

        rince.level.initialize(function (){
            rince.display.reset(function(){});
        });
    }

    function setLevel(id) {
        if (id < (levels.length+1)) {
            current_level_idx = id - 1;
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