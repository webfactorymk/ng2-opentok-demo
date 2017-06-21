"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var subscriber_model_1 = require("./subscriber.model");
var ot_model_model_1 = require("./shared/ot-model.model");
// Opentok session
// https://tokbox.com/developer/guides/connect-session/js/#initialize_session
// https://tokbox.com/developer/sdks/js/reference/Session.html
exports.SESSION_EVENTS = {
    connectionCreated: "connectionCreated",
    connectionDestroyed: "connectionDestroyed",
    sessionConnected: "sessionConnected",
    sessionDisconnected: "sessionDisconnected",
    sessionReconnecting: "sessionReconnecting",
    sessionReconnected: "sessionReconnected",
    streamCreated: "streamCreated",
    streamDestroyed: "streamDestroyed",
    streamPropertyChanged: "streamPropertyChanged",
};
exports.SESSION_DISCONNECT_REASONS = {
    clientDisconnected: "clientDisconnected",
    forceDisconnected: "forceDisconnected",
    networkDisconnected: "networkDisconnected"
};
//https://tokbox.com/developer/sdks/js/reference/StreamPropertyChangedEvent.html
exports.STREAM_PROPERTY_CHANGED = {
    hasVideo: "hasVideo",
    hasAudio: "hasAudio",
    videoDimensions: "videoDimensions"
};
var OTSession = (function (_super) {
    __extends(OTSession, _super);
    function OTSession(apiKey, sessionId) {
        var _this = _super.call(this) || this;
        _this._session = OT.initSession(apiKey, sessionId);
        return _this;
    }
    OTSession.prototype.addEventListener = function (event, eventHandler) {
        var eventListener = {};
        eventListener[event] = eventHandler;
        this._session.on(eventListener);
    };
    //https://tokbox.com/developer/sdks/js/reference/Session.html#off
    OTSession.prototype.removeEventListener = function (event, eventHandler) {
        var eventListener = {};
        eventListener[event] = eventHandler;
        this._session.off(eventListener);
    };
    OTSession.prototype.removeAllEventListeners = function () {
        this._session.off();
    };
    OTSession.prototype.addSignalListener = function (signalType, eventHandler) {
        var signalEvent = signalType ? ('signal:' + signalType) : 'signal';
        this.addEventListener(signalEvent, eventHandler);
    };
    OTSession.prototype.disconnect = function () {
        if (this._session) {
            this._session.disconnect();
            this._session = null;
        }
        console.log(" session disconnected");
    };
    OTSession.prototype.unpublish = function (publisher) {
        var a = this._session.unpublish(publisher);
        console.log("unpublished to session");
        console.log(a);
    };
    OTSession.prototype.canPublish = function () {
        return this._session.capabilities.publish == 1;
    };
    OTSession.prototype.subscribeToStream = function (stream, subscriberContainer, subscriberProperties) {
        if (subscriberProperties === void 0) { subscriberProperties = {}; }
        return new subscriber_model_1.OTSubscriber(this._session.subscribe(stream, subscriberContainer, subscriberProperties));
    };
    OTSession.prototype.getSubscribersForStream = function (stream) {
        return this._session.getSubscribersForStream(stream);
    };
    OTSession.prototype.unsubscribe = function (subscriber) {
        this._session.unsubscribe(subscriber);
    };
    OTSession.prototype.connect = function (token) {
        return this.createObservable(this._session, 'connect', token);
    };
    OTSession.prototype.publish = function (publisher) {
        return this.createObservable(this._session, 'publish', publisher);
    };
    OTSession.prototype.signal = function (signal) {
        return this.createObservable(this._session, 'signal', signal);
    };
    OTSession.prototype.on = function (events) {
        return this.createObservable(this._session, 'on', events);
    };
    OTSession.prototype.once = function (events) {
        return this.createObservable(this._session, 'once', events);
    };
    OTSession.prototype.off = function (events) {
        return this.createObservable(this._session, 'off', events);
    };
    return OTSession;
}(ot_model_model_1.OTModel));
exports.OTSession = OTSession;
//# sourceMappingURL=session.model.js.map