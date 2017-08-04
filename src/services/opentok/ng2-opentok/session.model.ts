import {OTSignal} from "./signal.model";
import {OTSubscriber} from "./subscriber.model";
import {Observable} from "rxjs";
import {OTPublisher} from "./publisher.model";
import {ObservablesUtil} from "./shared/observables-util.service";
import {OTEvent} from "./events/event.model";
import {OTConnection} from "./connection.model";
import {OTCapabilities} from "./capabilities.model";
import {OTStream} from "./stream.model";
import {IOTEventListener} from "./shared/event-listener.interface";

declare var OT: any;
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

export class OTSession implements IOTEventListener {

  private _session;
  private _connection: OTConnection;
  private _capabilitites: OTCapabilities;
  private _sessionId: string;

  constructor(session: any) {
    if (session) this._session = session;
  }

  static init(apiKey: string, sessionId: string): OTSession {
    return new OTSession(OT.initSession(apiKey, sessionId));
  }

  getConnection(): OTConnection {
    return this._session ? new OTConnection(this._session.connection) : null;
  }

  getCapabilities(): OTCapabilities {
    return this._session ? new OTCapabilities(this._session.capabilities) : null;
  }

  getSessionId(): string {
    return this._session ? this._session : null;
  }


  //https://tokbox.com/developer/sdks/js/reference/Session.html#off
  off(events?: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this._session, 'off', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#on
  on(events: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this._session, 'on', events, context);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#once
  once(events: string, context?: Object): Observable<OTEvent> {
    return ObservablesUtil.getObservableEvent(this._session, 'once', events, context);
  }


  //https://tokbox.com/developer/sdks/js/reference/Session.html#connect
  connect(token: string): Observable<boolean> {
    return ObservablesUtil.getObservableMethod(this._session, 'connect', token);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#disconnect
  disconnect(): void {
    if (this._session) {
      this._session.disconnect();
      this._session = null;
    }
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#forceDisconnect
  forceDisconnect(connection: OTConnection): Observable<void> {
    if (this._session) {
      return ObservablesUtil.getObservableMethod(this._session, 'forceDisconnect', connection.getConnectionId())
        .do(() => {
          this._session = null;
        });
    }
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#forceUnpublish
  forceUnpublish(stream: OTStream): Observable<void> {
    return ObservablesUtil.getObservableMethod(this._session, 'forceDisconnect', stream.getStream());
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#getPublisherForStream
  getPublisherForStream(stream: OTStream): OTPublisher {
    return new OTPublisher(this._session.getPublisherForStream(stream.getStream()));
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#getSubscribersForStream
  getSubscribersForStream(stream: OTStream): Array<OTSubscriber> {
    return this._session.getSubscribersForStream(stream.getStream()).map((subscriber) => {
      return new OTSubscriber(subscriber);
    });
  }

  // Listen to signal
  // https://tokbox.com/developer/sdks/js/reference/Session.html#signal
  onSignal(signal: OTSignal): Observable<OTEvent> {
    return this.on(signal.getSignalEvent());
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#publish
  publish(publisher: OTPublisher): Observable<boolean> {
    return ObservablesUtil.getObservableMethod(this._session, 'publish', publisher.opentokPublisher);
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#signal
  signal(signal: OTSignal): Observable<boolean> {
    return ObservablesUtil.getObservableMethod(this._session, 'signal', signal.getSignal());
  }

  //https://tokbox.com/developer/sdks/js/reference/Session.html#subscribe
  subscribeToStream(stream: OTStream, subscriberContainer: string, subscriberProperties = {}): OTSubscriber {
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
