
P360D.MouseEvent3DManager = function(camera, domElement) {
    this._camera = camera || null;
    this.domElement = domElement || document;
    this._projector = new THREE.Projector();
    this._selected = null;
    this._boundObjs = [];
    var scope = this;
    scope.mouseX, scope.mouseY;
    this.init = function() {
        this.clickEvent = touchSupport ? TouchEvent.TOUCH_START : MouseEvent.CLICK;
        this.startEvent = touchSupport ? TouchEvent.TOUCH_START : MouseEvent.MOUSE_DOWN;
        this.moveEvent = touchSupport ? TouchEvent.TOUCH_MOVE : MouseEvent.MOUSE_MOVE;
        this.endEvent = touchSupport ? TouchEvent.TOUCH_END : MouseEvent.MOUSE_UP;
        this._onClick = function() {
            scope.onClick.apply(scope, arguments)
        };
        this._onDblClick = function() {
            scope.onDblClick.apply(scope, arguments)
        };
        this._onMouseMove = function() {
            scope.onMouseMove.apply(scope, arguments)
        };
        this._onMouseDown = function() {
            scope.onMouseDown.apply(scope, arguments)
        };
        this._onMouseUp = function() {
            scope.onMouseUp.apply(scope, arguments)
        };
        this._onTouchMove = function() {
            scope.onTouchMove.apply(scope, arguments)
        };
        this._onTouchStart = function() {
            scope.onTouchStart.apply(scope, arguments)
        };
        this._onTouchEnd = function() {
            scope.onTouchEnd.apply(scope, arguments)
        };
    };
    this.objectContextInit = function(_0x1fbcx2b) {
        _0x1fbcx2b.domEvent = {}
    };
    this.objectContextDelete = function(_0x1fbcx2b) {
        delete _0x1fbcx2b.domEvent
    };
    this.objectContextIsInit = function(_0x1fbcx2b) {
        return _0x1fbcx2b.domEvent ? true : false
    };
    this.objectContextGet = function(_0x1fbcx2b) {
        return _0x1fbcx2b.domEvent
    };
    this.camera = function(value) {
        if (value) {
            this._camera = value
        };
        return this._camera;
    };
    this.bind = function(_0x1fbcx2b, _0x1fbcx47, callback, _0x1fbcx15) {
        if (!this.objectContextIsInit(_0x1fbcx2b)) {
            this.objectContextInit(_0x1fbcx2b)
        };
        var _0x1fbcx48 = this.objectContextGet(_0x1fbcx2b);
        if (!_0x1fbcx48[_0x1fbcx47 + "Handlers"]) {
            _0x1fbcx48[_0x1fbcx47 + "Handlers"] = []
        };
        _0x1fbcx48[_0x1fbcx47 + "Handlers"].push({
            callback: callback,
            useCapture: _0x1fbcx15
        });
        this._boundObjs.push(_0x1fbcx2b);
    };
    this.unbind = function(_0x1fbcx2b, _0x1fbcx47, callback, _0x1fbcx15) {
        if (!this.objectContextIsInit(_0x1fbcx2b)) {
            this.objectContextInit(_0x1fbcx2b)
        };
        var _0x1fbcx48 = this.objectContextGet(_0x1fbcx2b);
        if (!_0x1fbcx48[_0x1fbcx47 + "Handlers"]) {
            _0x1fbcx48[_0x1fbcx47 + "Handlers"] = []
        };
        var _0x1fbcx49 = _0x1fbcx48[_0x1fbcx47 + "Handlers"];
        for (var i = 0; i < _0x1fbcx49.length; i++) {
            var _0x1fbcx4a = _0x1fbcx49[i];
            if (callback != _0x1fbcx4a.callback) {
                continue
            };
            if (_0x1fbcx15 != _0x1fbcx4a.useCapture) {
                continue
            };
            _0x1fbcx49.splice(i, 1);
            break;
        };
        var index = this._boundObjs.indexOf(_0x1fbcx2b);
        this._boundObjs.splice(index, 1);
    };
    this.bound = function(_0x1fbcx47, _0x1fbcx2b) {
        var _0x1fbcx48 = this.objectContextGet(_0x1fbcx2b);
        if (!_0x1fbcx48) {
            return false
        };
        return _0x1fbcx48[_0x1fbcx47 + "Handlers"] ? true : false;
    };
    this.onMove = function(_0x1fbcx4b, _0x1fbcx4c, _0x1fbcx4d) {
        var _0x1fbcx4e = new THREE.Vector3(_0x1fbcx4b, _0x1fbcx4c, 1);
        this._projector.unprojectVector(_0x1fbcx4e, this._camera);
        var _0x1fbcx4f = new THREE.Raycaster(this._camera.position, _0x1fbcx4e.sub(this._camera.position).normalize());
        var _0x1fbcx50 = _0x1fbcx4f.intersectObjects(this._boundObjs);
        var _0x1fbcx51 = this._selected;
        if (_0x1fbcx50.length > 0) {
            var _0x1fbcx52 = _0x1fbcx50[0];
            var _0x1fbcx53 = _0x1fbcx52.object;
            this._selected = _0x1fbcx53;
            var _0x1fbcx54, _0x1fbcx55;
            if (_0x1fbcx51 != _0x1fbcx53) {
                _0x1fbcx54 = this.bound(MouseEvent.MOUSE_OVER, _0x1fbcx53);
                _0x1fbcx55 = _0x1fbcx51 && this.bound(MouseEvent.MOUSE_OUT, _0x1fbcx51);
            };
        } else {
            _0x1fbcx55 = _0x1fbcx51 && this.bound(MouseEvent.MOUSE_OUT, _0x1fbcx51);
            this._selected = null;
        };
        _0x1fbcx54 && this.notify(MouseEvent.MOUSE_OVER, _0x1fbcx53, _0x1fbcx4d);
        _0x1fbcx55 && this.notify(MouseEvent.MOUSE_OUT, _0x1fbcx51, _0x1fbcx4d);
    };
    this.onEvent = function(_0x1fbcx47, _0x1fbcx4b, _0x1fbcx4c, _0x1fbcx4d) {
        var _0x1fbcx4e = new THREE.Vector3(_0x1fbcx4b, _0x1fbcx4c, 1);
        this._projector.unprojectVector(_0x1fbcx4e, this._camera);
        _0x1fbcx4e.sub(this._camera.position).normalize();
        var _0x1fbcx4f = new THREE.Raycaster(this._camera.position, _0x1fbcx4e);
        var _0x1fbcx50 = _0x1fbcx4f.intersectObjects(this._boundObjs);
        if (_0x1fbcx50.length === 0) {
            return
        };
        var _0x1fbcx52 = _0x1fbcx50[0];
        var _0x1fbcx2b = _0x1fbcx52.object;
        var _0x1fbcx48 = this.objectContextGet(_0x1fbcx2b);
        if (!_0x1fbcx48) {
            return
        };
        this.notify(_0x1fbcx47, _0x1fbcx2b, _0x1fbcx4d);
    };
    this.notify = function(_0x1fbcx47, _0x1fbcx2b, _0x1fbcx4d) {
        var _0x1fbcx48 = this.objectContextGet(_0x1fbcx2b);
        var _0x1fbcx49 = _0x1fbcx48 ? _0x1fbcx48[_0x1fbcx47 + "Handlers"] : null;
        if (!_0x1fbcx48 || !_0x1fbcx49 || _0x1fbcx49.length === 0) {
            _0x1fbcx2b.parent && this.notify(_0x1fbcx47, _0x1fbcx2b.parent);
            return;
        };
        var _0x1fbcx49 = _0x1fbcx48[_0x1fbcx47 + "Handlers"];
        for (var i = 0; i < _0x1fbcx49.length; i++) {
            var _0x1fbcx4a = _0x1fbcx49[i];
            var _0x1fbcx56 = true;
            var _0x1fbcx57 = true;
            _0x1fbcx4a.callback({
                type: _0x1fbcx47,
                target: _0x1fbcx2b,
                currentTarget: _0x1fbcx2b,
                origDomEvent: _0x1fbcx4d,
                stopPropagation: function() {
                    _0x1fbcx56 = false
                },
                preventDefault: function() {
                    _0x1fbcx57 = false
                }
            });
            if (!_0x1fbcx56) {
                continue
            };
            if (!_0x1fbcx57) {
                continue
            };
            if (_0x1fbcx4a.useCapture === false) {
                _0x1fbcx2b.parent && this.notify(_0x1fbcx47, _0x1fbcx2b.parent)
            };
        };
    };
    this.onMouseDown = function(event) {
        return this.onMouseEvent(MouseEvent.MOUSE_DOWN, event)
    };
    this.onMouseUp = function(event) {
        return this.onMouseEvent(MouseEvent.MOUSE_UP, event)
    };
    this.onMouseEvent = function(_0x1fbcx47, _0x1fbcx58) {
        var _0x1fbcx4b = +(_0x1fbcx58.clientX / window.innerWidth) * 2 - 1;
        var _0x1fbcx4c = -(_0x1fbcx58.clientY / window.innerHeight) * 2 + 1;
        scope.mouseX = _0x1fbcx58.clientX;
        scope.mouseY = _0x1fbcx58.clientY;
        return this.onEvent(_0x1fbcx47, _0x1fbcx4b, _0x1fbcx4c, _0x1fbcx58);
    };
    this.onMouseMove = function(_0x1fbcx58) {
        var _0x1fbcx4b = +(_0x1fbcx58.clientX / window.innerWidth) * 2 - 1;
        var _0x1fbcx4c = -(_0x1fbcx58.clientY / window.innerHeight) * 2 + 1;
        return this.onMove(_0x1fbcx4b, _0x1fbcx4c, _0x1fbcx58);
    };
    this.onClick = function(event) {
        return this.onMouseEvent(MouseEvent.CLICK, event)
    };
    this.onDblClick = function(event) {
        return this.onMouseEvent(MouseEvent.DOUBLE_CLICK, event)
    };
    this.onTouchStart = function(event) {
        return this.onTouchEvent(TouchEvent.TOUCH_START, event)
    };
    this.onTouchEnd = function(event) {
        return this.onTouchEvent(TouchEvent.TOUCH_END, event)
    };
    this.onTouchMove = function(_0x1fbcx58) {
        if (_0x1fbcx58.touches.length != 1) {
            return undefined
        };
        var _0x1fbcx4b = +(_0x1fbcx58.touches[0].pageX / window.innerWidth) * 2 - 1;
        var _0x1fbcx4c = -(_0x1fbcx58.touches[0].pageY / window.innerHeight) * 2 + 1;
        return this.onMove(_0x1fbcx4b, _0x1fbcx4c, _0x1fbcx58);
    };
    this.onTouchEvent = function(_0x1fbcx47, _0x1fbcx58) {
        if (_0x1fbcx58.touches.length != 1) {
            return undefined
        };
        var _0x1fbcx4b = +(_0x1fbcx58.touches[0].pageX / window.innerWidth) * 2 - 1;
        var _0x1fbcx4c = -(_0x1fbcx58.touches[0].pageY / window.innerHeight) * 2 + 1;
        return this.onEvent(_0x1fbcx47, _0x1fbcx4b, _0x1fbcx4c, _0x1fbcx58);
    };
    this.enabled = function(value) {
        if (value) {
            this.domElement.addEventListener(this.clickEvent, this._onClick, false);
            this.domElement.addEventListener(MouseEvent.DOUBLE_CLICK, this._onDblClick, false);
            this.domElement.addEventListener(this.moveEvent, this._onMouseMove, false);
            this.domElement.addEventListener(this.startEvent, this._onMouseDown, false);
            this.domElement.addEventListener(this.endEvent, this._onMouseUp, false);
            this.domElement.addEventListener(TouchEvent.TOUCH_MOVE, this._onTouchMove, false);
            this.domElement.addEventListener(TouchEvent.TOUCH_START, this._onTouchStart, false);
            this.domElement.addEventListener(TouchEvent.TOUCH_END, this._onTouchEnd, false);
        } else {
            this.domElement.removeEventListener(this.clickEvent, this._onClick, false);
            this.domElement.removeEventListener(MouseEvent.DOUBLE_CLICK, this._onDblClick, false);
            this.domElement.removeEventListener(this.moveEvent, this._onMouseMove, false);
            this.domElement.removeEventListener(this.startEvent, this._onMouseDown, false);
            this.domElement.removeEventListener(this.endEvent, this._onMouseUp, false);
            this.domElement.removeEventListener(TouchEvent.TOUCH_MOVE, this._onTouchMove, false);
            this.domElement.removeEventListener(TouchEvent.TOUCH_START, this._onTouchStart, false);
            this.domElement.removeEventListener(TouchEvent.TOUCH_END, this._onTouchEnd, false);
        }
    };
    this.init();
    this.enabled(true);
};
P360D.InteractiveScene = function(camera, domElement) {
    var _0x1fbcx59 = function() {
        _0x1fbcx59.symbols.forEach(function(_0x1fbcx5a) {
            THREE.Object3D.prototype[_0x1fbcx5a] = _0x1fbcx59.previous[_0x1fbcx5a]
        })
    };
    _0x1fbcx59.symbols = ["addEventListener", "removeEventListener"];
    _0x1fbcx59.previous = {};
    _0x1fbcx59.symbols.forEach(function(_0x1fbcx5a) {
        _0x1fbcx59.previous[_0x1fbcx5a] = THREE.Object3D.prototype[_0x1fbcx5a]
    });
    THREE.Object3D.domEvent = new P360D.MouseEvent3DManager(camera, domElement);
    THREE.Object3D.prototype.addEventListener = function(_0x1fbcx47, callback, _0x1fbcx15) {
        THREE.Object3D.domEvent.bind(this, _0x1fbcx47, callback, _0x1fbcx15);
        return this;
    };
    THREE.Object3D.prototype.removeEventListener = function(_0x1fbcx47, callback, _0x1fbcx15) {
        THREE.Object3D.domEvent.unbind(this, _0x1fbcx47, callback, _0x1fbcx15);
        return this;
    };
    this.enabled = function(value) {
        THREE.Object3D.domEvent.enabled(value)
    };
    this.setCamera = function(value) {
        THREE.Object3D.domEvent.camera(value)
    };
    this.mouseX = function() {
        return THREE.Object3D.domEvent.mouseX
    };
    this.mouseY = function() {
        return THREE.Object3D.domEvent.mouseY
    };
};



var anisotropy = 8;
var color = "#ffffff";
var floorColors = ["#888888", "#675139", "#888888", "#888888", "#888888", "#d0bd9f", "#d3b591", "#4f2914", "#000000", "#dcccbd", "#315b0e", "#e0d4c4", "#cbb190", "#f3b76f"];
var floorReflectivities = [0.02, 0.05, 0.1, 0.1, 0.05, 0.0, 0.03, 0.05, 0.0, 0.1, 0.06, 0.03, 0.05, 0.03];
var floorBathColors = ["#888888", "#aaaaaa", "#e6d4c0", "#eed1b3", "#555555", "#afafaf", "#555555", "#e7caaa", "#e8e4cb", "#959a94", "#4e504d", "#212121", "#d4d0c5", "#b5aba1", "#bd875b", "#afafaf", "#250000", "#7b0002"];
var floorBathReflectivities = [0.02, 0.01, 0.04, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.07, 0.1, 0.3, 0.2, 0.2, 0.07, 0.0, 0.0, 0.0];


P360D.InfoPointManager = function(infopointLocations, updateTexturesInfo, browser) {
    THREE.Object3D.call(this);
    this.sprites = [];
    this.printSprites = [];
    this.vector = new THREE.Vector3();
    this.scaleFactor = 1.0;
    var scope = this;
    switch (browser.getScreenType()) {
        case "phone":
            this.scaleFactor = 14.0;
            break;;
        case "tablet":
            this.scaleFactor = 22.0;
            break;;
        case "desktop":
            this.scaleFactor = 35.0;
            break;;
    };
    this.offset = this.scaleFactor * 1.9;
    for (var i = 0, count = infopointLocations.length; i < count; i++) {
        var infopoint = new P360D.InfoPoint(infopointLocations[i]);
        scope.sprites.push(infopoint.interactiveSprite);
        scope.printSprites.push(infopoint.printSprite);
        scope.add(infopoint.interactiveSprite);
        scope.add(infopoint.printSprite);
    };

    function url6(event) {
        event.preventDefault();
        document.body.style.cursor = "pointer";
        event.stopPropagation();
    }

    function url7(event) {
        event.preventDefault();
        document.body.style.cursor = "default";
        event.stopPropagation();
    }
    this.enabled = function(value) {
        if (value) {
            for (var i = 0, count = scope.sprites.length; i < count; i++) {
                scope.sprites[i].visible = true;
                scope.printSprites[i].visible = true;
                scope.sprites[i].addEventListener(MouseEvent.MOUSE_OVER, url6, false);
                scope.sprites[i].addEventListener(MouseEvent.MOUSE_OUT, url7, false);
                scope.sprites[i].addEventListener(browser.startEvent, updateTexturesInfo, false);
            }
        } else {
            for (var i = 0, count = scope.sprites.length; i < count; i++) {
                scope.sprites[i].visible = false;
                scope.printSprites[i].visible = false;
                scope.sprites[i].removeEventListener(MouseEvent.MOUSE_OVER, url6, false);
                scope.sprites[i].removeEventListener(MouseEvent.MOUSE_OUT, url7, false);
                scope.sprites[i].removeEventListener(browser.startEvent, updateTexturesInfo, false);
            }
        }
    };
    this.update = function(camera) {
        for (var i = 0, count = scope.sprites.length; i < count; i++) {
            scope.printSprites[i].scale.x = scope.printSprites[i].scale.y = scope.vector.subVectors(scope.printSprites[i].position, camera.position).length() / scope.scaleFactor;
            scope.sprites[i].scale.x = scope.sprites[i].scale.y = scope.vector.subVectors(scope.sprites[i].position, camera.position).length() / scope.offset;
        }
    };
    this.enabled(false);
};
P360D.InfoPointManager.prototype = Object.create(THREE.Object3D.prototype);
P360D.InfoPoint = function(infopointLocations) {
    var url8 = new THREE.SpriteMaterial({
        color: 0xff0000,
        transparent: true,
        depthWrite: false,
        opacity: 0.0
    });
    var url9 = new THREE.SpriteMaterial({
        map: P360D.TextureUtils.loadTexture(path + "infopoint.png"),
        transparent: true,
        depthWrite: false,
        opacity: 1.0
    });
    var scope = this;
    this.printSprite = new THREE.Sprite(url9);
    this.interactiveSprite = new THREE.Sprite(url8);
    this.printSprite.position.x = this.interactiveSprite.position.x = infopointLocations.x;
    this.printSprite.position.y = this.interactiveSprite.position.y = infopointLocations.y;
    this.printSprite.position.z = this.interactiveSprite.position.z = infopointLocations.z;
};
var topDistace = 25;


window.addEventListener(Event.LOAD, init, false); //triggers init  function on window load
var browser;
var path = "",
    guiPath = "";
var viewport, camera, cameraPano, scene, renderer;
var livCamControls, bedCamControls, kitCamControls, bathCamControls;
var controls = [];
var wrapper, mainMenu;
var toolBarTop, toolBarBottom;
var VIEW_WIDTH = screen.availWidth;
var VIEW_HEIGHT = window.innerHeight;
var livingroom;
var manager;
var isRendering = false,
    isHome = true,
    isInfo = false;
var isInfoPoints = false;
var roomIndex = 0;
var cameraPositions = [new THREE.Vector3(0, 0, 1000), new THREE.Vector3(0, 0, 1000), new THREE.Vector3(0, 0, 1000), new THREE.Vector3(-250, 320, 290)];
var groundMirror;
var infoPoints = [];
var livingroomGUIPanel;
var guis = [];
var customizeButton;
var isMenu = false;
var isMobile;
var progressBGInit;
var progressBGRooms;
var mouseBlocker;

function init() {
    browser = new IdentifyBrowser("Apartment Interior");
    
    isMobile = browser.mobile();
    if (isMobile) {
        path = "textures_small/" //textures_mobile
    } else {
        path = "textures_small/"
    };
    if (window.devicePixelRatio > 1) {
        guiPath = "gui/retina/"
    } else {
        guiPath = "gui/"
    };
  
    mouseBlocker = document.getElementById('mouseBlocker');
    progressBGInit = document.getElementById('progressBGInit');
    var mainProgress = document.getElementById("mainProgress");
    var loadingBar = document.getElementById("barInit");
    var _0x1fbcx279 = document.getElementById("barBGInit");
    progressBGRooms = document.getElementById("progressBGRooms");
    var progressRoomsLoad = document.getElementById("progressRoomsLoad");
    var barBG = document.getElementById("barBG");
    var imageBar = document.getElementById("imageBar");
    var modelsBar = document.getElementById("modelsBar");
    progressBGRooms.style.visibility = "hidden";
    progressBGRooms.style.opacity = "0.0";
     var loaderImg = new Image();
     loaderImg.src = guiPath + "logoLoader.png";
     loaderImg.addEventListener(Event.LOAD, geometry0, false);

    function geometry0(event) {
        mainProgress.appendChild(event.currentTarget);
        progressRoomsLoad.appendChild(event.currentTarget.cloneNode(true));
        TweenMax.to(mainProgress, 0.5, {
            opacity: 1.0,
            onComplete: function() {
                pxloader.start()
            }
        });
    }

    // all images defined here and where to render
   
    // var totalImages = [path + "cloth/cloth_0.jpg", path + "cloth/cloth_1.jpg", path + "cloth/cloth_2.jpg", path + "cloth/cloth_3.jpg", path + "cloth/cloth_4.jpg", path + "cloth/cloth_5.jpg", path + "cloth/cloth_6.jpg", path + "cloth/cloth_7.jpg", path + "cloth/cloth_8.jpg", path + "cloth/cloth_9.jpg", path + "cloth/cloth_10.jpg", path + "cloth/cloth_11.jpg", path + "cloth/cloth_12.jpg", path + "cloth/cloth_13.jpg", path + "cloth/cloth_14.jpg", path + "cloth/cloth_15.jpg", path + "cloth/cloth_16.jpg", path + "cloth/cloth_17.jpg", path + "misc/misc_0.jpg", path + "misc/misc_1.jpg", path + "misc/misc_2.jpg", path + "misc/misc_3.jpg", path + "misc/misc_4.jpg", path + "misc/misc_5.jpg", path + "misc/misc_6.jpg", path + "misc/misc_7.jpg", path + "misc/misc_8.jpg", path + "misc/misc_9.jpg", path + "misc/misc_10.jpg", path + "misc/misc_11.jpg", path + "tiles/tiles_0.jpg", path + "tiles/tiles_1.jpg", path + "tiles/tiles_2.jpg", path + "tiles/tiles_3.jpg", path + "tiles/tiles_4.jpg", path + "tiles/tiles_5.jpg", path + "tiles/tiles_6.jpg", path + "tiles/tiles_7.jpg", path + "tiles/tiles_8.jpg", path + "tiles/tiles_9.jpg", path + "tiles/tiles_10.jpg", path + "tiles/tiles_11.jpg", path + "tiles/tiles_12.jpg", path + "tiles/tiles_13.jpg", path + "tiles/tiles_14.jpg", path + "tiles/tiles_15.jpg", path + "tiles/tiles_16.jpg", path + "tiles/tiles_17.jpg", path + "tiles/tiles_18.jpg", path + "tiles/tiles_19.jpg", path + "wall/wall_diffuse_0.jpg", path + "wall/wall_diffuse_1.jpg", path + "wall/wall_diffuse_2.jpg", path + "wall/wall_diffuse_3.jpg", path + "wall/wall_diffuse_4.jpg", path + "wall/wall_diffuse_5.jpg", path + "wall/wall_diffuse_6.jpg", path + "wall/wall_diffuse_7.jpg", path + "wall/wall_diffuse_8.jpg", path + "wall/wall_diffuse_9.jpg", path + "wall/wall_diffuse_10.jpg", path + "wall/wall_diffuse_11.jpg", path + "wall/wall_diffuse_12.jpg", path + "wall/wall_diffuse_13.jpg", path + "wood/wood_diffuse_0.jpg", path + "wood/wood_diffuse_1.jpg", path + "wood/wood_diffuse_2.jpg", path + "wood/wood_diffuse_3.jpg", path + "wood/wood_diffuse_4.jpg", path + "wood/wood_diffuse_5.jpg", path + "wood/wood_diffuse_6.jpg", path + "wood/wood_diffuse_7.jpg", path + "wood/wood_diffuse_8.jpg", path + "wood/wood_diffuse_9.jpg", path + "wood/wood_diffuse_10.jpg", path + "wood/wood_diffuse_11.jpg", path + "wood/wood_diffuse_12.jpg", path + "wood/wood_diffuse_13.jpg", path + "wood/wood_diffuse_14.jpg", path + "wood/wood_diffuse_15.jpg", path + "wood/wood_diffuse_16.jpg", path + "wood/wood_diffuse_17.jpg", path + "wood/wood_diffuse_18.jpg", path + "wood/wood_diffuse_19.jpg", path + "wood/wood_diffuse_20.jpg", path + "wood/wood_diffuse_21.jpg", path + "wood/wood_diffuse_22.jpg", path + "wood/wood_diffuse_23.jpg", path + "wood/wood_diffuse_24.jpg", path + "wood/wood_diffuse_25.jpg", path + "wood/wood_diffuse_26.jpg", path + "wood/wood_diffuse_27.jpg", path + "wood/wood_diffuse_28.jpg", path + "wood/wood_diffuse_29.jpg", path + "wood/wood_diffuse_30.jpg", path + "wood/wood_diffuse_31.jpg", guiPath + "cloth/cloth_0.png", guiPath + "cloth/cloth_1.png", guiPath + "cloth/cloth_2.png", guiPath + "cloth/cloth_3.png", guiPath + "cloth/cloth_4.png", guiPath + "cloth/cloth_5.png", guiPath + "cloth/cloth_6.png", guiPath + "cloth/cloth_7.png", guiPath + "cloth/cloth_8.png", guiPath + "cloth/cloth_9.png", guiPath + "cloth/cloth_10.png", guiPath + "cloth/cloth_11.png", guiPath + "cloth/cloth_12.png", guiPath + "cloth/cloth_13.png", guiPath + "cloth/cloth_14.png", guiPath + "cloth/cloth_15.png", guiPath + "cloth/cloth_16.png", guiPath + "cloth/cloth_17.png", guiPath + "misc/misc_0.png", guiPath + "misc/misc_1.png", guiPath + "misc/misc_2.png", guiPath + "misc/misc_3.png", guiPath + "misc/misc_4.png", guiPath + "misc/misc_5.png", guiPath + "misc/misc_6.png", guiPath + "misc/misc_7.png", guiPath + "misc/misc_8.png", guiPath + "misc/misc_9.png", guiPath + "misc/misc_10.png", guiPath + "misc/misc_11.png", guiPath + "tiles/tiles_0.png", guiPath + "tiles/tiles_1.png", guiPath + "tiles/tiles_2.png", guiPath + "tiles/tiles_3.png", guiPath + "tiles/tiles_4.png", guiPath + "tiles/tiles_5.png", guiPath + "tiles/tiles_6.png", guiPath + "tiles/tiles_7.png", guiPath + "tiles/tiles_8.png", guiPath + "tiles/tiles_9.png", guiPath + "tiles/tiles_10.png", guiPath + "tiles/tiles_11.png", guiPath + "tiles/tiles_12.png", guiPath + "tiles/tiles_13.png", guiPath + "tiles/tiles_14.png", guiPath + "tiles/tiles_15.png", guiPath + "tiles/tiles_16.png", guiPath + "tiles/tiles_17.png", guiPath + "tiles/tiles_18.png", guiPath + "tiles/tiles_19.png", guiPath + "wall/wall_0.png", guiPath + "wall/wall_1.png", guiPath + "wall/wall_2.png", guiPath + "wall/wall_3.png", guiPath + "wall/wall_4.png", guiPath + "wall/wall_5.png", guiPath + "wall/wall_6.png", guiPath + "wall/wall_7.png", guiPath + "wall/wall_8.png", guiPath + "wall/wall_9.png", guiPath + "wall/wall_10.png", guiPath + "wall/wall_11.png", guiPath + "wall/wall_12.png", guiPath + "wall/wall_13.png", guiPath + "wood/wood_0.png", guiPath + "wood/wood_1.png", guiPath + "wood/wood_2.png", guiPath + "wood/wood_3.png", guiPath + "wood/wood_4.png", guiPath + "wood/wood_5.png", guiPath + "wood/wood_6.png", guiPath + "wood/wood_7.png", guiPath + "wood/wood_8.png", guiPath + "wood/wood_9.png", guiPath + "wood/wood_10.png", guiPath + "wood/wood_11.png", guiPath + "wood/wood_12.png", guiPath + "wood/wood_13.png", guiPath + "wood/wood_14.png", guiPath + "wood/wood_15.png", guiPath + "wood/wood_16.png", guiPath + "wood/wood_17.png", guiPath + "wood/wood_18.png", guiPath + "wood/wood_19.png", guiPath + "wood/wood_20.png", guiPath + "wood/wood_21.png", guiPath + "wood/wood_22.png", guiPath + "wood/wood_23.png", guiPath + "wood/wood_24.png", guiPath + "wood/wood_25.png", guiPath + "wood/wood_26.png", guiPath + "wood/wood_27.png", guiPath + "wood/wood_28.png", guiPath + "wood/wood_29.png", guiPath + "wood/wood_30.png", guiPath + "wood/wood_31.png", path + "bumpmaps/bump_0.jpg", path + "bumpmaps/bump_1.jpg", path + "bumpmaps/bump_2.jpg", path + "bumpmaps/bump_3.jpg", path + "bumpmaps/bump_4.jpg", path + "bumpmaps/bump_5.jpg", path + "bumpmaps/bump_6.jpg", path + "bumpmaps/bump_7.jpg", path + "bumpmaps/bump_8.jpg", path + "bumpmaps/bump_9.jpg", path + "bumpmaps/bump_10.jpg", path + "bumpmaps/bump_11.jpg", path + "skybox1/sky_0.jpg", path + "skybox1/sky_1.jpg", path + "skybox1/sky_2.jpg", path + "skybox1/sky_3.jpg", path + "skybox1/sky_4.jpg", path + "skybox1/sky_5.jpg", guiPath + "fullscreen.png", guiPath + "plus360.png", guiPath + "facebook.png", guiPath + "twitter.png", guiPath + "google.png", guiPath + "infopointgui.png", guiPath + "mainButtonCover.png", guiPath + "livingroom.png", guiPath + "bedroom.png", guiPath + "kitchen.png", guiPath + "bathroom.png", guiPath + "title.png"];
     var testimages = {
                        'cloths':[ {'path':"textures_small/cloth/cloth_0.jpg"},{'path':"textures_small/cloth/cloth_1.jpg"},{'path':"textures_small/cloth/cloth_2.jpg"},{'path':"textures_small/cloth/cloth_3.jpg"},{'path':"textures_small/cloth/cloth_4.jpg"},{'path':"textures_small/cloth/cloth_5.jpg"},{'path':"textures_small/cloth/cloth_6.jpg"},{'path':"textures_small/cloth/cloth_7.jpg"},{'path':"textures_small/cloth/cloth_8.jpg"},{'path':"textures_small/cloth/cloth_9.jpg"},{'path':"textures_small/cloth/cloth_10.jpg"},{'path':"textures_small/cloth/cloth_11.jpg"},{'path':"textures_small/cloth/cloth_12.jpg"},{'path':"textures_small/cloth/cloth_13.jpg"},{'path':"textures_small/cloth/cloth_14.jpg"},{'path':"textures_small/cloth/cloth_15.jpg"},{'path':"textures_small/cloth/cloth_16.jpg"},{'path':"textures_small/cloth/cloth_17.jpg"}],
                        'miscs':[{'path':"textures_small/misc/misc_0.jpg"}, {'path':"textures_small/misc/misc_1.jpg"},{'path':"textures_small/misc/misc_2.jpg"},{'path':"textures_small/misc/misc_3.jpg"},{'path':"textures_small/misc/misc_4.jpg"},{'path':"textures_small/misc/misc_5.jpg"}],
                        'tiles':[{'path':"textures_small/tiles/tiles_0.jpg"}, {'path':"textures_small/tiles/tiles_1.jpg"},{'path':"textures_small/tiles/tiles_2.jpg"}],
                         'walls':[{'path':"textures_small/wall/wall_diffuse_0.jpg"}, {'path':"textures_small/wall/wall_diffuse_1.jpg"},{'path':"textures_small/wall/wall_diffuse_2.jpg"},{'path':"textures_small/wall/wall_diffuse_3.jpg"},{'path':"textures_small/wall/wall_diffuse_4.jpg"},{'path':"textures_small/wall/wall_diffuse_5.jpg"},{'path':"textures_small/wall/wall_diffuse_6.jpg"},{'path':"textures_small/wall/wall_diffuse_7.jpg"},{'path':"textures_small/wall/wall_diffuse_8.jpg"},{'path':"textures_small/wall/wall_diffuse_9.jpg"},{'path':"textures_small/wall/wall_diffuse_10.jpg"},{'path':"textures_small/wall/wall_diffuse_11.jpg"},{'path':"textures_small/wall/wall_diffuse_12.jpg"},{'path':"textures_small/wall/wall_diffuse_13.jpg"},{'path':"textures_small/wall/wall_diffuse_14.jpg"}],
                         'woods':[{'path':"textures_small/wood/wood_diffuse_0.jpg"},{'path':"textures_small/wood/wood_diffuse_1.jpg"},{'path':"textures_small/wood/wood_diffuse_2.jpg"},{'path':"textures_small/wood/wood_diffuse_3.jpg"},{'path':"textures_small/wood/wood_diffuse_4.jpg"},{'path':"textures_small/wood/wood_diffuse_5.jpg"},{'path':"textures_small/wood/wood_diffuse_6.jpg"},{'path':"textures_small/wood/wood_diffuse_7.jpg"},{'path':"textures_small/wood/wood_diffuse_8.jpg"},{'path':"textures_small/wood/wood_diffuse_9.jpg"},{'path':"textures_small/wood/wood_diffuse_10.jpg"},{'path':"textures_small/wood/wood_diffuse_11.jpg"},{'path':"textures_small/wood/wood_diffuse_12.jpg"},{'path':"textures_small/wood/wood_diffuse_13.jpg"},{'path':"textures_small/wood/wood_diffuse_14.jpg"},{'path':"textures_small/wood/wood_diffuse_15.jpg"},{'path':"textures_small/wood/wood_diffuse_16.jpg"},{'path':"textures_small/wood/wood_diffuse_17.jpg"},{'path':"textures_small/wood/wood_diffuse_18.jpg"},{'path':"textures_small/wood/wood_diffuse_19.jpg"},{'path':"textures_small/wood/wood_diffuse_20.jpg"},{'path':"textures_small/wood/wood_diffuse_21.jpg"},{'path':"textures_small/wood/wood_diffuse_22.jpg"},{'path':"textures_small/wood/wood_diffuse_23.jpg"},{'path':"textures_small/wood/wood_diffuse_24.jpg"},{'path':"textures_small/wood/wood_diffuse_25.jpg"},{'path':"textures_small/wood/wood_diffuse_26.jpg"},{'path':"textures_small/wood/wood_diffuse_27.jpg"},{'path':"textures_small/wood/wood_diffuse_28.jpg"},{'path':"textures_small/wood/wood_diffuse_29.jpg"},{'path':"textures_small/wood/wood_diffuse_30.jpg"},{'path':"textures_small/wood/wood_diffuse_31.jpg"}],
                          'clothButtons':[{'path':"gui/retina/cloth/cloth_0.png"},{'path':"gui/retina/cloth/cloth_1.png"},{'path':"gui/retina/cloth/cloth_2.png"},{'path':"gui/retina/cloth/cloth_3.png"}],
                          'miscButtons':[{'path':"gui/retina/misc/misc_0.png"},{'path':"gui/retina/misc/misc_1.png"},{'path':"gui/retina/misc/misc_2.png"},{'path':"gui/retina/cloth/cloth_3.png"}],
                           'tileButtons':[{'path':"gui/retina/tiles/tiles_0.png"}],
                           'wallButtons':[{'path':"gui/retina/wall/wall_0.png"},{'path':"gui/retina/wall/wall_1.png"},{'path':"gui/retina/wall/wall_2.png"}],
                           'woodButtons':[{'path':"gui/retina/wood/wood_0.png"},{'path':"gui/retina/wood/wood_1.png"},{'path':"gui/retina/wood/wood_2.png"},{'path':"gui/retina/wood/wood_3.png"},{'path':"gui/retina/wood/wood_4.png"},{'path':"gui/retina/wood/wood_5.png"},{'path':"gui/retina/wood/wood_6.png"},{'path':"gui/retina/wood/wood_7.png"},{'path':"gui/retina/wood/wood_8.png"},{'path':"gui/retina/wood/wood_9.png"},{'path':"gui/retina/wood/wood_10.png"},{'path':"gui/retina/wood/wood_11.png"},{'path':"gui/retina/wood/wood_12.png"},{'path':"gui/retina/wood/wood_13.png"},{'path':"gui/retina/wood/wood_14.png"},{'path':"gui/retina/wood/wood_15.png"},{'path':"gui/retina/wood/wood_16.png"},{'path':"gui/retina/wood/wood_17.png"},{'path':"gui/retina/wood/wood_18.png"},{'path':"gui/retina/wood/wood_19.png"},{'path':"gui/retina/wood/wood_20.png"},{'path':"gui/retina/wood/wood_21.png"},{'path':"gui/retina/wood/wood_22.png"},{'path':"gui/retina/wood/wood_23.png"},{'path':"gui/retina/wood/wood_24.png"},{'path':"gui/retina/wood/wood_25.png"},{'path':"gui/retina/wood/wood_26.png"},{'path':"gui/retina/wood/wood_27.png"},{'path':"gui/retina/wood/wood_28.png"},{'path':"gui/retina/wood/wood_29.png"},{'path':"gui/retina/wood/wood_30.png"},{'path':"gui/retina/wood/wood_31.png"}],
                           'bumpMaps':[{'path':'textures_small/bumpmaps/bump_0.jpg'},{'path':'textures_small/bumpmaps/bump_1.jpg'},{'path':'textures_small/bumpmaps/bump_2.jpg'},{'path':'textures_small/bumpmaps/bump_3.jpg'},{'path':'textures_small/bumpmaps/bump_4.jpg'},{'path':'textures_small/bumpmaps/bump_5.jpg'},{'path':'textures_small/bumpmaps/bump_6.jpg'},{'path':'textures_small/bumpmaps/bump_7.jpg'},{'path':'textures_small/bumpmaps/bump_8.jpg'},{'path':'textures_small/bumpmaps/bump_9.jpg'},{'path':'textures_small/bumpmaps/bump_10.jpg'},{'path':'textures_small/bumpmaps/bump_11.jpg'}],
                       'skyBox':[{'path' : "textures_small/skybox1/sky_0.jpg"},{'path' : "textures_small/skybox1/sky_1.jpg"},{'path' : "textures_small/skybox1/sky_2.jpg"},{'path' : "textures_small/skybox1/sky_3.jpg"},{'path' : "textures_small/skybox1/sky_4.jpg"},{'path' : "textures_small/skybox1/sky_5.jpg"}],
                       'extraImages':[{'path' : "gui/fullscreen.png"},{'path' : "gui/plus360.png"},{'path' : "gui/facebook.png"},{'path' : "gui/twitter.png"},{'path' : "gui/google.png"},{'path' : "gui/infopointgui.png"},{'path' : "gui/mainButtonCover.png"},{'path' : "gui/livingroom.png"},{'path' : "gui/bedroom.png"},{'path' : "gui/kitchen.png"},{'path' : "gui/bathroom.png"},{'path' : "gui/title.png"}]};
                    
    
    viewport = document.getElementById("viewport");
    viewport.style.visibility = "hidden";
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, VIEW_WIDTH / VIEW_HEIGHT, 1, 20000);
    cameraPano = new THREE.PerspectiveCamera(45, VIEW_WIDTH / VIEW_HEIGHT, 1, 12000);
    cameraPano.position.set(-250, 320, 290);
    cameraPano.updateProjectionMatrix();
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);
    renderer.setClearColor(0xffffff, 1);
    console.log(renderer.domElement,'domElement');
    viewport.appendChild(renderer.domElement);
    var geometry2 = new THREE.PerspectiveCamera(45, 225 / 300, 1, 12000);
    var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light); 
    manager = new P360D.InteractiveScene(camera, viewport);
    wrapper = document.getElementById('wrapper');
    mainMenu = document.getElementById('mainMenu');
     wrapper.appendChild(progressBGRooms);
    browser.disabledTouch(wrapper);
    var transitionSprite = document.getElementById("transitionSprite");
    
    transitionSprite.style.visibility = "hidden";
    wrapper.appendChild(transitionSprite);
    var TopButtons = [];
    toolBarBottom = document.getElementById("toolBarBottom");
    toolBarBottom.style.webkitTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.MozTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.msTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.OTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.transform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    wrapper.appendChild(toolBarBottom);
    var infopointButton = document.getElementById('bottomButton1');
     infopointButton.addEventListener(browser.clickEvent, function(event) {
           
                    isInfoPoints = !isInfoPoints;
                    toggleInfopoints();
                   
            
        });
    customizeButton = P360D.DOM.div("customizeButton");
    customizeButton.innerHTML = "CUSTOMIZE <";
    customizeButton.style.opacity = "0.0";
    customizeButton.style.visibility = "hidden";
    wrapper.appendChild(customizeButton);
    customizeButton.addEventListener(browser.clickEvent, function(event) {
        isMenu = !isMenu;
        if (isMenu) {
            customizeButton.textContent = "CUSTOMIZE >";
            TweenMax.to(event.currentTarget, 0.6, {
                right: "310px",
                ease: Expo.easeOut
            });
            TweenMax.to(guis[roomIndex].container, 0.6, {
                right: "0px",
                ease: Expo.easeOut
            });
        } else {
            customizeButton.textContent = "CUSTOMIZE <";
            TweenMax.to(event.currentTarget, 0.6, {
                right: "0px",
                ease: Expo.easeOut
            });
            TweenMax.to(guis[roomIndex].container, 0.6, {
                right: "-310px",
                ease: Expo.easeOut
            });
        };
    }, false);
    var allbumptextures = [],allclothTextures = [],allwallsTextures = [],
        allwoodsTextures = [],allmiscTextures = [],alltilesTextures = [];
    var clothButtonImages = [],wallsButtonImages = [],woodsButtonImages = [],
        miscButtonImages = [],tilesButtonImages = [], extraImages = [];
    var LoadedImages = [], wallbuttonLoadedImages = [],
        clothLoadedImages = [],miscLoadedImages = [],tileLoadedImages = [],wallLoadedImages = [],
        woodLoadedImages = [],clothbuttonLoadedImages = [],miscbuttonLoadedImages = [],tilebuttonLoadedImages = [],
        woodbuttonLoadedImages = [],bumpLoadedImages = [],skyboxLoadedImages = [],extraLoadedImages = [];

     
    var material4 = [],
        material5 = [],
        material6 = [];
    var skybox = new THREE.CubeTexture([]);
    var pxloader = new PxLoader();
    


    for (var i = 0, count = testimages.cloths.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.cloths[i].path);
        clothLoadedImages.push(image);
    };
    for (var i = 0, count = testimages.miscs.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.miscs[i].path);
        miscLoadedImages.push(image);
    };
     for (var i = 0, count = testimages.tiles.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.tiles[i].path);
        tileLoadedImages.push(image);
    };
   
     for (var i = 0, count = testimages.walls.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.walls[i].path);
            wallLoadedImages.push(image);
    };
     for (var i = 0, count = testimages.woods.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.woods[i].path);
        woodLoadedImages.push(image);
    };
    console.log(woodLoadedImages.length)
     for (var i = 0, count = testimages.clothButtons.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.clothButtons[i].path);
        clothbuttonLoadedImages.push(image);
    };
    for (var i = 0, count = testimages.miscButtons.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.miscButtons[i].path);
        miscbuttonLoadedImages.push(image);
    };
     for (var i = 0, count = testimages.tileButtons.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.tileButtons[i].path);
        tilebuttonLoadedImages.push(image);
    };
    for (var i = 0, count = testimages.woodButtons.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.woodButtons[i].path);
        woodbuttonLoadedImages.push(image);
    };
     for (var i = 0, count = testimages.wallButtons.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.wallButtons[i].path);
        wallbuttonLoadedImages.push(image);
    };
    for (var i = 0, count = testimages.bumpMaps.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.bumpMaps[i].path);
        bumpLoadedImages.push(image);
    };
     for (var i = 0, count = testimages.skyBox.length; i < count; i++) {
       
        var image = pxloader.addImage(testimages.skyBox[i].path);
        skyboxLoadedImages.push(image);
    };
      for (var i = 0, count = testimages.extraImages.length; i < count; i++) {
    
        var image = pxloader.addImage(testimages.extraImages[i].path);
        extraLoadedImages.push(image);
    };
    var infopointLocations = [new THREE.Vector3(-275, 83, 210), new THREE.Vector3(-11, 70, -66), new THREE.Vector3(360, 148, 250), new THREE.Vector3(270, 110, -540), new THREE.Vector3(700, 340, -120), new THREE.Vector3(-460, 350, -820), new THREE.Vector3(-170, 410, -635), new THREE.Vector3(-900, 420, -255), new THREE.Vector3(-935, 320, -600), new THREE.Vector3(31, 35, 380), new THREE.Vector3(188, 232, -640)];
    var currentchairIndex = 0,
        currentottomansIndex = 0,
        currentpillowsIndex = 0,
        currentbifetIndex = 0,
        currentclosetIndex = 0,
        currentwallFront1Index = 0,
        currentwallFront2Index = 0,
        currentwallleftIndex = 0,
        currentcurtainsIndex = 0,
        currentfloorIndex = 0;
    var _0x1fbcx2a4 = new P360D.InfoPointManager(infopointLocations, _0x1fbcx2d7, browser);
    infoPoints.push(_0x1fbcx2a4);
    scene.add(_0x1fbcx2a4);



    pxloader.addEventListener(Event.PROGRESS, progressIndicator); //during progress function is called from here 
    pxloader.addEventListener(Event.COMPLETE,  _0x1fbcx2c0); // after loading this function is called

    function progressIndicator(event) {
        var width = 214;
        if (event.totalCount) {
            width = Math.floor(width * event.completedCount / event.totalCount);
            loadingBar.style.width = width + "px";
        };
    }
    /*
    this function is called when all images are loaded by pxloader

     */

    function _0x1fbcx2c0(event) {
      
        var crossoriginURL = "http://www.plus360degrees.com/demos/interiorapt/";
        for(var i = 0, count = clothLoadedImages.length; i < count; i++){

            var clothTexture = new THREE.Texture(clothLoadedImages[i]);
                clothTexture.anisotropy = 8;
                clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
                clothTexture.repeat.set(20, 20);
                clothTexture.needsUpdate = true;
                allclothTextures.push(clothTexture);

        };
        for(var i = 0, count = miscLoadedImages.length; i < count; i++){

             var miscTexture = new THREE.Texture(miscLoadedImages[i]);
                miscTexture.anisotropy = 8;
                miscTexture.wrapS = miscTexture.wrapT = THREE.RepeatWrapping;
                miscTexture.repeat.set(16, 16);
                miscTexture.needsUpdate = true;
                allmiscTextures.push(miscTexture);

        };
     
        for(var i = 0, count = tileLoadedImages.length; i < count; i++){
        
           var tilesTexture = new THREE.Texture(tileLoadedImages[i]);
                tilesTexture.anisotropy = 8;
                tilesTexture.wrapS = tilesTexture.wrapT = THREE.RepeatWrapping;
                tilesTexture.repeat.set(16, 16);
                tilesTexture.needsUpdate = true;
                alltilesTextures.push(tilesTexture);


        };
         for(var i = 0, count = wallLoadedImages.length; i < count; i++){
        
         var wallsTexture = new THREE.Texture(wallLoadedImages[i]);
                wallsTexture.anisotropy = 8;
                wallsTexture.wrapS = wallsTexture.wrapT = THREE.RepeatWrapping;
                wallsTexture.repeat.set(6, 6);
                wallsTexture.needsUpdate = true;
                allwallsTextures.push(wallsTexture);


        };
         for(var i = 0, count = woodLoadedImages.length; i < count; i++){
        
         var woodsTexture = new THREE.Texture(woodLoadedImages[i]);
                woodsTexture.anisotropy = 8;
                woodsTexture.wrapS = woodsTexture.wrapT = THREE.RepeatWrapping;
                woodsTexture.repeat.set(10, 10);
                woodsTexture.needsUpdate = true;
                allwoodsTextures.push(woodsTexture);


        };
        console.log(wallLoadedImages.length)
        for(var i = 0, count = clothbuttonLoadedImages.length; i < count; i++){
                     clothButtonImages.push(clothbuttonLoadedImages[i]);


        };
         for(var i = 0, count = miscbuttonLoadedImages.length; i < count; i++){
                     miscButtonImages.push(miscbuttonLoadedImages[i]);


        };
        for(var i = 0, count = tilebuttonLoadedImages.length; i < count; i++){
                     tilesButtonImages.push(tilebuttonLoadedImages[i]);


        };
         for(var i = 0, count = woodbuttonLoadedImages.length; i < count; i++){
                     woodsButtonImages.push(woodbuttonLoadedImages[i]);


        };
         for(var i = 0, count = wallbuttonLoadedImages.length; i < count; i++){
                     wallsButtonImages.push(wallbuttonLoadedImages[i]);


        };
         for(var i = 0, count = bumpLoadedImages.length; i < count; i++){
                    var bumpmapsTexture = new THREE.Texture(bumpLoadedImages[i]);
                bumpmapsTexture.anisotropy = 8;
                bumpmapsTexture.wrapS = bumpmapsTexture.wrapT = THREE.RepeatWrapping;
                bumpmapsTexture.needsUpdate = true;
                allbumptextures.push(bumpmapsTexture);

        };
        for(var i = 0, count = skyboxLoadedImages.length; i < count; i++){
                skybox.images.push(skyboxLoadedImages[i]);
                skybox.needsUpdate = true;
                skybox.flipY = false;
                skybox.format = THREE.RGBFormat;

        };
        for(var i = 0, count = extraLoadedImages.length; i < count; i++){
                    extraImages.push(extraLoadedImages[i])


        };

        

        
        var Rooms = ["LIVINGROOM"];
        var _0x1fbcx2ca = [],
            _0x1fbcx2cb = [];
       
        
        //bottomButtons[1].appendChild(extraImages[5]);
        livingroomGUIPanel = new P360D.LivingroomGUI(clothButtonImages, wallsButtonImages, woodsButtonImages, miscButtonImages);
     
        document.body.appendChild(livingroomGUIPanel.container);
        guis.push(livingroomGUIPanel);
        livingroomGUIPanel.container.addEventListener(browser.clickEvent, function(event) {
            currentchairIndex = livingroomGUIPanel.chairIndex;
            currentottomansIndex = livingroomGUIPanel.ottomansIndex;
            currentpillowsIndex = livingroomGUIPanel.pillowsIndex;
            currentclosetIndex = livingroomGUIPanel.closetIndex;
            currentbifetIndex = livingroomGUIPanel.bifetIndex;
            currentcurtainsIndex = livingroomGUIPanel.curtainsIndex;
            currentwallFront1Index = livingroomGUIPanel.wallFront1Index;
            currentwallFront2Index = livingroomGUIPanel.wallFront2Index;
            currentwallleftIndex = livingroomGUIPanel.wallLeftIndex;
            currentfloorIndex = livingroomGUIPanel.floorIndex;
            livingroom.replaceChairsTextile(currentchairIndex);
            livingroom.replaceOttomansTextile(currentottomansIndex);
            livingroom.replacePillowsTextile(currentpillowsIndex);
            livingroom.replaceClosetMaterial(currentclosetIndex);
            livingroom.replaceBifetMaterial(currentbifetIndex);
            livingroom.replaceCurtainsTextile(currentcurtainsIndex);
            livingroom.replaceWallFront1Material(currentwallFront1Index);
            livingroom.replaceWallFront2Material(currentwallFront2Index);
            livingroom.replaceWallLeftMaterial(currentwallleftIndex);
            livingroom.replaceFloor(currentfloorIndex);
        }, false);

       
        if (!isMobile) {
            var _0x1fbcx2d3 = new THREE.PlaneGeometry(2000, 2000);
            groundMirror = new THREE.Mirror(renderer, camera, {
                clipBias: 0.00003,
                textureWidth: 1024,
                textureHeight: 1024,
                color: floorColors[0]
            });
            groundMirror.material.uniforms.opacity.value = floorReflectivities[0];
            groundMirror.material.transparent = true;
            groundMirror.material.depthWrite = false;
            var _0x1fbcx2d4 = new THREE.Mesh(_0x1fbcx2d3, groundMirror.material);
            _0x1fbcx2d4.add(groundMirror);
            _0x1fbcx2d4.rotateX(-Math.PI / 2);
            _0x1fbcx2d4.position.set(0, 1, 0);
            scene.add(_0x1fbcx2d4);
        };
        render();
        resize();
        loadRoom();
        pxloader = null;
        TweenMax.to(mainProgress, 0.5, {
            opacity: 0.0,
            delay: 3.0
        });
        TweenMax.to(progressBGInit, 0.5, {
            opacity: 0.0,
            delay: 4.0,
            onComplete: function() {
                mainProgress.removeChild(_0x1fbcx279);
                mainProgress.removeChild(loadingBar);
                progressBGInit.removeChild(mainProgress);
                document.body.removeChild(progressBGInit);
                progressBGInit = mainProgress = _0x1fbcx279 = loadingBar = null;
                mouseBlocker.style.visibility = "hidden";
            }
        });
    }

    function callbackfunction() {
        VIEW_WIDTH = window.innerWidth;
        VIEW_HEIGHT = window.innerHeight;
        if (roomIndex == 3) {
            cameraPano.aspect = VIEW_WIDTH / VIEW_HEIGHT;
            cameraPano.updateProjectionMatrix();
            renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);
            renderer.render(scene, cameraPano);
        } else {
            camera.aspect = VIEW_WIDTH / VIEW_HEIGHT;
            camera.updateProjectionMatrix();
            renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);
            renderer.render(scene, camera);
        };
        _0x1fbcx2dc();
        TweenMax.to(progressBGRooms, 0.6, {
            opacity: 0.0,
            delay: 3.0,
            ease: Sine.easeOut
        });
        TweenMax.to(mainMenu, 0.6, {
            opacity: 0.0,
            delay: 3.8,
            ease: Sine.easeOut
        });
        toolBarBottom.style.visibility = "visible";
        customizeButton.style.visibility = "visible";
        TweenMax.to([viewport, toolBarBottom, customizeButton], 0.6, {
            opacity: 1.0,
            delay: 0.8,
            ease: Sine.easeOut,
            onComplete: _0x1fbcx2d6
        });
    }

    function _0x1fbcx2d6() {
        isHome = false;
        isRendering = true;
        controls[roomIndex].enabledAll(true);
        mouseBlocker.style.visibility = "hidden";
        progressBGRooms.style.visibility = "hidden";
        imageBar.style.width = "0px";
        modelsBar.style.width = "0px";
    }

    function _0x1fbcx2d7(event) {
       // console.log('woodsButtonImages', woodbuttonLoadedImages.length)
       
        var index = _0x1fbcx2a4.sprites.indexOf(event.currentTarget);
        switch (index) {
            case 0:
                currentchairIndex++;
                if (currentchairIndex == clothLoadedImages.length) {
                    currentchairIndex = 0
                };
                livingroomGUIPanel.chairIndex = currentchairIndex;
                livingroom.replaceChairsTextile(currentchairIndex);
                break;;
            case 1:
                currentottomansIndex++;
                if (currentottomansIndex == clothLoadedImages.length) {
                    currentottomansIndex = 0
                };
                livingroomGUIPanel.ottomansIndex = currentottomansIndex;
                livingroom.replaceOttomansTextile(currentottomansIndex);
                break;;
            case 2:
                currentpillowsIndex++;
                if (currentpillowsIndex == clothLoadedImages.length) {
                    currentpillowsIndex = 0
                };
                livingroomGUIPanel.pillowsIndex = currentpillowsIndex;
                livingroom.replacePillowsTextile(currentpillowsIndex);
                break;;
            case 3:
                currentbifetIndex++;
                if (currentbifetIndex == 12) {
                    currentbifetIndex = 0
                };
                livingroomGUIPanel.bifetIndex = currentbifetIndex;
                livingroom.replaceBifetMaterial(currentbifetIndex);
                break;;
            case 4:
                currentclosetIndex++;
                if (currentclosetIndex == 12) {
                    currentclosetIndex = 0
                };
                livingroomGUIPanel.closetIndex = currentclosetIndex;
                livingroom.replaceClosetMaterial(currentclosetIndex);
                break;;
            case 5:
                currentwallFront1Index++;
                if (currentwallFront1Index == wallLoadedImages.length) {
                    currentwallFront1Index = 0
                };
                livingroomGUIPanel.wallFront1Index = currentwallFront1Index;
                livingroom.replaceWallFront1Material(currentwallFront1Index);
                break;;
            case 6:
                currentwallFront2Index++;
                if (currentwallFront2Index == wallLoadedImages.length) {
                    currentwallFront2Index = 0
                };
                livingroomGUIPanel.wallFront2Index = currentwallFront2Index;
                livingroom.replaceWallFront2Material(currentwallFront2Index);
                break;;
            case 7:
                currentcurtainsIndex++;
                if (currentcurtainsIndex == miscLoadedImages.length) {
                    currentcurtainsIndex = 0
                };
                livingroomGUIPanel.curtainsIndex = currentcurtainsIndex;
                livingroom.replaceCurtainsTextile(currentcurtainsIndex);
                break;
            case 8:
                currentwallleftIndex++;
                if (currentwallleftIndex == 14) {
                    currentwallleftIndex = 0
                };
                livingroomGUIPanel.wallLeftIndex = currentwallleftIndex;
                livingroom.replaceWallLeftMaterial(currentwallleftIndex);
                break;;
            case 9:
                currentfloorIndex++;
                if (currentfloorIndex == 14) {
                    currentfloorIndex = 0
                };
                livingroomGUIPanel.floorIndex = currentfloorIndex;
                livingroom.replaceFloor(currentfloorIndex);
                break;;
            case 10:
                livingroom.renderToTV(renderer, scene, camera);
                break;;
        };
    }




    function loadRoom(event) {
        roomIndex = 0; /*material4.indexOf(event.currentTarget)*/
        mouseBlocker.style.visibility = "visible";
        viewport.style.visibility = "visible";
        isRendering = false;
        switch (roomIndex) {
            case 0:
                if (livingroom === undefined) {
                    progressBGRooms.style.visibility = "visible";
                    TweenMax.to(progressBGRooms, 0.6, {
                        opacity: 1.0,
                        onComplete: function() {
                            livingroom = new P360D.Livingroom(allclothTextures, allwallsTextures, allwoodsTextures, allmiscTextures, allbumptextures, skybox, groundMirror, isMobile, callbackfunction);
                            scene.add(livingroom);
                            if (!isMobile) {
                                groundMirror.material.uniforms.mirrorColor.value.setStyle(floorColors[currentfloorIndex]);
                                groundMirror.material.uniforms.opacity.value = floorReflectivities[currentfloorIndex];
                            };
                        }
                    });
                } else {
                    if (livingroom.isLoaded) {
                        isHome = false;
                        livingroom.visible = true;
                        _0x1fbcx2dd();
                        _0x1fbcx2dc();
                    }
                };
                break;;


        };
        toggleInfopoints();
        if (roomIndex == 3) {
            manager.setCamera(cameraPano);
            if (!isMobile) {
                groundMirror.setCamera(cameraPano);
                groundMirror.render();
            };
            renderer.render(scene, cameraPano);
        } else {
            manager.setCamera(camera);
            if (!isMobile) {
                groundMirror.setCamera(camera);
                groundMirror.render();
            };
            renderer.render(scene, camera);
        };
    }

    function _0x1fbcx2dc() {
        camera.position.copy(cameraPositions[roomIndex]);
        controls[roomIndex].update();
        if (!isMobile) {
            groundMirror.render()
        };
        if (roomIndex == 3) {
            renderer.render(scene, cameraPano)
        } else {
            renderer.render(scene, camera)
        };
        _0x1fbcx2f4(false);
    }

    function _0x1fbcx2dd() {
        TweenMax.to(mainMenu, 0.6, {
            opacity: 0.0,
            ease: Sine.easeOut
        });
        toolBarBottom.style.visibility = "visible";
        customizeButton.style.visibility = "visible";
        TweenMax.to([viewport, toolBarBottom, customizeButton], 0.6, {
            opacity: 1.0,
            delay: 0.0,
            ease: Sine.easeOut,
            onComplete: function() {
                isRendering = true;
                controls[roomIndex].enabledAll(true);
                mouseBlocker.style.visibility = "hidden";
            }
        });
        if (!isMobile) {
            groundMirror.material.uniforms.mirrorColor.value.setStyle(floorColors[currentfloorIndex]);
            groundMirror.material.uniforms.opacity.value = floorReflectivities[currentfloorIndex];
        };
    }

    // function gobacktohome() {
    //     if (!isHome) {
    //         mouseBlocker.style.visibility = "visible";
    //         transitionSprite.style.visibility = "visible";
    //         isRendering = false;
    //         controls[roomIndex].enabledAll(false);
    //         var image = new Image();
    //         if (roomIndex == 3) {
    //             geometry2.position.copy(cameraPano.position)
    //         } else {
    //             geometry2.position.copy(camera.position)
    //         };
    //         geometry2.lookAt(controls[roomIndex].target);
    //         TweenMax.to(transitionSprite, 0.3, {
    //             opacity: 1.0,
    //             onComplete: function() {
    //                 if (isInfoPoints) {
    //                     infoPoints[roomIndex].enabled(false)
    //                 };
    //                 renderer.clear();
    //                 renderer.render(scene, geometry2);
    //                 image.src = renderer.context.canvas.toDataURL("image/png;base64", 1.0);
    //                 renderer.clear();
    //                 image.addEventListener(Event.LOAD, function(event) {
    //                     event.preventDefault();
    //                     if (isInfoPoints) {
    //                         infoPoints[roomIndex].enabled(true)
    //                     };
    //                     switch (browser.getScreenType()) {
    //                         case "phone":
    //                             material6[roomIndex].drawImage(event.currentTarget, 0, 0, 112, 150);
    //                             break;;
    //                         case "tablet":
    //                             material6[roomIndex].drawImage(event.currentTarget, 0, 0, 158, 210);
    //                             break;;
    //                         case "desktop":
    //                             material6[roomIndex].drawImage(event.currentTarget, 0, 0, 225, 300);
    //                             break;;
    //                     };
    //                     TweenMax.to(transitionSprite, 0.6, {
    //                         opacity: 0.0,
    //                         delay: 0.0,
    //                         ease: Sine.easeOut,
    //                         onComplete: _0x1fbcx2df
    //                     });
    //                     viewport.style.opacity = "0.0";
    //                     toolBarBottom.style.opacity = "0.0";
    //                     customizeButton.style.opacity = "0.0";
    //                     mainMenu.style.opacity = "1.0";
    //                     event.stopPropagation();
    //                 }, false);
    //                 if (roomIndex == 3) {
    //                     renderer.render(scene, cameraPano)
    //                 } else {
    //                     renderer.render(scene, camera)
    //                 };
    //                 if (isMenu) {
    //                     guis[roomIndex].container.style.right = "-310px";
    //                     isMenu = false;
    //                 };
    //             }
    //         });
    //     }
    // }

    function _0x1fbcx2df() {
        isHome = true;
        if (livingroom) {
            livingroom.visible = false
        };

        if (roomIndex == 3) {
            cameraPositions[roomIndex].copy(cameraPano.position)
        } else {
            cameraPositions[roomIndex].copy(camera.position)
        };
        customizeButton.innerHTML = "CUSTOMIZE <";
        customizeButton.style.right = "0px";
        customizeButton.style.bottom = "5px";
        mouseBlocker.style.visibility = "hidden";
        viewport.style.visibility = "hidden";
        toolBarBottom.style.visibility = "hidden";
        customizeButton.style.visibility = "hidden";
        transitionSprite.style.visibility = "hidden";
    }
    var _0x1fbcx2e0 = 0;

    function _0x1fbcx2e1(_0x1fbcx2e2) {
        if (!_0x1fbcx2e2.canvas) {
            throw ("A canvas is required")
        };
        if (!_0x1fbcx2e2.image) {
            throw ("Image is required")
        };
        var _0x1fbcx2e3 = _0x1fbcx2e2.canvas,
            _0x1fbcx2e4 = _0x1fbcx2e2.context || _0x1fbcx2e3.getContext("2d"),
            image = _0x1fbcx2e2.image,
            _0x1fbcx2e5 = _0x1fbcx2e2.srcx || 0,
            _0x1fbcx2e6 = _0x1fbcx2e2.srcy || 0,
            _0x1fbcx2e7 = _0x1fbcx2e2.srcw || image.naturalWidth,
            _0x1fbcx2e8 = _0x1fbcx2e2.srch || image.naturalHeight,
            _0x1fbcx2e9 = _0x1fbcx2e2.desx || _0x1fbcx2e5,
            _0x1fbcx2ea = _0x1fbcx2e2.desy || _0x1fbcx2e6,
            _0x1fbcx2eb = _0x1fbcx2e2.desw || _0x1fbcx2e7,
            _0x1fbcx2ec = _0x1fbcx2e2.desh || _0x1fbcx2e8,
            _0x1fbcx2ed = _0x1fbcx2e2.auto,
            _0x1fbcx2ee = window.devicePixelRatio || 1,
            _0x1fbcx2ef = _0x1fbcx2e4.webkitBackingStorePixelRatio || _0x1fbcx2e4.mozBackingStorePixelRatio || _0x1fbcx2e4.msBackingStorePixelRatio || _0x1fbcx2e4.oBackingStorePixelRatio || _0x1fbcx2e4.backingStorePixelRatio || 1,
            _0x1fbcx2f0 = _0x1fbcx2ee / _0x1fbcx2ef;
        if (typeof _0x1fbcx2ed === "undefined") {
            _0x1fbcx2ed = true
        };
        if (_0x1fbcx2ed && _0x1fbcx2ee !== _0x1fbcx2ef) {
            var _0x1fbcx2f1 = _0x1fbcx2e3.width;
            var _0x1fbcx2f2 = _0x1fbcx2e3.height;
            _0x1fbcx2e3.width = _0x1fbcx2f1 * _0x1fbcx2f0;
            _0x1fbcx2e3.height = _0x1fbcx2f2 * _0x1fbcx2f0;
            _0x1fbcx2e3.style.width = _0x1fbcx2f1 + "px";
            _0x1fbcx2e3.style.height = _0x1fbcx2f2 + "px";
            _0x1fbcx2e4.scale(_0x1fbcx2f0, _0x1fbcx2f0);
        };
        _0x1fbcx2e4.clearRect(_0x1fbcx2e5, _0x1fbcx2e6, _0x1fbcx2e7, _0x1fbcx2e8);
        _0x1fbcx2e4.drawImage(image, _0x1fbcx2e5, _0x1fbcx2e6, _0x1fbcx2e7, _0x1fbcx2e8, _0x1fbcx2e9, _0x1fbcx2ea, _0x1fbcx2eb, _0x1fbcx2ec);
    }

    function toggleInfopoints() {
        if (isInfoPoints) {
            infoPoints.forEach(function(infopoint) {
                infopoint.enabled(false)
            });
            infoPoints[roomIndex].enabled(true);
        } else {
            infoPoints.forEach(function(infopoint) {
                infopoint.enabled(false)
            })
        }
    }

    function _0x1fbcx2f4(value) {
        for (var i = 0, count = controls.length; i < count; i++) {
            controls[i].enabledAll(value)
        }
    }
    window.addEventListener(Event.RESIZE, resize, false);
    livCamControls = new THREE.OrbitControls(camera, viewport);
    livCamControls.target = new THREE.Vector3(0, 120, 0);
    livCamControls.minDistance = 700;
    livCamControls.maxDistance = 1000;
    livCamControls.rotateSpeed = 0.07;
    livCamControls.constraintPan = true;
    livCamControls.minPanAngle = THREE.Math.degToRad(-60);
    livCamControls.maxPanAngle = THREE.Math.degToRad(45);
    livCamControls.minPolarAngle = THREE.Math.degToRad(73);
    livCamControls.maxPolarAngle = THREE.Math.degToRad(89);
    controls.push(livCamControls);

    window.removeEventListener(Event.LOAD, init, false);
}

function resize() {
    VIEW_WIDTH = window.innerWidth;
    VIEW_HEIGHT = window.innerHeight;
    cameraPano.aspect = VIEW_WIDTH / VIEW_HEIGHT;
    cameraPano.updateProjectionMatrix();
    camera.aspect = VIEW_WIDTH / VIEW_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT);
    toolBarBottom.style.webkitTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.MozTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.msTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.OTransform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
    toolBarBottom.style.transform = "translate( 5px, " + (VIEW_HEIGHT - 45) + "px)";
}

function render() {   // render function to create 

    requestAnimationFrame(render);
    if (isRendering) {
        if (!isHome) {
            controls[roomIndex].update();
            if (isInfoPoints) {
                infoPoints[roomIndex].update(camera)
            };
            if (roomIndex == 3) {
                if (!isMobile) {
                    groundMirror.render()
                };
                renderer.render(scene, cameraPano);
            } else {
                if (!isMobile) {
                    groundMirror.render()
                };
                renderer.render(scene, camera);
            };
        }
    };
}