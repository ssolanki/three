// P360D.PanoramicControls = function(camera, domElement) {
//         this.camera = (camera !== undefined) ? camera : console.error("PanoramicControls required a THREE.PerspectiveCamera in first argument.");
//         this.domElement = (domElement !== undefined) ? domElement : document.body;
//         this.target = new THREE.Vector3();
//         this.minPolarAngle = 0.0;
//         this.maxPolarAngle = 180.0;
//         this.minPanAngle = -130.0;
//         this.maxPanAngle = 90.0;
//         this.deceleration = 0.88;
//         this.steps = 15.0;
//         this.zoomSpeed = 0.2;
//         this.zoomSteps = 1.0;
//         this.minZoom = this.camera.fov;
//         this.maxZoom = 38.0;
//         this.enabledZoom = true;
//         this.constraintPan = true;
//         this.yaw = -65.0;
//         this.pitch = 100.0;
//         var scope = this;
//         var _0x1fbcx63 = false;
//         var _0x1fbcx64 = new THREE.Vector2();
//         var _0x1fbcx65 = new THREE.Vector2();
//         var dollyStart = new THREE.Vector2();
//         var dollyEnd = new THREE.Vector2();
//         var dollyDelta = new THREE.Vector2();
//         var phiDelta = 0.0;
//         var thetaDelta = 0.0;
//         var phi = this.pitch;
//         var theta = this.yaw;
//         var _0x1fbcx6b = this.camera.fov;
//         var offset = 0.000001;
//                         this.update = function() {
//                             if (_0x1fbcx63) {
//                                 thetaDelta = (_0x1fbcx64.x - _0x1fbcx65.x) / scope.steps;
//                                 phiDelta = (_0x1fbcx64.y - _0x1fbcx65.y) / scope.steps;
//                             };
//                             phi += phiDelta;
//                             theta += thetaDelta;
//                             phi = Math.max(scope.minPolarAngle + offset, Math.min(scope.maxPolarAngle - offset, phi));
//                             thetaDelta *= scope.deceleration;
//                             phiDelta *= scope.deceleration;
//                             if (scope.constraintPan) {
//                                 theta = Math.max(this.minPanAngle, Math.min(this.maxPanAngle, theta))
//                             };
//                             var _0x1fbcx6d = this.target,
//                                 position = this.camera.position;
//                             _0x1fbcx6d.x = position.x + 100 * Math.sin(phi * Math.PI / 180) * Math.cos(theta * Math.PI / 180);
//                             _0x1fbcx6d.y = position.y + 100 * Math.cos(phi * Math.PI / 180);
//                             _0x1fbcx6d.z = position.z + 100 * Math.sin(phi * Math.PI / 180) * Math.sin(theta * Math.PI / 180);
//                             this.camera.lookAt(_0x1fbcx6d);
//                             _0x1fbcx64.copy(_0x1fbcx65);
//                         };

//                         function onMouseDown(event) {
//                             event.preventDefault();
//                             _0x1fbcx63 = true;
//                             if (event.changedTouches || event.touches) {
//                                 switch (event.touches.length) {
//                                     case 1:
//                                         _0x1fbcx64.set(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
//                                         _0x1fbcx65.copy(_0x1fbcx64);
//                                         break;;
//                                     case 2:
//                                         if (scope.enabledZoom === false) {
//                                             return
//                                         };
//                                         var dx = event.touches[0].pageX - event.touches[1].pageX;
//                                         var dy = event.touches[0].pageY - event.touches[1].pageY;
//                                         var distance = Math.sqrt(dx * dx + dy * dy);
//                                         dollyStart.set(0, distance);
//                                         break;;
//                                 }
//                             } else {
//                                 _0x1fbcx64.set(event.clientX, event.clientY);
//                                 _0x1fbcx65.copy(_0x1fbcx64);
//                             };
//                             event.stopPropagation();
//                         }

//                         function onMouseMove(event) {
//                             event.preventDefault();
//                             if (event.changedTouches || event.touches) {
//                                 switch (event.touches.length) {
//                                     case 1:
//                                         _0x1fbcx65.set(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
//                                         break;;
//                                     case 2:
//                                         if (scope.enabledZoom === false) {
//                                             return
//                                         };
//                                         var dx = event.touches[0].pageX - event.touches[1].pageX;
//                                         var dy = event.touches[0].pageY - event.touches[1].pageY;
//                                         var distance = Math.sqrt(dx * dx + dy * dy);
//                                         dollyEnd.set(0, distance);
//                                         dollyDelta.subVectors(dollyEnd, dollyStart);
//                                         if (dollyDelta.y > 0) {
//                                             _0x1fbcx6b *= Math.pow(0.95, scope.zoomSpeed) * scope.zoomSteps
//                                         } else {
//                                             _0x1fbcx6b /= Math.pow(0.95, scope.zoomSpeed) * scope.zoomSteps
//                                         };
//                                         dollyStart.copy(dollyEnd);
//                                         if (_0x1fbcx6b <= scope.maxZoom) {
//                                             _0x1fbcx6b = scope.maxZoom
//                                         };
//                                         if (_0x1fbcx6b >= scope.minZoom) {
//                                             _0x1fbcx6b = scope.minZoom
//                                         };
//                                         scope.camera.fov += (_0x1fbcx6b - scope.camera.fov) * scope.zoomSpeed;
//                                         scope.camera.updateProjectionMatrix();
//                                         break;;
//                                 }
//                             } else {
//                                 _0x1fbcx65.set(event.clientX, event.clientY)
//                             };
//                             event.stopPropagation();
//                         }

//                         function onMouseUp(event) {
//                             event.preventDefault();
//                             _0x1fbcx63 = false;
//                             event.stopPropagation();
//                         }

//                         function onMouseWheel(event) {
//                             if (scope.enabledZoom === false) {
//                                 return
//                             };
//                             event.preventDefault();
//                             event.stopPropagation();
//                             event = event ? event : window.event;
//                             _0x1fbcx6b = scope.camera.fov - (event.detail ? event.detail * -scope.zoomSteps : event.wheelDelta / scope.zoomSteps);
//                             if (_0x1fbcx6b <= scope.maxZoom) {
//                                 _0x1fbcx6b = scope.maxZoom
//                             };
//                             if (_0x1fbcx6b >= scope.minZoom) {
//                                 _0x1fbcx6b = scope.minZoom
//                             };
//                             scope.camera.fov += (_0x1fbcx6b - scope.camera.fov) * scope.zoomSpeed;
//                             scope.camera.updateProjectionMatrix();
//                         }
//                         this.enabledAll = function(value) {
//                             if (value) {
//                                 this.domElement.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false);
//                                 this.domElement.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove, false);
//                                 this.domElement.addEventListener(MouseEvent.MOUSE_UP, onMouseUp, false);
//                                 this.domElement.addEventListener(TouchEvent.TOUCH_START, onMouseDown, false);
//                                 this.domElement.addEventListener(TouchEvent.TOUCH_MOVE, onMouseMove, false);
//                                 this.domElement.addEventListener(TouchEvent.TOUCH_END, onMouseUp, false);
//                                 this.domElement.addEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheel, false);
//                                 this.domElement.addEventListener(MouseEvent.DOM_MOUSE_SCROLL, onMouseWheel, false);
//                             } else {
//                                 this.domElement.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown, false);
//                                 this.domElement.removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMove, false);
//                                 this.domElement.removeEventListener(MouseEvent.MOUSE_UP, onMouseUp, false);
//                                 this.domElement.removeEventListener(TouchEvent.TOUCH_START, onMouseDown, false);
//                                 this.domElement.removeEventListener(TouchEvent.TOUCH_MOVE, onMouseMove, false);
//                                 this.domElement.removeEventListener(TouchEvent.TOUCH_END, onMouseUp, false);
//                                 this.domElement.removeEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheel, false);
//                                 this.domElement.removeEventListener(MouseEvent.DOM_MOUSE_SCROLL, onMouseWheel, false);
//                             }
//                         };
//                         this.domElement.addEventListener(Event.CONTEXT_MENU, function(event) {
//                             event.preventDefault();
//                             return false;
//                         }, false);
//                         this.update();
//                         this.enabledAll(false);
// };


//blobbuilder.js

///three.scenloader  main website starts from here