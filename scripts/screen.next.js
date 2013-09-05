rince.screens["next-level-screen"] = (function() {
	var game = rince.game,
        dom = rince.dom,
        $ = dom.$,
        firstRun = true,
        levels = rince.levels;
    
    function setup() {
		var score = levels.getScore();

		$("#score")[0].innerHTML = "Score: {0}".format(score);
        dom.bind("#next-level-screen ul.menu", "click", function(e){     
            game.showScreen("game-screen");
        });
    }

    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        } else {
            setup();
        }
    }
    
    return {
        run: run
    };
})();