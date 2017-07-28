import {OpentokService} from "./opentok/opentok.service";
import {
  VideoCallStateManagerService,
  VideoCallStates
} from "../components/shared/video-call-widget/video-call-state-manager.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export const Signals = {
  returnScreenshot: "return_screenshot",
  getScreenshot: "get_screenshot"
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

  listenForScreenshotFromOther() {
    return this._callService.onSignal(Signals.returnScreenshot);
  }

  sendScreenshot(img:string){
    this._callService.sendSignal(Signals.returnScreenshot, img);
  }

  listenForRequestForScreenshot() {
    return this._callService.onSignal(Signals.getScreenshot);
  }

  requestScreenshotFromOther(){
    return this._callService.sendSignal(Signals.getScreenshot);
  }



  answerCall():void {
    this._callService.call().subscribe(() => {
      this.initMediaRequirements();
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
      console.log("callStarted")
    });
  }

  hungUp():void {
    this._callService.hangUp();
    this.videoCallStateManager.changeState(VideoCallStates.noCall);
    console.log("noCall")
  }

  call():void {
    this._callService.onIncomingCall().subscribe(() => {
      this._isVideoActive = true;
      this.videoCallStateManager.changeState(VideoCallStates.callStarted);
      console.log("callStarted")

    });

    this._callService.call().subscribe(() => {
      this.initMediaRequirements();
      this.videoCallStateManager.changeState(VideoCallStates.calling);
      console.log("calling")
    });

    this._callService.onVideoChanged().subscribe(()=>{
      console.log("videoChanged")
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
