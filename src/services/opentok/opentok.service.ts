import {Injectable} from "@angular/core";
import {OTSession, SESSION_EVENTS, SESSION_DISCONNECT_REASONS} from "./ng2-opentok/session.model";
import {OTPublisher, PUBLISHER_EVENTS} from "./ng2-opentok/publisher.model";
import {OTSubscriber} from "./ng2-opentok/subscriber.model";

@Injectable()
export class OpentokService {

  private _apiKey: string;
  private _session: OTSession;
  private _publisher: OTPublisher;
  private _subscriber: OTSubscriber;
  private _publisherTag: string = "publisher";
  private _subscriberTag: string = "subscriber";
  private _isVideoActive: boolean = false;

  constructor() {
    this._apiKey = "45897242"
  }

  connectToSession(sessionId: string, token: string, publisherTag?: string, subscriberTag?: string) {
    if (publisherTag) this._publisherTag = publisherTag;
    if (subscriberTag) this._subscriberTag = subscriberTag;
    return this._connectToSession(sessionId, token);
  }


  call() {
    return this._publishStream();
  }


  hangUp() {
    this._disconnect();
  }

  // onVideoChanged(callback?: (isActive: boolean) => void) {
  //   this._subscribeToVideoStreamChanges(callback);
  // }

  onIncomingCall() {
    console.log("Subscribe to stream created")
    return this._onCreatedStreams();
  }

  onEndCall() {
    return this._onConnectionDestroyed();
  }

  onNetworkFailedForPublisher() {
    return this._onSessionDisconnectedNetworkFailed();
  }
  //
  // takeSubscriberScreenshot() {
  //   return this._isVideoActive ? this._subscriber.getImageData() : null;
  // }
  //
  // sendSignal(signal: string, data?: string) {
  //   if (this._session) {
  //     let OTsignal: OTSignal = new OTSignal(signal, data);
  //     return this._session.signal(OTsignal);
  //   }
  //   else
  //     return Observable.of(false);
  // }
  //
  // onSignal(signal: OTSignal) {
  //   if (this._session)
  //     return this._session.onSignal(signal);
  // }
  //
  // onReconnecting() {
  //   return this._session.on(SESSION_EVENTS.sessionReconnecting);
  // }
  //
  // onReconnected() {
  //   this._session.on(SESSION_EVENTS.sessionReconnected);
  // }
  //
  // onStreamDestroyed(onComplete: () => void) {
  //   this._subscribeToDestroyedStreams(onComplete);
  // }
  //
  // onSubscriberConnected(onComplete: (event) => void) {
  //   var eventHandler = (event) => {
  //     if (onComplete) onComplete(event);
  //   };
  //
  //   this._subscriber.addEventListener(SUBSCRIBER_EVENTS.connected, eventHandler);
  // }
  //
  // onSubscriberDisconnected(onComplete: (event) => void) {
  //   var eventHandler = (event) => {
  //     if (onComplete) onComplete(event);
  //   };
  //
  //   this._subscriber.addEventListener(SUBSCRIBER_EVENTS.disconnected, eventHandler);
  // }
  //
  // onSubscriberDestroyed() {
  //   this._subscriber.on(SUBSCRIBER_EVENTS.destroyed);
  // }
  //
  private _connectToSession(sessionId: string, token: string) {
    this._session = OTSession.init(this._apiKey, sessionId);
    return this._session.connect(token);
  }

  private _publishStream() {
    return this._session.publish(this._publisher);
  }

  initPublisher() {
    let publisherProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      usePreviousDeviceSelection: true
    };

    this._publisher = OTPublisher.init(this._publisherTag, publisherProperties);
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

  private _onCreatedStreams() {
      var subscriberProperties = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      return this._session.on(SESSION_EVENTS.streamCreated).do((event) => {
        this._subscriber = this._session.subscribeToStream(event.stream, this._subscriberTag, subscriberProperties);
        this._isVideoActive = event.stream.hasVideo;
      });
  }

  // private _subscribeToDestroyedStreams() {
  //     return this._session.on(SESSION_EVENTS.streamDestroyed);
  // }
  //
  // //https://tokbox.com/developer/sdks/js/reference/ConnectionEvent.html
  private _onConnectionDestroyed() {
      return this._session.on(SESSION_EVENTS.connectionDestroyed);
  }

  private _onSessionDisconnectedNetworkFailed() {
    return this._session.on(SESSION_EVENTS.sessionDisconnected).filter((event)=>{
        return event.reason === SESSION_DISCONNECT_REASONS.networkDisconnected;
    });
  }

  // private _subscribeToVideoStreamChanges(onComplete ?: (isActive: boolean) => void) {
  //   var eventHandler = (event) => {
  //     if (event.changedProperty === STREAM_PROPERTY_CHANGED.hasVideo) {
  //       this._isVideoActive = event.newValue;
  //       if (onComplete) onComplete(event.newValue);
  //     }
  //     console.log("Property changed. Property: " + event.changedProperty + " new value: " + event.newValue);
  //   };
  //   this._session.on(SESSION_EVENTS.streamPropertyChanged).;
  // }



  onOpenMediaAccessDialog() {
    return this._publisher.on(PUBLISHER_EVENTS.accessDialogOpened);
  }

  onMediaAccessDenied() {
    return this._publisher.on(PUBLISHER_EVENTS.accessDenied).do(() => {
      this._disconnect();
    });
  }

}
