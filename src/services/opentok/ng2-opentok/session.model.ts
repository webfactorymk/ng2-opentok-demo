import {OTSignal} from "./signal.model";
import {OTSubscriber} from "./subscriber.model";
import {Observable} from "rxjs";
import {OTModel} from "./shared/ot-model.model";
import {OTPublisher} from "./publisher.model";

declare var OT: any;
declare var scriptLoaded: any;

// Opentok session
// https://tokbox.com/developer/guides/connect-session/js/#initialize_session
// https://tokbox.com/developer/sdks/js/reference/Session.html

export const SESSION_EVENTS = {
  connectionCreated: "connectionCreated",
  connectionDestroyed: "connectionDestroyed",
  sessionConnected: "sessionConnected",
  sessionDisconnected: "sessionDisconnected",
  sessionReconnecting: "sessionReconnecting",
  sessionReconnected: "sessionReconnected",
  streamCreated: "streamCreated",
  streamDestroyed: "streamDestroyed",
  streamPropertyChanged: "streamPropertyChanged",
}

export const SESSION_DISCONNECT_REASONS = {
  clientDisconnected: "clientDisconnected",
  forceDisconnected: "forceDisconnected",
  networkDisconnected: "networkDisconnected"
}

//https://tokbox.com/developer/sdks/js/reference/StreamPropertyChangedEvent.html
export const STREAM_PROPERTY_CHANGED = {
  hasVideo: "hasVideo",
  hasAudio: "hasAudio",
  videoDimensions: "videoDimensions"
}

export class OTSession extends OTModel {

  private _session;

  constructor(session: any) {
    super();
    if (session) this._session = session;
  }

  static init(apiKey: string, sessionId: string) {
    return new OTSession(OT.initSession(apiKey, sessionId));
  }

  //https://tokbox.com/developer/sdks/js/reference/Connection.html
  getConnection() {
    return this._session ? this._session.connection : null;
  }

  //https://tokbox.com/developer/sdks/js/reference/Capabilities.html
  getCapabilities() {
    return this._session ? this._session.capabilities : null;
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#connect
  connect(token: string): Observable<boolean> {
    return this.createObservableMethod(this._session, 'connect', token);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#disconnect
  disconnect(): void {
    if (this._session) {
      this._session.disconnect();
      this._session = null;
    }
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#forceDisconnect
  forceDisconnect(connection): Observable<boolean> {
    if (this._session) {
      return this.createObservableMethod(this._session, 'forceDisconnect', connection)
        .do(() => {
          this._session = null;
        });
    }

  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#forceUnpublish
  forceUnpublish(stream) {
    return this.createObservableMethod(this._session, 'forceDisconnect', stream);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#getPublisherForStream
  getPublisherForStream(stream) {
    return new OTPublisher(this._session.getPublisherForStream(stream));
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#getSubscribersForStream
  getSubscribersForStream(stream): Array<OTSubscriber> {
    return this._session.getSubscribersForStream(stream).map((subscriber) => {
      return new OTSubscriber(subscriber);
    });
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#off
  off(events?: String): Observable<any> {
    return this.createObservableEventListener(this._session, 'off', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#on
  on(events: String): Observable<any> {
    return this.createObservableEventListener(this._session, 'on', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#once
  once(events: String): Observable<any> {
    return this.createObservableEventListener(this._session, 'once', events);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#signal
  //Used to add signal listeners
  onSignal(signal: OTSignal): Observable<any> {
    return this.on(signal.getSignalEvent());
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#publish
  publish(publisher: OTPublisher): Observable<boolean> {
    return this.createObservableMethod(this._session, 'publish', publisher.opentokPublisher);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#signal
  signal(signal: OTSignal): Observable<boolean> {
    console.log(signal.getHash())
    return this.createObservableMethod(this._session, 'signal', signal.getHash());
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#subscribe
  subscribeToStream(stream, subscriberContainer: string, subscriberProperties = {}): OTSubscriber {
    return new OTSubscriber(this._session.subscribe(stream, subscriberContainer, subscriberProperties));
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#unpublish
  unpublish(publisher: OTPublisher): void {
    this._session.unpublish(publisher.opentokPublisher);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#unsubscribe
  unsubscribe(subscriber: OTSubscriber): void {
    this._session.unsubscribe(subscriber.opentokSubscriber);
  }

  canPublish(): boolean {
    return this._session.capabilities.publish == 1;
  }
}
