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

    function initialize(callback){
        settings = rince.settings;
        numEnemyTypes = settings.numEnemyTypes;
        baseScore = settings.baseScore;
        cellSize = settings.cellSize;
        cols = settings.cols;
        rows = settings.rows;
        
        player = new rince.player.Player(rince.images["images/rincesprite" + cellSize + ".png"], cols*cellSize)
        alert("landscape.init: " + player);
        player.x = 100;
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
    
    function getPlayer(){
        return player;
    }
    
    function movePlayer(x,y){
        player.direction = [x, y];
    }
    
    function randomEnemy(){
        return null;
    }
    
    return {
        initialize: initialize,
        getPlayer: getPlayer
    };
    
})();
