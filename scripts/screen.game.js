rince.screens["game-screen"] = (function(){
    
    var level = rince.level,
        display = rince.display,
        input = rince.input,
        firstRun = true,
        audio = rince.audio,
        game = rince.game;
    
    function run(){
        if (firstRun){
            setup();
            firstRun = false;
        }
       

        level.initialize(function(){
            display.initialize(function(){
                display.reset(function(){
                    audio.initialize();
                });
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
        input.bind("keydown_Exit", function(){
            game.showScreen('main-menu');
        });
        input.bind("keydown_Mute", function(){
            
            audio.toggleMute();
        });
    }
    
    function playGameEvents(events){
        if (events.length > 0){
            var levelEvent = events.shift();
            var next = function() {
                playGameEvents(events);
            };
            
            switch(levelEvent.type){
                case "move":
                    display.movePlayer(levelEvent.data, next);
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
