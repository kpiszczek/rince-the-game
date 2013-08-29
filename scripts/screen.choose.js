rince.screens["choose-screen"] = (function() {
    var game = rince.game,
        dom = rince.dom,
        firstRun = true,
        $ = dom.$,
        levels = rince.levels;
    
    function setup(){
        levels.initialize();
        dom.bind("#level-select ul.menu", "click", function(e){     
            if (e.target.nodeName.toLowerCase() === "button") {
                var action = e.target.getAttribute("name");
                if (action == "level-1") {
                    levels.setLevel(1);
                } else if (action == "level-2") {
                    levels.setLevel(2);
                }
                game.showScreen("game-screen");
            }
            $("#level-select")[0].style.display = "none";
        });

        var btn = $("#back-button-levels")[0];
        dom.bind(btn, "click", function(e){
            $("#level-select")[0].style.display = "none";   
            game.showScreen('main-menu');
        });
    }
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        }
    }
    
    return {
        run: run
    };
    
})();