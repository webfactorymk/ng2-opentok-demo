import {OpentokService} from "./opentok/opentok.service";
import {
  VideoCallStateManagerService,
  VideoCallStates
} from "../components/shared/video-call-widget/video-call-state-manager.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export const Signals = {
  showMessage: "showMessage",

}

@Injectable()
export class VideoCallManager {

  private _isVideoActive: boolean = false;

  constructor(private _callService: OpentokService,
              private videoCallStateManager: VideoCallStateManagerService) {

    videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  getStateChanges(): Observable<number> {
    return this.videoCallStateManager.getStateChange();
  }

  initIncomingCallRequirements(sessionId, token) {

    return this._callService.connectToSession(sessionId, token).do(() => {

      this._callService.onIncomingCall().subscribe(() => {
        this.videoCallStateManager.changeState(VideoCallStates.incomingCall);
      });

      this._callService.onEndCall().subscribe(() => {
        this.hungUp();
        this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);

      });

      this._callService.onNetworkFailedForPublisher().subscribe(() => {
        this.hungUp();
        this.videoCallStateManager.changeState(VideoCallStates.callHungUpByOther);
      });
    });
  }

  onSignal() {
    return this._callService.onSignal(Signals.showMessage);
  }

  sendSignal(data:string){
    this._callService.sendSignal(Signals.showMessage, data).subscribe(()=>{
      console.log("sent signal")
    });
  }

  answerCall():void {
    this._callService.call().subscribe(() => {
      this.initMediaRequirements();
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
    });
  }

  hungUp():void {
    this._callService.hangUp();
    this.videoCallStateManager.changeState(VideoCallStates.noCall);
  }

  call():void {
    this._callService.onIncomingCall().subscribe(() => {
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
    });

    this._callService.call().subscribe(() => {
      this.initMediaRequirements();
      this.videoCallStateManager.changeState(VideoCallStates.calling);
    });

    this._callService.onVideoChanged().subscribe(()=>{
    });
  }

  getSubscriberScreenshot() {
    return this._callService.getSubscriberScreenshot();
  }

  showVideo(show:boolean){
    this._callService.publishVideo(show);
  }

  private initMediaRequirements():void {

    this._callService.onOpenMediaAccessDialog().subscribe(() => {
      alert(" allow Camera")
    });
    this._callService.onMediaAccessDenied().subscribe(() => {
      alert(" Camera Disabled")
    });
  }

}
