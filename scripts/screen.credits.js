rince.screens["credits-screen"] = (function() {
    var game = rince.game,
        dom = rince.dom,
        firstRun = true,
        $ = dom.$;
    
    function setup(){
        var btn = $("#back-button-credits")[0];
        $('#credits')[0].style.display = 'block';
        dom.bind(btn, "click", function(e){   
            $("#credits")[0].style.display = "none";  
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