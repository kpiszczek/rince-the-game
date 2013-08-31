rince.screens["credits-screen"] = (function() {
    var game = rince.game,
        dom = rince.dom,
        firstRun = true,
        $ = dom.$,
        display = rince.display;
    
    function setup(){
        var btn = $("#back-button-credits")[0];
        $('#credits-screen')[0].style.display = 'block';
        dom.bind(btn, "click", function(e){   
            $("#credits-screen")[0].style.display = "none";  
            game.showScreen('main-menu');
        });
    }
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        } else {
            display.kill();
            setup();
        }
    }
    
    return {
        run: run
    };
    
})();