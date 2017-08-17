import {Component, Input, OnInit} from "@angular/core";
import {LoadingComponent} from "../loading/loading.component";
import {VideoCallStates, VideoCallStateManagerService} from "../../../services/video-call-state-manager.service";
import {VideoCallManager} from "../../../services/video-call-manager.service";

@Component({
  selector: 'video-call-widget',
  templateUrl: 'video-call-widget.component.html',
  providers: [VideoCallManager, VideoCallStateManagerService],
  viewProviders: [LoadingComponent]
})

export class VideoCallWidgetComponent implements OnInit {


  isCallEstablished: boolean = false;
  isCallAnswered: boolean = false;

  hasIncomingCall: boolean = false;
  isIncomingCallAnswered: boolean = false;

  isVideoOn: boolean;

  screenshotOfTheOtherUser: string;
  msgFromBuddy: string;
  msgForBuddy: string;

  @Input() sessionId: string;
  @Input() token: string;

  constructor(private videoCallManager: VideoCallManager) {
  }

  ngOnInit(): void {
    this._subscribeToVideoCallState();
    this.listenToIncomingCalls();
  }

  call() {
    if (!this.isCallEstablished) {
      this.videoCallManager.call();
      this.isVideoOn = true;
    }
  }

  hangUp() {
    this.videoCallManager.hangUp();
    this.hideVideosSection();
  }

  hideVideosSection() {
    this.isCallAnswered = false;
    this.isCallEstablished = false;
    this.isIncomingCallAnswered = false;
    this.hasIncomingCall = false;
  }

  answerCall() {
    this.videoCallManager.answerCall();
    this.isVideoOn = true;
  }

  takeScreenshot() {
    this.screenshotOfTheOtherUser = this.videoCallManager.getSubscriberScreenshot();
  }

  removeVideo() {
    this.videoCallManager.showVideo(false);
    this.isVideoOn = false;
  }

  showVideo() {
    this.videoCallManager.showVideo(true);
    this.isVideoOn = true;
  }

  sendSignalToBuddy(){
    this.videoCallManager.sendSignal(this.msgForBuddy);
  }

  clearMsg(){
    this.msgFromBuddy = null;
  }

  private listenToIncomingCalls() {
    this.videoCallManager.initIncomingCallRequirements(this.sessionId, this.token).subscribe(()=>{
      this._listenToSignals();
    });
  }

  private _listenToSignals(){
    this.videoCallManager.onSignal().subscribe((msg: any) => {
      this.msgFromBuddy = msg.data;
    });
  }

  private _subscribeToVideoCallState() {
    this.videoCallManager.getStateChanges().subscribe((newState: number) => {
      this._handleStates(newState);
    });
  }

  private _handleStates(newState: number) {
    switch (newState) {
      case VideoCallStates.noCall: {
        this.listenToIncomingCalls();
        break;
      }

      case VideoCallStates.incomingCall: {
        this.hasIncomingCall = true;
        break;
      }

      case VideoCallStates.calling: {
        this.isCallEstablished = true;
        this.hasIncomingCall = false;
        this.isIncomingCallAnswered = false;
        break;
      }

      case VideoCallStates.callStarted: {
        this.isCallAnswered = true;
        this.hasIncomingCall = false;
        this.isIncomingCallAnswered = true;
        break;
      }

      case VideoCallStates.callHungUpByOther: {
        this.hideVideosSection();
        break;
      }
    }
  }

}
