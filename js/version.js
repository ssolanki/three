var P360D = P360D || {
    MAYOR_VERSION: "0",
    MINOR_VERSION: "4",
    REVISION: "5"
};
P360D.DOM = function() {};
P360D.DOM.div = function(id) {
    if (document.getElementById(id) == null) {
        var element = document.createElement("div");
        element.id = id;
        return element;
    } else {
        return document.getElementById(id)
    }
};
P360D.DOM.canvas = function(id) {
    if (document.getElementById(id) == null) {
        var canvas = document.createElement("canvas");
        canvas.id = id;
        return canvas;
    } else {
        return document.getElementById(id)
    }
};
P360D.DOM.element = function(type, id) {
    var element = document.createElement(type);
    element.id = id;
    return element;
};
P360D.Utils = function() {};

P360D.Utils.randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) // returns a random number between min and max
};
P360D.Utils.loadJSON = function(url, callback, error) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                if (callback) {
                    callback(JSON.parse(req.responseText))
                }
            } else {
                if (error) {
                    error(req)
                }
            }
        }
    };
    req.open("GET", url, true);
    req.send();
};
P360D.Utils.loadJSON1 = function(url, callback) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == "200") {
            callback(req.responseText)
        }
    };
    req.send(null);
};
P360D.Utils.jsonToArray = function(json) {   
    var objKeys = Object.keys(json);
    objKeys.forEach(function(key) {
        result.push(json[key])
    });
    return result;
};

P360D.MeshUtils = function() {};
P360D.MeshUtils.loadMesh = function(geometry, material) {
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
};
P360D.TextureUtils = function() {};
P360D.TextureUtils.loadTexture = function(path, anisotropy, callback) {
    var texture = THREE.ImageUtils.loadTexture(path, undefined, callback);
    texture.anisotropy = anisotropy || 8;
    return texture;
};
P360D.TextureUtils.loadRepeatableTexture = function(path, _0x1fbcx31, _0x1fbcx32, anisotropy, callback) {
    var texture = THREE.ImageUtils.loadTexture(path, undefined, callback);
    texture.anisotropy = anisotropy || 8;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(_0x1fbcx31, _0x1fbcx32);
    return texture;
};
P360D.FurnitureMaterial = function(diffuse, bumpmapImage) {
    THREE.MeshPhongMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
    scope.map = diffuse || null;
    scope.bumpMap = bumpmapImage || null;
    scope.bumpScale = 0.2;
    scope.specular.setStyle("#000000");
};
P360D.FurnitureMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);
P360D.WallMaterial = function(diffuse, bumpmapImage) {
    THREE.MeshPhongMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
    scope.map = diffuse || null;
    scope.bumpMap = bumpmapImage || null;
    scope.bumpScale = 2.0;
};
P360D.WallMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);
P360D.FloorMaterial = function(diffuse, bumpmapImage) {
    THREE.MeshPhongMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
    scope.map = diffuse || null;
};
P360D.FloorMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);
P360D.ClosetMaterial = function(diffuse, skybox) {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
    scope.map = diffuse || null;
    scope.reflectivity = 0.0;
    scope.combine = THREE.MultiplyOperation;
    scope.envMap = skybox;
};
P360D.ClosetMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
P360D.CurtainsMaterial = function(diffuse) {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
    scope.map = diffuse || null;
    scope.transparent = true;
    scope.opacity = 0.9;
};
P360D.CurtainsMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
P360D.TilesMaterial = function(diffuse) {
    THREE.MeshPhongMaterial.call(this);
    var scope = this;
    scope.map = diffuse || null;
    scope.color.setStyle(color);
    scope.lightMap = null;
};
P360D.TilesMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);
P360D.ChromeMaterial = function(skybox) {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle("#ffffff");
    scope.reflectivity = 0.7;
    scope.combine = THREE.MultiplyOperation;
    scope.envMap = skybox;
};
P360D.ChromeMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
P360D.MetalMaterial = function(skybox) {
    THREE.MeshLambertMaterial.call(this);
    var scope = this;
    scope.color.setStyle("#9a9a9a");
    scope.reflectivity = 0.3;
    scope.combine = THREE.MixOperation;
    scope.envMap = skybox;
};
P360D.MetalMaterial.prototype = Object.create(THREE.MeshLambertMaterial.prototype);
P360D.DecoMaterial = function(diffuse) {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.map = diffuse || null;
};
P360D.DecoMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
P360D.CeilingMaterial = function() {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle(color);
    scope.lightMap = null;
};
P360D.CeilingMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);
P360D.CeramicsMaterial = function(diffuse, skybox) {
    THREE.MeshPhongMaterial.call(this);
    var scope = this;
    scope.map = diffuse || null;
    scope.envMap = skybox;
    scope.reflectivity = 0.04;
    scope.lightMap = null;
};
P360D.CeramicsMaterial.prototype = Object.create(THREE.MeshPhongMaterial.prototype);
P360D.GlassMaterial = function(skybox) {
    THREE.MeshBasicMaterial.call(this);
    var scope = this;
    scope.color.setStyle("#99CCFF");
    scope.transparent = true;
    scope.depthWrite = false;
    scope.opacity = 0.2;
    scope.reflectivity = 0.3;
    scope.envMap = skybox || null;
};
P360D.GlassMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype);

P360D.MeshUtils.toggleObject3D = function(_0x1fbcx2b, visible) {
    _0x1fbcx2b.traverse(function(object) {
        object.visible = visible
    })
};


P360D.TextureUtils.loadCubeTextures = function(texture, anisotropy, callback) {
    var _0x1fbcx34 = THREE.ImageUtils.loadTextureCube(texture, undefined, callback);
    _0x1fbcx34.format = THREE.RGBFormat;
    _0x1fbcx34.anisotropy = anisotropy || 0;
    return _0x1fbcx34;
};
P360D.TextureUtils.loadTextureCubeProcedurally = function(texture, anisotropy, callback) {
    var index = 0;
    var _0x1fbcx34 = [];

    function _0x1fbcx35() {
        index++;
        if (callback && index == texture.length) {
            for (var i = 0; i < texture.length; i++) {
                _0x1fbcx34[i].needsUpdate = true
            };
            callback();
        };
    }
    for (var _0x1fbcx36 = 0; _0x1fbcx36 < texture.length; _0x1fbcx36++) {
        var texture = P360D.TextureUtils.loadTexture(texture[_0x1fbcx36], anisotropy, _0x1fbcx35);
        _0x1fbcx34.push(texture);
    };
    return _0x1fbcx34;
};
P360D.TextureUtils.renderToTexture = function(renderer, scene, camera) {
    var image = new Image();
    renderer.clear();
    renderer.render(scene, camera);
    image.src = renderer.context.canvas.toDataURL("image/jpeg");
    image.addEventListener(Event.LOAD, function(event) {
        var canvas = P360D.DOM.canvas("c"),
            _0x1fbcx3b = canvas.getContext("2d");
        canvas.width = _0x1fbcx3b.width = 1024;
        canvas.height = _0x1fbcx3b.height = 1024;
        _0x1fbcx3b.drawImage(event.currentTarget, 0, 0, 1024, 1024);
        var _0x1fbcx3c = new THREE.Texture(canvas);
        _0x1fbcx3c.needsUpdate = true;
        return _0x1fbcx3c;
    });
};
P360D.GeometryUtils = function() {};
P360D.SceneUtils = function() {};
P360D.SceneUtils.geopositionToVector3 = function(varX, varY, varZ) {
    var phi = (varX) * Math.PI / 180;
    var theta = (varY - 180) * Math.PI / 180;
    var xcomp = -(varZ) * Math.cos(phi) * Math.cos(theta);
    var ycomp = (varZ) * Math.sin(phi);
    var zcomp = (varZ) * Math.cos(phi) * Math.sin(theta);
    return new THREE.Vector3(xcomp, ycomp, zcomp);
};

var Keyboard = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69, 
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    NUMBER_0: 48,
    NUMBER_1: 49,
    NUMBER_2: 50,
    NUMBER_3: 51,
    NUMBER_4: 52,
    NUMBER_5: 53,
    NUMBER_6: 54,
    NUMBER_7: 55,
    NUMBER_8: 56,
    NUMBER_9: 57,
    NUMPAD_0: 45,
    NUMPAD_1: 35,
    NUMPAD_2: 40,
    NUMPAD_3: 34,
    NUMPAD_4: 37,
    NUMPAD_5: 12,
    NUMPAD_6: 39,
    NUMPAD_7: 36,
    NUMPAD_8: 38,
    NUMPAD_9: 33,
    NUMPAD_ADD: 107,
    NUMPAD_SUBTRACT: 109,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 13,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    ESCAPE: 27,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    INSERT: 45,
    DELETE: 46,
    HOME: 36,
    END: 35,
    NUMBER_PAD_LOCK: 144,
    BACKSPACE: 8,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
};

var MouseEvent = {
    CLICK: "click",
    DOUBLE_CLICK: "dblclick",
    MOUSE_OVER: "mouseover",
    MOUSE_OUT: "mouseout",
    MOUSE_ENTER: "mouseenter",
    MOUSE_LEAVE: "mouseleave",
    ROLL_OVER: "mouseenter",
    ROLL_OUT: "mouseleave",
    MOUSE_DOWN: "mousedown",
    MOUSE_UP: "mouseup",
    MOUSE_MOVE: "mousemove",
    WHEEL: "wheel",
    MOUSE_WHEEL: "mousewheel",
    DOM_MOUSE_SCROLL: "DOMMouseScroll",
    DRAG: "drag",
    DRAG_START: "dragstart",
    DRAG_END: "dragend",
    DRAG_ENTER: "dragenter",
    DRAG_EXIT: "dragexit",
    DRAG_OVER: "dragover",
    DROP: "drop"
};
var TouchEvent = {
    TOUCH_START: "touchstart",
    TOUCH_END: "touchend",
    TOUCH_MOVE: "touchmove",
    TOUCH_CANCEL: "touchcancel"
};
var Event = {
    EVENT: "Event",
    LOAD: "load",
    LOAD_START: "loadstart",
    BEFORE_UNLOAD: "beforeunload",
    UNLOAD: "unload",
    LOADED_DATA: "loadeddata",
    LOADED_METADATA: "loadedmetadata",
    DOM_ACTIVE: "DOMActive",
    ABORT: "abort",
    ERROR: "error",
    CANCEL: "cancel",
    CLOSE: "close",
    SELECT: "select",
    RESIZE: "resize",
    SCROLL: "scroll",
    EMPTIED: "emptied",
    DURATION_CHANGE: "durationchange",
    INPUT: "input",
    AFTER_PRINT: "afterprint",
    BEFORE_PRINT: "beforeprint",
    HASH_CHANGE: "hashchange",
    MESSAGE: "message",
    OFFLINE: "offline",
    ONLINE: "online",
    PAGE_HIDE: "pagehide",
    PAGE_SHOW: "pageshow",
    POP_STATE: "popstate",
    STORAGE: "storage",
    CONTEXT_MENU: "contextmenu",
    BLUR: "blur",
    DOM_FOCUS_IN: "DOMFocusIn",
    DOM_FOCUS_OUT: "DOMFocusOut",
    FOCUS: "focus",
    FOCUS_IN: "focusin",
    FOCUS_OUT: "focusout",
    PROGRESS: "progress",
    COMPLETE: "complete",
    FULLSCREEN_CHANGE: "fullscreenchange"
};
var KeyboardEvent = {
    KEY_DOWN: "keydown",
    KEY_UP: "keyup",
    KEY_PRESS: "keypress"
};
var Directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    FRONT: "front",
    BACK: "back",
    CENTER: "center"
};
var ControllerType = {
    AUTO_MIXED: "automixed",
    AUTO_PAN_ONLY: "autopanonly",
    AUTO_TILT_ONLY: "autotiltonly",
    FREE: "free",
    MIXED: "mixed",
    CONSTRAINT: "constraint",
    FIXED: "fixed"
};

