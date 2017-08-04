import {Observable} from "rxjs";
import {OTSession} from "./session.model";
import {ObservablesUtil} from "./shared/observables-util.service";
import {OTEvent} from "./events/event.model";
import {OTStream} from "./stream.model";
import {IOTEventListener} from "./shared/event-listener.interface";

declare var OT: any;
declare var scriptLoaded: any;

// Opentok Publisher
// https://tokbox.com/developer/guides/publish-stream/js/#create_publisher
// https://tokbox.com/developer/sdks/js/reference/Publisher.html

export const PUBLISHER_EVENTS = {
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
}

export class OTPublisher implements IOTEventListener {
  opentokPublisher: any;

  constructor(opentokPublisher: any) {
    this.opentokPublisher = opentokPublisher;
  }

  static init(publisherContainer?: string, properties?: {}): OTPublisher {
    //https://tokbox.com/developer/sdks/js/reference/OT.html#initPublisher
    return new OTPublisher(OT.initPublisher(publisherContainer, properties));
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#off
  off(events?: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokPublisher, 'off', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#on
  on(events?: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokPublisher, 'on', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#once
  once(events?: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this.opentokPublisher, 'once', events, context);
  }


  getAccessAllowed(): boolean {
    return this.opentokPublisher.accessAllowed;
  }

  getElement(): HTMLElement {
    return this.opentokPublisher.element;
  }

  getId(): string {
    return this.opentokPublisher.id;
  }

  getStream(): OTStream {
    return new OTStream(this.opentokPublisher.stream);
  }

  getSession(): OTSession {
    return new OTSession(this.opentokPublisher.session);
  }

  destroy(): void {
    this.opentokPublisher.destroy();
    this.opentokPublisher = null;
  }

  //Returns the base-64-encoded string of PNG data representing the Publisher video.
  getImgData(): string {
    return "data:image/png;base64," + this.opentokPublisher.getImgData();
  }

  getStyle(): Object {
    return this.opentokPublisher.getStyle();
  }

  publishAudio(value: boolean): void {
    this.opentokPublisher.publishAudio(value);
  }

  publishVideo(value: boolean): void {
    this.opentokPublisher.publishVideo(value);
  }

  videoHeight(): number {
    return this.opentokPublisher.videoHeight();
  }

  videoWidth(): number {
    return this.opentokPublisher.videoWidth();
  }

  setStyle(obj: {[style: string]: string}): void {
    this.opentokPublisher.setStyle(obj);
  }

}
