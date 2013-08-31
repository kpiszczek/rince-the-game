rince.game = (function(){
    var dom = rince.dom,
        $ = dom.$;
    
    function showScreen(screenId){
        // sizzle zawsze zwraca tablicę elementów
        var activeScreen = $("#game .screen.active")[0];
        var screen = $("#" + screenId)[0];
        var args;
        
        if (activeScreen) {
            dom.removeClass(activeScreen, "active");
        }
        
        args = Array.prototype.slice.call(arguments, 1);
        rince.screens[screenId].run.apply(
            rince.screens[screenId], args
        );

        dom.addClass(screen, "active");
    }
    
    function createBackground(){
        if (!Modernizr.canvas) {
            alert("Przeglądarka nie obsługuje elementu canvas. Zmień ją na współczesną!");
            return;
        }
        
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var background = $("#game .background")[0];
        var rect = background.getBoundingClientRect();
        var image = rince.images["images/background" + rince.settings.cellSize + ".png"];
        canvas.width = rince.settings.cols * rince.settings.cellSize;
        canvas.height = rince.settings.rows * rince.settings.cellSize;
        ctx.drawImage(image,0,0);
        background.appendChild(canvas);
    }
    
    function setup(){
        dom.bind(document, "touchmove", function(event) {
            event.preventDefault();
        });
        // Chowa pasek adresów w Androidzie.
        if (/Android/.test(navigator.userAgent)) {
            $("html")[0].style.height = "200%";
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        }
        createBackground();
    }
    
    return {
        showScreen: showScreen,
        setup: setup,
        
    };
    
})();
