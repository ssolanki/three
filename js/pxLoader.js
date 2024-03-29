(function(global) {
    function PxLoader(settings) {
        settings = settings || {};
        thissettings = settings;
        if (settings.statusInterval == null) {
            settings.statusInterval = 5000
        };
        if (settings.loggingDelay == null) {
            settings.loggingDelay = 20 * 1000
        };
        if (settings.noProgressTimeout == null) {
            settings.noProgressTimeout = Infinity
        };
       
        var entries = [],
            progressListeners = [],
            timeStarted, progressChanged = Date.now();
        var ResourceState = {
            QUEUED: 0,
            WAITING: 1,
            LOADED: 2,
            ERROR: 3,
            TIMEOUT: 4
        };
        var ensureArray = function(val) {
            if (val == null) {
                return []
            };
            if (Array.isArray(val)) {
                return val
            };
            return [val];
        };
        this.add = function(resource) {
            resource.tags = new PxLoaderTags(resource.tags);
            if (resource.priority == null) {
                resource.priority = Infinity
            };
            entries.push({
                resource: resource,
                status: ResourceState.QUEUED
            });
        };
        this.addEventListener = function(eventName, callback, tags) {
            switch (eventName) {
                case 'load':
                    ;
                case 'complete':
                    addCompletionListener(callback, tags);
                    break;;
                case 'progress':
                    addProgressListener(callback, tags);
                    break;;
            }
        };
        this.removeEventListener = function(eventName, callback) {
            switch (eventName) {
                case 'load':
                    ;
                case 'progress':
                    ;
                    console.log('progress');
                case 'complete':
                    progressListeners = null;
                    callback = null;
                    break;;
            }
        };
        var addProgressListener = function(callback, tags) {
            progressListeners.push({
                callback: callback,
                tags: new PxLoaderTags(tags)
            })
        };
        var addCompletionListener = function(callback, tags) {
            progressListeners.push({
                tags: new PxLoaderTags(tags),
                callback: function(e) {
                    if (e.completedCount === e.totalCount) {
                        callback(e)
                    }
                }
            })
        };
        var getResourceSort = function(orderedTags) {
            orderedTags = ensureArray(orderedTags);
            var getTagOrder = function(entry) {
                var resource = entry.resource,
                    bestIndex = Infinity;
                for (var i = 0; i < resource.tags.length; i++) {
                    for (var j = 0; j < Math.min(orderedTags.length, bestIndex); j++) {
                        if (resource.tags.all[i] === orderedTags[j] && j < bestIndex) {
                            bestIndex = j;
                            if (bestIndex === 0) {
                                break
                            };
                        };
                        if (bestIndex === 0) {
                            break
                        };
                    }
                };
                return bestIndex;
            };
            return function(a, b) {
                var aOrder = getTagOrder(a),
                    bOrder = getTagOrder(b);
                if (aOrder < bOrder) {
                    return -1
                };
                if (aOrder > bOrder) {
                    return 1
                };
                if (a.priority < b.priority) {
                    return -1
                };
                if (a.priority > b.priority) {
                    return 1
                };
                return 0;
            };
        };
        this.start = function(orderedTags) {
            timeStarted = Date.now();
            var compareResources = getResourceSort(orderedTags);
            entries.sort(compareResources);
            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                entry.status = ResourceState.WAITING;
                entry.resource.start(this);
            };
            setTimeout(statusCheck, 100);
        };
        var statusCheck = function() {
            var checkAgain = false,
                noProgressTime = Date.now() - progressChanged,
                timedOut = (noProgressTime >= settings.noProgressTimeout),
                shouldLog = (noProgressTime >= settings.loggingDelay);
            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (entry.status !== ResourceState.WAITING) {
                    continue
                };
                if (entry.resource.checkStatus) {
                    entry.resource.checkStatus()
                };
                if (entry.status === ResourceState.WAITING) {
                    if (timedOut) {
                        entry.resource.onTimeout()
                    } else {
                        checkAgain = true
                    }
                };
            };
            if (shouldLog && checkAgain) {
                log();
            };
            if (checkAgain) {
                setTimeout(statusCheck, settings.statusInterval)
            };
        };
        this.isBusy = function() {
            for (var i = 0, len = entries.length; i < len; i++) {
                if (entries[i].status === ResourceState.QUEUED || entries[i].status === ResourceState.WAITING) {
                    return true
                }
            };
            return false;
        };
        var onProgress = function(resource, statusType) {
            var entry = null,
                i, len, numResourceTags, listener, shouldCall;
            for (i = 0, len = entries.length; i < len; i++) {
                if (entries[i].resource === resource) {
                    entry = entries[i];
                    break;
                }
            };
            if (entry == null || entry.status !== ResourceState.WAITING) {
                return
            };
            entry.status = statusType;
            progressChanged = Date.now();
            numResourceTags = resource.tags.length;
            for (i = 0, len = progressListeners.length; i < len; i++) {
                listener = progressListeners[i];
                if (listener.tags.length === 0) {
                    shouldCall = true
                } else {
                    shouldCall = resource.tags.intersects(listener.tags)
                }; if (shouldCall) {
                    sendProgress(entry, listener)
                };
            };
        };
        this.onLoad = function(resource) {
            onProgress(resource, ResourceState.LOADED)
        };
        this.onError = function(resource) {
            onProgress(resource, ResourceState.ERROR)
        };
        this.onTimeout = function(resource) {
            onProgress(resource, ResourceState.TIMEOUT)
        };
        var sendProgress = function(updatedEntry, listener) {
            var completed = 0,
                total = 0,
                i, len, entry, includeResource;
            for (i = 0, len = entries.length; i < len; i++) {
                entry = entries[i];
                includeResource = false;
                if (listener.tags.length === 0) {
                    includeResource = true
                } else {
                    includeResource = entry.resource.tags.intersects(listener.tags)
                }; if (includeResource) {
                    total++;
                    if (entry.status === ResourceState.LOADED || entry.status === ResourceState.ERROR || entry.status === ResourceState.TIMEOUT) {
                        completed++
                    };
                };
            };
            listener.callback({
                resource: updatedEntry.resource,
                loaded: (updatedEntry.status === ResourceState.LOADED),
                error: (updatedEntry.status === ResourceState.ERROR),
                timeout: (updatedEntry.status === ResourceState.TIMEOUT),
                completedCount: completed,
                totalCount: total
            });
        };
        var log = this.log = function(showAll) {
            if (!window.console) {
                return
            };
            var elapsedSeconds = Math.round((Date.now() - timeStarted) / 1000);
            window.console.log('PxLoader elapsed: ' + elapsedSeconds + 'sec');
            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (!showAll && entry.status !== ResourceState.WAITING) {
                    continue
                };
                var message = 'PxLoader: #' + i + ' ' + entry.resource.getName();
                switch (entry.status) {
                    case ResourceState.QUEUED:
                        message += ' (Not Started)';
                        break;;
                    case ResourceState.WAITING:
                        message += ' (Waiting)';
                        break;;
                    case ResourceState.LOADED:
                        message += ' (Loaded)';
                        break;;
                    case ResourceState.ERROR:
                        message += ' (Error)';
                        break;;
                    case ResourceState.TIMEOUT:
                        message += ' (Timeout)';
                        break;;
                };
                if (entry.resource.tags.length > 0) {
                    message += ' Tags: [' + entry.resource.tags.all.join(',') + ']';
                };
                window.console.log(message);
            };
        };
    }

    function PxLoaderTags(values) {
        this.all = [];
        this.first = null;
        this.length = 0;
        this.lookup = {};
        if (values) {
            if (Array.isArray(values)) {
                this.all = values.slice(0)
            } else {
                if (typeof values === 'object') {
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            this.all.push(key)
                        }
                    }
                } else {
                    this.all.push(values)
                }
            };
            this.length = this.all.length;
            if (this.length > 0) {
                this.first = this.all[0]
            };
            for (var i = 0; i < this.length; i++) {
                this.lookup[this.all[i]] = true
            };
        };
    }
    PxLoaderTags.prototype.intersects = function(other) {
        if (this.length === 0 || other.length === 0) {
            return false
        };
        if (this.length === 1 && other.length === 1) {
            return this.first === other.first
        };
        if (other.length < this.length) {
            return other.intersects(this)
        };
        for (var key in this.lookup) {
            if (other.lookup[key]) {
                return true
            }
        };
        return false;
    };
    if (typeof define === 'function' && define.amd) {
        define('PxLoader', [], function() {
            return PxLoader
        })
    };
    global.PxLoader = PxLoader;
}(this)); 
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime()
    }
};
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
};