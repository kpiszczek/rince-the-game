rince.display = (function(){
    
    var dom = rince.dom;
    var $ = dom.$;
    var canvas, bgcanvas, ctx, bgctx, cols, rows, cellSize;
    var previousCycle;
    var animations = [];
    var firstRun = true;
    var speed = 1;
    var landscapePos = 0;
    var skyPos = 0;
    
    function setup(){
        var landscapeElement = $("#game-screen .game-landscape")[0];
        previousCycle = Date.now();
        cols = rince.settings.cols;
        rows = rince.settings.rows;
        cellSize = rince.settings.cellSize;
        canvas = document.createElement("canvas");
        dom.addClass(canvas,"main-window");
        ctx = canvas.getContext("2d");
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;
        createBackground();
        landscapeElement.appendChild(bgcanvas);
        landscapeElement.appendChild(canvas);           
        requestAnimationFrame(cycle);        
    }
    
    function addAnimation(runTime, fncs){
        var anim = {
            runTime: runTime,
            startTime: Date.now(),
            pos: 0,
            fncs: fncs
        };
        animations.push(anim);
    }
    
    function renderAnimations(time, lastTime){
        var anims = animations.slice(0);
        var n = anims.length;
        var animTime, anim, i;
        
        for (i = 0; i < n; i++){
            anim = anims[i];
            if (anim.fncs.before){
                anim.fncs.before(anim.pos);
            }
            anim.lastPos = anim.pos;
            animTime = Math.abs(lastTime - anim.startTime);
            anim.pos = animTime / anim.runTime;
            anim.pos = Math.max(0,Math.min(1, anim.pos));
        }
        animations = [];
        for (i = 0; i < n; i++){
            anim = anims[i];
            anim.fncs.render(anim.pos, anim.pos - anim.lastPos);
            if (anim.pos == 1){
                if (anim.fncs.done){
                    anim.fncs.done();
                }
            } else {
                animations.push(anim);
            }
        }    
    }
    
    function drawLandscape(pos){
        var landImage = rince.images["images/landscape" + cellSize + ".png"];
        var intersection = bgcanvas.width - landscapePos;
        landscapePos = Math.floor((landscapePos + 5*pos*speed) % bgcanvas.width);
        
        if (intersection !== 0){
            bgctx.drawImage(landImage, 
                landscapePos, 0, 
                intersection, bgcanvas.height,
                0, 0,
                intersection, bgcanvas.height);
        }
        
        if (landscapePos !== 0){
        	bgctx.drawImage(landImage, 
                0, 0,
                landscapePos, bgcanvas.height,
                intersection, 0,
                landscapePos, bgcanvas.height);  
        }
    }
    
    function drawSky(pos){
        var cloudsImage = rince.images["images/clouds" + cellSize + ".png"];
        var intersection = bgcanvas.width - skyPos;
        skyPos = Math.floor((skyPos + pos*speed) % bgcanvas.width);
        
        if (intersection !== 0){
            bgctx.drawImage(cloudsImage, 
                skyPos, 0,
                bgcanvas.width - skyPos, canvas.height, 
                0, 0,
                bgcanvas.width - skyPos, canvas.height);
        }
        
        if (skyPos !== 0){
            bgctx.drawImage(cloudsImage, 
                0, 0, 
                skyPos, canvas.height,
                bgcanvas.width - skyPos, 0,
                skyPos, canvas.height);
        }
    }
    
    function renderLandscape(callback){
        addAnimation(100,{
            before: function(pos){
                clearBackground()
            },
            render: function(pos){    
                drawLandscape(pos);
                drawSky(pos);           
            },
            done: function(){
                if (callback){
                    callback();
                }
            }
        });
    }
    
    function clearBackground(){
        bgcanvas.width = bgcanvas.width;
    }
    
    function cycle(time){
        renderLandscape();
        renderAnimations(time, previousCycle);
        previousCycle = time;
        requestAnimationFrame(cycle);
    }
    
    function createBackground(){               
        bgcanvas = document.createElement("canvas");
        bgctx = bgcanvas.getContext("2d");
        bgcanvas.width = canvas.width;
        bgcanvas.height = canvas.height;
        dom.addClass(bgcanvas,"background");
        drawLandscape(0);
        drawSky(0);
    }
    
    function drawPlayer(x,y){
        var image = rince.images["images/rincewind" + cellSize + ".png"];
        ctx.drawImage(image, x, y);
    }
    
    function redraw(landscape, callback){
        pos = rince.landscape.getPlayerPos();
        drawPlayer(pos.x,pos.y);
    }
    
    function update(){
        canvas.width = canvas.width;
        redraw();
    }
    
    function initialize(callback){
        if (firstRun){
            setup();
            firstRun = false;
            redraw();
        }
        callback();
    }
   
   return {
       initialize: initialize,
       update: update
   };
    
})();
