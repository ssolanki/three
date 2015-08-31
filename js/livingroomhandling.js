/*
living_roomhandling.js

 */


P360D.Livingroom = function(clothButtonImages, wallsButtonImages, woodsButtonImages, miscButtonImages, bumptexturesimages, skybox, groundMirror, isMobile, callback) {
    THREE.Object3D.call(this);
    var scope = this;
    var loader = new THREE.SceneLoader();
    var pxLoader = new PxLoader();
    scope.isLoaded = false;
    if (!isMobile && groundMirror !== undefined) {
        scope.groundMirror = groundMirror
    };
    scope.furnitureTextures = clothButtonImages;
    scope.wallTextures = wallsButtonImages;
    scope.bumpTextures = bumptexturesimages;
    scope.floorTextures = [woodsButtonImages[0], woodsButtonImages[1], woodsButtonImages[2], woodsButtonImages[3], woodsButtonImages[4], woodsButtonImages[5], woodsButtonImages[6], woodsButtonImages[7], woodsButtonImages[8], woodsButtonImages[9], woodsButtonImages[10], woodsButtonImages[26], woodsButtonImages[27], woodsButtonImages[28]];
    scope.closetTextures = [woodsButtonImages[0], woodsButtonImages[11], woodsButtonImages[12], woodsButtonImages[13], woodsButtonImages[14], woodsButtonImages[15], woodsButtonImages[16], woodsButtonImages[17], woodsButtonImages[18], woodsButtonImages[29], woodsButtonImages[30], woodsButtonImages[31]];
    scope.curtainsTextures = miscButtonImages;
    var alllightmaps = [],
        _0x1fbcx1a3 = [];
    var _0x1fbcx1a4 = new P360D.DecoMaterial();
    var _0x1fbcx1a5 = new P360D.CeilingMaterial();
    var _0x1fbcx1a6 = new P360D.ChromeMaterial(skybox);
    var _0x1fbcx1a7 = new P360D.MetalMaterial(skybox);
    var _0x1fbcx1a8 = new P360D.GlassMaterial(skybox);
    var _0x1fbcx1a9 = new P360D.FurnitureMaterial(scope.furnitureTextures[0], scope.bumpTextures[0]);
    var _0x1fbcx1aa = _0x1fbcx1a9.clone();
    var _0x1fbcx1ab = _0x1fbcx1a9.clone();
    var _0x1fbcx1ac = _0x1fbcx1a9.clone();
    var _0x1fbcx1ad = _0x1fbcx1aa.clone();
    var _0x1fbcx1ae = new P360D.CurtainsMaterial(scope.curtainsTextures[0]);
    var _0x1fbcx1af = new P360D.FloorMaterial(scope.floorTextures[0]);
    var _0x1fbcx1b0 = new P360D.ClosetMaterial(scope.closetTextures[0], skybox);
    var _0x1fbcx1b1 = _0x1fbcx1b0.clone();
    var _0x1fbcx1b2 = _0x1fbcx1b0.clone();
    var _0x1fbcx1b3 = new P360D.WallMaterial(scope.wallTextures[0], scope.bumpTextures[4]);
    var _0x1fbcx1b4 = _0x1fbcx1b3.clone();
    var _0x1fbcx1b5 = _0x1fbcx1b3.clone();
    var _0x1fbcx1b6 = new THREE.MeshBasicMaterial({
        map: scope.furnitureTextures[16],
        reflectivity: 0.4,
        combine: THREE.MultiplyOperation,
        envMap: skybox
    });
    var _0x1fbcx1b7 = new THREE.Mesh(new THREE.PlaneGeometry(273, 157), _0x1fbcx1b6);
    _0x1fbcx1b7.position.set(26.4, 288.7, -666);
    var _0x1fbcx1b8, _0x1fbcx1b9, _0x1fbcx1ba, _0x1fbcx1bb, _0x1fbcx1bc, _0x1fbcx1bd, _0x1fbcx1be, _0x1fbcx1bf, _0x1fbcx1c0, _0x1fbcx1c1, _0x1fbcx1c2, _0x1fbcx1c3, _0x1fbcx1c4, _0x1fbcx1c5, _0x1fbcx1c6, _0x1fbcx1c7, _0x1fbcx1c8, _0x1fbcx1c9;
    for (var i = 0; i < 9; i++) {
        var singlelightmap = new PxLoaderImage(path + "lightmaps/livingroom/lightmap_" + i + ".jpg");
        alllightmaps.push(singlelightmap);
        pxLoader.add(singlelightmap);
    };
    var _0x1fbcx1cb = pxLoader.addImage(path + "deco_livingroom.jpg");
    var _0x1fbcx1cc;
    pxLoader.addEventListener(Event.PROGRESS, function(event) {
        var width = 115;
        imageBar.style.left = "13px";
        if (event.totalCount) {
            width = Math.floor(width * event.completedCount / event.totalCount);
            imageBar.style.width = width + "px";
        };
    });
    pxLoader.addEventListener(Event.COMPLETE, function(event) {
        alllightmaps.forEach(function(image) {
            var _0x1fbcx1ce = new THREE.Texture(image.img);
            _0x1fbcx1ce.anisotropy = 8;
            _0x1fbcx1ce.needsUpdate = true;
            _0x1fbcx1a3.push(_0x1fbcx1ce);
            alllightmaps = null;
        });
        _0x1fbcx1cc = new THREE.Texture(_0x1fbcx1cb);
        _0x1fbcx1cc.anisotropy = 8;
        _0x1fbcx1cc.needsUpdate = true;
        _0x1fbcx1a4.map = _0x1fbcx1cc;
        _0x1fbcx1a5.lightMap = _0x1fbcx1a3[0];
        _0x1fbcx1a9.lightMap = _0x1fbcx1a3[1];
        _0x1fbcx1aa.lightMap = _0x1fbcx1a3[4];
        _0x1fbcx1a6.lightMap = _0x1fbcx1a3[8];
        _0x1fbcx1ae.lightMap = _0x1fbcx1a3[5];
        _0x1fbcx1af.lightMap = _0x1fbcx1a3[6];
        _0x1fbcx1b0.lightMap = _0x1fbcx1a3[1];
        _0x1fbcx1b1.lightMap = _0x1fbcx1a3[2];
        _0x1fbcx1b2.lightMap = _0x1fbcx1a3[3];
        _0x1fbcx1b3.lightMap = _0x1fbcx1a3[5];
        _0x1fbcx1b4.lightMap = _0x1fbcx1a3[5];
        _0x1fbcx1b5.lightMap = _0x1fbcx1a3[7];
        _0x1fbcx1ab.lightMap = _0x1fbcx1a3[1];
        _0x1fbcx1ac.lightMap = _0x1fbcx1a3[1];
        _0x1fbcx1ad.lightMap = _0x1fbcx1a3[4];
        loader.callbackProgress = function(progress, result) {
           // console.clear();
            var _0x1fbcx1cf = 158;
            var _0x1fbcx181 = progress.totalModels + progress.totalTextures;
            var _0x1fbcx35 = progress.loadedModels + progress.loadedTextures;
            if (_0x1fbcx181) {
                _0x1fbcx1cf = Math.floor(_0x1fbcx1cf * _0x1fbcx35 / _0x1fbcx181)
            };
            modelsBar.style.left = "66px";
            modelsBar.style.width = _0x1fbcx1cf + "px";
        };
        loader.load("models/livingroom.js", _0x1fbcx1d0);

        function _0x1fbcx1d0(data) {
            data.scene.traverse(function(mesh) {
                if (mesh instanceof THREE.Mesh) {
                    switch (mesh.name) {
                        case "ceiling":
                            _0x1fbcx1b8 = mesh;
                            _0x1fbcx1b8.material = _0x1fbcx1a5;
                            var _0x1fbcx1d1 = _0x1fbcx1b8.geometry.faceVertexUvs[0];
                            _0x1fbcx1b8.geometry.faceVertexUvs.push(_0x1fbcx1d1);
                            break;;
                        case "chair":
                            _0x1fbcx1b9 = mesh;
                            _0x1fbcx1b9.material = _0x1fbcx1a9;
                            var _0x1fbcx1d2 = _0x1fbcx1b9.geometry.faceVertexUvs[0];
                            _0x1fbcx1b9.geometry.faceVertexUvs.push(_0x1fbcx1d2);
                            break;;
                        case "chrome":
                            _0x1fbcx1ba = mesh;
                            _0x1fbcx1ba.material = _0x1fbcx1a6;
                            var _0x1fbcx1d3 = _0x1fbcx1ba.geometry.faceVertexUvs[0];
                            _0x1fbcx1ba.geometry.faceVertexUvs.push(_0x1fbcx1d3);
                            break;;
                        case "closet_1":
                            _0x1fbcx1bb = mesh;
                            _0x1fbcx1bb.material = _0x1fbcx1b1;
                            var _0x1fbcx1d4 = _0x1fbcx1bb.geometry.faceVertexUvs[0];
                            _0x1fbcx1bb.geometry.faceVertexUvs.push(_0x1fbcx1d4);
                            break;;
                        case "closet_2":
                            _0x1fbcx1bc = mesh;
                            _0x1fbcx1bc.material = _0x1fbcx1b2;
                            var _0x1fbcx1d5 = _0x1fbcx1bc.geometry.faceVertexUvs[0];
                            _0x1fbcx1bc.geometry.faceVertexUvs.push(_0x1fbcx1d5);
                            break;;
                        case "couch":
                            _0x1fbcx1bd = mesh;
                            _0x1fbcx1bd.material = _0x1fbcx1aa;
                            var _0x1fbcx1d6 = _0x1fbcx1bd.geometry.faceVertexUvs[0];
                            _0x1fbcx1bd.geometry.faceVertexUvs.push(_0x1fbcx1d6);
                            break;;
                        case "curtains":
                            _0x1fbcx1be = mesh;
                            _0x1fbcx1be.material = _0x1fbcx1ae;
                            var _0x1fbcx1d7 = _0x1fbcx1be.geometry.faceVertexUvs[0];
                            _0x1fbcx1be.geometry.faceVertexUvs.push(_0x1fbcx1d7);
                            break;;
                        case "glass":
                            _0x1fbcx1bf = mesh;
                            _0x1fbcx1bf.material = _0x1fbcx1a8;
                            break;;
                        case "ground_plane":
                            _0x1fbcx1c0 = mesh;
                            _0x1fbcx1c0.material = _0x1fbcx1af;
                            var _0x1fbcx1d8 = _0x1fbcx1c0.geometry.faceVertexUvs[0];
                            _0x1fbcx1c0.geometry.faceVertexUvs.push(_0x1fbcx1d8);
                            break;;
                        case "metal":
                            _0x1fbcx1c1 = mesh;
                            _0x1fbcx1c1.material = _0x1fbcx1a7;
                            break;;
                        case "art":
                            _0x1fbcx1c4 = mesh;
                            _0x1fbcx1c4.material = _0x1fbcx1a4;
                            break;;
                        case "ottoman_1":
                            _0x1fbcx1c2 = mesh;
                            _0x1fbcx1c2.material = _0x1fbcx1ab;
                            var _0x1fbcx1d9 = _0x1fbcx1c2.geometry.faceVertexUvs[0];
                            _0x1fbcx1c2.geometry.faceVertexUvs.push(_0x1fbcx1d9);
                            break;;
                        case "ottoman_2":
                            _0x1fbcx1c3 = mesh;
                            _0x1fbcx1c3.material = _0x1fbcx1ac;
                            var _0x1fbcx1da = _0x1fbcx1c3.geometry.faceVertexUvs[0];
                            _0x1fbcx1c3.geometry.faceVertexUvs.push(_0x1fbcx1da);
                            break;;
                        case "pillows":
                            _0x1fbcx1c5 = mesh;
                            _0x1fbcx1c5.material = _0x1fbcx1ad;
                            var _0x1fbcx1db = _0x1fbcx1c5.geometry.faceVertexUvs[0];
                            _0x1fbcx1c5.geometry.faceVertexUvs.push(_0x1fbcx1db);
                            break;;
                        case "table":
                            _0x1fbcx1c6 = mesh;
                            _0x1fbcx1c6.material = _0x1fbcx1b0;
                            var _0x1fbcx1dc = _0x1fbcx1c6.geometry.faceVertexUvs[0];
                            _0x1fbcx1c6.geometry.faceVertexUvs.push(_0x1fbcx1dc);
                            break;;
                        case "wall_front_1":
                            _0x1fbcx1c7 = mesh;
                            _0x1fbcx1c7.material = _0x1fbcx1b3;
                            var _0x1fbcx1dd = _0x1fbcx1c7.geometry.faceVertexUvs[0];
                            _0x1fbcx1c7.geometry.faceVertexUvs.push(_0x1fbcx1dd);
                            break;;
                        case "wall_front_2":
                            _0x1fbcx1c8 = mesh;
                            _0x1fbcx1c8.material = _0x1fbcx1b4;
                            var _0x1fbcx1de = _0x1fbcx1c8.geometry.faceVertexUvs[0];
                            _0x1fbcx1c8.geometry.faceVertexUvs.push(_0x1fbcx1de);
                            break;;
                        case "wall_left":
                            _0x1fbcx1c9 = mesh;
                            _0x1fbcx1c9.material = _0x1fbcx1b5;
                            var _0x1fbcx1df = _0x1fbcx1c9.geometry.faceVertexUvs[0];
                            _0x1fbcx1c9.geometry.faceVertexUvs.push(_0x1fbcx1df);
                            break;;
                    }
                }
            });
            scope.add(_0x1fbcx1b8);
            scope.add(_0x1fbcx1b9);
            scope.add(_0x1fbcx1ba);
            scope.add(_0x1fbcx1bb);
            scope.add(_0x1fbcx1bc);
            scope.add(_0x1fbcx1bd);
            scope.add(_0x1fbcx1be);
            scope.add(_0x1fbcx1bf);
            scope.add(_0x1fbcx1c0);
            scope.add(_0x1fbcx1c1);
            scope.add(_0x1fbcx1c2);
            scope.add(_0x1fbcx1c3);
            scope.add(_0x1fbcx1c4);
            scope.add(_0x1fbcx1c5);
            scope.add(_0x1fbcx1c6);
            scope.add(_0x1fbcx1c7);
            scope.add(_0x1fbcx1c8);
            scope.add(_0x1fbcx1c9);
            scope.add(_0x1fbcx1b7);
            scope.chair = _0x1fbcx1b9;
            scope.closet = _0x1fbcx1bb;
            scope.bifet = _0x1fbcx1bc;
            scope.couch = _0x1fbcx1bd;
            scope.curtains = _0x1fbcx1be;
            scope.floor = _0x1fbcx1c0;
            scope.ottoman1 = _0x1fbcx1c2;
            scope.ottoman2 = _0x1fbcx1c3;
            scope.pillows = _0x1fbcx1c5;
            scope.table = _0x1fbcx1c6;
            scope.wallFront1 = _0x1fbcx1c7;
            scope.wallFront2 = _0x1fbcx1c8;
            scope.wallLeft = _0x1fbcx1c9;
            scope.tvScreen = _0x1fbcx1b7;
            if (callback && typeof(callback) === "function") {
                callback()
            };
           // console.clear();
            loader = null;
            pxLoader = null;
            scope.isLoaded = true;
        }
    });
    pxLoader.start();
};
P360D.Livingroom.prototype = Object.create(THREE.Object3D.prototype);
P360D.Livingroom.prototype.replaceChairsTextile = function(index) {
    this.chair.material.map = this.furnitureTextures[index];
    this.couch.material.map = this.furnitureTextures[index];
    if (index >= 0 && index < 10) {
        this.chair.material.bumpScale = this.couch.material.bumpScale = 0.5;
        this.chair.material.bumpMap = this.couch.material.bumpMap = this.bumpTextures[1];
        this.chair.material.specular.setStyle("#000000");
        this.couch.material.specular.setStyle("#000000");
    } else {
        if (index > 10) {
            this.chair.material.bumpScale = this.couch.material.bumpScale = 0.1;
            this.chair.material.bumpMap = this.couch.material.bumpMap = this.bumpTextures[0];
            this.chair.material.specular.setStyle("#111111");
            this.couch.material.specular.setStyle("#111111");
        }
    };
};
P360D.Livingroom.prototype.replaceOttomansTextile = function(index) {
    this.ottoman1.material.map = this.furnitureTextures[index];
    this.ottoman2.material.map = this.furnitureTextures[index];
    if (index >= 0 && index < 10) {
        this.ottoman1.material.bumpMap = this.ottoman2.material.bumpMap = this.bumpTextures[1];
        this.ottoman1.material.specular.setStyle("#000000");
        this.ottoman2.material.specular.setStyle("#000000");
    } else {
        if (index > 10) {
            this.ottoman1.material.bumpMap = this.ottoman2.material.bumpMap = this.bumpTextures[0];
            this.ottoman1.material.specular.setStyle("#111111");
            this.ottoman2.material.specular.setStyle("#111111");
        }
    };
};
P360D.Livingroom.prototype.replacePillowsTextile = function(index) {
    this.pillows.material.map = this.furnitureTextures[index];
    if (index >= 0 && index < 10) {
        this.pillows.material.bumpMap = this.bumpTextures[1];
        this.pillows.material.specular.setStyle("#000000");
    } else {
        if (index > 10) {
            this.pillows.material.bumpMap = this.bumpTextures[0];
            this.pillows.material.specular.setStyle("#111111");
        }
    };
};
P360D.Livingroom.prototype.replaceBifetMaterial = function(index) {
    this.bifet.material.map = this.closetTextures[index];
    this.table.material.map = this.closetTextures[index];
};
P360D.Livingroom.prototype.replaceClosetMaterial = function(index) {
    this.closet.material.map = this.closetTextures[index]
};
P360D.Livingroom.prototype.replaceWallFront1Material = function(index) {
    switch (index) {
        case 0:
            ;
        case 3:
            ;
        case 8:
            ;
        case 9:
            ;
        case 10:
            ;
        case 11:
            ;
        case 12:
            ;
        case 13:
            this.wallFront1.material.bumpScale = 2.0;
            this.wallFront1.material.bumpMap = this.bumpTextures[3];
            break;;
        case 1:
            ;
        case 4:
            ;
        case 5:
            ;
        case 7:
            this.wallFront1.material.bumpScale = 2.0;
            this.wallFront1.material.bumpMap = this.bumpTextures[4];
            break;;
        case 6:
            this.wallFront1.material.bumpScale = 4.0;
            this.wallFront1.material.bumpMap = this.bumpTextures[2];
            break;;
        case 2:
            this.wallFront1.material.bumpScale = 10.0;
            this.wallFront1.material.bumpMap = this.bumpTextures[5];
            break;;
    };
    this.wallFront1.material.map = this.wallTextures[index];
};
P360D.Livingroom.prototype.replaceWallFront2Material = function(index) {
    switch (index) {
        case 0:
            ;
        case 3:
            ;
        case 8:
            ;
        case 9:
            ;
        case 10:
            ;
        case 11:
            ;
        case 12:
            ;
        case 13:
            this.wallFront2.material.bumpScale = 2.0;
            this.wallFront2.material.bumpMap = this.bumpTextures[3];
            break;;
        case 1:
            ;
        case 4:
            ;
        case 5:
            ;
        case 7:
            this.wallFront2.material.bumpScale = 2.0;
            this.wallFront2.material.bumpMap = this.bumpTextures[4];
            break;;
        case 6:
            this.wallFront2.material.bumpScale = 4.0;
            this.wallFront2.material.bumpMap = this.bumpTextures[2];
            break;;
        case 2:
            this.wallFront2.material.bumpScale = 10.0;
            this.wallFront2.material.bumpMap = this.bumpTextures[5];
            break;;
    };
    this.wallFront2.material.map = this.wallTextures[index];
};
P360D.Livingroom.prototype.replaceCurtainsTextile = function(index) {
    this.curtains.material.map = this.curtainsTextures[index];
    console.log("called")
};
//P360D.Livingroom.prototype.replaceCurtainsTextile(3);
P360D.Livingroom.prototype.replaceWallLeftMaterial = function(index) {
    switch (index) {
        case 0:
            ;
        case 3:
            ;
        case 8:
            ;
        case 9:
            ;
        case 10:
            ;
        case 11:
            ;
        case 12:
            ;
        case 13:
            this.wallLeft.material.bumpScale = 2.0;
            this.wallLeft.material.bumpMap = this.bumpTextures[3];
            break;;
        case 1:
            ;
        case 4:
            ;
        case 5:
            ;
        case 7:
            this.wallLeft.material.bumpScale = 2.0;
            this.wallLeft.material.bumpMap = this.bumpTextures[4];
            break;;
        case 6:
            this.wallLeft.material.bumpScale = 4.0;
            this.wallLeft.material.bumpMap = this.bumpTextures[2];
            break;;
        case 2:
            this.wallLeft.material.bumpScale = 10.0;
            this.wallLeft.material.bumpMap = this.bumpTextures[5];
            break;;
    };
    this.wallLeft.material.map = this.wallTextures[index];
};
P360D.Livingroom.prototype.replaceFloor = function(index, isMobile) {
    if (!isMobile && this.groundMirror !== undefined) {
        this.groundMirror.material.uniforms.mirrorColor.value.setStyle(floorColors[index]);
        this.groundMirror.material.uniforms.opacity.value = floorReflectivities[index];
    };
    this.floor.material.map = this.floorTextures[index];
};
P360D.Livingroom.prototype.renderToTV = function(rederer, scene, camera) {
    var image = new Image();
    rederer.clear();
    rederer.render(scene, camera);
    image.src = rederer.context.canvas.toDataURL("image/png;base64");
    var _0x1fbcx1e3 = 256;
    var scope = this,
        canvas = P360D.DOM.canvas("c"),
        _0x1fbcx3b = canvas.getContext("2d"),
        _0x1fbcx3c = new THREE.Texture();
    _0x1fbcx3c.needsUpdate = true;
    _0x1fbcx3c.anisotropy = 8;
    image.addEventListener(Event.LOAD, function(event) {
        canvas.width = _0x1fbcx3b.width = _0x1fbcx1e3;
        canvas.height = _0x1fbcx3b.height = _0x1fbcx1e3;
        _0x1fbcx3b.drawImage(event.currentTarget, 0, 0, _0x1fbcx1e3, _0x1fbcx1e3);
        _0x1fbcx3c.image = canvas;
        scope.tvScreen.material.map = _0x1fbcx3c;
        if (scope.tvScreen.material.reflectivity != 0.0) {
            scope.tvScreen.material.reflectivity = 0
        };
        canvas = _0x1fbcx3b = _0x1fbcx3c = image = null;
    }, false);
};
