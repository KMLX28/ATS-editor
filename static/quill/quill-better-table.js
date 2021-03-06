(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require('quill'));
    else if (typeof define === 'function' && define.amd)
        define(['quill'], factory);
    else if (typeof exports === 'object')
        exports['quillBetterTable'] = factory(require('quill'));
    else
        root['quillBetterTable'] = factory(root['Quill']);
})(window, function (__WEBPACK_EXTERNAL_MODULE__0__) {
    return /******/ (function (modules) { // webpackBootstrap
        /******/
        function hotDisposeChunk(chunkId) {
            /******/
            delete installedChunks[chunkId];
            /******/
        }

        /******/
        var parentHotUpdateCallback = window['webpackHotUpdatequillBetterTable'];
        /******/
        window['webpackHotUpdatequillBetterTable'] = // eslint-disable-next-line no-unused-vars
            /******/function webpackHotUpdateCallback(chunkId, moreModules) {
            /******/
            hotAddUpdateChunk(chunkId, moreModules);
            /******/
            if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
            /******/
        };
        /******/
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        function hotDownloadUpdateChunk(chunkId) {
            /******/
            var script = document.createElement('script');
            /******/
            script.charset = 'utf-8';
            /******/
            script.src =
                __webpack_require__.p + '' + chunkId + '.' + hotCurrentHash + '.hot-update.js';
            /******/
            if (null) script.crossOrigin = null;
            /******/
            document.head.appendChild(script);
            /******/
        }

        /******/
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        function hotDownloadManifest(requestTimeout) {
            /******/
            requestTimeout = requestTimeout || 10000;
            /******/
            return new Promise(function (resolve, reject) {
                /******/
                if (typeof XMLHttpRequest === 'undefined') {
                    /******/
                    return reject(new Error('No browser support'));
                    /******/
                }
                /******/
                try {
                    /******/
                    var request = new XMLHttpRequest();
                    /******/
                    var requestPath = __webpack_require__.p + '' + hotCurrentHash + '.hot-update.json';
                    /******/
                    request.open('GET', requestPath, true);
                    /******/
                    request.timeout = requestTimeout;
                    /******/
                    request.send(null);
                    /******/
                } catch (err) {
                    /******/
                    return reject(err);
                    /******/
                }
                /******/
                request.onreadystatechange = function () {
                    /******/
                    if (request.readyState !== 4) return;
                    /******/
                    if (request.status === 0) {
                        /******/ 					// timeout
                        /******/
                        reject(
                            /******/                        new Error('Manifest request to ' + requestPath + ' timed out.')
                            /******/);
                        /******/
                    } else if (request.status === 404) {
                        /******/ 					// no update available
                        /******/
                        resolve();
                        /******/
                    } else if (request.status !== 200 && request.status !== 304) {
                        /******/ 					// other failure
                        /******/
                        reject(new Error('Manifest request to ' + requestPath + ' failed.'));
                        /******/
                    } else {
                        /******/ 					// success
                        /******/
                        try {
                            /******/
                            var update = JSON.parse(request.responseText);
                            /******/
                        } catch (e) {
                            /******/
                            reject(e);
                            /******/
                            return;
                            /******/
                        }
                        /******/
                        resolve(update);
                        /******/
                    }
                    /******/
                };
                /******/
            });
            /******/
        }

        /******/
        /******/
        var hotApplyOnUpdate = true;
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        var hotCurrentHash = '16dafd8763b8395da6a4';
        /******/
        var hotRequestTimeout = 10000;
        /******/
        var hotCurrentModuleData = {};
        /******/
        var hotCurrentChildModule;
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        var hotCurrentParents = [];
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        var hotCurrentParentsTemp = [];
        /******/
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        function hotCreateRequire(moduleId) {
            /******/
            var me = installedModules[moduleId];
            /******/
            if (!me) return __webpack_require__;
            /******/
            var fn = function (request) {
                /******/
                if (me.hot.active) {
                    /******/
                    if (installedModules[request]) {
                        /******/
                        if (installedModules[request].parents.indexOf(moduleId) === -1) {
                            /******/
                            installedModules[request].parents.push(moduleId);
                            /******/
                        }
                        /******/
                    } else {
                        /******/
                        hotCurrentParents = [moduleId];
                        /******/
                        hotCurrentChildModule = request;
                        /******/
                    }
                    /******/
                    if (me.children.indexOf(request) === -1) {
                        /******/
                        me.children.push(request);
                        /******/
                    }
                    /******/
                } else {
                    /******/
                    console.warn(
                        /******/                    '[HMR] unexpected require(' +
                        /******/                        request +
                        /******/                        ') from disposed module ' +
                        /******/                        moduleId
                        /******/);
                    /******/
                    hotCurrentParents = [];
                    /******/
                }
                /******/
                return __webpack_require__(request);
                /******/
            };
            /******/
            var ObjectFactory = function ObjectFactory(name) {
                /******/
                return {
                    /******/                configurable: true,
                    /******/                enumerable: true,
                    /******/                get: function () {
                        /******/
                        return __webpack_require__[name];
                        /******/
                    },
                    /******/                set: function (value) {
                        /******/
                        __webpack_require__[name] = value;
                        /******/
                    }
                    /******/
                };
                /******/
            };
            /******/
            for (var name in __webpack_require__) {
                /******/
                if (
                    /******/                Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
                    /******/                name !== 'e' &&
                    /******/                name !== 't'
                /******/) {
                    /******/
                    Object.defineProperty(fn, name, ObjectFactory(name));
                    /******/
                }
                /******/
            }
            /******/
            fn.e = function (chunkId) {
                /******/
                if (hotStatus === 'ready') hotSetStatus('prepare');
                /******/
                hotChunksLoading++;
                /******/
                return __webpack_require__.e(chunkId).then(finishChunkLoading, function (err) {
                    /******/
                    finishChunkLoading();
                    /******/
                    throw err;
                    /******/
                });
                /******/

                /******/
                function finishChunkLoading() {
                    /******/
                    hotChunksLoading--;
                    /******/
                    if (hotStatus === 'prepare') {
                        /******/
                        if (!hotWaitingFilesMap[chunkId]) {
                            /******/
                            hotEnsureUpdateChunk(chunkId);
                            /******/
                        }
                        /******/
                        if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
                            /******/
                            hotUpdateDownloaded();
                            /******/
                        }
                        /******/
                    }
                    /******/
                }

                /******/
            };
            /******/
            fn.t = function (value, mode) {
                /******/
                if (mode & 1) value = fn(value);
                /******/
                return __webpack_require__.t(value, mode & ~1);
                /******/
            };
            /******/
            return fn;
            /******/
        }

        /******/
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        function hotCreateModule(moduleId) {
            /******/
            var hot = {
                /******/ 			// private stuff
                /******/            _acceptedDependencies: {},
                /******/            _declinedDependencies: {},
                /******/            _selfAccepted: false,
                /******/            _selfDeclined: false,
                /******/            _disposeHandlers: [],
                /******/            _main: hotCurrentChildModule !== moduleId,
                /******/
                /******/ 			// Module API
                /******/            active: true,
                /******/            accept: function (dep, callback) {
                    /******/
                    if (dep === undefined) hot._selfAccepted = true;
                    /******/ else if (typeof dep === 'function') hot._selfAccepted =
                        dep;
                    /******/ else if (typeof dep === 'object')
                    /******/                    for (var i = 0; i < dep.length; i++)
                            /******/                        hot._acceptedDependencies[dep[i]] =
                                callback || function () {
                                };
                    /******/ else hot._acceptedDependencies[dep] =
                            callback || function () {
                            };
                    /******/
                },
                /******/            decline: function (dep) {
                    /******/
                    if (dep === undefined) hot._selfDeclined = true;
                    /******/ else if (typeof dep === 'object')
                    /******/                    for (var i = 0; i < dep.length; i++)
                            /******/                        hot._declinedDependencies[dep[i]] =
                                true;
                    /******/ else hot._declinedDependencies[dep] = true;
                    /******/
                },
                /******/            dispose: function (callback) {
                    /******/
                    hot._disposeHandlers.push(callback);
                    /******/
                },
                /******/            addDisposeHandler: function (callback) {
                    /******/
                    hot._disposeHandlers.push(callback);
                    /******/
                },
                /******/            removeDisposeHandler: function (callback) {
                    /******/
                    var idx = hot._disposeHandlers.indexOf(callback);
                    /******/
                    if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
                    /******/
                },
                /******/
                /******/ 			// Management API
                /******/            check: hotCheck,
                /******/            apply: hotApply,
                /******/            status: function (l) {
                    /******/
                    if (!l) return hotStatus;
                    /******/
                    hotStatusHandlers.push(l);
                    /******/
                },
                /******/            addStatusHandler: function (l) {
                    /******/
                    hotStatusHandlers.push(l);
                    /******/
                },
                /******/            removeStatusHandler: function (l) {
                    /******/
                    var idx = hotStatusHandlers.indexOf(l);
                    /******/
                    if (idx >= 0) hotStatusHandlers.splice(idx, 1);
                    /******/
                },
                /******/
                /******/ 			//inherit from previous dispose call
                /******/            data: hotCurrentModuleData[moduleId]
                /******/
            };
            /******/
            hotCurrentChildModule = undefined;
            /******/
            return hot;
            /******/
        }

        /******/
        /******/
        var hotStatusHandlers = [];
        /******/
        var hotStatus = 'idle';
        /******/

        /******/
        function hotSetStatus(newStatus) {
            /******/
            hotStatus = newStatus;
            /******/
            for (var i = 0; i < hotStatusHandlers.length; i++)
                /******/            hotStatusHandlers[i].call(null, newStatus);
            /******/
        }

        /******/
        /******/ 	// while downloading
        /******/
        var hotWaitingFiles = 0;
        /******/
        var hotChunksLoading = 0;
        /******/
        var hotWaitingFilesMap = {};
        /******/
        var hotRequestedFilesMap = {};
        /******/
        var hotAvailableFilesMap = {};
        /******/
        var hotDeferred;
        /******/
        /******/ 	// The update info
        /******/
        var hotUpdate, hotUpdateNewHash;
        /******/

        /******/
        function toModuleId(id) {
            /******/
            var isNumber = +id + '' === id;
            /******/
            return isNumber ? +id : id;
            /******/
        }

        /******/

        /******/
        function hotCheck(apply) {
            /******/
            if (hotStatus !== 'idle') {
                /******/
                throw new Error('check() is only allowed in idle status');
                /******/
            }
            /******/
            hotApplyOnUpdate = apply;
            /******/
            hotSetStatus('check');
            /******/
            return hotDownloadManifest(hotRequestTimeout).then(function (update) {
                /******/
                if (!update) {
                    /******/
                    hotSetStatus('idle');
                    /******/
                    return null;
                    /******/
                }
                /******/
                hotRequestedFilesMap = {};
                /******/
                hotWaitingFilesMap = {};
                /******/
                hotAvailableFilesMap = update.c;
                /******/
                hotUpdateNewHash = update.h;
                /******/
                /******/
                hotSetStatus('prepare');
                /******/
                var promise = new Promise(function (resolve, reject) {
                    /******/
                    hotDeferred = {
                        /******/                    resolve: resolve,
                        /******/                    reject: reject
                        /******/
                    };
                    /******/
                });
                /******/
                hotUpdate = {};
                /******/
                var chunkId = 2;
                /******/ 			// eslint-disable-next-line no-lone-blocks
                /******/
                {
                    /******/ 				/*globals chunkId */
                    /******/
                    hotEnsureUpdateChunk(chunkId);
                    /******/
                }
                /******/
                if (
                    /******/                hotStatus === 'prepare' &&
                    /******/                hotChunksLoading === 0 &&
                    /******/                hotWaitingFiles === 0
                /******/) {
                    /******/
                    hotUpdateDownloaded();
                    /******/
                }
                /******/
                return promise;
                /******/
            });
            /******/
        }

        /******/
        /******/ 	// eslint-disable-next-line no-unused-vars
        /******/
        function hotAddUpdateChunk(chunkId, moreModules) {
            /******/
            if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
            /******/            return;
            /******/
            hotRequestedFilesMap[chunkId] = false;
            /******/
            for (var moduleId in moreModules) {
                /******/
                if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                    /******/
                    hotUpdate[moduleId] = moreModules[moduleId];
                    /******/
                }
                /******/
            }
            /******/
            if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
                /******/
                hotUpdateDownloaded();
                /******/
            }
            /******/
        }

        /******/

        /******/
        function hotEnsureUpdateChunk(chunkId) {
            /******/
            if (!hotAvailableFilesMap[chunkId]) {
                /******/
                hotWaitingFilesMap[chunkId] = true;
                /******/
            } else {
                /******/
                hotRequestedFilesMap[chunkId] = true;
                /******/
                hotWaitingFiles++;
                /******/
                hotDownloadUpdateChunk(chunkId);
                /******/
            }
            /******/
        }

        /******/

        /******/
        function hotUpdateDownloaded() {
            /******/
            hotSetStatus('ready');
            /******/
            var deferred = hotDeferred;
            /******/
            hotDeferred = null;
            /******/
            if (!deferred) return;
            /******/
            if (hotApplyOnUpdate) {
                /******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
                /******/ 			// avoid triggering uncaught exception warning in Chrome.
                /******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
                /******/
                Promise.resolve()
                /******/.then(function () {
                    /******/
                    return hotApply(hotApplyOnUpdate);
                    /******/
                })
                /******/.then(
                    /******/                    function (result) {
                        /******/
                        deferred.resolve(result);
                        /******/
                    },
                    /******/                    function (err) {
                        /******/
                        deferred.reject(err);
                        /******/
                    }
                    /******/);
                /******/
            } else {
                /******/
                var outdatedModules = [];
                /******/
                for (var id in hotUpdate) {
                    /******/
                    if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                        /******/
                        outdatedModules.push(toModuleId(id));
                        /******/
                    }
                    /******/
                }
                /******/
                deferred.resolve(outdatedModules);
                /******/
            }
            /******/
        }

        /******/

        /******/
        function hotApply(options) {
            /******/
            if (hotStatus !== 'ready')
            /******/            throw new Error('apply() is only allowed in ready status');
            /******/
            options = options || {};
            /******/
            /******/
            var cb;
            /******/
            var i;
            /******/
            var j;
            /******/
            var module;
            /******/
            var moduleId;
            /******/

            /******/
            function getAffectedStuff(updateModuleId) {
                /******/
                var outdatedModules = [updateModuleId];
                /******/
                var outdatedDependencies = {};
                /******/
                /******/
                var queue = outdatedModules.map(function (id) {
                    /******/
                    return {
                        /******/                    chain: [id],
                        /******/                    id: id
                        /******/
                    };
                    /******/
                });
                /******/
                while (queue.length > 0) {
                    /******/
                    var queueItem = queue.pop();
                    /******/
                    var moduleId = queueItem.id;
                    /******/
                    var chain = queueItem.chain;
                    /******/
                    module = installedModules[moduleId];
                    /******/
                    if (!module || module.hot._selfAccepted) continue;
                    /******/
                    if (module.hot._selfDeclined) {
                        /******/
                        return {
                            /******/
                            type: 'self-declined',
                            /******/
                            chain: chain,
                            /******/
                            moduleId: moduleId
                            /******/
                        };
                        /******/
                    }
                    /******/
                    if (module.hot._main) {
                        /******/
                        return {
                            /******/                        type: 'unaccepted',
                            /******/                        chain: chain,
                            /******/                        moduleId: moduleId
                            /******/
                        };
                        /******/
                    }
                    /******/
                    for (var i = 0; i < module.parents.length; i++) {
                        /******/
                        var parentId = module.parents[i];
                        /******/
                        var parent = installedModules[parentId];
                        /******/
                        if (!parent) continue;
                        /******/
                        if (parent.hot._declinedDependencies[moduleId]) {
                            /******/
                            return {
                                /******/
                                type: 'declined',
                                /******/
                                chain: chain.concat([parentId]),
                                /******/
                                moduleId: moduleId,
                                /******/
                                parentId: parentId
                                /******/
                            };
                            /******/
                        }
                        /******/
                        if (outdatedModules.indexOf(parentId) !== -1) continue;
                        /******/
                        if (parent.hot._acceptedDependencies[moduleId]) {
                            /******/
                            if (!outdatedDependencies[parentId])
                            /******/                            outdatedDependencies[parentId] =
                                [];
                            /******/
                            addAllToSet(outdatedDependencies[parentId], [moduleId]);
                            /******/
                            continue;
                            /******/
                        }
                        /******/
                        delete outdatedDependencies[parentId];
                        /******/
                        outdatedModules.push(parentId);
                        /******/
                        queue.push({
                            /******/
                            chain: chain.concat([parentId]),
                            /******/
                            id: parentId
                            /******/
                        });
                        /******/
                    }
                    /******/
                }
                /******/
                /******/
                return {
                    /******/
                    type: 'accepted',
                    /******/
                    moduleId: updateModuleId,
                    /******/
                    outdatedModules: outdatedModules,
                    /******/
                    outdatedDependencies: outdatedDependencies
                    /******/
                };
                /******/
            }

            /******/

            /******/
            function addAllToSet(a, b) {
                /******/
                for (var i = 0; i < b.length; i++) {
                    /******/
                    var item = b[i];
                    /******/
                    if (a.indexOf(item) === -1) a.push(item);
                    /******/
                }
                /******/
            }

            /******/
            /******/ 		// at begin all updates modules are outdated
            /******/ 		// the "outdated" status can propagate to parents if they don't accept the children
            /******/
            var outdatedDependencies = {};
            /******/
            var outdatedModules = [];
            /******/
            var appliedUpdate = {};
            /******/
            /******/
            var warnUnexpectedRequire = function warnUnexpectedRequire() {
                /******/
                console.warn(
                    /******/                '[HMR] unexpected require(' + result.moduleId + ') to disposed module'
                    /******/);
                /******/
            };
            /******/
            /******/
            for (var id in hotUpdate) {
                /******/
                if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                    /******/
                    moduleId = toModuleId(id);
                    /******/ 				/** @type {TODO} */
                    /******/
                    var result;
                    /******/
                    if (hotUpdate[id]) {
                        /******/
                        result = getAffectedStuff(moduleId);
                        /******/
                    } else {
                        /******/
                        result = {
                            /******/                        type: 'disposed',
                            /******/                        moduleId: id
                            /******/
                        };
                        /******/
                    }
                    /******/ 				/** @type {Error|false} */
                    /******/
                    var abortError = false;
                    /******/
                    var doApply = false;
                    /******/
                    var doDispose = false;
                    /******/
                    var chainInfo = '';
                    /******/
                    if (result.chain) {
                        /******/
                        chainInfo =
                            '\nUpdate propagation: ' + result.chain.join(' -> ');
                        /******/
                    }
                    /******/
                    switch (result.type) {
                        /******/
                        case 'self-declined':
                            /******/
                            if (options.onDeclined) options.onDeclined(result);
                            /******/
                            if (!options.ignoreDeclined)
                            /******/                            abortError =
                                new Error(
                                    /******/                                'Aborted because of self decline: ' +
                                    /******/                                    result.moduleId +
                                    /******/                                    chainInfo
                                    /******/);
                            /******/
                            break;
                        /******/
                        case 'declined':
                            /******/
                            if (options.onDeclined) options.onDeclined(result);
                            /******/
                            if (!options.ignoreDeclined)
                            /******/                            abortError =
                                new Error(
                                    /******/                                'Aborted because of declined dependency: ' +
                                    /******/                                    result.moduleId +
                                    /******/                                    ' in ' +
                                    /******/                                    result.parentId +
                                    /******/                                    chainInfo
                                    /******/);
                            /******/
                            break;
                        /******/
                        case 'unaccepted':
                            /******/
                            if (options.onUnaccepted) options.onUnaccepted(result);
                            /******/
                            if (!options.ignoreUnaccepted)
                            /******/                            abortError =
                                new Error(
                                    /******/                                'Aborted because ' + moduleId + ' is not accepted' + chainInfo
                                    /******/);
                            /******/
                            break;
                        /******/
                        case 'accepted':
                            /******/
                            if (options.onAccepted) options.onAccepted(result);
                            /******/
                            doApply = true;
                            /******/
                            break;
                        /******/
                        case 'disposed':
                            /******/
                            if (options.onDisposed) options.onDisposed(result);
                            /******/
                            doDispose = true;
                            /******/
                            break;
                        /******/
                        default:
                            /******/
                            throw new Error('Unexception type ' + result.type);
                        /******/
                    }
                    /******/
                    if (abortError) {
                        /******/
                        hotSetStatus('abort');
                        /******/
                        return Promise.reject(abortError);
                        /******/
                    }
                    /******/
                    if (doApply) {
                        /******/
                        appliedUpdate[moduleId] = hotUpdate[moduleId];
                        /******/
                        addAllToSet(outdatedModules, result.outdatedModules);
                        /******/
                        for (moduleId in result.outdatedDependencies) {
                            /******/
                            if (
                                /******/                            Object.prototype.hasOwnProperty.call(
                                /******/                                result.outdatedDependencies,
                                /******/                                moduleId
                                /******/)
                            /******/) {
                                /******/
                                if (!outdatedDependencies[moduleId])
                                /******/                                outdatedDependencies[moduleId] =
                                    [];
                                /******/
                                addAllToSet(
                                    /******/                                outdatedDependencies[moduleId],
                                    /******/                                result.outdatedDependencies[moduleId]
                                    /******/);
                                /******/
                            }
                            /******/
                        }
                        /******/
                    }
                    /******/
                    if (doDispose) {
                        /******/
                        addAllToSet(outdatedModules, [result.moduleId]);
                        /******/
                        appliedUpdate[moduleId] = warnUnexpectedRequire;
                        /******/
                    }
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// Store self accepted outdated modules to require them later by the module system
            /******/
            var outdatedSelfAcceptedModules = [];
            /******/
            for (i = 0; i < outdatedModules.length; i++) {
                /******/
                moduleId = outdatedModules[i];
                /******/
                if (
                    /******/                installedModules[moduleId] &&
                    /******/                installedModules[moduleId].hot._selfAccepted &&
                    /******/ 				// removed self-accepted modules should not be required
                    /******/                appliedUpdate[moduleId] !== warnUnexpectedRequire
                /******/) {
                    /******/
                    outdatedSelfAcceptedModules.push({
                        /******/
                        module: moduleId,
                        /******/
                        errorHandler: installedModules[moduleId].hot._selfAccepted
                        /******/
                    });
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// Now in "dispose" phase
            /******/
            hotSetStatus('dispose');
            /******/
            Object.keys(hotAvailableFilesMap).forEach(function (chunkId) {
                /******/
                if (hotAvailableFilesMap[chunkId] === false) {
                    /******/
                    hotDisposeChunk(chunkId);
                    /******/
                }
                /******/
            });
            /******/
            /******/
            var idx;
            /******/
            var queue = outdatedModules.slice();
            /******/
            while (queue.length > 0) {
                /******/
                moduleId = queue.pop();
                /******/
                module = installedModules[moduleId];
                /******/
                if (!module) continue;
                /******/
                /******/
                var data = {};
                /******/
                /******/ 			// Call dispose handlers
                /******/
                var disposeHandlers = module.hot._disposeHandlers;
                /******/
                for (j = 0; j < disposeHandlers.length; j++) {
                    /******/
                    cb = disposeHandlers[j];
                    /******/
                    cb(data);
                    /******/
                }
                /******/
                hotCurrentModuleData[moduleId] = data;
                /******/
                /******/ 			// disable module (this disables requires from this module)
                /******/
                module.hot.active = false;
                /******/
                /******/ 			// remove module from cache
                /******/
                delete installedModules[moduleId];
                /******/
                /******/ 			// when disposing there is no need to call dispose handler
                /******/
                delete outdatedDependencies[moduleId];
                /******/
                /******/ 			// remove "parents" references from all children
                /******/
                for (j = 0; j < module.children.length; j++) {
                    /******/
                    var child = installedModules[module.children[j]];
                    /******/
                    if (!child) continue;
                    /******/
                    idx = child.parents.indexOf(moduleId);
                    /******/
                    if (idx >= 0) {
                        /******/
                        child.parents.splice(idx, 1);
                        /******/
                    }
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// remove outdated dependency from module children
            /******/
            var dependency;
            /******/
            var moduleOutdatedDependencies;
            /******/
            for (moduleId in outdatedDependencies) {
                /******/
                if (
                    /******/                Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
                /******/) {
                    /******/
                    module = installedModules[moduleId];
                    /******/
                    if (module) {
                        /******/
                        moduleOutdatedDependencies =
                            outdatedDependencies[moduleId];
                        /******/
                        for (j =
                                 0; j < moduleOutdatedDependencies.length; j++) {
                            /******/
                            dependency = moduleOutdatedDependencies[j];
                            /******/
                            idx = module.children.indexOf(dependency);
                            /******/
                            if (idx >= 0) module.children.splice(idx, 1);
                            /******/
                        }
                        /******/
                    }
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// Now in "apply" phase
            /******/
            hotSetStatus('apply');
            /******/
            /******/
            hotCurrentHash = hotUpdateNewHash;
            /******/
            /******/ 		// insert new code
            /******/
            for (moduleId in appliedUpdate) {
                /******/
                if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
                    /******/
                    modules[moduleId] = appliedUpdate[moduleId];
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// call accept handlers
            /******/
            var error = null;
            /******/
            for (moduleId in outdatedDependencies) {
                /******/
                if (
                    /******/                Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
                /******/) {
                    /******/
                    module = installedModules[moduleId];
                    /******/
                    if (module) {
                        /******/
                        moduleOutdatedDependencies =
                            outdatedDependencies[moduleId];
                        /******/
                        var callbacks = [];
                        /******/
                        for (i =
                                 0; i < moduleOutdatedDependencies.length; i++) {
                            /******/
                            dependency = moduleOutdatedDependencies[i];
                            /******/
                            cb = module.hot._acceptedDependencies[dependency];
                            /******/
                            if (cb) {
                                /******/
                                if (callbacks.indexOf(cb) !== -1) continue;
                                /******/
                                callbacks.push(cb);
                                /******/
                            }
                            /******/
                        }
                        /******/
                        for (i = 0; i < callbacks.length; i++) {
                            /******/
                            cb = callbacks[i];
                            /******/
                            try {
                                /******/
                                cb(moduleOutdatedDependencies);
                                /******/
                            } catch (err) {
                                /******/
                                if (options.onErrored) {
                                    /******/
                                    options.onErrored({
                                        /******/
                                        type: 'accept-errored',
                                        /******/
                                        moduleId: moduleId,
                                        /******/
                                        dependencyId: moduleOutdatedDependencies[i],
                                        /******/
                                        error: err
                                        /******/
                                    });
                                    /******/
                                }
                                /******/
                                if (!options.ignoreErrored) {
                                    /******/
                                    if (!error) error = err;
                                    /******/
                                }
                                /******/
                            }
                            /******/
                        }
                        /******/
                    }
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// Load self accepted modules
            /******/
            for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
                /******/
                var item = outdatedSelfAcceptedModules[i];
                /******/
                moduleId = item.module;
                /******/
                hotCurrentParents = [moduleId];
                /******/
                try {
                    /******/
                    __webpack_require__(moduleId);
                    /******/
                } catch (err) {
                    /******/
                    if (typeof item.errorHandler === 'function') {
                        /******/
                        try {
                            /******/
                            item.errorHandler(err);
                            /******/
                        } catch (err2) {
                            /******/
                            if (options.onErrored) {
                                /******/
                                options.onErrored({
                                    /******/
                                    type: 'self-accept-error-handler-errored',
                                    /******/
                                    moduleId: moduleId,
                                    /******/
                                    error: err2,
                                    /******/
                                    originalError: err
                                    /******/
                                });
                                /******/
                            }
                            /******/
                            if (!options.ignoreErrored) {
                                /******/
                                if (!error) error = err2;
                                /******/
                            }
                            /******/
                            if (!error) error = err;
                            /******/
                        }
                        /******/
                    } else {
                        /******/
                        if (options.onErrored) {
                            /******/
                            options.onErrored({
                                /******/
                                type: 'self-accept-errored',
                                /******/
                                moduleId: moduleId,
                                /******/
                                error: err
                                /******/
                            });
                            /******/
                        }
                        /******/
                        if (!options.ignoreErrored) {
                            /******/
                            if (!error) error = err;
                            /******/
                        }
                        /******/
                    }
                    /******/
                }
                /******/
            }
            /******/
            /******/ 		// handle errors in accept handlers and self accepted module load
            /******/
            if (error) {
                /******/
                hotSetStatus('fail');
                /******/
                return Promise.reject(error);
                /******/
            }
            /******/
            /******/
            hotSetStatus('idle');
            /******/
            return new Promise(function (resolve) {
                /******/
                resolve(outdatedModules);
                /******/
            });
            /******/
        }

        /******/
        /******/ 	// The module cache
        /******/
        var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/
            if (installedModules[moduleId]) {
                /******/
                return installedModules[moduleId].exports;
                /******/
            }
            /******/ 		// Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {},
                /******/
                hot: hotCreateModule(moduleId),
                /******/
                parents: (hotCurrentParentsTemp =
                    hotCurrentParents, hotCurrentParents =
                    [], hotCurrentParentsTemp),
                /******/
                children: []
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
            /******/
            /******/ 		// Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/
            return module.exports;
            /******/
        }

        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/
        __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ 	// define __esModule on exports
        /******/
        __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {value: true});
            /******/
        };
        /******/
        /******/ 	// create a fake namespace object
        /******/ 	// mode & 1: value is a module id, require it
        /******/ 	// mode & 2: merge all properties of value into the ns
        /******/ 	// mode & 4: return value when already ns object
        /******/ 	// mode & 8|1: behave like require
        /******/
        __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/
            if (mode & 8) return value;
            /******/
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/
            var ns = Object.create(null);
            /******/
            __webpack_require__.r(ns);
            /******/
            Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value
            });
            /******/
            if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
                return value[key];
            }.bind(null, key));
            /******/
            return ns;
            /******/
        };
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
                /******/            function getDefault() {
                    return module['default'];
                } :
                /******/            function getModuleExports() {
                    return module;
                };
            /******/
            __webpack_require__.d(getter, 'a', getter);
            /******/
            return getter;
            /******/
        };
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ 	// __webpack_public_path__
        /******/
        __webpack_require__.p = '';
        /******/
        /******/ 	// __webpack_hash__
        /******/
        __webpack_require__.h = function () {
            return hotCurrentHash;
        };
        /******/
        /******/
        /******/ 	// Load entry module and return exports
        /******/
        return hotCreateRequire(3)(__webpack_require__.s = 3);
        /******/
    })
    /************************************************************************/
    /******/([
        /* 0 */
        /***/ (function (module, exports) {

            module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

            /***/
        }),
        /* 1 */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {

            'use strict';
            __webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"quill","commonjs2":"quill","amd":"quill","root":"Quill"}
            var external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_ = __webpack_require__(0);
            var external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_);

// CONCATENATED MODULE: ./src/utils/index.js
            function css(domNode, rules) {
                if (typeof rules === 'object') {
                    for (let prop in rules) {
                        domNode.style[prop] = rules[prop];
                    }
                }
            }

            /**
             * getRelativeRect
             * @param  {Object} targetRect  rect data for target element
             * @param  {Element} container  container element
             * @return {Object}             an object with rect data
             */

            function getRelativeRect(targetRect, container) {
                let containerRect = container.getBoundingClientRect();
                return {
                    x: targetRect.x - containerRect.x - container.scrollLeft,
                    y: targetRect.y - containerRect.y - container.scrollTop,
                    x1: targetRect.x - containerRect.x - container.scrollLeft + targetRect.width,
                    y1: targetRect.y - containerRect.y - container.scrollTop + targetRect.height,
                    width: targetRect.width,
                    height: targetRect.height
                };
            }

            /**
             * _omit
             * @param  {Object} obj         target Object
             * @param  {Array} uselessKeys  keys of removed properties
             * @return {Object}             new Object without useless properties
             */

            function _omit(obj, uselessKeys) {
                return obj && Object.keys(obj).reduce((acc, key) => {
                    return uselessKeys.includes(key) ? acc :
                        Object.assign({}, acc, {
                            [key]: obj[key]
                        });
                }, {});
            }

            /**
             * getEventComposedPath
             *  compatibility fixed for Event.path/Event.composedPath
             *  Event.path is only for chrome/opera
             *  Event.composedPath is for Safari, FF
             *  Neither for Micro Edge
             * @param {Event} evt
             * @return {Array} an array of event.path
             */

            function getEventComposedPath(evt) {
                let path; // chrome, opera, safari, firefox

                path = evt.path || evt.composedPath && evt.composedPath(); // other: edge

                if (path === undefined && evt.target) {
                    path = [];
                    let target = evt.target;
                    path.push(target);

                    while (target && target.parentNode) {
                        target = target.parentNode;
                        path.push(target);
                    }
                }
                return path;
            }

// CONCATENATED MODULE: ./src/modules/table-column-tool.js


            const COL_TOOL_HEIGHT = 12;
            const COL_TOOL_CELL_HEIGHT = 12;
            const ROW_TOOL_WIDTH = 12;
            const CELL_MIN_WIDTH = 50;
            const PRIMARY_COLOR = '#1a8cff';

            class table_styleTool {
                backgroundColorBound = this.backgroundColorHandler.bind(this);
                borderColorBound = this.borderColorHandler.bind(this);
                borderWidthBound = this.borderWidthHandler.bind(this);
                BorderStyleBound = this.borderStyleHandler.bind(this);
                backgroundColorBtn;
                borderColorBtn;
                borderWidthBtn;
                borderStyleBtn;

                constructor(table, quill, options) {
                    if (!table) return null;
                    this.table = table;
                    this.quill = quill;
                    this.options = options;
                    this.domNode = null;
                    this.parent = this.quill.root.parentNode;
                    this.initStylingTool();
                    this.createStyingItems();

                }

                initStylingTool() {
                    this.domNode = document.createElement('div');
                    this.domNode.classList.add('qlbt-style-tool');
                    this.domNode.addEventListener('click', this.boundClick);
                    this.parent.appendChild(this.domNode);
                    const tableRect = this.table.getBoundingClientRect();
                    const containerRect = this.quill.root.parentNode.getBoundingClientRect();
                    const tableViewRect = this.table.parentNode.getBoundingClientRect();
                    // css(this.domNode, {
                    //     width: '22px',
                    //     height: '22px',
                    //     left: ''.concat(tableRect.x - 25, 'px'),
                    //     top: ''.concat(tableViewRect.top - containerRect.top + 22, 'px')
                    // });
                    new Popper(this.table, this.domNode, {
                            placement: 'left-start',
                            modifiers: {
                                offset: {
                                    enabled: true,
                                },
                                preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: true,
                                }
                            }
                        }
                    );
                }

                createStyingItems() {
                    this.backgroundColorBtn = document.createElement('div');
                    this.backgroundColorBtn.id = 'backgroundColor';
                    this.backgroundColorBtn.className = 'icon';
                    this.backgroundColorBtn.innerHTML = `<svg style="width:22px;height:22px" viewBox="0 0 24 24">
    <path class="ql-custom-stroke-2" d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" />
</svg>`;

                    this.borderColorBtn = document.createElement('div');
                    this.borderColorBtn.id = 'borderColorBtn';
                    this.borderColorBtn.className = 'icon';
                    this.borderColorBtn.innerHTML = `<svg style="width:22px;height:22px" viewBox="0 0 24 24">
    <path class="ql-custom-stroke-2" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
</svg>`;

                    this.borderWidthBtn = document.createElement('div');
                    this.borderWidthBtn.id = 'borderWidthBtn';
                    this.borderWidthBtn.className = 'icon';
                    this.borderWidthBtn.innerHTML = `<svg style="width:22px;height:22px" viewBox="0 0 24 24">
    <path class="ql-custom-stroke-2" d="M3,17H21V15H3V17M3,20H21V19H3V20M3,13H21V10H3V13M3,4V8H21V4H3Z" />
</svg>`;

                    this.borderStyleBtn = document.createElement('div');
                    this.borderStyleBtn.id = 'BorderStyleBtn';
                    this.borderStyleBtn.className = 'icon';
                    this.borderStyleBtn.innerHTML = `<svg style="width:22px;height:22px" viewBox="0 0 24 24">
    <path class="ql-custom-stroke-2" d="M3,16H8V14H3V16M9.5,16H14.5V14H9.5V16M16,16H21V14H16V16M3,20H5V18H3V20M7,20H9V18H7V20M11,20H13V18H11V20M15,20H17V18H15V20M19,20H21V18H19V20M3,12H11V10H3V12M13,12H21V10H13V12M3,4V8H21V4H3Z" />
</svg>`;


                    this.backgroundColorBtn.addEventListener('click', this.backgroundColorBound);
                    this.borderColorBtn.addEventListener('click', this.borderColorBound);
                    this.borderWidthBtn.addEventListener('click', this.borderWidthBound);
                    this.borderStyleBtn.addEventListener('click', this.BorderStyleBound);

                    this.domNode.appendChild(this.backgroundColorBtn);
                    this.domNode.appendChild(this.borderColorBtn);
                    this.domNode.appendChild(this.borderWidthBtn);
                    this.domNode.appendChild(this.borderStyleBtn);

                    tippy(this.backgroundColorBtn, {
                        content: 'لون الخلفية',
                        placement: 'right',
                    });
                    tippy(this.borderColorBtn, {
                        content: 'لون الحد',
                        placement: 'right'

                    });
                    tippy(this.borderWidthBtn, {
                        content: 'عرض الحد',
                        placement: 'right'

                    });
                    tippy(this.borderStyleBtn, {
                        content: 'شكل الحد',
                        placement: 'right'

                    });

                }

                backgroundColorHandler(e) {

                    const clickedElement = e.target;
                    if (clickedElement === this.backgroundColorBtn) {
                        this.destroyCurrentPicker();
                        this.createColorPicker(this.backgroundColorBtn);
                    } else if (clickedElement.className === 'qlbt-style-colors-item') {
                        const selectedCells = this.quill.getModule('better-table').getSelectedCells();
                        if (!selectedCells) return;

                        selectedCells.forEach(cell => cell.domNode.style.backgroundColor =
                            clickedElement.dataset.value);

                    }
                }

                borderColorHandler(e) {
                    const clickedElement = e.target;
                    if (clickedElement === this.borderColorBtn) {
                        this.destroyCurrentPicker();
                        this.createColorPicker(this.borderColorBtn);
                    } else if (clickedElement.className === 'qlbt-style-colors-item') {
                        const selectedCells = this.quill.getModule('better-table').getSelectedCells();
                        if (!selectedCells) return;

                        selectedCells.forEach(cell => cell.domNode.style.borderColor =
                            clickedElement.dataset.value);
                    }
                }

                borderWidthHandler(e) {
                    const clickedElement = e.target;
                    if (clickedElement === this.borderWidthBtn) {
                        this.destroyCurrentPicker();
                        this.createPicker(this.borderWidthBtn, [0, 1, 1.5, 1.75, 2.25, 3, 4.5,
                            6]);
                    } else if (clickedElement.className === 'qlbt-style-item') {
                        const selectedCells = this.quill.getModule('better-table').getSelectedCells();
                        if (!selectedCells) return;

                        selectedCells.forEach(cell => cell.domNode.style.borderWidth =
                            `${clickedElement.dataset.value}px`);
                    }
                }

                borderStyleHandler(e) {
                    const clickedElement = e.target;
                    if (clickedElement === this.borderStyleBtn) {
                        this.destroyCurrentPicker();
                        this.createPicker(this.borderStyleBtn, ['solid', 'dotted',
                            'dashed']);
                    } else if (clickedElement.className === 'qlbt-style-item') {
                        const selectedCells = this.quill.getModule('better-table').getSelectedCells();
                        if (!selectedCells) return;

                        selectedCells.forEach(cell => cell.domNode.style.borderStyle =
                            clickedElement.dataset.value);
                    }
                }

                destroy() {
                    this.domNode.remove();
                    return null;
                }

                createPicker(pickerParent, items) {
                    let pickerContainer = document.createElement('span');
                    pickerContainer.classList.add('qlbt-style-picker-options');
                    pickerParent.appendChild(pickerContainer);
                    items.forEach(item => {
                        let itemSpan = document.createElement('span');
                        itemSpan.className = 'qlbt-style-item';
                        itemSpan.dataset.value = item;
                        if (pickerParent === this.borderWidthBtn) itemSpan.innerText = item;
                        else {
                            const line = document.createElement('div');
                            line.id = item;
                            itemSpan.appendChild(line);

                        }
                        pickerContainer.appendChild(itemSpan);
                    });
                }

                createColorPicker(colorPickerParent) {
                    let colors = ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc',
                        '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966',
                        '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444',
                        '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'];

                    let colorPickerContainer = document.createElement('span');
                    colorPickerContainer.classList.add('qlbt-style-colors-picker-options');
                    colorPickerParent.appendChild(colorPickerContainer);
                    colors.forEach(color => {
                        let colorSpan = document.createElement('span');
                        colorSpan.className = 'qlbt-style-colors-item';
                        colorSpan.dataset.value = color;
                        colorSpan.style.backgroundColor = color;
                        colorPickerContainer.appendChild(colorSpan);
                    });
                }

                destroyCurrentPicker() {
                    if (this.backgroundColorBtn.querySelector('span'))
                        this.backgroundColorBtn.removeChild(this.backgroundColorBtn.querySelector('span'));
                    else if (this.borderColorBtn.querySelector('span'))
                        this.borderColorBtn.removeChild(this.borderColorBtn.querySelector('span'));
                    else if (this.borderWidthBtn.querySelector('span'))
                        this.borderWidthBtn.removeChild(this.borderWidthBtn.querySelector('span'));
                    else if (this.borderStyleBtn.querySelector('span'))
                        this.borderStyleBtn.removeChild(this.borderStyleBtn.querySelector('span'));
                }
            }

            class table_movingTool {
                isDragging = false;
                parent = null;
                currentTarget = null;
                // google: remove event listener from bind, to get why use these variables.
                boundDrag = this.dragMoveToolHandler.bind(this);
                boundMoving = this.movingTableHandler.bind(this);
                boundDrop = this.dropMoveToolHandler.bind(this);

                constructor(table, quill, options) {
                    if (!table) return null;
                    this.table = table;
                    this.quill = quill;
                    this.options = options;
                    this.domNode = null;
                    this.parent = this.quill.root.parentNode;
                    this.initMovingTool();

                }

                initMovingTool() {
                    this.domNode = document.createElement('div');
                    this.domNode.classList.add('qlbt-move-tool');
                    this.domNode.innerHTML =
                        `<svg style="width:22px;height:22px"  viewBox="0 0 24 24"><path class="ql-custom-stroke-2" d="M20,2H4C2.89,2 2,2.89 2,4V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V4C22,2.89 21.11,2 20,2M20,20H4V4H20M13,8V10H11V8H9L12,5L15,8M16,15V13H14V11H16V9L19,12M10,13H8V15L5,12L8,9V11H10M15,16L12,19L9,16H11V14H13V16" /></svg>`;
                    this.domNode.addEventListener('mousedown', this.boundDrag);
                    this.parent.appendChild(this.domNode);
                    const tableRect = this.table.getBoundingClientRect();
                    const containerRect = this.quill.root.parentNode.getBoundingClientRect();
                    const tableViewRect = this.table.parentNode.getBoundingClientRect();
                    // css(this.domNode, {
                    //     width: '22px',
                    //     height: '22px',
                    //     left: ''.concat(tableRect.x - 25, 'px'),
                    //     top: ''.concat(tableViewRect.top - containerRect.top, 'px')
                    // });
                    new Popper(this.table, this.domNode, {placement: 'bottom-start'}
                    );

                    tippy(this.domNode, {
                        content: 'نقل الجدول',
                        placement: 'left'
                    });
                }

                locateMovingTool() {

                    this.quill.getModule('better-table').hideTableTools();
                }

                dragMoveToolHandler(e) {
                    this.isDragging = true;
                    this.table.style.opacity = '0.3';
                    document.addEventListener('mousemove', this.boundMoving);
                    document.addEventListener('mouseup', this.boundDrop);

                }

                dropMoveToolHandler(e) {
                    if (this.isDragging && e.target.nodeName === 'P') {
                        this.table.remove();
                        this.quill.root.insertBefore(this.table, e.target.nextSibling);
                        this.locateMovingTool();

                    }

                    this.isDragging = false;
                    this.table.style.opacity = '1';
                    if (this.currentTarget) this.currentTarget.classList.remove('current-position-table');
                    document.removeEventListener('mousemove', this.boundMoving);
                    document.removeEventListener('mouseup', this.boundDrop);

                }

                movingTableHandler(e) {
                    if (this.currentTarget) this.currentTarget.classList.remove('current-position-table');

                    e.preventDefault();
                    if (e.target.nodeName === 'P') {
                        this.currentTarget = e.target;
                        this.currentTarget.classList.add('current-position-table');
                    }
                }

                destroy() {
                    this.domNode.remove();
                    return null;
                }
            }

            class table_column_tool_TableColumnTool {
                constructor(table, quill, options) {
                    if (!table) return null;
                    this.table = table;
                    this.quill = quill;
                    this.options = options;
                    this.domNode = null;
                    this.initColTool();
                }

                initColTool() {
                    const parent = this.quill.root.parentNode;
                    const tableRect = this.table.getBoundingClientRect();
                    const containerRect = parent.getBoundingClientRect();
                    const tableViewRect = this.table.parentNode.getBoundingClientRect();
                    this.domNode = document.createElement('div');
                    this.domNode.classList.add('qlbt-col-tool');
                    this.updateToolCells();
                    parent.appendChild(this.domNode);
                    // css(this.domNode, {
                    //     width: ''.concat(tableViewRect.width, 'px'),
                    //     height: ''.concat(COL_TOOL_HEIGHT, 'px'),
                    //     left: ''.concat(tableRect.x - this.domNode.clientWidth + tableRect.width, 'px'),
                    //     top: ''.concat(tableViewRect.top - containerRect.top + parent.scrollTop - COL_TOOL_HEIGHT - 5, 'px')
                    // });
                    new Popper(this.table, this.domNode, {});

                    // resizableGrid(this.table);
                    //
                    // function resizableGrid(table) {
                    //     var row = table.getElementsByTagName('tr')[0],
                    //         cols = row ? row.children : undefined;
                    //     if (!cols) return;
                    //
                    //     table.style.overflow = 'hidden';
                    //
                    //     var tableHeight = table.offsetHeight;
                    //
                    //     for (var i = 0; i < cols.length; i++) {
                    //         var div = createDiv(tableHeight);
                    //         cols[i].appendChild(div);
                    //         cols[i].style.position = 'relative';
                    //         setListeners(div);
                    //     }
                    //
                    //     function setListeners(div) {
                    //         var pageX, curCol, nxtCol, curColWidth, nxtColWidth;
                    //
                    //         div.addEventListener('mousedown', function (e) {
                    //             curCol = e.target.parentElement;
                    //             nxtCol = curCol.nextElementSibling;
                    //             pageX = e.pageX;
                    //
                    //             var padding = paddingDiff(curCol);
                    //
                    //             curColWidth = curCol.offsetWidth - padding;
                    //             if (nxtCol)
                    //                 nxtColWidth = nxtCol.offsetWidth - padding;
                    //         });
                    //
                    //         div.addEventListener('mouseover', function (e) {
                    //             e.target.style.borderRight = '2px solid #0000ff';
                    //         });
                    //
                    //         div.addEventListener('mouseout', function (e) {
                    //             e.target.style.borderRight = '';
                    //         });
                    //
                    //         table.parentNode.addEventListener('mousemove', function (e) {
                    //             if (curCol) {
                    //                 var diffX = e.pageX - pageX;
                    //
                    //                 if (nxtCol)
                    //                     nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';
                    //
                    //                 curCol.style.width = (curColWidth + diffX) + 'px';
                    //             }
                    //         });
                    //
                    //         table.parentNode.addEventListener('mouseup', function (e) {
                    //             curCol = undefined;
                    //             nxtCol = undefined;
                    //             pageX = undefined;
                    //             nxtColWidth = undefined;
                    //             curColWidth = undefined;
                    //         });
                    //     }
                    //
                    //     function createDiv(height) {
                    //         var div = document.createElement('div');
                    //         div.style.top = 0;
                    //         div.style.right = 0;
                    //         div.style.width = '5px';
                    //         div.style.position = 'absolute';
                    //         div.style.cursor = 'col-resize';
                    //         div.style.userSelect = 'none';
                    //         div.style.height = height + 'px';
                    //         return div;
                    //     }
                    //
                    //     function paddingDiff(col) {
                    //
                    //         // if (getStyleVal(col, 'box-sizing') === 'border-box') {
                    //         //     return 0;
                    //         // }
                    //
                    //         var padLeft = getStyleVal(col, 'padding-left');
                    //         var padRight = getStyleVal(col, 'padding-right');
                    //         return (parseInt(padLeft) + parseInt(padRight));
                    //
                    //     }
                    //
                    //     function getStyleVal(elm, css) {
                    //         return (window.getComputedStyle(elm, null).getPropertyValue(css));
                    //     }
                    // };
                }

                createToolCell() {
                    const tableRect = this.table.getBoundingClientRect();
                    const toolCell = document.createElement('div');
                    toolCell.classList.add('qlbt-col-tool-cell');
                    const resizeHolder = document.createElement('div');
                    resizeHolder.classList.add('qlbt-col-tool-cell-holder');
                    resizeHolder.style.height = `${tableRect.height + 10}px`;
                    css(toolCell, {
                        'height': ''.concat(COL_TOOL_CELL_HEIGHT, 'px')
                    });
                    toolCell.appendChild(resizeHolder);
                    return toolCell;
                }

                updateToolCells() {
                    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                    const CellsInFirstRow = tableContainer.children.tail.children.head.children;
                    const tableCols = tableContainer.colGroup().children;
                    const cellsNumber = computeCellsNumber(CellsInFirstRow);
                    let existCells = Array.from(this.domNode.querySelectorAll('.qlbt-col-tool-cell'));

                    for (let index = 0; index < Math.max(cellsNumber, existCells.length); index++) {
                        let col = tableCols.at(index);

                        let toolCell = null;

                        if (!existCells[index]) {
                            toolCell = this.createToolCell();
                            this.domNode.appendChild(toolCell);
                            this.addColCellHolderHandler(toolCell); // set tool cell min-width
                            let colWidth = col && parseInt(col.formats()[col.statics.blotName].width, 10); // if cell already exist

                            css(toolCell, {
                                'min-width': ''.concat(colWidth, 'px')
                            });
                        } else if (existCells[index] && index >= cellsNumber) {
                            existCells[index].remove();
                        } else {
                            toolCell = existCells[index]; // set tool cell min-width
                            let colWidth = col && parseInt(col.formats()[col.statics.blotName].width, 10); // if cell already exist

                            css(toolCell, {
                                'min-width': ''.concat(colWidth, 'px')
                            });
                        }
                    }
                }

                destroy() {
                    this.domNode.remove();
                    return null;
                }

                addColCellHolderHandler(cell) {
                    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                    const $holder = cell.querySelector('.qlbt-col-tool-cell-holder');
                    let dragging = false;
                    let x0 = 0;
                    let x = 0;
                    let delta = 0;
                    let width0 = 0; // helpLine relation varrible

                    let tableRect = {};
                    let cellRect = {};
                    let $helpLine = null;

                    const handleDrag = e => {
                        e.preventDefault();

                        if (dragging) {
                            x = e.clientX;

                            if (width0 + x - x0 >= CELL_MIN_WIDTH) {
                                delta = x - x0;
                            } else {
                                delta = CELL_MIN_WIDTH - width0;
                            }

                            css($helpLine, {
                                'left': ''.concat(cellRect.left + cellRect.width - 1 + delta, 'px')
                            });
                        }
                    };

                    const handleMouseup = e => {
                        e.preventDefault();
                        const existCells = Array.from(this.domNode.querySelectorAll('.qlbt-col-tool-cell'));
                        const colIndex = existCells.indexOf(cell);
                        const colBlot = tableContainer.colGroup().children.at(colIndex);

                        if (dragging) {
                            colBlot.format('width', width0 + delta);
                            css(cell, {
                                'min-width': ''.concat(width0 + delta, 'px')
                            });
                            x0 = 0;
                            x = 0;
                            delta = 0;
                            width0 = 0;
                            dragging = false;
                            $holder.classList.remove('dragging');
                        }

                        document.removeEventListener('mousemove', handleDrag, false);
                        document.removeEventListener('mouseup', handleMouseup, false);
                        tableRect = {};
                        cellRect = {};
                        $helpLine.remove();
                        $helpLine = null;
                        tableContainer.updateTableWidth();
                        const tableSelection = this.quill.getModule('better-table').tableSelection;
                        tableSelection && tableSelection.clearSelection();
                    };

                    const handleMousedown = e => {
                        document.addEventListener('mousemove', handleDrag, false);
                        document.addEventListener('mouseup', handleMouseup, false);
                        tableRect = this.table.getBoundingClientRect();
                        cellRect = cell.getBoundingClientRect();
                        $helpLine = document.createElement('div');
                        css($helpLine, {
                            position: 'fixed',
                            top: ''.concat(cellRect.top, 'px'),
                            left: ''.concat(cellRect.left + cellRect.width - 1, 'px'),
                            zIndex: '100',
                            height: ''.concat(tableRect.height + 10, 'px'),
                            width: '1px',
                            backgroundColor: PRIMARY_COLOR
                        });
                        document.body.appendChild($helpLine);
                        dragging = true;
                        x0 = e.clientX;
                        width0 = cellRect.width;
                        $holder.classList.add('dragging');
                    };

                    $holder.addEventListener('mousedown', handleMousedown, false);
                }

                colToolCells() {
                    return Array.from(this.domNode.querySelectorAll('.qlbt-col-tool-cell'));
                }

            }

            function computeCellsNumber(CellsInFirstRow) {
                return CellsInFirstRow.reduce((sum, cell) => {
                    const cellColspan = cell.formats().colspan;
                    sum = sum + parseInt(cellColspan, 10);
                    return sum;
                }, 0);
            }

// CONCATENATED MODULE: ./src/formats/title-bar.js


            const Block = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/block');

            class header_Header extends Block {
                static create(value) {
                    if (typeof value === 'string') {
                        value = {
                            value
                        };
                    }

                    const node = super.create(value.value);
                    CELL_IDENTITY_KEYS.forEach(key => {
                        if (value[key]) node.setAttribute('data-'.concat(key), value[key]);
                    });
                    CELL_ATTRIBUTES.forEach(key => {
                        if (value[key]) node.setAttribute('data-'.concat(key), value[key]);
                    });
                    return node;
                }

                static formats(domNode) {
                    const formats = {};
                    formats.value = this.tagName.indexOf(domNode.tagName) + 1;
                    return CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).reduce((formats, attribute) => {
                        if (domNode.hasAttribute('data-'.concat(attribute))) {
                            formats[attribute] =
                                domNode.getAttribute('data-'.concat(attribute)) || undefined;
                        }

                        return formats;
                    }, formats);
                }

                format(name, value) {
                    const {
                        row,
                        cell,
                        rowspan,
                        colspan
                    } = header_Header.formats(this.domNode);

                    if (name === header_Header.blotName) {
                        if (value) {
                            super.format(name, {
                                value,
                                row,
                                cell,
                                rowspan,
                                colspan
                            });
                        } else {
                            if (row) {
                                this.replaceWith(TableCellLine.blotName, {
                                    row,
                                    cell,
                                    rowspan,
                                    colspan
                                });
                            } else {
                                super.format(name, value);
                            }
                        }
                    } else {
                        super.format(name, value);
                    }
                }

                optimize(context) {
                    const {
                        row,
                        rowspan,
                        colspan
                    } = header_Header.formats(this.domNode);

                    if (row && !(this.parent instanceof TableCell)) {
                        this.wrap(TableCell.blotName, {
                            row,
                            colspan,
                            rowspan
                        });
                    } // ShadowBlot optimize


                    this.enforceAllowedChildren();

                    if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {
                        this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
                    }

                    if (this.children.length === 0) {
                        if (this.statics.defaultChild != null) {
                            const child = this.scroll.create(this.statics.defaultChild.blotName);
                            this.appendChild(child); // TODO double check if necessary
                            // child.optimize(context);
                        } else {
                            this.remove();
                        }
                    } // Block optimize


                    this.cache = {};
                }

                deleteAt() {
                    return false;
                }
            }

            header_Header.blotName = 'header';
            header_Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
            /* harmony default export */
            var header = (header_Header);
// CONCATENATED MODULE: ./src/formats/table.js


            const Break = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/break');
            const table_Block = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/block');
            const Container = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('blots/container');
            const COL_ATTRIBUTES = ['width'];
            const COL_DEFAULT = {
                width: 100
            };
            const CELL_IDENTITY_KEYS = ['row', 'cell'];
            const CELL_ATTRIBUTES = ['rowspan', 'colspan'];
            const CELL_DEFAULT = {
                rowspan: 1,
                colspan: 1
            };
            const ERROR_LIMIT = 5;

            class TableCellLine extends table_Block {
                static create(value) {
                    const node = super.create(value);
                    CELL_IDENTITY_KEYS.forEach(key => {
                        let identityMaker = key === 'row' ? table_rowId :
                            table_cellId;
                        node.setAttribute('data-'.concat(key), value[key] || identityMaker());
                    });
                    CELL_ATTRIBUTES.forEach(attrName => {
                        node.setAttribute('data-'.concat(attrName), value[attrName] || CELL_DEFAULT[attrName]);
                    });
                    return node;
                }

                static formats(domNode) {
                    const formats = {};
                    return CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).reduce((formats, attribute) => {
                        if (domNode.hasAttribute('data-'.concat(attribute))) {
                            formats[attribute] =
                                domNode.getAttribute('data-'.concat(attribute)) || undefined;
                        }

                        return formats;
                    }, formats);
                }

                format(name, value) {
                    if (CELL_ATTRIBUTES.concat(CELL_IDENTITY_KEYS).indexOf(name) > -1) {
                        if (value) {
                            this.domNode.setAttribute('data-'.concat(name), value);
                        } else {
                            this.domNode.removeAttribute('data-'.concat(name));
                        }
                    } else if (name === 'header') {
                        if (!value) return;
                        const {
                            row,
                            cell,
                            rowspan,
                            colspan
                        } = TableCellLine.formats(this.domNode);
                        super.format(name, {
                            value,
                            row,
                            cell,
                            rowspan,
                            colspan
                        });
                    } else {
                        super.format(name, value);
                    }
                }

                optimize(context) {
                    // cover shadowBlot's wrap call, pass params parentBlot initialize
                    // needed
                    const rowId = this.domNode.getAttribute('data-row');
                    const rowspan = this.domNode.getAttribute('data-rowspan');
                    const colspan = this.domNode.getAttribute('data-colspan');

                    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
                        this.wrap(this.statics.requiredContainer.blotName, {
                            row: rowId,
                            colspan,
                            rowspan
                        });
                    }

                    super.optimize(context);
                }

                tableCell() {
                    return this.parent;
                }

                deleteAt() {
                    return false;
                }
            }

            TableCellLine.blotName = 'table-cell-line';
            TableCellLine.ClassName = 'qlbt-cell-line';
            TableCellLine.tagName = 'DIV';

            class TableCell extends Container {
                checkMerge() {
                    if (super.checkMerge() && this.next.children.head != null) {
                        const thisHead = this.children.head.formats()[this.children.head.statics.blotName];
                        const thisTail = this.children.tail.formats()[this.children.tail.statics.blotName];
                        const nextHead = this.next.children.head.formats()[this.next.children.head.statics.blotName];
                        const nextTail = this.next.children.tail.formats()[this.next.children.tail.statics.blotName];
                        return thisHead.cell === thisTail.cell && thisHead.cell === nextHead.cell && thisHead.cell === nextTail.cell;
                    }

                    return false;
                }

                static create(value) {
                    const node = super.create(value);
                    node.setAttribute('data-row', value.row);
                    CELL_ATTRIBUTES.forEach(attrName => {
                        if (value[attrName]) {
                            node.setAttribute(attrName, value[attrName]);
                        }
                    });
                    return node;
                }

                static formats(domNode) {
                    const formats = {};

                    if (domNode.hasAttribute('data-row')) {
                        formats['row'] = domNode.getAttribute('data-row');
                    }

                    return CELL_ATTRIBUTES.reduce((formats, attribute) => {
                        if (domNode.hasAttribute(attribute)) {
                            formats[attribute] =
                                domNode.getAttribute(attribute);
                        }

                        return formats;
                    }, formats);
                }

                cellOffset() {
                    if (this.parent) {
                        return this.parent.children.indexOf(this);
                    }

                    return -1;
                }

                formats() {
                    const formats = {};

                    if (this.domNode.hasAttribute('data-row')) {
                        formats['row'] = this.domNode.getAttribute('data-row');
                    }

                    return CELL_ATTRIBUTES.reduce((formats, attribute) => {
                        if (this.domNode.hasAttribute(attribute)) {
                            formats[attribute] =
                                this.domNode.getAttribute(attribute);
                        }

                        return formats;
                    }, formats);
                }

                toggleAttribute(name, value) {
                    if (value) {
                        this.domNode.setAttribute(name, value);
                    } else {
                        this.domNode.removeAttribute(name);
                    }
                }

                formatChildren(name, value) {
                    this.children.forEach(child => {
                        child.format(name, value);
                    });
                }

                format(name, value) {
                    if (CELL_ATTRIBUTES.indexOf(name) > -1) {
                        this.toggleAttribute(name, value);
                        this.formatChildren(name, value);
                    } else if (['row'].indexOf(name) > -1) {
                        this.toggleAttribute('data-'.concat(name), value);
                        this.formatChildren(name, value);
                    } else {
                        super.format(name, value);
                    }
                }

                optimize(context) {
                    const rowId = this.domNode.getAttribute('data-row');

                    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
                        this.wrap(this.statics.requiredContainer.blotName, {
                            row: rowId
                        });
                    }

                    super.optimize(context);
                }

                row() {
                    return this.parent;
                }

                rowOffset() {
                    if (this.row()) {
                        return this.row().rowOffset();
                    }

                    return -1;
                }

                table() {
                    return this.row() && this.row().table();
                }

                deleteAt() {
                    return false;
                }
            }

            TableCell.blotName = 'table';
            TableCell.tagName = 'TD';

            class TableRow extends Container {
                checkMerge() {
                    if (super.checkMerge() && this.next.children.head != null) {
                        const thisHead = this.children.head.formats();
                        const thisTail = this.children.tail.formats();
                        const nextHead = this.next.children.head.formats();
                        const nextTail = this.next.children.tail.formats();
                        return thisHead.row === thisTail.row && thisHead.row === nextHead.row && thisHead.row === nextTail.row;
                    }

                    return false;
                }

                static create(value) {
                    const node = super.create(value);
                    node.setAttribute('data-row', value.row);
                    return node;
                }

                formats() {
                    return ['row'].reduce((formats, attrName) => {
                        if (this.domNode.hasAttribute('data-'.concat(attrName))) {
                            formats[attrName] =
                                this.domNode.getAttribute('data-'.concat(attrName));
                        }

                        return formats;
                    }, {});
                }

                optimize(context) {
                    // optimize function of ShadowBlot
                    if (this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer)) {
                        this.wrap(this.statics.requiredContainer.blotName);
                    } // optimize function of ParentBlot
                    // note: modified this optimize function because
                    // TableRow should not be removed when the length of its children was 0


                    this.enforceAllowedChildren();

                    if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {
                        this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
                    } // optimize function of ContainerBlot


                    if (this.children.length > 0 && this.next != null && this.checkMerge()) {
                        this.next.moveChildren(this);
                        this.next.remove();
                    }
                }

                rowOffset() {
                    if (this.parent) {
                        return this.parent.children.indexOf(this);
                    }

                    return -1;
                }

                table() {
                    return this.parent && this.parent.parent;
                }

                deleteAt() {
                    return false;
                }
            }

            TableRow.blotName = 'table-row';
            TableRow.tagName = 'TR';

            class TableBody extends Container {
            }

            TableBody.blotName = 'table-body';
            TableBody.tagName = 'TBODY';

            class TableCol extends table_Block {
                static create(value) {
                    let node = super.create(value);
                    COL_ATTRIBUTES.forEach(attrName => {
                        node.setAttribute(''.concat(attrName), value[attrName] || COL_DEFAULT[attrName]);
                    });
                    return node;
                }

                static formats(domNode) {
                    return COL_ATTRIBUTES.reduce((formats, attribute) => {
                        if (domNode.hasAttribute(''.concat(attribute))) {
                            formats[attribute] =
                                domNode.getAttribute(''.concat(attribute)) || undefined;
                        }

                        return formats;
                    }, {});
                }

                format(name, value) {
                    if (COL_ATTRIBUTES.indexOf(name) > -1) {
                        this.domNode.setAttribute(''.concat(name), value || COL_DEFAULT[name]);
                    } else {
                        super.format(name, value);
                    }
                }

                html() {
                    return this.domNode.outerHTML;
                }

                deleteAt() {
                    return false;
                }
            }

            TableCol.blotName = 'table-col';
            TableCol.tagName = 'col';

            class TableColGroup extends Container {
            }

            TableColGroup.blotName = 'table-col-group';
            TableColGroup.tagName = 'colgroup';

            class table_TableContainer extends Container {
                static create() {
                    return super.create();
                }

                constructor(scroll, domNode) {
                    super(scroll, domNode);
                    this.updateTableWidth();
                }

                updateTableWidth() {
                    setTimeout(() => {
                        const colGroup = this.colGroup();
                        if (!colGroup) return;
                        const tableWidth = colGroup.children.reduce((sumWidth, col) => {
                            sumWidth =
                                sumWidth + parseInt(col.formats()[TableCol.blotName].width, 10);
                            return sumWidth;
                        }, 0);
                        this.domNode.style.width = ''.concat(tableWidth, 'px');
                    }, 0);
                }

                cells(column) {
                    return this.rows().map(row => row.children.at(column));
                }

                colGroup() {
                    return this.children.head;
                }

                deleteColumns(compareRect) {
                    let delIndexes = arguments.length > 1 && arguments[1] !== undefined ?
                        arguments[1] : [];
                    let editorWrapper = arguments.length > 2 ? arguments[2] :
                        undefined;
                    const [body] = this.descendants(TableBody);
                    if (body == null || body.children.head == null) return;
                    const tableCells = this.descendants(TableCell);
                    const removedCells = [];
                    const modifiedCells = [];
                    tableCells.forEach(cell => {
                        const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);

                        if (cellRect.x + ERROR_LIMIT > compareRect.x && cellRect.x1 - ERROR_LIMIT < compareRect.x1) {
                            removedCells.push(cell);
                        } else if (cellRect.x < compareRect.x + ERROR_LIMIT && cellRect.x1 > compareRect.x1 - ERROR_LIMIT) {
                            modifiedCells.push(cell);
                        }
                    });

                    if (removedCells.length === tableCells.length) {
                        this.tableDestroy();
                        return true;
                    } // remove the matches column tool cell


                    delIndexes.forEach(delIndex => {
                        this.colGroup().children.at(delIndexes[0]).remove();
                    });
                    removedCells.forEach(cell => {
                        cell.remove();
                    });
                    modifiedCells.forEach(cell => {
                        const cellColspan = parseInt(cell.formats().colspan, 10);
                        const cellWidth = parseInt(cell.formats().width, 10);
                        cell.format('colspan', cellColspan - delIndexes.length);
                    });
                    this.updateTableWidth();
                }

                deleteRow(compareRect, editorWrapper) {
                    const [body] = this.descendants(TableBody);
                    if (body == null || body.children.head == null) return;
                    const tableCells = this.descendants(TableCell);
                    const removedCells = []; // cells to be removed

                    const modifiedCells = []; // cells to be modified

                    const fallCells = []; // cells to fall into next row

                    tableCells.forEach(cell => {
                        const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);

                        if (cellRect.y > compareRect.y - ERROR_LIMIT && cellRect.y1 < compareRect.y1 + ERROR_LIMIT) {
                            removedCells.push(cell);
                        } else if (cellRect.y < compareRect.y + ERROR_LIMIT && cellRect.y1 > compareRect.y1 - ERROR_LIMIT) {
                            modifiedCells.push(cell);

                            if (Math.abs(cellRect.y - compareRect.y) < ERROR_LIMIT) {
                                fallCells.push(cell);
                            }
                        }
                    });

                    if (removedCells.length === tableCells.length) {
                        this.tableDestroy();
                        return;
                    } // compute length of removed rows


                    const removedRowsLength = this.rows().reduce((sum, row) => {
                        let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), editorWrapper);

                        if (rowRect.y > compareRect.y - ERROR_LIMIT && rowRect.y1 < compareRect.y1 + ERROR_LIMIT) {
                            sum += 1;
                        }

                        return sum;
                    }, 0); // it must execute before the table layout changed with other operation

                    fallCells.forEach(cell => {
                        const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);
                        const nextRow = cell.parent.next;
                        const cellsInNextRow = nextRow.children;
                        const refCell = cellsInNextRow.reduce((ref, compareCell) => {
                            const compareRect = getRelativeRect(compareCell.domNode.getBoundingClientRect(), editorWrapper);

                            if (Math.abs(cellRect.x1 - compareRect.x) < ERROR_LIMIT) {
                                ref = compareCell;
                            }

                            return ref;
                        }, null);
                        nextRow.insertBefore(cell, refCell);
                        cell.format('row', nextRow.formats().row);
                    });
                    removedCells.forEach(cell => {
                        cell.remove();
                    });
                    modifiedCells.forEach(cell => {
                        const cellRowspan = parseInt(cell.formats().rowspan, 10);
                        cell.format('rowspan', cellRowspan - removedRowsLength);
                    });
                }

                tableDestroy() {
                    const quill = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.scroll.domNode.parentNode);
                    const tableModule = quill.getModule('better-table');
                    this.remove();
                    tableModule.hideTableTools();
                    quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                }

                insertCell(tableRow, ref) {
                    const id = table_cellId();
                    const rId = tableRow.formats().row;
                    const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
                        row: rId
                    }));
                    const cellLine = this.scroll.create(TableCellLine.blotName, {
                        row: rId,
                        cell: id
                    });
                    tableCell.appendChild(cellLine);

                    if (ref) {
                        tableRow.insertBefore(tableCell, ref);
                    } else {
                        tableRow.appendChild(tableCell);
                    }
                }

                insertColumn(compareRect, colIndex) {
                    let isRight = arguments.length > 2 && arguments[2] !== undefined ?
                        arguments[2] : true;
                    let editorWrapper = arguments.length > 3 ? arguments[3] :
                        undefined;
                    const [body] = this.descendants(TableBody);
                    const [tableColGroup] = this.descendants(TableColGroup);
                    const tableCols = this.descendants(TableCol);
                    let addAsideCells = [];
                    let modifiedCells = [];
                    let affectedCells = [];
                    if (body == null || body.children.head == null) return;
                    const tableCells = this.descendants(TableCell);
                    tableCells.forEach(cell => {
                        const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);

                        if (isRight) {
                            if (Math.abs(cellRect.x1 - compareRect.x1) < ERROR_LIMIT) {
                                // the right of selected boundary equal to the right of table cell,
                                // add a new table cell right aside this table cell
                                addAsideCells.push(cell);
                            } else if (compareRect.x1 - cellRect.x > ERROR_LIMIT && compareRect.x1 - cellRect.x1 < -ERROR_LIMIT) {
                                // the right of selected boundary is inside this table cell
                                // colspan of this table cell will increase 1
                                modifiedCells.push(cell);
                            }
                        } else {
                            if (Math.abs(cellRect.x - compareRect.x) < ERROR_LIMIT) {
                                // left of selected boundary equal to left of table cell,
                                // add a new table cell left aside this table cell
                                addAsideCells.push(cell);
                            } else if (compareRect.x - cellRect.x > ERROR_LIMIT && compareRect.x - cellRect.x1 < -ERROR_LIMIT) {
                                // the left of selected boundary is inside this table cell
                                // colspan of this table cell will increase 1
                                modifiedCells.push(cell);
                            }
                        }
                    });
                    addAsideCells.forEach(cell => {
                        const ref = isRight ? cell.next : cell;
                        const id = table_cellId();
                        const tableRow = cell.parent;
                        const rId = tableRow.formats().row;
                        const cellFormats = cell.formats();
                        const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
                            row: rId,
                            rowspan: cellFormats.rowspan
                        }));
                        const cellLine = this.scroll.create(TableCellLine.blotName, {
                            row: rId,
                            cell: id,
                            rowspan: cellFormats.rowspan
                        });
                        tableCell.appendChild(cellLine);

                        if (ref) {
                            tableRow.insertBefore(tableCell, ref);
                        } else {
                            tableRow.appendChild(tableCell);
                        }

                        affectedCells.push(tableCell);
                    }); // insert new tableCol

                    const tableCol = this.scroll.create(TableCol.blotName, true);
                    let colRef = isRight ? tableCols[colIndex].next :
                        tableCols[colIndex];

                    if (colRef) {
                        tableColGroup.insertBefore(tableCol, colRef);
                    } else {
                        tableColGroup.appendChild(tableCol);
                    }

                    modifiedCells.forEach(cell => {
                        const cellColspan = cell.formats().colspan;
                        cell.format('colspan', parseInt(cellColspan, 10) + 1);
                        affectedCells.push(cell);
                    });
                    affectedCells.sort((cellA, cellB) => {
                        let y1 = cellA.domNode.getBoundingClientRect().y;
                        let y2 = cellB.domNode.getBoundingClientRect().y;
                        return y1 - y2;
                    });
                    this.updateTableWidth();
                    return affectedCells;
                }

                insertRow(compareRect, isDown, editorWrapper) {
                    const [body] = this.descendants(TableBody);
                    if (body == null || body.children.head == null) return;
                    const tableCells = this.descendants(TableCell);
                    const rId = table_rowId();
                    const newRow = this.scroll.create(TableRow.blotName, {
                        row: rId
                    });
                    let addBelowCells = [];
                    let modifiedCells = [];
                    let affectedCells = [];
                    tableCells.forEach(cell => {
                        const cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);

                        if (isDown) {
                            if (Math.abs(cellRect.y1 - compareRect.y1) < ERROR_LIMIT) {
                                addBelowCells.push(cell);
                            } else if (compareRect.y1 - cellRect.y > ERROR_LIMIT && compareRect.y1 - cellRect.y1 < -ERROR_LIMIT) {
                                modifiedCells.push(cell);
                            }
                        } else {
                            if (Math.abs(cellRect.y - compareRect.y) < ERROR_LIMIT) {
                                addBelowCells.push(cell);
                            } else if (compareRect.y - cellRect.y > ERROR_LIMIT && compareRect.y - cellRect.y1 < -ERROR_LIMIT) {
                                modifiedCells.push(cell);
                            }
                        }
                    }); // ordered table cells with rect.x, fix error for inserting
                    // new table cell in complicated table with wrong order.

                    const sortFunc = (cellA, cellB) => {
                        let x1 = cellA.domNode.getBoundingClientRect().x;
                        let x2 = cellB.domNode.getBoundingClientRect().x;
                        return x1 - x2;
                    };

                    addBelowCells.sort(sortFunc);
                    addBelowCells.forEach(cell => {
                        const cId = table_cellId();
                        const cellFormats = cell.formats();
                        const tableCell = this.scroll.create(TableCell.blotName, Object.assign({}, CELL_DEFAULT, {
                            row: rId,
                            colspan: cellFormats.colspan
                        }));
                        const cellLine = this.scroll.create(TableCellLine.blotName, {
                            row: rId,
                            cell: cId,
                            colspan: cellFormats.colspan
                        });
                        const empty = this.scroll.create(Break.blotName);
                        cellLine.appendChild(empty);
                        tableCell.appendChild(cellLine);
                        newRow.appendChild(tableCell);
                        affectedCells.push(tableCell);
                    });
                    modifiedCells.forEach(cell => {
                        const cellRowspan = parseInt(cell.formats().rowspan, 10);
                        cell.format('rowspan', cellRowspan + 1);
                        affectedCells.push(cell);
                    });
                    const refRow = this.rows().find(row => {
                        let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), editorWrapper);

                        if (isDown) {
                            return Math.abs(rowRect.y - compareRect.y - compareRect.height) < ERROR_LIMIT;
                        } else {
                            return Math.abs(rowRect.y - compareRect.y) < ERROR_LIMIT;
                        }
                    });
                    body.insertBefore(newRow, refRow); // reordering affectedCells

                    affectedCells.sort(sortFunc);
                    return affectedCells;
                }

                mergeCells(compareRect, mergingCells, rowspan, colspan, editorWrapper) {
                    const mergedCell = mergingCells.reduce((result, tableCell, index) => {
                        if (index !== 0) {
                            result && tableCell.moveChildren(result);
                            tableCell.remove();
                        } else {
                            tableCell.format('colspan', colspan);
                            tableCell.format('rowspan', rowspan);
                            result = tableCell;
                        }

                        return result;
                    }, null);
                    let rowId = mergedCell.domNode.getAttribute('data-row');
                    let cellId = mergedCell.children.head.domNode.getAttribute('data-cell');
                    mergedCell.children.forEach(cellLine => {
                        cellLine.format('cell', cellId);
                        cellLine.format('row', rowId);
                        cellLine.format('colspan', colspan);
                        cellLine.format('rowspan', rowspan);
                    });
                    return mergedCell;
                }

                unmergeCells(unmergingCells, editorWrapper) {
                    let cellFormats = {};
                    let cellRowspan = 1;
                    let cellColspan = 1;
                    unmergingCells.forEach(tableCell => {
                        cellFormats = tableCell.formats();
                        cellRowspan = cellFormats.rowspan;
                        cellColspan = cellFormats.colspan;

                        if (cellColspan > 1) {
                            let ref = tableCell.next;
                            let row = tableCell.row();
                            tableCell.format('colspan', 1);

                            for (let i = cellColspan; i > 1; i--) {
                                this.insertCell(row, ref);
                            }
                        }

                        if (cellRowspan > 1) {
                            let i = cellRowspan;
                            let nextRow = tableCell.row().next;

                            while (i > 1) {
                                let refInNextRow = nextRow.children.reduce((result, cell) => {
                                    let compareRect = getRelativeRect(tableCell.domNode.getBoundingClientRect(), editorWrapper);
                                    let cellRect = getRelativeRect(cell.domNode.getBoundingClientRect(), editorWrapper);

                                    if (Math.abs(compareRect.x1 - cellRect.x) < ERROR_LIMIT) {
                                        result = cell;
                                    }

                                    return result;
                                }, null);

                                for (let i = cellColspan; i > 0; i--) {
                                    this.insertCell(nextRow, refInNextRow);
                                }

                                i -= 1;
                                nextRow = nextRow.next;
                            }

                            tableCell.format('rowspan', 1);
                        }
                    });
                }

                rows() {
                    const body = this.children.tail;
                    if (body == null) return [];
                    return body.children.map(row => row);
                }

                deleteAt() {
                    return false;
                }
            }

            table_TableContainer.blotName = 'table-container';
            table_TableContainer.className = 'quill-better-table';
            table_TableContainer.tagName = 'TABLE';

            class table_TableViewWrapper extends Container {
                constructor(scroll, domNode) {
                    super(scroll, domNode);
                    const quill = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(scroll.domNode.parentNode);
                    domNode.addEventListener('scroll', e => {
                        const tableModule = quill.getModule('better-table');

                        if (tableModule.columnTool) {
                            tableModule.columnTool.domNode.scrollLeft =
                                e.target.scrollLeft;
                        }

                        if (tableModule.tableSelection && tableModule.tableSelection.selectedTds.length > 0) {
                            tableModule.tableSelection.repositionHelpLines();
                        }
                    }, false);
                }

                deleteAt() {
                    return false;
                }
            }

            table_TableViewWrapper.blotName = 'table-view';
            table_TableViewWrapper.className = 'quill-better-table-wrapper';
            table_TableViewWrapper.tagName = 'DIV';
            table_TableViewWrapper.allowedChildren = [table_TableContainer];
            table_TableContainer.requiredContainer = table_TableViewWrapper;
            table_TableContainer.allowedChildren = [TableBody, TableColGroup];
            TableBody.requiredContainer = table_TableContainer;
            TableBody.allowedChildren = [TableRow];
            TableRow.requiredContainer = TableBody;
            TableRow.allowedChildren = [TableCell];
            TableCell.requiredContainer = TableRow;
            TableCell.allowedChildren = [TableCellLine, header];
            TableCellLine.requiredContainer = TableCell;
            TableColGroup.allowedChildren = [TableCol];
            TableColGroup.requiredContainer = table_TableContainer;
            TableCol.requiredContainer = TableColGroup;

            function table_rowId() {
                const id = Math.random().toString(36).slice(2, 6);
                return 'row-'.concat(id);
            }

            function table_cellId() {
                const id = Math.random().toString(36).slice(2, 6);
                return 'cell-'.concat(id);
            }


// CONCATENATED MODULE: ./src/modules/table-selection.js


            const table_selection_PRIMARY_COLOR = '#06c';
            const LINE_POSITIONS = ['left', 'right', 'top', 'bottom'];
            const table_selection_ERROR_LIMIT = 2;

            class table_selection_TableSelection {
                constructor(table, quill, options) {
                    if (!table) return null;
                    this.table = table;
                    this.quill = quill;
                    this.options = options;
                    this.boundary = {}; // params for selected square

                    this.selectedTds = []; // array for selected table-cells

                    this.dragging = false;
                    this.selectingHandler = this.mouseDownHandler.bind(this);
                    this.clearSelectionHanler = this.clearSelection.bind(this);
                    this.helpLinesInitial();
                    this.quill.root.addEventListener('mousedown', this.selectingHandler, false);
                    this.quill.on('text-change', this.clearSelectionHanler);
                }

                helpLinesInitial() {
                    let parent = this.quill.root.parentNode;
                    LINE_POSITIONS.forEach(direction => {
                        this[direction] = document.createElement('div');
                        this[direction].classList.add('qlbt-selection-line');
                        css(this[direction], {
                            position: 'absolute',
                            display: 'none',
                            'background-color': table_selection_PRIMARY_COLOR
                        });
                        parent.appendChild(this[direction]);
                    });
                }

                mouseDownHandler(e) {
                    if (e.button !== 0 || !e.target.closest('.quill-better-table')) return;
                    this.quill.root.addEventListener('mousemove', mouseMoveHandler, false);
                    this.quill.root.addEventListener('mouseup', mouseUpHandler, false);
                    const self = this;
                    const startTd = e.target.closest('td[data-row]');
                    const startTdRect = getRelativeRect(startTd.getBoundingClientRect(), this.quill.root.parentNode);
                    this.dragging = true;
                    this.boundary =
                        computeBoundaryFromRects(startTdRect, startTdRect);
                    this.correctBoundary();
                    this.selectedTds = this.computeSelectedTds();
                    this.repositionHelpLines();

                    function mouseMoveHandler(e) {
                        if (e.button !== 0 || !e.target.closest('.quill-better-table')) return;
                        const endTd = e.target.closest('td[data-row]');
                        const endTdRect = getRelativeRect(endTd.getBoundingClientRect(), self.quill.root.parentNode);
                        self.boundary =
                            computeBoundaryFromRects(startTdRect, endTdRect);
                        self.correctBoundary();
                        self.selectedTds = EditorHelper.tableSelectedCells =
                            self.computeSelectedTds();
                        self.repositionHelpLines(); // avoid select text in multiple table-cell

                        if (startTd !== endTd) {
                            self.quill.blur();
                        }
                    }

                    function mouseUpHandler(e) {
                        self.quill.root.removeEventListener('mousemove', mouseMoveHandler, false);
                        self.quill.root.removeEventListener('mouseup', mouseUpHandler, false);
                        self.dragging = false;
                    }
                }

                correctBoundary() {
                    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                    const tableCells = tableContainer.descendants(TableCell);
                    tableCells.forEach(tableCell => {
                        let {
                            x,
                            y,
                            width,
                            height
                        } = getRelativeRect(tableCell.domNode.getBoundingClientRect(), this.quill.root.parentNode);
                        let isCellIntersected = (x + table_selection_ERROR_LIMIT >= this.boundary.x && x + table_selection_ERROR_LIMIT <= this.boundary.x1 || x - table_selection_ERROR_LIMIT + width >= this.boundary.x && x - table_selection_ERROR_LIMIT + width <= this.boundary.x1) && (y + table_selection_ERROR_LIMIT >= this.boundary.y && y + table_selection_ERROR_LIMIT <= this.boundary.y1 || y - table_selection_ERROR_LIMIT + height >= this.boundary.y && y - table_selection_ERROR_LIMIT + height <= this.boundary.y1);

                        if (isCellIntersected) {
                            this.boundary =
                                computeBoundaryFromRects(this.boundary, {
                                    x,
                                    y,
                                    width,
                                    height
                                });
                        }
                    });
                }

                computeSelectedTds() {
                    const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                    const tableCells = tableContainer.descendants(TableCell);
                    return tableCells.reduce((selectedCells, tableCell) => {
                        let {
                            x,
                            y,
                            width,
                            height
                        } = getRelativeRect(tableCell.domNode.getBoundingClientRect(), this.quill.root.parentNode);
                        let isCellIncluded = x + table_selection_ERROR_LIMIT >= this.boundary.x && x - table_selection_ERROR_LIMIT + width <= this.boundary.x1 && y + table_selection_ERROR_LIMIT >= this.boundary.y && y - table_selection_ERROR_LIMIT + height <= this.boundary.y1;

                        if (isCellIncluded) {
                            selectedCells.push(tableCell);
                        }

                        return selectedCells;
                    }, []);
                }

                repositionHelpLines() {
                    const tableViewScrollLeft = this.table.parentNode.scrollLeft;
                    css(this.left, {
                        display: 'block',
                        left: ''.concat(this.boundary.x - tableViewScrollLeft - 1, 'px'),
                        top: ''.concat(this.boundary.y, 'px'),
                        height: ''.concat(this.boundary.height + 1, 'px'),
                        width: '2.5px'
                    });
                    css(this.right, {
                        display: 'block',
                        left: ''.concat(this.boundary.x1 - tableViewScrollLeft, 'px'),
                        top: ''.concat(this.boundary.y, 'px'),
                        height: ''.concat(this.boundary.height + 1, 'px'),
                        width: '2.5px'
                    });
                    css(this.top, {
                        display: 'block',
                        left: ''.concat(this.boundary.x - 1 - tableViewScrollLeft, 'px'),
                        top: ''.concat(this.boundary.y, 'px'),
                        width: ''.concat(this.boundary.width + 1, 'px'),
                        height: '2.5px'
                    });
                    css(this.bottom, {
                        display: 'block',
                        left: ''.concat(this.boundary.x - 1 - tableViewScrollLeft, 'px'),
                        top: ''.concat(this.boundary.y1 + 1, 'px'),
                        width: ''.concat(this.boundary.width + 1, 'px'),
                        height: '2.5px'
                    });
                } // based on selectedTds compute positions of help lines
                // It is useful when selectedTds are not changed


                refreshHelpLinesPosition() {
                    const startRect = getRelativeRect(this.selectedTds[0].domNode.getBoundingClientRect(), this.quill.root.parentNode);
                    const endRect = getRelativeRect(this.selectedTds[this.selectedTds.length - 1].domNode.getBoundingClientRect(), this.quill.root.parentNode);
                    this.boundary =
                        computeBoundaryFromRects(startRect, endRect);
                    this.repositionHelpLines();
                }

                destroy() {
                    LINE_POSITIONS.forEach(direction => {
                        this[direction].remove();
                        this[direction] = null;
                    });
                    this.quill.root.removeEventListener('mousedown', this.selectingHandler, false);
                    this.quill.off('text-change', this.clearSelectionHanler);
                    return null;
                }

                setSelection(startRect, endRect) {
                    this.boundary =
                        computeBoundaryFromRects(getRelativeRect(startRect, this.quill.root.parentNode), getRelativeRect(endRect, this.quill.root.parentNode));
                    this.correctBoundary();
                    this.selectedTds = this.computeSelectedTds();
                    this.repositionHelpLines();
                }

                clearSelection() {
                    this.boundary = {};
                    this.selectedTds = [];
                    LINE_POSITIONS.forEach(direction => {
                        this[direction] && css(this[direction], {
                            display: 'none'
                        });
                    });
                }

            }

            function computeBoundaryFromRects(startRect, endRect) {
                let x = Math.min(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);
                let x1 = Math.max(startRect.x, endRect.x, startRect.x + startRect.width - 1, endRect.x + endRect.width - 1);
                let y = Math.min(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);
                let y1 = Math.max(startRect.y, endRect.y, startRect.y + startRect.height - 1, endRect.y + endRect.height - 1);
                let width = x1 - x;
                let height = y1 - y;
                return {
                    x,
                    x1,
                    y,
                    y1,
                    width,
                    height
                };
            }

// CONCATENATED MODULE: ./src/modules/table-operation-menu.js


            const MENU_MIN_HEIHGT = 150;
            const MENU_WIDTH = 200;
            const table_operation_menu_ERROR_LIMIT = 5;
            const MENU_ITEMS_DEFAULT = {
                insertColumnRight: {
                    text: `<svg style="width:22px;height:22px" viewBox="0 0 24 24"><path d="M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z" /></svg>`,

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        let colIndex = getColToolCellIndexByBoundary(this.columnToolCells, this.boundary, (cellRect, boundary) => {
                            return Math.abs(cellRect.x + cellRect.width - boundary.x1) <= table_operation_menu_ERROR_LIMIT;
                        }, this.quill.root.parentNode);
                        const newColumn = tableContainer.insertColumn(this.boundary, colIndex, true, this.quill.root.parentNode);
                        this.tableColumnTool.updateToolCells();
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
                        this.tableSelection.setSelection(newColumn[0].domNode.getBoundingClientRect(), newColumn[0].domNode.getBoundingClientRect());
                    },
                    ArabicText: 'إدراج عمود لليمين'
                },
                insertColumnLeft: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n    <path d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" /></svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        let colIndex = getColToolCellIndexByBoundary(this.columnToolCells, this.boundary, (cellRect, boundary) => {
                            return Math.abs(cellRect.x - boundary.x) <= table_operation_menu_ERROR_LIMIT;
                        }, this.quill.root.parentNode);
                        const newColumn = tableContainer.insertColumn(this.boundary, colIndex, false, this.quill.root.parentNode);
                        this.tableColumnTool.updateToolCells();
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.quill.setSelection(this.quill.getIndex(newColumn[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
                        this.tableSelection.setSelection(newColumn[0].domNode.getBoundingClientRect(), newColumn[0].domNode.getBoundingClientRect());
                    },
                    ArabicText: 'إدراج عمود لليسار'

                },
                insertRowUp: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n <path d="M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z" />\n' + '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        const affectedCells = tableContainer.insertRow(this.boundary, false, this.quill.root.parentNode);
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
                        this.tableSelection.setSelection(affectedCells[0].domNode.getBoundingClientRect(), affectedCells[0].domNode.getBoundingClientRect());
                    },
                    ArabicText: 'إدراج صف للأعلى'

                },
                insertRowDown: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z" />\n' +
                        '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        const affectedCells = tableContainer.insertRow(this.boundary, true, this.quill.root.parentNode);
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.quill.setSelection(this.quill.getIndex(affectedCells[0]), 0, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
                        this.tableSelection.setSelection(affectedCells[0].domNode.getBoundingClientRect(), affectedCells[0].domNode.getBoundingClientRect());
                    },
                    ArabicText: 'إدراج صف للأسفل'

                },
                mergeCells: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path class="ql-custom-stroke-2" d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z" />\n' +
                        '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table); // compute merged Cell rowspan, equal to length of selected rows

                        const rowspan = tableContainer.rows().reduce((sum, row) => {
                            let rowRect = getRelativeRect(row.domNode.getBoundingClientRect(), this.quill.root.parentNode);

                            if (rowRect.y > this.boundary.y - table_operation_menu_ERROR_LIMIT && rowRect.y + rowRect.height < this.boundary.y + this.boundary.height + table_operation_menu_ERROR_LIMIT) {
                                sum += 1;
                            }

                            return sum;
                        }, 0); // compute merged cell colspan, equal to length of selected cols

                        const colspan = this.columnToolCells.reduce((sum, cell) => {
                            let cellRect = getRelativeRect(cell.getBoundingClientRect(), this.quill.root.parentNode);

                            if (cellRect.x > this.boundary.x - table_operation_menu_ERROR_LIMIT && cellRect.x + cellRect.width < this.boundary.x + this.boundary.width + table_operation_menu_ERROR_LIMIT) {
                                sum += 1;
                            }

                            return sum;
                        }, 0);
                        const mergedCell = tableContainer.mergeCells(this.boundary, this.selectedTds, rowspan, colspan, this.quill.root.parentNode);
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.tableSelection.setSelection(mergedCell.domNode.getBoundingClientRect(), mergedCell.domNode.getBoundingClientRect());
                    },
                    ArabicText: 'دمج الخلايا المحددة'

                },
                unmergeCells: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path class="ql-custom-stroke-2" d="M9,11H15V8L19,12L15,16V13H9V16L5,12L9,8V11M2,20V4H4V20H2M20,20V4H22V20H20Z" />\n' +
                        '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        tableContainer.unmergeCells(this.selectedTds, this.quill.root.parentNode);
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.tableSelection.clearSelection();
                    },
                    ArabicText: 'إلغاء دمج الخلايا المحددة'

                },
                deleteColumn: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path d="M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z" />\n' +
                        '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        let colIndexes = getColToolCellIndexesByBoundary(this.columnToolCells, this.boundary, (cellRect, boundary) => {
                            return cellRect.x + table_operation_menu_ERROR_LIMIT > boundary.x && cellRect.x + cellRect.width - table_operation_menu_ERROR_LIMIT < boundary.x1;
                        }, this.quill.root.parentNode);
                        let isDeleteTable = tableContainer.deleteColumns(this.boundary, colIndexes, this.quill.root.parentNode);

                        if (!isDeleteTable) {
                            this.tableColumnTool.updateToolCells();
                            this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                            this.tableSelection.clearSelection();
                        }
                    },
                    ArabicText: 'حذف عمود'

                },
                deleteRow: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path d="M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z" />\n' +
                        '</svg>',

                    handler() {
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        tableContainer.deleteRow(this.boundary, this.quill.root.parentNode);
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        this.tableSelection.clearSelection();
                    },
                    ArabicText: 'حذف صف'

                },
                deleteTable: {
                    text: '<svg style="width:22px;height:22px" viewBox="0 0 24 24">\n' +
                        '    <path d="M15.46,15.88L16.88,14.46L19,16.59L21.12,14.46L22.54,15.88L20.41,18L22.54,20.12L21.12,21.54L19,19.41L16.88,21.54L15.46,20.12L17.59,18L15.46,15.88M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" />\n' +
                        '</svg>',

                    handler() {
                        const betterTableModule = this.quill.getModule('better-table');
                        const tableContainer = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.find(this.table);
                        betterTableModule.hideTableTools();
                        tableContainer.remove();
                        this.quill.update(external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                    },
                    ArabicText: 'حذف الجدول'

                }
            };

            class table_operation_menu_TableOperationMenu {
                constructor(params, quill, options) {
                    const betterTableModule = quill.getModule('better-table');
                    this.tableSelection = betterTableModule.tableSelection;
                    this.table = params.table;
                    this.quill = quill;
                    this.options = options;
                    this.menuItems =
                        Object.assign({}, MENU_ITEMS_DEFAULT, options.items);
                    this.tableColumnTool = betterTableModule.columnTool;
                    this.boundary = this.tableSelection.boundary;
                    this.selectedTds = this.tableSelection.selectedTds;
                    this.destroyHanlder = this.destroy.bind(this);
                    this.columnToolCells = this.tableColumnTool.colToolCells();
                    this.menuInitial(params);
                    this.mount();
                    document.addEventListener('click', this.destroyHanlder, false);
                }

                mount() {
                    document.body.appendChild(this.domNode);
                }

                destroy() {
                    this.domNode.remove();
                    document.removeEventListener('click', this.destroyHanlder, false);
                    return null;
                }

                menuInitial(_ref) {
                    let {
                        table,
                        left,
                        top
                    } = _ref;
                    this.domNode = document.createElement('ul');
                    this.domNode.classList.add('qlbt-operation-menu');
                    css(this.domNode, {
                        position: 'absolute',
                        left: ''.concat(left, 'px'),
                        top: ''.concat(top, 'px'),
                    });

                    for (let name in this.menuItems) {
                        if (this.menuItems[name]) {
                            let menuItem = this.menuItemCreator(Object.assign({}, MENU_ITEMS_DEFAULT[name], this.menuItems[name]));
                            menuItem.id = name;
                            this.domNode.appendChild(menuItem);
                            if (['insertColumnLeft', 'insertRowDown',
                                'unmergeCells'].includes(name)) {
                                let hr = document.createElement('hr');
                                hr.setAttribute('width', 1);
                                hr.setAttribute('size', 24);
                                this.domNode.appendChild(hr);
                            }
                            tippy(menuItem, {
                                content: this.menuItems[name].ArabicText
                            });
                        }
                    }
                }

                menuItemCreator(_ref2) {
                    let {
                        text,
                        handler
                    } = _ref2;
                    const node = document.createElement('li');
                    node.classList.add('qlbt-operation-menu-item');
                    node.classList.add('icon');
                    node.innerHTML = text;
                    node.addEventListener('click', handler.bind(this), false);
                    return node;
                }

            }

            function getColToolCellIndexByBoundary(cells, boundary, conditionFn, container) {
                return cells.reduce((findIndex, cell) => {
                    let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);

                    if (conditionFn(cellRect, boundary)) {
                        findIndex = cells.indexOf(cell);
                    }

                    return findIndex;
                }, false);
            }

            function getColToolCellIndexesByBoundary(cells, boundary, conditionFn, container) {
                return cells.reduce((findIndexes, cell) => {
                    let cellRect = getRelativeRect(cell.getBoundingClientRect(), container);

                    if (conditionFn(cellRect, boundary)) {
                        findIndexes.push(cells.indexOf(cell));
                    }

                    return findIndexes;
                }, []);
            }

// CONCATENATED MODULE: ./src/utils/node-matchers.js


            const Delta = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('delta'); // rebuild delta

            function matchTableCell(node, delta, scroll) {
                const row = node.parentNode;
                const table = row.parentNode.tagName === 'TABLE' ?
                    row.parentNode : row.parentNode.parentNode;
                const rows = Array.from(table.querySelectorAll('tr'));
                const cells = Array.from(row.querySelectorAll('td'));
                const rowId = rows.indexOf(row) + 1;
                const cellId = cells.indexOf(node) + 1;
                const colspan = node.getAttribute('colspan') || false;
                const rowspan = node.getAttribute('rowspan') || false; // bugfix: empty table cells copied from other place will be removed unexpectedly

                if (delta.length() === 0) {
                    delta = new Delta().insert('\n', {
                        'table-cell-line': {
                            row: rowId,
                            cell: cellId,
                            rowspan,
                            colspan
                        }
                    });
                    return delta;
                }

                delta = delta.reduce((newDelta, op) => {
                    if (op.insert && typeof op.insert === 'string') {
                        const lines = [];
                        let insertStr = op.insert;
                        let start = 0;

                        for (let i = 0; i < op.insert.length; i++) {
                            if (insertStr.charAt(i) === '\n') {
                                if (i === 0) {
                                    lines.push('\n');
                                } else {
                                    lines.push(insertStr.substring(start, i));
                                    lines.push('\n');
                                }

                                start = i + 1;
                            }
                        }

                        const tailStr = insertStr.substring(start);
                        if (tailStr) lines.push(tailStr);
                        lines.forEach(text => {
                            text === '\n' ?
                                newDelta.insert('\n', op.attributes) :
                                newDelta.insert(text, _omit(op.attributes, ['table',
                                    'table-cell-line', 'header']));
                        });
                    } else {
                        newDelta.insert(op.insert, op.attributes);
                    }

                    return newDelta;
                }, new Delta());
                return delta.reduce((newDelta, op) => {
                    if (op.insert && typeof op.insert === 'string' && op.insert.startsWith('\n')) {
                        // distinguish between table-cell-line and header inside td
                        let childAttrs = {};

                        if (op.attributes['header']) {
                            childAttrs['header'] = {
                                row: rowId,
                                cell: cellId,
                                rowspan,
                                colspan
                            };
                        } else if (op.attributes['table-cell-line']) {
                            childAttrs['table-cell-line'] = {
                                row: rowId,
                                cell: cellId,
                                rowspan,
                                colspan
                            };
                        }

                        newDelta.insert(op.insert, Object.assign({}, Object.assign({}, {
                            row: rowId
                        }, op.attributes.table), childAttrs, _omit(op.attributes, ['table'])));
                    } else {
                        newDelta.insert(op.insert, Object.assign({}, _omit(op.attributes, ['table',
                            'table-cell-line'])));
                    }

                    console.log(newDelta);
                    return newDelta;
                }, new Delta());
            } // replace th tag with td tag

            function matchTableHeader(node, delta, scroll) {
                const row = node.parentNode;
                const table = row.parentNode.tagName === 'TABLE' ?
                    row.parentNode : row.parentNode.parentNode;
                const rows = Array.from(table.querySelectorAll('tr'));
                const cells = Array.from(row.querySelectorAll('th'));
                const rowId = rows.indexOf(row) + 1;
                const cellId = cells.indexOf(node) + 1;
                const colspan = node.getAttribute('colspan') || false;
                const rowspan = node.getAttribute('rowspan') || false; // bugfix: empty table cells copied from other place will be removed unexpectedly

                if (delta.length() === 0) {
                    delta = new Delta().insert('\n', {
                        'table-cell-line': {
                            row: rowId,
                            cell: cellId,
                            rowspan,
                            colspan
                        }
                    });
                    return delta;
                }

                delta = delta.reduce((newDelta, op) => {
                    if (op.insert && typeof op.insert === 'string') {
                        const lines = [];
                        let insertStr = op.insert;
                        let start = 0;

                        for (let i = 0; i < op.insert.length; i++) {
                            if (insertStr.charAt(i) === '\n') {
                                if (i === 0) {
                                    lines.push('\n');
                                } else {
                                    lines.push(insertStr.substring(start, i));
                                    lines.push('\n');
                                }

                                start = i + 1;
                            }
                        }

                        const tailStr = insertStr.substring(start);
                        if (tailStr) lines.push(tailStr); // bugfix: no '\n' in op.insert, push a '\n' to lines

                        if (lines.indexOf('\n') < 0) {
                            lines.push('\n');
                        }

                        lines.forEach(text => {
                            text === '\n' ? newDelta.insert('\n', {
                                'table-cell-line': {
                                    row: rowId,
                                    cell: cellId,
                                    rowspan,
                                    colspan
                                }
                            }) : newDelta.insert(text, op.attributes);
                        });
                    } else {
                        newDelta.insert(op.insert, op.attributes);
                    }

                    return newDelta;
                }, new Delta());
                return delta.reduce((newDelta, op) => {
                    if (op.insert && typeof op.insert === 'string' && op.insert.startsWith('\n')) {
                        newDelta.insert(op.insert, Object.assign({}, {
                            'table-cell-line': {
                                row: rowId,
                                cell: cellId,
                                rowspan,
                                colspan
                            }
                        }));
                    } else {
                        newDelta.insert(op.insert, Object.assign({}, _omit(op.attributes, ['table',
                            'table-cell-line'])));
                    }

                    return newDelta;
                }, new Delta());
            } // supplement colgroup and col

            function matchTable(node, delta, scroll) {
                let newColDelta = new Delta();
                const topRow = node.querySelector('tr'); // bugfix: empty table will return empty delta

                if (topRow === null) return newColDelta;
                const cellsInTopRow = Array.from(topRow.querySelectorAll('td')).concat(Array.from(topRow.querySelectorAll('th')));
                const maxCellsNumber = cellsInTopRow.reduce((sum, cell) => {
                    const cellColspan = cell.getAttribute('colspan') || 1;
                    sum = sum + parseInt(cellColspan, 10);
                    return sum;
                }, 0);
                const colsNumber = node.querySelectorAll('col').length; // issue #2
                // bugfix: the table copied from Excel had some default col tags missing
                //         add missing col tags

                if (colsNumber === maxCellsNumber) {
                    return delta;
                } else {
                    for (let i = 0; i < maxCellsNumber - colsNumber; i++) {
                        newColDelta.insert('\n', {
                            'table-col': true
                        });
                    }

                    if (colsNumber === 0) return newColDelta.concat(delta);
                    let lastNumber = 0;
                    return delta.reduce((finalDelta, op) => {
                        finalDelta.insert(op.insert, op.attributes);

                        if (op.attributes && op.attributes['table-col']) {
                            lastNumber += op.insert.length;

                            if (lastNumber === colsNumber) {
                                finalDelta = finalDelta.concat(newColDelta);
                            }
                        }

                        return finalDelta;
                    }, new Delta());
                }
            } // match h tags, distinguish between headers in the table and headers outside the table

            function matchHeader(node, delta, scroll) {
                return delta;
            }

// CONCATENATED MODULE: ./src/quill-better-table.js


            // import table node matchers


            const Module = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('core/module');
            const quill_better_table_Delta = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.import('delta');


            class quill_better_table_BetterTable extends Module {
                static register() {
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCol, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableColGroup, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCellLine, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableCell, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableRow, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(TableBody, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(table_TableContainer, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(table_TableViewWrapper, true);
                    external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.register(table_TableViewWrapper, true); // register customized Header，overwriting quill built-in Header
                    // Quill.register('formats/header', Header, true);
                }

                constructor(quill, options) {
                    super(quill, options); // handle click on quill-better-table

                    this.quill.root.addEventListener('click', evt => {
                        // bugfix: evt.path is undefined in Safari, FF, Micro Edge
                        const path = getEventComposedPath(evt);
                        if (!path || path.length <= 0) return;
                        const tableNode = path.filter(node => {
                            return node.tagName && node.tagName.toUpperCase() === 'TABLE' && node.classList.contains('quill-better-table');
                        })[0];

                        if (tableNode) {
                            // current table clicked
                            if (this.table === tableNode) return; // other table clicked

                            if (this.table) this.hideTableTools();
                            this.showTableTools(tableNode, quill, options);
                        } else if (this.table) {
                            // other clicked
                            this.hideTableTools();
                        }
                    }, false); // handle right click on quill-better-table

                    this.quill.root.addEventListener('contextmenu', evt => {
                        if (!this.table) return true;
                        evt.preventDefault(); // bugfix: evt.path is undefined in Safari, FF, Micro Edge

                        const path = getEventComposedPath(evt);
                        if (!path || path.length <= 0) return;
                        const tableNode = path.filter(node => {
                            return node.tagName && node.tagName.toUpperCase() === 'TABLE' && node.classList.contains('quill-better-table');
                        })[0];
                        const rowNode = path.filter(node => {
                            return node.tagName && node.tagName.toUpperCase() === 'TR' && node.getAttribute('data-row');
                        })[0];
                        const cellNode = path.filter(node => {
                            return node.tagName && node.tagName.toUpperCase() === 'TD' && node.getAttribute('data-row');
                        })[0];
                        let isTargetCellSelected = this.tableSelection.selectedTds.map(tableCell => tableCell.domNode).includes(cellNode);

                        if (this.tableSelection.selectedTds.length <= 0 || !isTargetCellSelected) {
                            this.tableSelection.setSelection(cellNode.getBoundingClientRect(), cellNode.getBoundingClientRect());
                        }

                        if (this.tableOperationMenu) this.tableOperationMenu =
                            this.tableOperationMenu.destroy();

                        if (tableNode) {
                            this.tableOperationMenu =
                                new table_operation_menu_TableOperationMenu({
                                    table: tableNode,
                                    row: rowNode,
                                    cell: cellNode,
                                    left: evt.pageX,
                                    top: evt.pageY
                                }, quill, options.operationMenu);
                        }
                    }, false); // add keyboard binding：Backspace
                    // prevent user hits backspace to delete table cell

                    const KeyBoard = quill.getModule('keyboard');
                    quill.keyboard.addBinding({
                        key: 'Backspace'
                    }, {}, function (range, context) {
                        if (range.index === 0 || this.quill.getLength() <= 1) return true;
                        const [line] = this.quill.getLine(range.index);

                        if (context.offset === 0) {
                            const [prev] = this.quill.getLine(range.index - 1);

                            if (prev != null) {
                                if (prev.statics.blotName === 'table-cell-line' && line.statics.blotName !== 'table-cell-line') return false;
                            }
                        }

                        return true;
                    }); // since only one matched bindings callback will excute.
                    // expected my binding callback excute first
                    // I changed the order of binding callbacks

                    let thisBinding = quill.keyboard.bindings['Backspace'].pop();
                    quill.keyboard.bindings['Backspace'].splice(0, 1, thisBinding); // add Matchers to match and render quill-better-table for initialization
                    // or pasting

                    quill.clipboard.addMatcher('td', matchTableCell);
                    quill.clipboard.addMatcher('th', matchTableHeader);
                    quill.clipboard.addMatcher('table', matchTable); // quill.clipboard.addMatcher('h1, h2, h3, h4, h5, h6', matchHeader)
                    // remove matcher for tr tag

                    quill.clipboard.matchers =
                        quill.clipboard.matchers.filter(matcher => {
                            return matcher[0] !== 'tr';
                        });
                }

                getTable() {
                    let range = arguments.length > 0 && arguments[0] !== undefined ?
                        arguments[0] : this.quill.getSelection();
                    if (range == null) return [null, null, null, -1];
                    const [cellLine, offset] = this.quill.getLine(range.index);

                    if (cellLine == null || cellLine.statics.blotName !== TableCellLine.blotName) {
                        return [null, null, null, -1];
                    }

                    const cell = cellLine.tableCell();
                    const row = cell.row();
                    const table = row.table();
                    return [table, row, cell, offset];
                }

                getSelectedCells() {
                    return this.tableSelection.selectedTds;
                }

                insertTable(rows, columns) {
                    const range = this.quill.getSelection(true);
                    if (range == null) return;
                    let currentBlot = this.quill.getLeaf(range.index)[0];
                    let nextBlot = this.quill.getLeaf(range.index + 1)[0];
                    let delta = new quill_better_table_Delta().retain(range.index);
                    delta.insert('\n', {
                        direction: 'rtl',
                        align: 'right'
                    }); // insert table column

                    delta =
                        new Array(columns).fill('\n').reduce((memo, text) => {
                            memo.insert(text, {
                                'table-col': true
                            });
                            return memo;
                        }, delta); // insert table cell line with empty line

                    delta = new Array(rows).fill(0).reduce(memo => {
                        let tableRowId = table_rowId();
                        return new Array(columns).fill('\n').reduce((memo, text) => {
                            memo.insert(text, {
                                'table-cell-line': {
                                    row: tableRowId,
                                    cell: table_cellId()
                                }
                            });
                            return memo;
                        }, memo);
                    }, delta);
                    this.quill.updateContents(delta, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                    this.quill.setSelection(range.index + columns + 1, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.API);
                }

                showTableTools(table, quill, options) {
                    this.table = table;
                    this.columnTool =
                        new table_column_tool_TableColumnTool(table, quill, options);
                    this.tableSelection =
                        new table_selection_TableSelection(table, quill, options);
                    this.movingTool =
                        new table_movingTool(table, quill, options);
                    this.stylingTool =
                        new table_styleTool(table, quill, options);
                    return this.tableSelection.selectedTds;
                }

                hideTableTools() {
                    this.columnTool && this.columnTool.destroy();
                    this.movingTool && this.movingTool.destroy();
                    this.stylingTool && this.stylingTool.destroy();
                    this.tableSelection && this.tableSelection.destroy();
                    this.tableOperationMenu && this.tableOperationMenu.destroy();
                    this.columnTool = null;
                    this.tableSelection = null;
                    this.tableOperationMenu = null;
                    this.table = null;
                }

            }

            quill_better_table_BetterTable.keyboardBindings = {
                'table-cell-line backspace': {
                    key: 'Backspace',
                    format: ['table-cell-line'],
                    collapsed: true,
                    offset: 0,

                    handler(range, context) {
                        const [line, offset] = this.quill.getLine(range.index);
                        return !(!line.prev || line.prev.statics.blotName !== 'table-cell-line');
                    }

                },
                'table-cell-line delete': {
                    key: 'Delete',
                    format: ['table-cell-line'],
                    collapsed: true,
                    suffix: /^$/,

                    handler() {
                    }

                },
                'table-cell-line enter': {
                    key: 'Enter',
                    shiftKey: null,
                    format: ['table-cell-line'],

                    handler(range, context) {
                        // bugfix: a unexpected new line inserted when user compositionend with hitting Enter
                        if (this.quill.selection && this.quill.selection.composing) return;
                        const Scope = external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.imports.parchment.Scope;

                        if (range.length > 0) {
                            this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
                        }

                        const lineFormats = Object.keys(context.format).reduce((formats, format) => {
                            if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
                                formats[format] = context.format[format];
                            }

                            return formats;
                        }, {}); // insert new cellLine with lineFormats

                        this.quill.insertText(range.index, '\n', lineFormats['table-cell-line'], external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER); // Earlier scroll.deleteAt might have messed up our selection,
                        // so insertText's built in selection preservation is not reliable

                        this.quill.setSelection(range.index + 1, external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.SILENT);
                        this.quill.focus();
                        Object.keys(context.format).forEach(name => {
                            if (lineFormats[name] != null) return;
                            if (Array.isArray(context.format[name])) return;
                            if (name === 'link') return;
                            this.quill.format(name, context.format[name], external_commonjs_quill_commonjs2_quill_amd_quill_root_Quill_default.a.sources.USER);
                        });
                    }

                }
            };
            /* harmony default export */
            var quill_better_table = __webpack_exports__['default'] =
                (quill_better_table_BetterTable);

            /***/
        }),
        /* 2 */,
        /* 3 */
        /***/ (function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(1);


            /***/
        })
        /******/])['default'];
});