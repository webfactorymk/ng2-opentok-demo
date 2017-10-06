import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {LoadingComponent} from "../loading/loading.component";
import {VideoCallStateManagerService} from "../../../services/video-call-state-manager.service";
import {VideoCallManager, VideoCallLifeCycles} from "../../../services/video-call-manager.service";

@Component({
  selector: 'video-call-widget',
  templateUrl: 'video-call-widget.component.html',
  providers: [VideoCallManager, VideoCallStateManagerService],
  viewProviders: [LoadingComponent]
})

export class VideoCallWidgetComponent implements OnInit, VideoCallLifeCycles, OnDestroy {
  isCallEstablished: boolean = false;
  isCallAnswered: boolean = false;

  hasIncomingCall: boolean = false;
  isIncomingCallAnswered: boolean = false;

  isVideoOn: boolean;

  screenshotOfTheOtherUser: string;
  msgFromBuddy: string;
  msgForBuddy: string;

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

  publisherTag: string = "publisher";
  subscriberTag: string = "subscriber";

  @Input() sessionId: string;
  @Input() token: string;

  constructor(private videoCallManager: VideoCallManager) {
  }

  ngOnInit(): void {
    this.videoCallManager.addVideoCallLifeCyclesListener(this);
    this._initIncomingCallRequirements();
  }

  call() {
    if (!this.isCallEstablished) {
      this.videoCallManager.call(this.publisherTag, this.publisherProperties);
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
    this.videoCallManager.answerCall(this.publisherTag, this.publisherProperties);
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

  sendSignalToBuddy() {
    this.videoCallManager.sendSignal(this.msgForBuddy);
  }

  clearMsg() {
    this.msgFromBuddy = null;
  }

  private _initIncomingCallRequirements() {
    this.videoCallManager.initIncomingCallRequirements(this.sessionId, this.token, this.publisherTag, this.publisherProperties, this.subscriberTag, this.subscriberProperties)
      .subscribe();
  }


  onIncomingCall(): void {
    this.hasIncomingCall = true;
  }

  onMediaAccessRequest(): void {
    console.log("MEDIA ACCESS REQUEST")
  }

  onMediaAccessDenied(): void {
    console.log("MEDIA ACCESS DENIED")
  }

  onCalling(): void {
    console.log("CALLING")
    this.isCallEstablished = true;
    this.hasIncomingCall = false;
    this.isIncomingCallAnswered = false;
  }

  onCallStarted(): void {
    console.log("onCallStarted")
    this.isCallAnswered = true;
    this.hasIncomingCall = false;
    this.isIncomingCallAnswered = true;
  }

  onCallHungUpByOther(): void {
    console.log("onCallHungUpByOther")
    this.hangUp();
  }

  onCallHungUp(): void {
    console.log("onCallHungUp")
  }

  onNetworkLost(): void {
    console.log("Network Lost")
  }

  onMissedCall(): void {
    console.log("Missed Call")
  }
  onMessageReceived(msg:string){
    this.msgFromBuddy = msg;
  }
  ngOnDestroy() {
    this.videoCallManager.removeVideoCallLifeCyclesListener(this);
  }

}
