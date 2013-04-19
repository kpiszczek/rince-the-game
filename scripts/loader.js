var rince = {
    screens: {},
    settings: {
        fps: 30,
        rows: 9,
        cols: 15,
        baseScore: 0,
        numEnemyTypes: 1
    },
    images: {},
    controls: {
        KEY_UP: "moveUp",
        KEY_DOWN: "moveDown",
        KEY_LEFT: "moveLeft",
        KEY_RIGHT: "moveRight",
        KEY_SPACE: "specialAction"
    }
};

Modernizr.standalone = true;

window.addEventListener("load", function(){
    
    var numPreload = 0;
    var numLoaded = 0;
    var playerProto = document.getElementById("player-proto")
    var rect = playerProto.getBoundingClientRect();
    rince.settings.cellSize = rect.width;
    
    yepnope.addPrefix("loader", function(resource){
        var isImage = /.+.(jpg|png|gif)$/i.test(resource.url);
        resource.noexec = isImage;
        numPreload++;
        resource.autoCallback = function(e){
            numLoaded++;
            if (isImage){
                var image = new Image();
                image.src = resource.url;
                rince.images[resource.url] = image;
            }
        };
        return resource;
    });
    
    function getLoadProgress(){
        if (numPreload > 0){
            return numLoaded/numPreload;
        } else {
            return 0;
        }
    }
    
    Modernizr.load([
        {
            load: [
                "scripts/sizzle.js",
                "scripts/dom.js",
                "scripts/requestAnimationFrame.js",
                "loader!images/background" + rince.settings.cellSize + ".png",
                "scripts/game.js"
            ]
                /*"scripts/screen.splash.js",
                "scripts/screen.main-menu.js",
                "scripts/landscape.js"
            ],
            
            complete: function(){
                //console.log("załadowano pliki!");
                rince.game.showScreen("splash-screen");
            }*/
        },{
            test: Modernizr.standalone,
            yep: "scripts/screen.splash.js",
            nope: "scripts/screen.install.js",
            complete: function(){
                rince.game.setup();
                if (Modernizr.standalone){
                    rince.game.showScreen("splash-screen", getLoadProgress);
                } else {
                    rince.game.showScreen("install-screen");
                }
            }
        }
    ]);
    
    if (Modernizr.standalone){
        Modernizr.load([
            {
                load: [                 
                    "loader!scripts/input.js",
                    "loader!scripts/landscape.js",
                    "loader!scripts/display.canvas.js",
                    "loader!scripts/screen.main-menu.js",
                    "loader!scripts/screen.game.js",
                    "loader!images/landscape" + rince.settings.cellSize + ".png",
                    "loader!images/clouds" + rince.settings.cellSize + ".png",
                    "loader!images/rincewind" + rince.settings.cellSize + ".png"                  
                ]
            }
        ]);
    }
    
}, false);
