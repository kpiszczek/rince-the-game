rince.input = (function (){
    
    var dom = rince.dom;
    var $ = dom.$;
    var settings = rince.settings;
    var controls = rince.controls;
    var inputHandlers;
    var keys = {
        37: "KEY_LEFT",
        38: "KEY_UP",
        39: "KEY_RIGHT",
        40: "KEY_DOWN",
        32: "KEY_SPACE"
    };
    
    function initialize(){
        var landscape = $("#game-screen .game-landscape")[0];
        inputHandlers = {};
        
        dom.bind(document, "keydown", function(event){
            var keyName = keys[event.keyCode];
            if (keyName && controls[keyName]){
                event.preventDefault();
                trigger(controls[keyName]);
            }
        });
        
        dom.bind(landscape, "mousedown", function(event){
            handleClick(event, "CLICK", event);
        });
        
        dom.bind(landscape, "touchstart", function(event){
            handleClick(event, "TOUCH", event.targetTouches[0]);
        });
    }
    
    function bind(action, handler){
        if (!inputHandlers[action]){
            inputHandlers[action] = [];
        }
        inputHandlers[action].push(handler);
    }
    
    function trigger(action){
        var handlers = inputHandlers[action];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (handlers){
            for(var i = 0; i < handlers.length; i++){
                try{
                    handlers[i].apply(null, args);
                } catch(e){
                    
                }
            }
        }
    }
    
    function handleClick(){
        
    }
    
    return {
        initialize: initialize,
        bind: bind,
        trigger: trigger
    };
})();
