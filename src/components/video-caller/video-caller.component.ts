import {Component, OnInit} from "@angular/core";
import {OpentokService} from "../../services/opentok/opentok.service";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {VideoCallStateManagerService} from "../shared/video-call-widget/video-call-state-manager.service";

@Component({
  selector: 'video-caller',
  providers: [OpentokService, VideoCallStateManagerService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css'],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoCallerComponent implements OnInit {


  isCallEstablished: boolean = false;
  hasRecepientAnswered: boolean = false;

   sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
  //valid until 25 August
   token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9YWViNTljN2MyMjBjOWNjNjExMzU2Yjc1NjE3OTc3MjZjNDkxMzk0ZTpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUwMDk3NDI0MyZub25jZT0wLjgwMjM2ODA4ODE4MDg5MDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUwMzU2NjE1MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="


  constructor(private _callService: OpentokService) {

  }

  ngOnInit(): void {


  }

  // call() {
  //   this._callService.connectToSession(this.sessionId, this.token).subscribe(() => {
  //     console.log("caller has connected")
  //
  //     if (!this.isCallEstablished) {
  //
  //       this._callService.initPublisher();
  //
  //       this._callService.onOpenMediaAccessDialog().subscribe(() => {
  //         alert(" allow Camera")
  //         console.log(" allow Camera")
  //       });
  //
  //       this._callService.onMediaAccessDenied().subscribe(() => {
  //         alert(" Camera Disabled")
  //         console.log(" Camera Disabled")
  //       });
  //
  //       this._callService.onIncomingCall().subscribe(() => {
  //         this.hasRecepientAnswered = true;
  //         console.log("Receive the recepient's video")
  //       });
  //
  //       this._callService.call().subscribe(() => {
  //         console.log("Call was started")
  //         this.isCallEstablished = true;
  //       });
  //     }
  //   });
  // }
  //
  // hungUp() {
  //   this._callService.hangUp();
  //   this.hasRecepientAnswered = false;
  //   this.isCallEstablished = false;
  // }
}
