THREE.OrbitControls = function(object, domElement) {
    this.object = object;
    this.domElement = (domElement !== undefined) ? domElement : document.body;
    this.enabled = true;
    this.target = new THREE.Vector3();
    this.center = this.target;
    this.noZoom = false;
    this.zoomSpeed = 0.3;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.noRotate = false;
    this.rotateSpeed = 0.3;
    this.noPan = true;
    this.keyPanSpeed = 7.0;
    this.autoRotate = false;
    this.autoRotateSpeed = 1.0;
    this.phiRotationSpeed = 1.0;
    this.autoRotateDirection = Directions.RIGHT;
    this.enabledAutoRotatePhi = false;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.constraintPan = false;
    this.minPanAngle = 0;
    this.maxPanAngle = Math.PI;
    this.noKeys = true;
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };
    this.deceleration = 0.8;
    var scope = this;
    var EPS = 0.000001;
    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();
    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();
    var panOffset = new THREE.Vector3();
    var offset = new THREE.Vector3();
    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();
    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var pan = new THREE.Vector3();
    var lastPosition = new THREE.Vector3();
    var STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
    };
    var state = STATE.NONE;
    this.light = undefined;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    var _0x1fbcx83 = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
    var _0x1fbcx84 = _0x1fbcx83.clone().inverse();
    var changeEvent = {
        type: "change"
    };
    var startEvent = {
        type: "start"
    };
    var endEvent = {
        type: "end"
    };
    var _0x1fbcx88 = Directions.UP;
    var _0x1fbcx63 = false;
    this.rotateTheta = function(angle) {
        if (angle === undefined) {
            angle = getAutoRotationAngle()
        };
        thetaDelta -= angle;
    };
    this.updateTheta = function(angle) {
        if (scope.autoRotate && _0x1fbcx63) {
            if (scope.autoRotateDirection == Directions.RIGHT) {
                thetaDelta -= angle
            };
            if (scope.autoRotateDirection == Directions.LEFT) {
                thetaDelta += angle
            };
        } else {
            if (scope.autoRotate) {
                if (scope.autoRotateDirection == Directions.RIGHT) {
                    thetaDelta += angle
                }
            }
        };
        if (scope.autoRotateDirection == Directions.LEFT || !scope.autoRotate) {
            thetaDelta += angle
        };
    };
    this.rotatePhi = function(angle) {
        if (angle === undefined) {
            angle = getAutoRotationAngle()
        };
        phiDelta -= angle;
    };
    this.updatePhi = function(angle, phi) {
        if (scope.enabledAutoRotatePhi && !_0x1fbcx63) {
            if (phi < scope.maxPolarAngle - 0.01 && _0x1fbcx88 == Directions.DOWN) {
                phiDelta += (angle * scope.phiRotationSpeed)
            } else {
                if (phi > scope.maxPolarAngle - 0.02 && _0x1fbcx88 == Directions.DOWN) {
                    _0x1fbcx88 = Directions.UP
                } else {
                    if (phi > scope.minPolarAngle + 0.01 && _0x1fbcx88 == Directions.UP) {
                        phiDelta -= (angle * scope.phiRotationSpeed)
                    } else {
                        if (phi < scope.minPolarAngle + 0.02 && _0x1fbcx88 == Directions.UP) {
                            _0x1fbcx88 = Directions.DOWN
                        }
                    }
                }
            }
        } else {
            phiDelta -= angle
        }
    };
    this.panLeft = function(distance) {
        var te = this.object.matrix.elements;
        panOffset.set(te[0], te[1], te[2]);
        panOffset.multiplyScalar(-distance);
        pan.add(panOffset);
    };
    this.panUp = function(distance) {
        var te = this.object.matrix.elements;
        panOffset.set(te[4], te[5], te[6]);
        panOffset.multiplyScalar(distance);
        pan.add(panOffset);
    };
    this.pan = function(delta_x, delta_y) {
        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
        if (scope.object.fov !== undefined) {
            var position = scope.object.position;
            var offset = position.clone().sub(scope.target);
            var targetDistance = offset.length();
            targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);
            scope.panLeft(2 * delta_x * targetDistance / element.clientHeight);
            scope.panUp(2 * delta_y * targetDistance / element.clientHeight);
        } else {
            if (scope.object.top !== undefined) {
                scope.panLeft(delta_x * (scope.object.right - scope.object.left) / element.clientWidth);
                scope.panUp(delta_y * (scope.object.top - scope.object.bottom) / element.clientHeight);
            } else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
            }
        };
    };
    this.dollyIn = function(dollyScale) {
        if (dollyScale === undefined) {
            dollyScale = getZoomScale()
        };
        scale /= dollyScale;
    };
    this.dollyOut = function(dollyScale) {
        if (dollyScale === undefined) {
            dollyScale = getZoomScale()
        };
        scale *= dollyScale;
    };
    this.addLight = function(_0x1fbcx90) {
        this.light = _0x1fbcx90
    };
    this.update = function() {
        var position = this.object.position;
        offset.copy(position).sub(this.target);
        offset.applyQuaternion(_0x1fbcx83);
        var theta = Math.atan2(offset.x, offset.z);
        var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
        if (this.autoRotate) {
            if (!_0x1fbcx63) {
                this.updateTheta(getAutoRotationAngle());
                if (this.enabledAutoRotatePhi) {
                    this.updatePhi(getAutoRotationAngle(), phi)
                };
            }
        };
        theta += thetaDelta;
        phi += phiDelta;
        thetaDelta *= this.deceleration;
        phiDelta *= this.deceleration;
        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));
        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
        var _0x1fbcx3f = offset.length() * scale;
        if (this.constraintPan) {
            theta = Math.max(this.minPanAngle, Math.min(this.maxPanAngle, theta))
        };
        _0x1fbcx3f = Math.max(this.minDistance, Math.min(this.maxDistance, _0x1fbcx3f));
        this.target.add(pan);
        offset.x = _0x1fbcx3f * Math.sin(phi) * Math.sin(theta);
        offset.y = _0x1fbcx3f * Math.cos(phi);
        offset.z = _0x1fbcx3f * Math.sin(phi) * Math.cos(theta);
        offset.applyQuaternion(_0x1fbcx84);
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);
        if (this.light) {
            this.light.position = position
        };
        scale = 1;
        pan.set(0, 0, 0);
        if (lastPosition.distanceToSquared(this.object.position) > EPS) {
            this.dispatchEvent(changeEvent);
            lastPosition.copy(this.object.position);
        };
    };
    this.reset = function() {
        state = STATE.NONE;
        this.target.copy(this.target0);
        this.object.position.copy(this.position0);
        this.update();
    };

    function getAutoRotationAngle() {
        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed
    }

    function getZoomScale() {
        return Math.pow(0.95, scope.zoomSpeed)
    }

    function onMouseDown(event) {
        if (scope.enabled === false) {
            return
        };
        event.preventDefault();
        if (event.button === 0) {
            if (scope.noRotate === true) {
                return
            };
            state = STATE.ROTATE;
            rotateStart.set(event.clientX, event.clientY);
        } else {
            if (event.button === 1) {
                if (scope.noZoom === true) {
                    return
                };
                state = STATE.DOLLY;
                dollyStart.set(event.clientX, event.clientY);
            } else {
                if (event.button === 2) {
                    if (scope.noPan === true) {
                        return
                    };
                    state = STATE.PAN;
                    panStart.set(event.clientX, event.clientY);
                }
            }
        };
        _0x1fbcx63 = true;
        scope.dispatchEvent(startEvent);
    }

    function onMouseMove(event) {
        if (scope.enabled === false) {
            return
        };
        event.preventDefault();
        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
        if (state === STATE.ROTATE) {
            if (scope.noRotate === true) {
                return
            };
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart);
            scope.rotateTheta(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
            scope.rotatePhi(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
            rotateStart.copy(rotateEnd);
        } else {
            if (state === STATE.DOLLY) {
                if (scope.noZoom === true) {
                    return
                };
                dollyEnd.set(event.clientX, event.clientY);
                dollyDelta.subVectors(dollyEnd, dollyStart);
                if (dollyDelta.y > 0) {
                    scope.dollyIn()
                } else {
                    scope.dollyOut()
                };
                dollyStart.copy(dollyEnd);
            } else {
                if (state === STATE.PAN) {
                    if (scope.noPan === true) {
                        return
                    };
                    panEnd.set(event.clientX, event.clientY);
                    panDelta.subVectors(panEnd, panStart);
                    scope.pan(panDelta.x, panDelta.y);
                    panStart.copy(panEnd);
                }
            }
        };
    }

    function onMouseUp(event) {
        if (scope.enabled === false) {
            return
        };
        scope.dispatchEvent(endEvent);
        state = STATE.NONE;
        _0x1fbcx63 = false;
    }

    function onMouseWheel(event) {
        if (scope.enabled === false || scope.noZoom === true) {
            return
        };
        event.preventDefault();
        event.stopPropagation();
        var delta = 0;
        if (event.wheelDelta !== undefined) {
            delta = event.wheelDelta
        } else {
            if (event.detail !== undefined) {
                delta = -event.detail
            }
        };
        if (delta > 0) {
            scope.dollyOut()
        } else {
            scope.dollyIn()
        };
        scope.dispatchEvent(startEvent);
        scope.dispatchEvent(endEvent);
    }

    function onkeyDown(event) {
        if (scope.enabled === false || scope.noKeys === true || scope.noPan === true) {
            return
        };
        switch (event.keyCode) {
            case scope.keys.UP:
                scope.pan(0, scope.keyPanSpeed);
                scope.update();
                break;;
            case scope.keys.BOTTOM:
                scope.pan(0, -scope.keyPanSpeed);
                scope.update();
                break;;
            case scope.keys.LEFT:
                scope.pan(scope.keyPanSpeed, 0);
                scope.update();
                break;;
            case scope.keys.RIGHT:
                scope.pan(-scope.keyPanSpeed, 0);
                scope.update();
                break;;
        };
    }

    function touchstart(event) {
        if (scope.enabled === false) {
            return
        };
        switch (event.touches.length) {
            case 1:
                if (scope.noRotate === true) {
                    return
                };
                state = STATE.TOUCH_ROTATE;
                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;;
            case 2:
                if (scope.noZoom === true) {
                    return
                };
                state = STATE.TOUCH_DOLLY;
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;;
            case 3:
                if (scope.noPan === true) {
                    return
                };
                state = STATE.TOUCH_PAN;
                panStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;;
            default:
                state = STATE.NONE;;
        };
        scope.dispatchEvent(startEvent);
    }

    function touchmove(event) {
        if (scope.enabled === false) {
            return
        };
        event.preventDefault();
        event.stopPropagation();
        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
        switch (event.touches.length) {
            case 1:
                if (scope.noRotate === true) {
                    return
                };
                if (state !== STATE.TOUCH_ROTATE) {
                    return
                };
                rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                rotateDelta.subVectors(rotateEnd, rotateStart);
                scope.rotateTheta(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
                scope.rotatePhi(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
                rotateStart.copy(rotateEnd);
                scope.update();
                break;;
            case 2:
                if (scope.noZoom === true) {
                    return
                };
                if (state !== STATE.TOUCH_DOLLY) {
                    return
                };
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyEnd.set(0, distance);
                dollyDelta.subVectors(dollyEnd, dollyStart);
                if (dollyDelta.y > 0) {
                    scope.dollyOut()
                } else {
                    scope.dollyIn()
                };
                dollyStart.copy(dollyEnd);
                scope.update();
                break;;
            case 3:
                if (scope.noPan === true) {
                    return
                };
                if (state !== STATE.TOUCH_PAN) {
                    return
                };
                panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                panDelta.subVectors(panEnd, panStart);
                scope.pan(panDelta.x, panDelta.y);
                panStart.copy(panEnd);
                scope.update();
                break;;
            default:
                state = STATE.NONE;;
        };
    }

    function touchend() {
        if (scope.enabled === false) {
            return
        };
        scope.dispatchEvent(endEvent);
        state = STATE.NONE;
    }
    this.enabledAll = function(_0x1fbcx46) {
        if (_0x1fbcx46) {
            this.domElement.addEventListener("mousedown", onMouseDown, false);
            this.domElement.addEventListener("mousewheel", onMouseWheel, false);
            this.domElement.addEventListener("DOMMouseScroll", onMouseWheel, false);
            this.domElement.addEventListener("mousemove", onMouseMove, false);
            this.domElement.addEventListener("mouseup", onMouseUp, false);
            this.domElement.addEventListener("touchstart", touchstart, false);
            this.domElement.addEventListener("touchend", touchend, false);
            this.domElement.addEventListener("touchmove", touchmove, false);
            window.addEventListener("keydown", onkeyDown, false);
            this.noRotate = false;
            this.noZoom = false;
        } else {
            this.domElement.removeEventListener("mousedown", onMouseDown, false);
            this.domElement.removeEventListener("mousewheel", onMouseWheel, false);
            this.domElement.removeEventListener("DOMMouseScroll", onMouseWheel, false);
            this.domElement.removeEventListener("mousemove", onMouseMove, false);
            this.domElement.removeEventListener("mouseup", onMouseUp, false);
            this.domElement.removeEventListener("touchstart", touchstart, false);
            this.domElement.removeEventListener("touchend", touchend, false);
            this.domElement.removeEventListener("touchmove", touchmove, false);
            window.removeEventListener("keydown", onkeyDown, false);
            this.noRotate = true;
            this.noZoom = true;
        };
        this.enabled = _0x1fbcx46;
    };
    this.domElement.addEventListener("contextmenu", function(event) {
        event.preventDefault()
    }, false);
    this.update();
    this.enabledAll(false);
};
THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);