rince.level = (function(){
    var settings;
    var cellSize;
    var cols;
    var rows;
    var scores;
    var numEnemyTypes;
    var enemyProbs;
    var player;
    var stop = false;
    var container;
    var tickCounter = 0;
    var Obstacle;
    var obstacles = [];

    function initialize(callback){
        settings = rince.settings;
        numEnemyTypes = settings.numEnemyTypes;
        baseScore = settings.baseScore;
        cellSize = settings.cellSize;
        cols = settings.cols;
        rows = settings.rows;
        container = new createjs.Container();
        Obstacle = rince.obstacle.Obstacle;
        
        player = new rince.player.Player(rince.images["images/rincesprite" + cellSize + ".png"], 
                                         cols*cellSize, rows*cellSize);
                                         
        var image = rince.images["images/tree"+cellSize+".png"];
                                         
        obstacles.push({
            name: "tree",
            image: image,
            prob: 0.2,
            w: image.width,
            h: image.height,
            x: Math.floor(image.width/2),
            y: 195
        })
        container.addChild(player);
        player.x = 80;
        player.y = 200;
        
        callback();
    }
    
    function getObjects(){
        return container;
    }
    
    function compareByY(o1, o2, options){
        if (o1.y > o2.y) { 
            return 1;
        } else if (o1.y < o2.y) {
            return -1;
        } else {
            return 0;
        }
    }
    
    function tick(){
        var child;
        var l = container.getNumChildren();
        
        tickCounter += 1;
        
        if (tickCounter % 150 == 0){
            var o = obstacles[0];
            var obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y)
            container.addChild(obstacle);
            obstacle.y = Math.floor(Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize);
        }
        
        for (var i=0; i<l; i++){
            child = container.children[i];
            
            child.tick();
            
            if (child.x < -child.w2){
                container.removeChildAt(i);
                l -= 1;
            }
        }
        container.sortChildren(compareByY);
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
