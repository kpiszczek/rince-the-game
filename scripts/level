rince.landscape = (function(){
    var settings;
    var enemies;
    var cellSize;
    var cols;
    var rows;
    var scores;
    var numEnemyTypes;
    var enemyProbs;
    var player;
    var stop = false;
    var container;

    function initialize(callback){
        settings = rince.settings;
        numEnemyTypes = settings.numEnemyTypes;
        baseScore = settings.baseScore;
        cellSize = settings.cellSize;
        cols = settings.cols;
        rows = settings.rows;
        container = new createjs.Container();
        
        player = new rince.player.Player(rince.images["images/rincesprite" + cellSize + ".png"], 
                                         cols*cellSize, rows*cellSize);
        container.addChild(player);
        player.x = 80;
        player.y = 200;
        
        callback();
    }
    
    function fillLandscape(){
        var x,y;
        enemies = [];
        for (x = 0; x < cols; x++){
            enemies[x] = [];
            for (y = 0; y < rows; y++){
                enemies[x][y] = null;
            }
        }
    }
    
    function getObjects(){
        return container;
    }
    
    function tick(){
        l = container.getNumChildren();
        for (var i=0; i<l; i++){
            container.children[i].tick();
        }
    }
    
    function movePlayerUp(){
        player.direction[1] = -1;
    }
    
    function movePlayerDown(){
        player.direction[1] = 1;
    }
    
    function movePlayerLeft(){
        player.direction[0] = -1;
    }
    
    function movePlayerRight(){
        player.direction[0] = 1;
    }
    
    function resetPlayerHorizontalMove(){
        player.direction[0] = 0;
    }
    
    function resetPlayerVerticalMove(){
        player.direction[1] = 0;
    }
    
    function randomEnemy(){
        return null;
    }
    
    function isStopped(){
        return stop;
    }
    
    return {
        initialize: initialize,
        getObjects: getObjects,
        movePlayerUp: movePlayerUp,
        movePlayerDown: movePlayerDown,
        movePlayerRight: movePlayerRight,
        movePlayerLeft: movePlayerLeft,
        resetPlayerHorizontalMove: resetPlayerHorizontalMove,
        resetPlayerVerticalMove: resetPlayerVerticalMove,
        isStopped: isStopped,
        tick: tick
    };
    
})();
