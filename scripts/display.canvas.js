rince.display = (function(){
    
    var dom = rince.dom,
        $ = dom.$,
        level = rince.level,
        firstRun = true,
        landscapePos = 0,
        skyPos = 0,
        canvas, 
        ctx, 
        landBitmap1, 
        skyBitmap1, 
        landBitmap2, 
        landBitmap2,
        cols, 
        rows, 
        cellSize, 
        stage, 
        previousCycle,
        speed, 
        objects,
        game,
        muteButton,
        menuButton,
        audio;
    
    function init(){
        var landscapeElement = $("#game-screen .game-landscape")[0];
        cols = rince.settings.cols;
        rows = rince.settings.rows;
        cellSize = rince.settings.cellSize;
        speed = rince.settings.speed;
        
        canvas = document.createElement("canvas");
        dom.addClass(canvas,"main-window");
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        landscapeElement.appendChild(canvas);           
        
        stage = new createjs.Stage(canvas);

        game = rince.game; 
        audio = rince.audio;     
    }
    
    function reset(callback) {
        stage.removeAllChildren();
        createjs.Ticker.removeAllListeners();
        stage.update();
        setup();
        callback();
    }
    
    function createAndAddBackground(){
        landBitmap1 = new createjs.Bitmap(rince.levels.currentLevel().landscape);
        skyBitmap1 = new createjs.Bitmap(rince.levels.currentLevel().sky);
        landBitmap2 = new createjs.Bitmap(rince.levels.currentLevel().landscape);
        skyBitmap2 = new createjs.Bitmap(rince.levels.currentLevel().sky);
        
        landBitmap1.x = landscapePos;
        landBitmap2.x = canvas.width - landscapePos;
        
        stage.addChild(landBitmap1);
        stage.addChild(landBitmap2);
        
        skyBitmap1.x = skyPos;
        skyBitmap2.x = canvas.width - landscapePos;
        
        stage.addChild(skyBitmap1);
        stage.addChild(skyBitmap2);  
    }

    function addButtons() {
        muteButton = new rince.button.Button(rince.images['images/checkboxen.jpg'], 34, 29, 100, 100, function(self) {
            return function() {
                audio.toggleMute();
                self.toggle();
            }
        });

        menuButton = new rince.button.Button(rince.images['images/checkboxen.jpg'], 34, 29, 150, 100, function(self) {
            return function() { 
                game.showScreen('main-menu');
            };
        });

        stage.addChild(muteButton);
        stage.addChild(menuButton);
    }
    
    function setup(){
        init();
        createAndAddBackground();
        
        objects = level.getObjects();

        stage.addChild(objects);
        
        createjs.Ticker.addListener(window);
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(rince.settings.fps);

        addButtons();
    }

    function kill(){
        stage.removeAllChildren();
        createjs.Ticker.removeAllListeners();
        stage.update();
    }
    
    function tick(){
        drawLandscape();
        updateButtons();
        level.tick();      
        stage.update();
    }
    
    function drawLandscape(){
        if (!level.isStopped()){
            landscapePos = (landscapePos + speed) % canvas.width;
            skyPos = (skyPos + Math.round(speed/5)) % canvas.width;
        }
        
        var intersection = canvas.width - landscapePos;
        
        if (intersection != 0) { 
            landBitmap1.sourceRect = new createjs.Rectangle(landscapePos, 0, intersection, canvas.height);
        }
        
        if (landscapePos != 0){
            landBitmap2.sourceRect = new createjs.Rectangle(0, 0, landscapePos, canvas.height);
        }
        
        landBitmap1.x = 0;
        landBitmap2.x = intersection;
        
        intersection = canvas.width - skyPos;
        
        if (intersection != 0){
            skyBitmap1.sourceRect = new createjs.Rectangle(skyPos, 0, intersection, canvas.height);
        }
        if (skyPos != 0) {
            skyBitmap2.sourceRect = new createjs.Rectangle(0, 0, skyPos, canvas.height);
        }
        
        skyBitmap1.x = 0;
        skyBitmap2.x = intersection;
    } 

    function updateButtons() {
        if (audio.getMute() === true && muteButton.state === 'off') {
            muteButton.switchOn();
        } else if (audio.getMute()  === false && muteButton.state === 'on') {
            muteButton.switchOff();
        }
    }  
    
    function initialize(callback){
        if (firstRun){
            setup();
            firstRun = false;
        }
        callback();
    }
   
   return {
       initialize: initialize,
       reset: reset,
       kill: kill,
   };   
})();
