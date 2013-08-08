rince.screens["game-screen"] = (function(){
    
    var level = rince.level;
    var display = rince.display;
    var input = rince.input;
    var firstRun = true;
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        }
       

        level.initialize(function(){
            display.initialize(function(){
                   // inicjalizacja
            });
        });
    }
    
    function moveUp(){
        level.movePlayerUp();
    }
    
    function moveDown(){
        level.movePlayerDown();
    }
    
    function moveLeft(){
        level.movePlayerLeft();
    }
    
    function moveRight(){
        level.movePlayerRight();
    }
    
    function stopHorizontal(){
        level.resetPlayerHorizontalMove();
    }
    
    function stopVertical(){
        level.resetPlayerVerticalMove();
    }
    
    function setup(){
        input.initialize();
        rince.levels.initialize();
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
            var levelEvent = events.shift();
            var next = function(){
                playGameEvents(events);
            };
            
            switch(levelEvent.type){
                case "move":
                    display.movePlayer(levelEvent.data, next)
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
