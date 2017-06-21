import {Injectable} from "@angular/core";
import {
  OTSession,
  SESSION_EVENTS,
  SESSION_DISCONNECT_REASONS,
  STREAM_PROPERTY_CHANGED
} from "./ng2-opentok/session.model";
import {OTPublisher, PUBLISHER_EVENTS} from "./ng2-opentok/publisher.model";
import {OTSignal} from "./ng2-opentok/signal.model";
import {OTSubscriber, SUBSCRIBER_EVENTS} from "./ng2-opentok/subscriber.model";
import {Observable} from "rxjs";

@Injectable()
export class OpentokService {

  private _apiKey: string ;
  private _session: OTSession;
  private _publisher: OTPublisher;
  private _subscriber: OTSubscriber;
  private _publisherTag: string = "publisher";
  private _subscriberTag: string = "subscriber";
  private _isVideoActive: boolean = false;

  constructor(apiKey:string = "45897242"){
    this._apiKey = apiKey;
  }

  initCaller(sessionId: string, token: string, publisherTag?: string, subscriberTag?: string) {
    if (publisherTag) this._publisherTag = publisherTag;
    if (subscriberTag) this._subscriberTag = subscriberTag;
    return this._connectToSession(sessionId, token);
  }

  initRecipient(sessionId: string, token: string, publisherTag?: string, subscriberTag?: string) {
    if (publisherTag) this._publisherTag = publisherTag;
    if (subscriberTag) this._subscriberTag = subscriberTag;
    return this._connectToSession(sessionId, token);

  }

  call(onMediaRequested?: () => void, onMediaDenied?: () => void) {
    return this._publishStream(onMediaRequested, onMediaDenied);
  }

  hangUp(onComplete?: () => void) {
    this._disconnect();
    if (onComplete) onComplete();
  }

  onVideoChanged(callback?: (isActive: boolean) => void) {
    this._subscribeToVideoStreamChanges(callback);
  }

  onIncomingCall(callback?: () => void) {
    this._subscribeToCreatedStreams(callback);
  }

  onEndCall(callback?: () => void) {
    this._subscribeToConnectionDestroyed(callback);
  }

  onNetworkFailedForPublisher(callback?: () => void) {
    this._subscribeToSessionDisconnectedNetworkFailed(callback);
  }

  takeSubscriberScreenshot() {
    return this._isVideoActive ? this._subscriber.getImageData() : null;
  }

  sendSignal(signal: string, data?: string) {
    if (this._session) {
      let OTsignal: OTSignal = new OTSignal(signal, data);
      return this._session.signal(OTsignal);
    }
    else
      return Observable.of(false);
  }

  onSignal(signal: OTSignal) {
    if (this._session)
      return this._session.onSignal(signal);
  }

  onReconnecting() {
    return this._session.on(SESSION_EVENTS.sessionReconnecting);
  }

  onReconnected() {
    this._session.on(SESSION_EVENTS.sessionReconnected);
  }

  onStreamDestroyed(onComplete: () => void) {
    this._subscribeToDestroyedStreams(onComplete);
  }

  onSubscriberConnected(onComplete: (event) => void) {
    var eventHandler = (event) => {
      if (onComplete) onComplete(event);
    };

    this._subscriber.addEventListener(SUBSCRIBER_EVENTS.connected, eventHandler);
  }

  onSubscriberDisconnected(onComplete: (event) => void) {
    var eventHandler = (event) => {
      if (onComplete) onComplete(event);
    };

    this._subscriber.addEventListener(SUBSCRIBER_EVENTS.disconnected, eventHandler);
  }

  onSubscriberDestroyed() {
    this._subscriber.on(SUBSCRIBER_EVENTS.destroyed);
  }

  private _connectToSession(sessionId: string, token: string) {
    this._session = OTSession.init(this._apiKey, sessionId);
    return this._session.connect(token);
  }

  private _publishStream(onMediaRequested?: () => void, onMediaDenied?: () => void) {
    let publisherProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      usePreviousDeviceSelection: true
    };

    this._publisher = OTPublisher.init(this._publisherTag, publisherProperties);
    this._subscribeToOpenMediaAccessDialog(onMediaRequested);
    this._subscribeToMediaAccessDenied(onMediaDenied);
    return this._session.publish(this._publisher.opentokPublisher);
  }

  private _disconnect() {
    if (this._session) {
      this._session.off();
      this._session.disconnect();
      this._session = null;
    }
    if (this._publisher) {
      this._publisher.off();
      this._publisher.destroy();
      this._publisher = null;
    }
    if (this._subscriber) {
      this._subscriber = null;
    }
  }

  private _subscribeToCreatedStreams(onComplete ?: (event) => void) {
    if (this._session) {
      var subscriberProperties = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      var eventHandler = (event) => {
        console.log("Subscribe to stream created, session:")
        console.log(this._session)
        this._subscriber = this._session.subscribeToStream(event.stream, this._subscriberTag, subscriberProperties);
        this._isVideoActive = event.stream.hasVideo;
        if (onComplete) onComplete(event);
      };

      return this._session.on(SESSION_EVENTS.streamCreated).do((event)=>{
        console.log("Subscribe to stream created, session:")
        console.log(this._session)
        this._subscriber = this._session.subscribeToStream(event.stream, this._subscriberTag, subscriberProperties);
        this._isVideoActive = event.stream.hasVideo;
      });
    }
  }

  private _subscribeToDestroyedStreams() {
      return this._session.on(SESSION_EVENTS.streamDestroyed);
  }

  //https://tokbox.com/developer/sdks/js/reference/ConnectionEvent.html
  private _subscribeToConnectionDestroyed() {
    if (this._session) {
      return this._session.on(SESSION_EVENTS.connectionDestroyed);
    }
  }

  private _subscribeToSessionDisconnectedNetworkFailed(onComplete ?: () => void) {
    var eventHandler = (event) => {
      if (event.reason === SESSION_DISCONNECT_REASONS.networkDisconnected) {
        if (onComplete) onComplete();
      }
    };
    this._session.on(SESSION_EVENTS.sessionDisconnected).filter((event)=>{

    });
  }

  private _subscribeToVideoStreamChanges(onComplete ?: (isActive: boolean) => void) {
    var eventHandler = (event) => {
      if (event.changedProperty === STREAM_PROPERTY_CHANGED.hasVideo) {
        this._isVideoActive = event.newValue;
        if (onComplete) onComplete(event.newValue);
      }
      console.log("Property changed. Property: " + event.changedProperty + " new value: " + event.newValue);
    };
    this._session.on(SESSION_EVENTS.streamPropertyChanged).;
  }

  private _subscribeToOpenMediaAccessDialog(onComplete ?: (event) => void) {
    var eventHandler = (event) => {
      if (onComplete) onComplete(event);
    };
    this._publisher.on(PUBLISHER_EVENTS.accessDialogOpened);
  }

  private _subscribeToMediaAccessDenied(onComplete ?: (event) => void) {
    var eventHandler = (event) => {
      this._disconnect();
      if (onComplete) onComplete(event);
    };

    this._publisher.on(PUBLISHER_EVENTS.accessDenied);
  }
}
