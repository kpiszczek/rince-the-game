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
        landscape.movePlayerUp();
    }
    
    function moveDown(){
        landscape.movePlayerDown();
    }
    
    function moveLeft(){
        landscape.movePlayerLeft();
    }
    
    function moveRight(){
        landscape.movePlayerRight();
    }
    
    function stopHorizontal(){
        landscape.resetPlayerHorizontalMove();
    }
    
    function stopVertical(){
        landscape.resetPlayerVerticalMove();
    }
    
    function setup(){
        input.initialize();
        input.bind("keydown_Up", moveUp);
        input.bind("keydown_Down", moveDown);
        input.bind("keydown_Right", moveRight);
        input.bind("keydown_Left", moveLeft);
        input.bind("keyup_Up", stopVertical);
        input.bind("keyup_Down", stopVertical);
        input.bind("keyup_Left", stopHorizontal);
        input.bind("keyup_Right", stopHorizontal);
    }
    
    function playGameEvents(events){
        if (events.length > 0){
            var landscapeEvent = events.shift();
            var next = function(){
                playGameEvents(events);
            };
            
            alert(landscapeEvent.data);
            switch(landscapeEvents.type){
                case "move":
                    display.movePlayer(landscapeEvent.data, next)
                    break;
                default:
                    next();
                    break;
            }
        } else {
        }
    }
    
    return {
        run: run
    };
    
})();
