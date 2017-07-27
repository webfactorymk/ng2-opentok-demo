import {Component, OnInit} from "@angular/core";
import {OpentokService} from "../../services/opentok/opentok.service";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {VideoCallStateManagerService} from "../shared/video-call-widget/video-call-state-manager.service";
import {VideoCallManager} from "../../services/video-call-manager.service";

@Component({
  selector: 'video-recepient',
  templateUrl: 'video-recepient.component.html',
  styleUrls: ['video-recepient.component.css'],
  providers: [VideoCallManager, OpentokService, VideoCallStateManagerService],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoRecepientComponent implements OnInit {

  hasIncomingCall: boolean = false;
  isIncomingCallAnswered: boolean = false;

  sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
  //valid until 25 August
  token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9NmZjZDdiM2M4NDc2YTA5NTYyYjI4NWQ4NWUwNWE0MjBmNjA5N2IxMzpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUwMDk3NDg1OCZub25jZT0wLjg4OTk1NjY5OTczODkzNzkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUwMzU2Njc2OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="

  constructor(private _callService: OpentokService) {
  }


  ngOnInit(): void {

    // this._callService.connectToSession(this.sessionId, this.token).subscribe(() => {
    //   console.log("recepient has connected")
    //
    //   this._callService.onIncomingCall().subscribe(() => {
    //     this.hasIncomingCall = true;
    //     console.log("Incoming call")
    //   });
    //
    //   this._callService.onEndCall().subscribe(() => {
    //     console.log("onEndCall call")
    //   });
    //
    //   this._callService.onNetworkFailedForPublisher().subscribe(() => {
    //     console.log("onNetworkFailedForPublisher")
    //   });
    //
    // });
  }


  // initPublisherRequirements() {
  //   this._callService.initPublisher();
  //
  //   this._callService.onOpenMediaAccessDialog().subscribe(() => {
  //     alert(" allow Camera")
  //     console.log(" allow Camera")
  //   });
  //
  //   this._callService.onMediaAccessDenied().subscribe(() => {
  //     alert(" Camera Disabled")
  //     console.log(" Camera Disabled")
  //   });
  // }
  //
  // call() {
  //   this.initPublisherRequirements();
  //   this._callService.call().subscribe(() => {
  //     console.log("Call was made")
  //   });
  // }
  //
  // answerCall() {
  //   if (this.hasIncomingCall) {
  //     this.initPublisherRequirements();
  //     this._callService.call().subscribe(() => {
  //       this.hasIncomingCall = false;
  //       this.isIncomingCallAnswered = true;
  //       console.log("Call was answered")
  //     });
  //   }
  // }
  //
  // hungUp() {
  //   this._callService.hangUp();
  //   this.isIncomingCallAnswered = false;
  // }
}
