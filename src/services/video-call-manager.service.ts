import {
  VideoCallStateManagerService,
  VideoCallStates
} from "./video-call-state-manager.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {OpentokService} from "ng2-opentok/dist/opentok.service";
import {OTSignalEvent} from "ng2-opentok/dist/models/events/signal-event.model";
import {OTSession} from "ng2-opentok/dist/models/session.model";

export const Signals = {
  showMessage: "showMessage",

}

@Injectable()
export class VideoCallManager {

  private _isVideoActive: boolean = false;
  private _session: OTSession;

  constructor(private _callService: OpentokService,
              private videoCallStateManager: VideoCallStateManagerService) {
    videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  publisherProperties = {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    usePreviousDeviceSelection: true
  };

  subscriberProperties = {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  };

  getStateChanges(): Observable<number> {
    return this.videoCallStateManager.getStateChange();
  }

  initIncomingCallRequirements(sessionId, token) {

    return this._callService.connectToSession(sessionId, token)
      .do((session: OTSession) => {
        this._session = session;
        this._callService.onIncomingCall(this.subscriberProperties).subscribe(() => {
          this.videoCallStateManager.changeState(VideoCallStates.incomingCall);
        });

        this._callService.onEndCall().subscribe(() => {
          this.hangUp();
          this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);

        });

        this._callService.onNetworkFailedForPublisher().subscribe(() => {
          this.hangUp();
          this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);
        });
      });
  }

  onSignal() {
    return this._callService.onSignal(Signals.showMessage)
      .filter((event: OTSignalEvent) => {
        // Signal received from another client
        return event.from.getConnectionId() != this._session.getConnection().getConnectionId();
      });
  }

  sendSignal(data: string) {
    this._callService.sendSignal(Signals.showMessage, data).subscribe();
  }

  answerCall(): void {
    this._callService.call(this.publisherProperties).subscribe(() => {
      this.initMediaRequirements();
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
    });
  }

  hangUp(): void {
    this._callService.hangUp();
    this.videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  call(): void {
    this._callService.onIncomingCall(this.subscriberProperties).subscribe(() => {
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
    });

    this._callService.call(this.publisherProperties).subscribe(() => {
      this.initMediaRequirements();
      this.videoCallStateManager.changeState(VideoCallStates.calling);
    });

    this._callService.onVideoChanged().subscribe(() => {
    });
  }

  getSubscriberScreenshot() {
    return this._callService.getSubscriberScreenshot();
  }

  showVideo(show: boolean) {
    this._callService.publishVideo(show);
  }

  private initMediaRequirements(): void {
    this._callService.onOpenMediaAccessDialog().subscribe(() => {
      alert(" allow Camera")
    });

    this._callService.onMediaAccessDenied().do(() => {
      this.hangUp();
    }).subscribe(() => {
      alert(" Camera Disabled")
    });
  }

}
