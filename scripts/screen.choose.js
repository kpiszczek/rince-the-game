rince.screens["choose-screen"] = (function() {
    var game = rince.game,
        dom = rince.dom,
        firstRun = true,
        $ = dom.$,
        levels = rince.levels,
        db = rince.storage;
    
    function setup(){
        levels.initialize();
        dom.bind("#choose-screen ul.menu", "click", function(e){     
            if (e.target.nodeName.toLowerCase() === "button") {
                var action = e.target.getAttribute("name"),
                    av = e.target.getAttribute('class');

                if (av == 'available') {
                    if (action == "level-1") {
                        levels.setLevel(1);
                    } else if (action == "level-2") {
                        levels.setLevel(2);
                    }
                    
                    game.showScreen("game-screen");
                }
            }        
        });

        var btn = $("#back-button-levels")[0];
        dom.bind(btn, "click", function(e){  
            game.showScreen('main-menu');
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