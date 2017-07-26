import {Component, Input, OnInit} from "@angular/core";
import {OpentokService} from "../../../services/opentok/opentok.service";
import {LoadingComponent} from "../loading/loading.component";
import {VideoCallStateManagerService, VIDEO_CALL_STATES} from "./video-call-state-manager.service";

@Component({
  selector: 'video-call-widget',
  templateUrl: 'video-call-widget.component.html',
  providers: [OpentokService],
  viewProviders: [LoadingComponent]
})

export class VideoCallWidgetComponent implements OnInit {

  isCallEstablished: boolean = false;
  isCallAnswered: boolean = false;

  hasIncomingCall: boolean = false;
  isIncomingCallAnswered: boolean = false;

  @Input() sessionId: string;
  @Input() token: string;

  constructor(private _callService: OpentokService,
              private videoCallStateManager: VideoCallStateManagerService) {
  }

  ngOnInit(): void {
    this._subscribeToVideoCallState();
    this.videoCallStateManager.changeState(VIDEO_CALL_STATES.noCall);
  }

  call() {
    this.videoCallStateManager.changeState(VIDEO_CALL_STATES.calling);
  }

  private establishCall() {
    if (!this.isCallEstablished) {

      this.initPublisherRequirements();

      this._callService.onIncomingCall().subscribe(() => {
        this.videoCallStateManager.changeState(VIDEO_CALL_STATES.callStarted);
      });

      this._callService.call().subscribe(() => {
        this.isCallEstablished = true;
        console.log("Call was started")
      });
    }
  }

  private initIncomingCallRequirements() {

    this._callService.connectToSession(this.sessionId, this.token).subscribe(() => {

      this._callService.onIncomingCall().subscribe(() => {
        this.videoCallStateManager.changeState(VIDEO_CALL_STATES.incomingCall);
      });

      this._callService.onEndCall().subscribe(() => {
        this.videoCallStateManager.changeState(VIDEO_CALL_STATES.callHungUpByOther);
      });

      this._callService.onNetworkFailedForPublisher().subscribe(() => {
        console.log("onNetworkFailedForPublisher")
        this.videoCallStateManager.changeState(VIDEO_CALL_STATES.callHungUpByOther);
      });

      console.log("recepient has connected")

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

  hungUp() {
    console.log(" HANG UP")
    this._callService.hangUp();
    this.isCallAnswered = false;
    this.isCallEstablished = false;
    this.isIncomingCallAnswered = false;
    this.hasIncomingCall = false;

    this.videoCallStateManager.changeState(VIDEO_CALL_STATES.noCall);
  }

  answerCall() {
    this.initPublisherRequirements();
    this._callService.call().subscribe(() => {
      this.hasIncomingCall = false;
      this.isIncomingCallAnswered = true;
      this.videoCallStateManager.changeState(VIDEO_CALL_STATES.callStarted);
      console.log("Call was answered")
    });
  }

  private _subscribeToVideoCallState() {
    this.videoCallStateManager.getStateChange().subscribe((newState: number) => {
      this._handleStates(newState);
    });
  }

  private _handleStates(newState: number) {
    switch (newState) {
      case VIDEO_CALL_STATES.noCall: {
        this.initIncomingCallRequirements();
        break;
      }

      case VIDEO_CALL_STATES.incomingCall: {
        this.hasIncomingCall = true;
        break;
      }

      case VIDEO_CALL_STATES.calling: {
        this.establishCall();
        break;
      }

      case VIDEO_CALL_STATES.callStarted: {
        this.isCallAnswered = true;
        break;
      }

      case VIDEO_CALL_STATES.callHungUpByOther: {
        this.hungUp();
        break;
      }
    }
  }

}
