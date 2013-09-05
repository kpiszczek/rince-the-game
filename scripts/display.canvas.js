rince.display = (function(){
    
    var dom = rince.dom,
        $ = dom.$,
        level = rince.level,
        levels = rince.levels,
        firstRun = true,
        landscapePos = 0,
        skyPos = 0,
        player,
        canvas, 
        ctx,
        //overlayCanvas,
        landBitmap1, 
        skyBitmap1, 
        landBitmap2, 
        cols, 
        rows, 
        cellSize, 
        stage, 
        //overlays,
        previousCycle,
        speed, 
        objects,
        game,
        muteButton,
        menuButton,
        potatoIndicator,
        potatoIndicatorBitmap,
        audio;
    
    function init() {
        var landscapeElement = $("#game-screen .game-landscape")[0];

        cols = rince.settings.cols;
        rows = rince.settings.rows;
        cellSize = rince.settings.cellSize;
        speed = rince.settings.speed;
        
        canvas = document.createElement("canvas");
        ctx = canvas.getContext('2d');

        dom.addClass(canvas, "main-window");
        canvas.style.position = 'absolute';
        canvas.style.zIndex = 2;
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        /*overlayCanvas = document.createElement('canvas');
        overlayCanvas.style.position = 'absolute';
        overlayCanvas.zIndex = 1;

        overlayCanvas.width = cols * cellSize;
        overlayCanvas.height = rows * cellSize;*/

        landscapeElement.appendChild(canvas); 
        //landscapeElement.appendChild(overlayCanvas);        
        
        stage = new createjs.Stage(canvas);
        //overlays = new createjs.Stage(canvas);

        game = rince.game; 
        audio = rince.audio;    
    }
    
    function reset(callback) {
        stage.removeAllChildren();
        //overlays.removeAllChildren();
        createjs.Ticker.removeAllListeners();
        stage.update();
        //overlays.update();
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
        muteButton = new rince.buttons.ToggleButton(
            rince.images['images/mute' + cellSize + '.png'], 
            41, 41, 60, 10, 
            function(){
                audio.toggleMute();
            }
        );

        menuButton = new rince.buttons.Button(
            rince.images['images/menu' + cellSize + '.png'], 
            10, 10, 
            function() {
                game.showScreen('main-menu');
            }
        );

        //overlays.addChild(muteButton);
        //overlays.addChild(menuButton);
        stage.addChild(muteButton);
        stage.addChild(menuButton);
    }

    function addIndicators(){
        potatoIndicatorBitmap = new createjs.Bitmap(rince.images["images/potato" + cellSize + ".png"]);
        potatoIndicatorBitmap.alwaysOnTop = true;
        potatoIndicatorBitmap.x = 450;
        potatoIndicatorBitmap.y = 10;

        potatoIndicator = new createjs.Text("{0}/{1}".format(0, level.needed_potatoes), "24px Helvetica");
        potatoIndicator.x = 520;
        potatoIndicator.y = 10;
        potatoIndicator.alwaysOnTop = true;

        stage.addChild(potatoIndicatorBitmap);
        stage.addChild(potatoIndicator);
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
        addIndicators();
    }

    function kill(){
        if (stage) {
            stage.removeAllChildren();
            createjs.Ticker.removeAllListeners();
            stage.update();

            /*overlays.removeAllChildren();
            overlays.update();*/
        }
    }
    
    function tick(){
        drawLandscape();
        updateButtons();
        updateIndicators();
        level.tick();      
        stage.update();
        //overlays.update();
    }
    
    function drawLandscape(){
        if (!level.isStopped()){
            landscapePos = (landscapePos + speed) % canvas.width;
            skyPos = (skyPos + Math.round(speed/5)) % canvas.width;
        }
        
        var intersection = canvas.width - landscapePos;
        
        if (intersection !== 0) { 
            landBitmap1.sourceRect = new createjs.Rectangle(landscapePos, 0, intersection, canvas.height);
        }
        
        if (landscapePos !== 0){
            landBitmap2.sourceRect = new createjs.Rectangle(0, 0, landscapePos, canvas.height);
        }
        
        landBitmap1.x = 0;
        landBitmap2.x = intersection;
        
        intersection = canvas.width - skyPos;
        
        if (intersection !== 0){
            skyBitmap1.sourceRect = new createjs.Rectangle(skyPos, 0, intersection, canvas.height);
        }
        if (skyPos !== 0) {
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

    function updateIndicators() {
        potatoIndicator.text = "{0}/{1}".format((level.getPotatoes()), levels.currentLevel().needed_potatoes);
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
