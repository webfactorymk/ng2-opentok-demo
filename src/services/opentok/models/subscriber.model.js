// Opentok Subscriber
// https://tokbox.com/developer/sdks/js/reference/Subscriber.html
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBSCRIBER_EVENTS = {
    audioLevelUpdated: "audioLevelUpdated",
    connected: "connected",
    destroyed: "destroyed",
    disconnected: 'disconnected',
    videoDimensionsChanged: "videoDimensionsChanged",
    videoDisabled: "videoDisabled",
    videoDisableWarning: "videoDisableWarning",
    videoDisableWarningLifted: "videoDisableWarningLifted",
    videoElementCreated: "videoElementCreated",
};
var OTSubscriber = (function () {
    function OTSubscriber(opentokSubscriber) {
        this.opentokSubscriber = opentokSubscriber;
    }
    OTSubscriber.prototype.addEventListener = function (event, eventHandler) {
        var eventListener = {};
        eventListener[event] = eventHandler;
        this.opentokSubscriber.on(eventListener);
    };
    OTSubscriber.prototype.getImageData = function () {
        return "data:image/png;base64," + this.opentokSubscriber.getImgData();
    };
    return OTSubscriber;
}());
exports.OTSubscriber = OTSubscriber;
//# sourceMappingURL=subscriber.model.js.map