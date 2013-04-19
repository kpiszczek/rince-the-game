rince.landscape = (function(){
    var settings;
    var enemies;
    var cols;
    var rows;
    var scores;
    var numEnemyTypes;
    var enemyProbs;
    var playerPos;
    var playerBounds;
    
    function initialize(callback){
        settings = rince.settings;
        numEnemyTypes = settings.numEnemyTypes;
        baseScore = settings.baseScore;
        cols = settings.cols;
        rows = settings.rows;
        playerBounds = {
            minX: 0,
            maxX: cols*settings.cellSize - 2*settings.cellSize,
            minY: Math.floor(0.25*rows*settings.cellSize),
            maxY: rows*settings.cellSize - 3*settings.cellSize
        };
        playerPos = {
            x: 20,
            y: playerBounds.minY + (playerBounds.maxY - playerBounds.minY)/2
        };
        fillLandscape();
        callback();
    }
    
    function print(){
        console.log("hello");
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
    
    function movePlayer(dx,dy){
        var x = playerPos.x + dx;
        var y = playerPos.y + dy;
        playerPos.x = Math.max(playerBounds.minX, Math.min(playerBounds.maxX, x));
        playerPos.y = Math.max(playerBounds.minY, Math.min(playerBounds.maxY, y));
    }
    
    function randomEnemy(){
        return null;
    }
    
    function getPlayerPos(){
        return playerPos;
    }
    
    return {
        initialize: initialize,
        print: print,
        getPlayerPos: getPlayerPos,
        movePlayer: movePlayer
    };
    
})();
