rince.screens["main-menu"] = (function(){
    var dom = rince.dom,
        game = rince.game,
        display = rince.display,
        $ = dom.$,
        firstRun = true,
        db;
    
    function setup() {
        db = rince.storage;

        var data = db.get('gameData');

        if (data === null) {
            db.set('gameData',{
                levelScores: [],
                highScores: []
            });
        }

        print();
    }

    function print() {
        dom.bind("#main-menu ul.menu", "click", function(e){     
            if (e.target.nodeName.toLowerCase() === "button"){
                var action = e.target.getAttribute("name");
                if (action == "game-screen") {
                    rince.levels.setLevel(1);
                }
                game.showScreen(action);
            }
        });
    }
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        } else {
            display.kill();
            print();
        }
    }
    
    return {
        run: run
    };
    
})();
