import {Injectable} from "@angular/core";
import {
  OTSession,
  SESSION_EVENTS,
  SESSION_DISCONNECT_REASONS,
  STREAM_PROPERTY_CHANGED
} from "./ng2-opentok/session.model";
import {OTPublisher, PUBLISHER_EVENTS} from "./ng2-opentok/publisher.model";
import {OTSubscriber} from "./ng2-opentok/subscriber.model";
import {OTSignal} from "./ng2-opentok/signal.model";
import {Observable} from "rxjs";

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
    this._session = OTSession.init(this._apiKey, sessionId);
    return this._session.connect(token);
  }

  call() {
    this._initPublisher();
    return this._session.publish(this._publisher);
  }

  hangUp() {
    if (this._session) {
      if (this._publisher) this._session.unpublish(this._publisher);
      if (this._subscriber) this._session.unsubscribe(this._subscriber);
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

  publishVideo(show: boolean) {
    this._publisher.publishVideo(show);
  }

  onIncomingCall() {
    var subscriberProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };

    return this._session.on(SESSION_EVENTS.streamCreated).do((event) => {
      if (!this._subscriber) {
        this._subscriber = this._session.subscribeToStream(event.stream, this._subscriberTag, subscriberProperties);
        this._isVideoActive = event.stream.hasVideo;
      }
    });
  }

  //https://tokbox.com/developer/sdks/js/reference/ConnectionEvent.html
  onEndCall() {
    return this._session.on(SESSION_EVENTS.connectionDestroyed);
  }

  onNetworkFailedForPublisher() {
    return this._session.on(SESSION_EVENTS.sessionDisconnected).filter((event) => {
      return event.reason === SESSION_DISCONNECT_REASONS.networkDisconnected;
    });
  }


  getSubscriberScreenshot() {
    return this._isVideoActive ? this._subscriber.getImageData() : null;
  }


  onVideoChanged() {
    return this._session.on(SESSION_EVENTS.streamPropertyChanged)
      .filter((event) => {
        return event.changedProperty === STREAM_PROPERTY_CHANGED.hasVideo
      }).do((event) => {
        this._isVideoActive = event.newValue;
      });
  }

  //https://tokbox.com/developer/guides/signaling/js/
  // Signal type should be a string of only the custom type without the 'signal:' key as said in the documentation.
  sendSignal(signalType: string, data?: string): Observable<boolean> {
    let OTsignal: OTSignal = new OTSignal(signalType, data);
    return this._session.signal(OTsignal);
  }

  onSignal(signalType: string) {
    let OTsignal: OTSignal = new OTSignal(signalType);
    return this._session.onSignal(OTsignal);
  }


  onReconnecting() {
    return this._session.on(SESSION_EVENTS.sessionReconnecting);
  }

  onReconnected() {
    this._session.on(SESSION_EVENTS.sessionReconnected);
  }

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


  private _initPublisher() {
    let publisherProperties = {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      usePreviousDeviceSelection: true
    };

    this._publisher = OTPublisher.init(this._publisherTag, publisherProperties);
  }

  // private _subscribeToDestroyedStreams() {
  //     return this._session.on(SESSION_EVENTS.streamDestroyed);
  // }
  //
  //

  onOpenMediaAccessDialog() {
    return this._publisher.on(PUBLISHER_EVENTS.accessDialogOpened);
  }

  onMediaAccessDenied() {
    return this._publisher.on(PUBLISHER_EVENTS.accessDenied).do(() => {
      this.hangUp();
    });
  }

}
