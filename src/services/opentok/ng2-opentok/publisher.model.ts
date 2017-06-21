import {OTModel} from "./shared/ot-model.model";
import {Observable} from "rxjs";
import {OTSession} from "./session.model";
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

export class OTPublisher extends OTModel {
  opentokPublisher: any;

  constructor(opentokPublisher: any) {
    super();
    this.opentokPublisher = opentokPublisher;
  }

  static init(publisherContainer?: string, properties?: {}, completionHandler?: (error: any) => void): OTPublisher {
    //https://tokbox.com/developer/sdks/js/reference/OT.html#initPublisher
    return new OTPublisher(OT.initPublisher(publisherContainer, properties, completionHandler));
  }

  getAccessAllowed(): boolean {
    return this.opentokPublisher.accessAllowed;
  }

  getElement() {
    return this.opentokPublisher.element;
  }

  getId() {
    return this.opentokPublisher.id;
  }

  getStream() {
    return this.opentokPublisher.stream;
  }

  getSession(): OTSession {
    return new OTSession(this.opentokPublisher.session);
  }

  destroy() {
    this.opentokPublisher.destroy();
    this.opentokPublisher = null;
  }

  //Returns the base-64-encoded string of PNG data representing the Publisher video.
  getImgData() {
    return "data:image/png;base64," + this.opentokPublisher.getImgData();
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#off
  off(events?: String): Observable<any> {
    return this.createObservableEventListener(this.opentokPublisher, 'off', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#on
  on(events: String): Observable<any> {
    return this.createObservableEventListener(this.opentokPublisher, 'on', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Publisher.html#once
  once(events: String): Observable<any> {
    return this.createObservableEventListener(this.opentokPublisher, 'once', events);
  }

  getStyle(){
    return  this.opentokPublisher.getStyle();
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

  setStyle(obj: {[style:string]: string}):void{
    this.opentokPublisher.setStyle(obj);
  }

}
