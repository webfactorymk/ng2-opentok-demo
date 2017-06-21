"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Opentok Publisher
// https://tokbox.com/developer/guides/publish-stream/js/#create_publisher
// https://tokbox.com/developer/sdks/js/reference/Publisher.html
exports.PUBLISHER_EVENTS = {
    accessAllowed: "accessAllowed",
    accessDenied: "accessDenied",
    accessDialogOpened: "accessDialogOpened",
    accessDialogClosed: "accessDialogClosed",
    streamCreated: "streamCreated",
    streamDestroyed: "streamDestroyed",
    audioLevelUpdated: "audioLevelUpdated",
    destroyed: "destroyed",
    mediaStopped: "mediaStopped",
    videoDimensionsChanged: "videoDimensionsChanged",
    videoElementCreated: "videoElementCreated"
};
var OTPublisher = (function () {
    function OTPublisher(publisherContainer, properties, onSuccess, onError) {
        //https://tokbox.com/developer/sdks/js/reference/OT.html#initPublisher
        this.opentokPublisher = OT.initPublisher(publisherContainer, properties, function (error) {
            if (error) {
                if (onError)
                    onError(error);
            }
            else {
                if (onSuccess)
                    onSuccess();
            }
        });
    }
    OTPublisher.prototype.addEventListener = function (event, eventHandler) {
        var eventListener = {};
        eventListener[event] = eventHandler;
        this.opentokPublisher.on(eventListener);
    };
    //https://tokbox.com/developer/sdks/js/reference/Publisher.html#off
    OTPublisher.prototype.removeEventListener = function (event, eventHandler) {
        var eventListener = {};
        eventListener[event] = eventHandler;
        this.opentokPublisher.off(eventListener);
    };
    OTPublisher.prototype.removeAllEventListeners = function () {
        this.opentokPublisher.off();
    };
    OTPublisher.prototype.destroy = function () {
        this.opentokPublisher.destroy();
    };
    //Returns the base-64-encoded string of PNG data representing the Publisher video.
    OTPublisher.prototype.getImgData = function () {
        this.opentokPublisher.getImgData();
    };
    OTPublisher.prototype.handleError = function (error, callback) {
        if (callback)
            callback(error);
    };
    return OTPublisher;
}());
exports.OTPublisher = OTPublisher;
//# sourceMappingURL=publisher.model.js.map