import {OpentokService} from "./opentok/opentok.service";
import {
  VideoCallStateManagerService,
  VideoCallStates
} from "../components/shared/video-call-widget/video-call-state-manager.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class VideoCallManager {

  constructor(private _callService: OpentokService,
              private videoCallStateManager: VideoCallStateManagerService) {

    videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  getStateChanges(): Observable<number> {
    return this.videoCallStateManager.getStateChange();
  }

  initIncomingCallRequirements(sessionId, token) {

    this._callService.connectToSession(sessionId, token).subscribe(() => {
      console.log("connectToSession");

      this._callService.onIncomingCall().subscribe(() => {
        this.videoCallStateManager.changeState(VideoCallStates.incomingCall);
        console.log("incomingCall")
      });

      this._callService.onEndCall().subscribe(() => {
        this.hungUp();
        this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);
        console.log("callHungUpByOther")

      });

      this._callService.onNetworkFailedForPublisher().subscribe(() => {
        console.log("onNetworkFailedForPublisher");
        this.hungUp();
        this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);
      });

    });
  }

  answerCall() {
    this.initPublisherRequirements();
    this._callService.call().subscribe(() => {
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
      console.log("callStarted")
    });
  }

  hungUp() {
    this._callService.hangUp();
    this.videoCallStateManager.changeState(VideoCallStates.noCall);
    console.log("noCall")
  }

  call() {
    this.initPublisherRequirements();

    this._callService.onIncomingCall().subscribe(() => {
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
      console.log("callStarted")

    });

    this._callService.call().subscribe(() => {
      this.videoCallStateManager.changeState(VideoCallStates.calling);
      console.log("calling")
    });
  }

  private initPublisherRequirements() {
    this._callService.initPublisher();

    this._callService.onOpenMediaAccessDialog().subscribe(() => {
      alert(" allow Camera")
    });
    this._callService.onMediaAccessDenied().subscribe(() => {
      alert(" Camera Disabled")
    });
  }

}
