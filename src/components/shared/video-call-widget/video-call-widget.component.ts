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

  private _initIncomingCallRequirements() {
    this.videoCallManager.initIncomingCallRequirements(this.sessionId, this.token, this.publisherTag, this.publisherProperties, this.subscriberTag, this.subscriberProperties)
      .subscribe();

  }

  call() {
    if (!this.isCallEstablished) {
      this.isCallEstablished = true;
      this.videoCallManager.call(this.publisherTag, this.publisherProperties).subscribe(() => {
        console.log("CALLING")
        this.isIncomingCallAnswered = false;
        this.hasIncomingCall = false;
        this.isVideoOn = true;
      });
    }
  }

  hangUp() {
    this.videoCallManager.hangUp();
    this.hideVideosSection();
    this._initIncomingCallRequirements();
  }

  hideVideosSection() {
    this.isCallAnswered = false;
    this.isCallEstablished = false;
    this.isIncomingCallAnswered = false;
    this.hasIncomingCall = false;
  }

  answerCall() {
    this.videoCallManager.call(this.publisherTag, this.publisherProperties).subscribe(() => {
      this.isVideoOn = true;
      console.log("onIncomingCallAnswered")
      this.hasIncomingCall = false;
      this.isIncomingCallAnswered = true;
    });

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

  onIncomingCall(): void {
    if (this.isCallEstablished) {
      console.log("onCallStarted")
      this.isCallAnswered = true;
    } else {
      console.log("onIncomingCall")
      this.hasIncomingCall = true;
    }
  }

  onMediaAccessRequest(): void {
    console.log("MEDIA ACCESS REQUEST")
  }

  onMediaAccessDenied(): void {
    console.log("MEDIA ACCESS DENIED")
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

  onMessageReceived(msg: string) {
    this.msgFromBuddy = msg;
  }

  onVideoChanged() {
    console.log("onVideoChanged")
  }

  ngOnDestroy() {
    this.videoCallManager.removeVideoCallLifeCyclesListener(this);
  }

}
