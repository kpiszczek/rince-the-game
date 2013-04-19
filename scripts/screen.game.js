rince.screens["game-screen"] = (function(){
    
    var landscape = rince.landscape;
    var display = rince.display;
    var input = rince.input;
    var firstRun = true;
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        }
       
        landscape.initialize(function(){
            display.initialize(function(){
                   // inicjalizacja
            });
        });
    }
    
    function moveUp(){
        landscape.movePlayer(0, -10);
        display.update();
    }
    
    function moveDown(){
        landscape.movePlayer(0, 10);
        display.update();
    }
    
    function moveLeft(){
        landscape.movePlayer(-10, 0);
        display.update();
    }
    
    function moveRight(){
        landscape.movePlayer(10,0);
        display.update();
    }
    
    function setup(){
        input.initialize();
        input.bind("moveUp", moveUp);
        input.bind("moveDown", moveDown);
        input.bind("moveRight", moveRight);
        input.bind("moveLeft", moveLeft);
    }
    
    function playGameEvents(events){
        if (events.length > 0){
            var landscapeEvent = events.shift();
            var next = function(){
                playGameEvents(events);
            };
            
            switch(landscapeEvents.type){
                case "move":
                    display.movePlayer(landscapeEvent.data, next);
                    break;
                default:
                    next();
                    break;
            }
        } else {
            display.redraw(landscape.getLandscape(), function(){
                // Ponowne malowanie
            });
        }
    }
    
    return {
        run: run
    };
    
})();
