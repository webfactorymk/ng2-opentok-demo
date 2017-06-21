"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../../config/config");
var session_model_1 = require("./ng2-opentok/session.model");
var publisher_model_1 = require("./ng2-opentok/publisher.model");
var signal_model_1 = require("./ng2-opentok/signal.model");
var subscriber_model_1 = require("./ng2-opentok/subscriber.model");
var rxjs_1 = require("rxjs");
exports.SIGNAL_TYPES = {
    imageShareOff: 'imageShareOff',
    imageShareOn: 'imageShareOn',
    canvasUpdate: 'canvasUpdate',
    canvasClear: 'canvasClear',
    canvasUndo: 'canvasUndo',
    drawImageBefore: 'drawImageBefore',
    drawImageAfter: 'drawImageAfter'
};
var OpentokService = (function () {
    function OpentokService() {
        this._publisherTag = "publisher";
        this._subscriberTag = "subscriber";
        this._isVideoActive = false;
        this._apiKey = config_1.Config.openTokApiKey;
    }
    OpentokService.prototype.initCaller = function (sessionId, token, publisherTag, subscriberTag) {
        if (publisherTag)
            this._publisherTag = publisherTag;
        if (subscriberTag)
            this._subscriberTag = subscriberTag;
        return this._connectToSession(sessionId, token);
    };
    OpentokService.prototype.initRecipient = function (sessionId, token, publisherTag, subscriberTag) {
        if (publisherTag)
            this._publisherTag = publisherTag;
        if (subscriberTag)
            this._subscriberTag = subscriberTag;
        return this._connectToSession(sessionId, token);
    };
    OpentokService.prototype.call = function (onMediaRequested, onMediaDenied) {
        return this._publishStream(onMediaRequested, onMediaDenied);
    };
    OpentokService.prototype.hangUp = function (onComplete) {
        this._disconnect();
        if (onComplete)
            onComplete();
    };
    OpentokService.prototype.onVideoChanged = function (callback) {
        this._subscribeToVideoStreamChanges(callback);
    };
    OpentokService.prototype.onIncomingCall = function (callback) {
        this._subscribeToCreatedStreams(callback);
    };
    OpentokService.prototype.onEndCall = function (callback) {
        this._subscribeToConnectionDestroyed(callback);
    };
    OpentokService.prototype.onNetworkFailedForPublisher = function (callback) {
        this._subscribeToSessionDisconnectedNetworkFailed(callback);
    };
    OpentokService.prototype.takeSubscriberScreenshot = function () {
        return this._isVideoActive ? this._subscriber.getImageData() : null;
    };
    OpentokService.prototype.sendSignal = function (signal, data) {
        if (this._session) {
            var OTsignal = new signal_model_1.OTSignal(signal, data);
            return this._session.signal(OTsignal);
        }
        else
            return rxjs_1.Observable.of(false);
    };
    OpentokService.prototype.addSignalListener = function (signal, eventHandler) {
        if (this._session)
            this._session.addSignalListener(signal, eventHandler);
    };
    OpentokService.prototype.onReconnecting = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._session.addEventListener(session_model_1.SESSION_EVENTS.sessionReconnecting, eventHandler);
    };
    OpentokService.prototype.onReconnected = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._session.addEventListener(session_model_1.SESSION_EVENTS.sessionReconnected, eventHandler);
    };
    OpentokService.prototype.onStreamDestroyed = function (onComplete) {
        this._subscribeToDestroyedStreams(onComplete);
    };
    OpentokService.prototype.onSubscriberConnected = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._subscriber.addEventListener(subscriber_model_1.SUBSCRIBER_EVENTS.connected, eventHandler);
    };
    OpentokService.prototype.onSubscriberDisconnected = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._subscriber.addEventListener(subscriber_model_1.SUBSCRIBER_EVENTS.disconnected, eventHandler);
    };
    OpentokService.prototype.onSubscriberDestroyed = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._subscriber.addEventListener(subscriber_model_1.SUBSCRIBER_EVENTS.destroyed, eventHandler);
    };
    OpentokService.prototype._connectToSession = function (sessionId, token) {
        this._session = new session_model_1.OTSession(this._apiKey, sessionId);
        return this._session.connect(token);
    };
    OpentokService.prototype._publishStream = function (onMediaRequested, onMediaDenied) {
        var publisherProperties = {
            insertMode: 'append',
            width: '100%',
            height: '100%',
            usePreviousDeviceSelection: true
        };
        this._publisher = new publisher_model_1.OTPublisher(this._publisherTag, publisherProperties);
        this._subscribeToOpenMediaAccessDialog(onMediaRequested);
        this._subscribeToMediaAccessDenied(onMediaDenied);
        return this._session.publish(this._publisher.opentokPublisher);
    };
    OpentokService.prototype._disconnect = function () {
        if (this._session) {
            this._session.removeAllEventListeners();
            this._session.disconnect();
            this._session = null;
        }
        if (this._publisher) {
            this._publisher.removeAllEventListeners();
            this._publisher.destroy();
            this._publisher = null;
        }
        if (this._subscriber) {
            this._subscriber = null;
        }
    };
    OpentokService.prototype._subscribeToCreatedStreams = function (onComplete) {
        var _this = this;
        if (this._session) {
            var subscriberProperties = {
                insertMode: 'append',
                width: '100%',
                height: '100%'
            };
            var eventHandler = function (event) {
                console.log("Subscribe to stream created, session:");
                console.log(_this._session);
                _this._subscriber = _this._session.subscribeToStream(event.stream, _this._subscriberTag, subscriberProperties);
                _this._isVideoActive = event.stream.hasVideo;
                if (onComplete)
                    onComplete(event);
            };
            this._session.addEventListener(session_model_1.SESSION_EVENTS.streamCreated, eventHandler);
        }
    };
    OpentokService.prototype._subscribeToDestroyedStreams = function (onComplete) {
        if (this._session) {
            var eventHandler = function (event) {
                if (onComplete)
                    onComplete();
            };
            this._session.addEventListener(session_model_1.SESSION_EVENTS.streamDestroyed, eventHandler);
        }
    };
    //https://tokbox.com/developer/sdks/js/reference/ConnectionEvent.html
    OpentokService.prototype._subscribeToConnectionDestroyed = function (onComplete) {
        if (this._session) {
            var eventHandler = function (event) {
                if (onComplete)
                    onComplete();
            };
            this._session.addEventListener(session_model_1.SESSION_EVENTS.connectionDestroyed, eventHandler);
        }
    };
    OpentokService.prototype._subscribeToSessionDisconnectedNetworkFailed = function (onComplete) {
        var eventHandler = function (event) {
            if (event.reason === session_model_1.SESSION_DISCONNECT_REASONS.networkDisconnected) {
                if (onComplete)
                    onComplete();
            }
        };
        this._session.addEventListener(session_model_1.SESSION_EVENTS.sessionDisconnected, eventHandler);
    };
    OpentokService.prototype._subscribeToVideoStreamChanges = function (onComplete) {
        var _this = this;
        var eventHandler = function (event) {
            if (event.changedProperty === session_model_1.STREAM_PROPERTY_CHANGED.hasVideo) {
                _this._isVideoActive = event.newValue;
                if (onComplete)
                    onComplete(event.newValue);
            }
            console.log("Property changed. Property: " + event.changedProperty + " new value: " + event.newValue);
        };
        this._session.addEventListener(session_model_1.SESSION_EVENTS.streamPropertyChanged, eventHandler);
    };
    OpentokService.prototype._subscribeToOpenMediaAccessDialog = function (onComplete) {
        var eventHandler = function (event) {
            if (onComplete)
                onComplete(event);
        };
        this._publisher.addEventListener(publisher_model_1.PUBLISHER_EVENTS.accessDialogOpened, eventHandler);
    };
    OpentokService.prototype._subscribeToMediaAccessDenied = function (onComplete) {
        var _this = this;
        var eventHandler = function (event) {
            _this._disconnect();
            if (onComplete)
                onComplete(event);
        };
        this._publisher.addEventListener(publisher_model_1.PUBLISHER_EVENTS.accessDenied, eventHandler);
    };
    return OpentokService;
}());
OpentokService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], OpentokService);
exports.OpentokService = OpentokService;
//# sourceMappingURL=opentok.service.js.map