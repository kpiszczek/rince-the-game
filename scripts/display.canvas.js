rince.display = (function(){
    
    var dom = rince.dom;
    var $ = dom.$;
    var canvas, ctx, landBitmap1, skyBitmap1, landBitmap2, landBitmap2;
    var cols, rows, cellSize, stage;
    var landscape = rince.landscape;
    var previousCycle;
    var firstRun = true;
    var speed = 1;
    var landscapePos = 0;
    var skyPos = 0;
    var player;
    
    function init(){
        var landscapeElement = $("#game-screen .game-landscape")[0];
        cols = rince.settings.cols;
        rows = rince.settings.rows;
        cellSize = rince.settings.cellSize;
        
        canvas = document.createElement("canvas");
        dom.addClass(canvas,"main-window");
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        landscapeElement.appendChild(canvas);           
        
        stage = new createjs.Stage(canvas)       
    }
    
    function reset(){
        stage.removeAllChildren();
        createjs.Ticker.removeAllListeners();
        stage.update();
    }
    
    function createAndAddBackground(){
        landBitmap1 = new createjs.Bitmap(rince.images["images/landscape" + cellSize + ".png"]);
        skyBitmap1 = new createjs.Bitmap(rince.images["images/clouds" + cellSize + ".png"]);
        landBitmap2 = new createjs.Bitmap(rince.images["images/landscape" + cellSize + ".png"]);
        skyBitmap2 = new createjs.Bitmap(rince.images["images/clouds" + cellSize + ".png"]);
        
        landBitmap1.x = landscapePos;
        landBitmap2.x = canvas.width - landscapePos;
        
        stage.addChild(landBitmap1);
        stage.addChild(landBitmap2);
        
        skyBitmap1.x = skyPos;
        skyBitmap2.x = canvas.width - landscapePos;
        
        stage.addChild(skyBitmap1);
        stage.addChild(skyBitmap2);      
    }
    
    function setup(){
        init();
        createAndAddBackground();
        
        player = landscape.getPlayer();

        stage.addChild(player);
        
        createjs.Ticker.addListener(window);
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(rince.settings.fps);
    }
    
    function tick(){
        drawLandscape();
        player.tick();      
        stage.update();
    }
    
    function drawLandscape(){
        landscapePos = (landscapePos + 5*speed) % canvas.width;
        skyPos = (skyPos + 1*speed) % canvas.width;
        
        var intersection = canvas.width - landscapePos;
              
        landBitmap1.sourceRect = new createjs.Rectangle(landscapePos, 0, intersection, canvas.height);
        landBitmap2.sourceRect = new createjs.Rectangle(0, 0, landscapePos, canvas.height);
        
        landBitmap1.x = 0;
        landBitmap2.x = intersection;
        
        intersection = canvas.width - skyPos;
        
        skyBitmap1.sourceRect = new createjs.Rectangle(skyPos, 0, intersection, canvas.height);
        skyBitmap2.sourceRect = new createjs.Rectangle(0, 0, skyPos, canvas.height);
        
        skyBitmap1.x = 0;
        skyBitmap2.x = intersection;
    }    
    
    function initialize(callback){
        if (firstRun){
            setup();
            firstRun = false;
        }
        callback();
    }
   
   return {
       initialize: initialize
   };   
})();
