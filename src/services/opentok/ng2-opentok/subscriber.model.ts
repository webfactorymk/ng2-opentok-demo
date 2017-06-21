// Opentok Subscriber
// https://tokbox.com/developer/sdks/js/reference/Subscriber.html

import {Observable} from "rxjs";
import {OTModel} from "./shared/ot-model.model";
export const SUBSCRIBER_EVENTS = {
    audioLevelUpdated: "audioLevelUpdated",
    connected: "connected",
    destroyed: "destroyed",
    disconnected:'disconnected',
    videoDimensionsChanged: "videoDimensionsChanged",
    videoDisabled: "videoDisabled",
    videoDisableWarning: "videoDisableWarning",
    videoDisableWarningLifted: "videoDisableWarningLifted",
    videoElementCreated: "videoElementCreated",

}

export class OTSubscriber extends OTModel{

    opentokSubscriber: any;

    constructor(opentokSubscriber: any) {
      super();
        this.opentokSubscriber = opentokSubscriber;
    }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#off
  off(events?: String): Observable<any> {
    return this.createObservableEventListener(this.opentokSubscriber, 'off', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#on
  on(events: String): Observable<any> {
    return this.createObservableEventListener(this.opentokSubscriber, 'on', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#once
  once(events: String): Observable<any> {
    return this.createObservableEventListener(this.opentokSubscriber, 'once', events);
  }
    getImageData(){
        return "data:image/png;base64," + this.opentokSubscriber.getImgData();
    }
}
