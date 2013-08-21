rince.level = (function(){
    var stop = 0,
        tickCounter = 0,
        obstacle_types = [],
        obstacles = [],
        items = [],
        monsters = [],
        settings,
        cellSize,
        cols,
        rows,
        scores,
        numEnemyTypes,
        enemyProbs,
        player,
        container,
        Obstacle,
        boss,
        current_level;

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
                                        
        current_level = rince.levels.currentLevel();                                
        obstacle_types = current_level.obstacle_types;                             
        container.addChild(player);
        player.x = 80;
        player.y = 200;

        player.items = [];
        
        callback();
    }
    
    function getObjects(){
        return container;
    }
    
    function compareByY(o1, o2, options){
        if (o1.y > o2.y) { 
            return 1;
        } else {
            return 0;
        }
    }
    
    function tick(){
        var l = container.getNumChildren(),
            child, 
            new_boss,
            new_obstacles = [],
            new_items = [],
            new_monsters = [],
            i;

        if (this.stop > 0) {
            this.stop -= 1;
        } else {
            tickCounter += 1;
        }

        if (tickCounter % 30 == 0 && !isStopped()) {
            new_obstacles = current_level.spawnObstacles();
        } else if (tickCounter % 43 == 0 && !isStopped) {
            new_monsters = current_level.spawnMonsters();
        }  else if (tickCounter % 503 == 0 && !isStopped()) {
            new_boss = current_level.spawnBoss();
        }
        
        //var new_items = current_level.spawnItems(tickCounter);

        for (i = 0; i < new_obstacles.length; i++) {
            obstacles.push(new_obstacles[i]);
            container.addChild(new_obstacles[i]);        
        }

        for (i = 0; i < new_items.length; i++){
            items.push(new_objects[i]);
            container.addChild(new_items[i]);
        }

        for (i = 0; i < new_monsters; i++) {
            monsters.push(new_monsters[i]);
            container.addChild(new_monsters[i]);
        }

        if (new_boss) {
            boss = new_boss;
            container.addChild(boss);
        }
        
        for (i=0; i<l; i++){
            child = container.children[i];
            
            child.tick();
            
            if (child.x < -child.w2){

                container.removeChildAt(i);
                l -= 1;
            }

            if (child !== player){
                if (child.hitRadius(player.x, player.y, player.hit) && player.immune == 0){
                    child.hitAction(player, this); 
                    resetPlayerVerticalMove();    
                    resetPlayerHorizontalMove();            
                }
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
        return this.stop > 0;
    }

    function ifNotStopped(callback) {
        return function(){
            if (this.stop == 0){
                callback();
            } else {
                //pass
            }
        };
    }
    
    return {
        initialize: initialize,
        getObjects: getObjects,
        movePlayerUp: ifNotStopped(movePlayerUp),
        movePlayerDown: ifNotStopped(movePlayerDown),
        movePlayerRight: ifNotStopped(movePlayerRight),
        movePlayerLeft: ifNotStopped(movePlayerLeft),
        resetPlayerHorizontalMove: resetPlayerHorizontalMove,
        resetPlayerVerticalMove: resetPlayerVerticalMove,
        isStopped: isStopped,
        tick: tick,
        stop: stop
    };
    
})();
