import {Observable} from "rxjs";
import {ObservablesUtil} from "./shared/observables-util.service";
import {OTEvent} from "./events/event.model";
import {IOTEventListener} from "./shared/event-listener.interface";

// Opentok Subscriber
// https://tokbox.com/developer/sdks/js/reference/Subscriber.html

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

export class OTSubscriber implements IOTEventListener{

    opentokSubscriber: any;

    constructor(opentokSubscriber: any) {
        this.opentokSubscriber = opentokSubscriber;
    }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#off
  off(events?: string, context?:Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokSubscriber, 'off', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#on
  on(events?: string, context?:Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokSubscriber, 'on', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Subscriber.html#once
  once(events?: string, context?:Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokSubscriber, 'once', events, context);
  }

    getImageData(){
        return "data:image/png;base64," + this.opentokSubscriber.getImgData();
    }
}
