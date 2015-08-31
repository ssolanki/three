var touchSupport = "ontouchstart" in window.document ? true : false;
var prefixes = ["webkit", "moz", "ms", "o", ""];
IdentifyBrowser = function(_0x1fbcx4, _0x1fbcx5, _0x1fbcx6, _0x1fbcx7) {
    this.applicationName = _0x1fbcx4 || "My App Name", this.mayorVersion = _0x1fbcx5 || 0, this.minorVersion = _0x1fbcx6 || 0, this.revision = _0x1fbcx7 || 0, this.fullscreenSupport = null, this.webglSupport = null, this.clickEvent = null, this.startEvent = null, this.moveEvent = null, this.endEvent = null, this.windowHiddenEvent = null, this.domElement = null, this.inFullscreen = false;
    this.dataBrowser = [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }];
    this.dataOS = [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }];
    this.mobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test(navigator.userAgent)
    };
    this.init = function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.operatingSystem = this.searchString(this.dataOS) || "an unknown Operating System";
        this.clickEvent = touchSupport ? TouchEvent.TOUCH_START : MouseEvent.CLICK;
        this.startEvent = touchSupport ? TouchEvent.TOUCH_START : MouseEvent.MOUSE_DOWN;
        this.moveEvent = touchSupport ? TouchEvent.TOUCH_MOVE : MouseEvent.MOUSE_MOVE;
        this.endEvent = touchSupport ? TouchEvent.TOUCH_END : MouseEvent.MOUSE_UP;
        this.windowHiddenEvent = this.getHiddenProperty().replace(/[H|h]idden/, "") + "visibilitychange";
        this.getWebglSupport();
    };
    this.specifications = function(name, _0x1fbcx5, _0x1fbcx6, _0x1fbcx7) {
        this.applicationName = name;
        this.mayorVersion = _0x1fbcx5;
        this.minorVersion = _0x1fbcx6;
        this.revision = _0x1fbcx7;
    };
    this.searchString = function(data) {
        for (var i = 0; i < data.length; i++) {
            var _0x1fbcxb = data[i].string;
            var _0x1fbcxc = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (_0x1fbcxb) {
                if (_0x1fbcxb.indexOf(data[i].subString) != -1) {
                    return data[i].identity
                }
            } else {
                if (_0x1fbcxc) {
                    return data[i].identity
                }
            };
        }
    };
    this.searchVersion = function(_0x1fbcxb) {
        var _0x1fbcxd = _0x1fbcxb.indexOf(this.versionSearchString);
        if (_0x1fbcxd == -1) {
            return
        };
        return parseFloat(_0x1fbcxb.substring(_0x1fbcxd + this.versionSearchString.length + 1));
    };
    this.getWebglSupport = function() {
        try {
            this.webglSupport = !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
        } catch (error) {
            return false
        }
    };
    this.addWebglMessage = function(_0x1fbcxe) {};
    this.toggleFullscreen = function(_0x1fbcxe) {
        this.domElement = _0x1fbcxe === undefined ? document.body : _0x1fbcxe;
        if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled) {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !document.mozFullScreenElement) {
                if (this.domElement.requestFullscreen) {
                    this.domElement.requestFullscreen()
                } else {
                    if (this.domElement.webkitRequestFullscreen) {
                        this.domElement.webkitRequestFullscreen()
                    } else {
                        if (this.domElement.msRequestFullscreen) {
                            this.domElement.msRequestFullscreen()
                        } else {
                            if (this.domElement.mozRequestFullScreen) {
                                this.domElement.mozRequestFullScreen()
                            }
                        }
                    }
                };
                this.inFullscreen = true;
                return;
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else {
                    if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen()
                    } else {
                        if (document.msExitFullscreen) {
                            document.msExitFullscreen()
                        } else {
                            if (document.mozCancelFullScreen) {
                                document.mozCancelFullScreen()
                            }
                        }
                    }
                };
                this.inFullscreen = false;
                return;
            }
        } else {
            alert("Your browser doesn.t support the Fullscreen API")
        };
    };
    this.enabledFullscreen = function(_0x1fbcxe) {
        this.domElement = _0x1fbcxe === undefined ? document.body : _0x1fbcxe;
        if (_0x1fbcxe.requestFullscreen) {
            _0x1fbcxe.requestFullscreen()
        } else {
            if (_0x1fbcxe.webkitRequestFullscreen) {
                _0x1fbcxe.webkitRequestFullscreen()
            } else {
                if (_0x1fbcxe.msRequestFullscreen) {
                    _0x1fbcxe.msRequestFullscreen()
                } else {
                    if (_0x1fbcxe.mozRequestFullScreen) {
                        _0x1fbcxe.mozRequestFullScreen()
                    }
                }
            }
        };
        this.inFullscreen = true;
        return;
    };
    this.exitFullscreen = function() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else {
            if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else {
                if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                } else {
                    if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    }
                }
            }
        };
        this.inFullscreen = false;
        return;
    };
    this.windowHidden = function() {
        return document[this.getHiddenProperty()] || false
    };
    this.disabledTouch = function(_0x1fbcxe) {
        var _0x1fbcxf = _0x1fbcxe === undefined ? window.document : _0x1fbcxe;
        _0x1fbcxf.addEventListener("touchstart", function(event) {
            event.preventDefault()
        }, false);
        _0x1fbcxf.addEventListener("touchmove", function(event) {
            event.preventDefault()
        }, false);
        _0x1fbcxf.addEventListener("touchend", function(event) {
            event.preventDefault()
        }, false);
    };
    this.enabledTouch = function(_0x1fbcxe) {
        var _0x1fbcxf = _0x1fbcxe === undefined ? window.document : _0x1fbcxe;
        _0x1fbcxf.addEventListener("touchstart", function(event) {
            return true
        }, true);
        _0x1fbcxf.addEventListener("touchmove", function(event) {
            return true
        }, true);
        _0x1fbcxf.addEventListener("touchend", function(event) {
            return true
        }, true);
    };
    this.disabledScroll = function(_0x1fbcxe) {
        var _0x1fbcxf = _0x1fbcxe === undefined ? window.document : _0x1fbcxe;
        _0x1fbcxf.addEventListener(MouseEvent.MOUSE_WHEEL, function(event) {
            event.preventDefault()
        }, false);
        _0x1fbcxf.addEventListener(MouseEvent.DOM_MOUSE_SCROLL, function(event) {
            event.preventDefault()
        }, false);
    };
    this.scrolliOS = function(_0x1fbcxe) {
        var _0x1fbcx11, _0x1fbcx12;
        var _0x1fbcx13 = _0x1fbcxe || document.querySelector(_0x1fbcxe);
        if (!_0x1fbcx13) {
            return
        };
        _0x1fbcx13.addEventListener("touchstart", function(event) {
            _0x1fbcx11 = event.touches[0].pageY;
            _0x1fbcx12 = _0x1fbcx13.scrollTop;
            if (_0x1fbcx12 <= 0) {
                _0x1fbcx13.scrollTop = 1
            };
            if (_0x1fbcx12 + _0x1fbcx13.offsetHeight >= _0x1fbcx13.scrollHeight) {
                _0x1fbcx13.scrollTop = _0x1fbcx13.scrollHeight - _0x1fbcx13.offsetHeight - 1
            };
        }, false);
    };
    this.addEventListener = function(event, _0x1fbcx14, _0x1fbcx15) {
        if (event === "fullscreenchange") {
            document.addEventListener("fullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.addEventListener("mozfullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.addEventListener("webkitfullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.addEventListener("msfullscreenchange", _0x1fbcx14, _0x1fbcx15);
        } else {
            document.addEventListener(event, _0x1fbcx14, _0x1fbcx15)
        }
    };
    this.removeEventListener = function(event, _0x1fbcx14, _0x1fbcx15) {
        if (event === "fullscreenchange") {
            document.removeEventListener("fullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.removeEventListener("mozfullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.removeEventListener("webkitfullscreenchange", _0x1fbcx14, _0x1fbcx15);
            document.removeEventListener("msfullscreenchange", _0x1fbcx14, _0x1fbcx15);
        } else {
            document.removeEventListener(event, _0x1fbcx14, _0x1fbcx15)
        }
    };
    this.getIE = function() {
        var _0x1fbcx16 = -1;
        if (navigator.appName == "Microsoft Internet Explorer") {
            var _0x1fbcx17 = navigator.userAgent;
            var _0x1fbcx18 = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
            if (_0x1fbcx18.exec(_0x1fbcx17) != null) {
                _0x1fbcx16 = parseFloat(RegExp.$1)
            };
        } else {
            if (navigator.appName == "Netscape") {
                var _0x1fbcx17 = navigator.userAgent;
                var _0x1fbcx18 = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
                if (_0x1fbcx18.exec(_0x1fbcx17) != null) {
                    _0x1fbcx16 = parseFloat(RegExp.$1)
                };
            }
        };
        return _0x1fbcx16;
    };
    this.getHiddenProperty = function() {
        if ("hidden" in document) {
            return "hidden"
        };
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + "Hidden") in document) {
                return prefixes[i] + "Hidden"
            }
        };
        return null;
    };
    this.getScreenType = function() {
        var _0x1fbcx19 = "desktop";
        if (screen.availWidth > 640 && screen.availWidth <= 1024) {
            _0x1fbcx19 = "tablet"
        } else {
            if (screen.availWidth <= 640 || screen.availHeight <= 362) {
                _0x1fbcx19 = "phone"
            } else {
                if (screen.availWidth > 1014) {
                    _0x1fbcx19 = "desktop"
                }
            }
        };
        return _0x1fbcx19;
    };
    this.init();
};