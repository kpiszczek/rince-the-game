rince.screens["credits-screen"] = (function() {
    var game = rince.game,
        dom = rince.dom,
        firstRun = true,
        $ = dom.$;
    
    function setup(){
        $('#credits')[0].style.display = 'block';
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