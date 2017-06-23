import {Component, OnInit} from "@angular/core";
import {OpentokService} from "../../services/opentok/opentok.service";

@Component({
  selector: 'video-recepient',
  templateUrl: 'video-recepient.component.html',
  styleUrls: ['video-recepient.component.css'],
  providers: [OpentokService]
})
export class VideoRecepientComponent implements OnInit {

  hasIncomingCall: boolean = false;
  isIncomingCallAnswered: boolean = false;

  constructor(private _callService: OpentokService) {
  }

  ngOnInit(): void {
    let sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
    //valid until 20 July
    let token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9NzYxMWFlMTMxNzE2YTFlYTVmYTMyZjZkZjQ4YmJjYzMwOGZjMjY4OTpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTQ5ODIwODkxNSZub25jZT0wLjE2MzYwODUxMTU0ODA2ODU1JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1MDA4MDA4NDg="
    this._callService.connectToSession(sessionId, token).subscribe(() => {
      console.log("recepient has connected")

      this._callService.onIncomingCall().subscribe(() => {
        this.hasIncomingCall = true;
        console.log("Incoming call")
      });

      this._callService.onEndCall().subscribe(() => {
        console.log("onEndCall call")
      });

      this._callService.onNetworkFailedForPublisher().subscribe(() => {
        console.log("onNetworkFailedForPublisher")
      });

    });
  }


  initCallRequirements() {
    this._callService.initPublisher();
    this._callService.onOpenMediaAccessDialog().subscribe(() => {
      alert(" allow Camera")
      console.log(" allow Camera")
    });

    this._callService.onMediaAccessDenied().subscribe(() => {
      alert(" Camera Disabled")
      console.log(" Camera Disabled")
    });
  }

  call() {
    this.initCallRequirements();
    this._callService.call().subscribe(() => {
      console.log("Call was made")
    });
  }

  answerCall() {
    if (this.hasIncomingCall) {
      this.initCallRequirements();
      this._callService.call().subscribe(() => {
        this.hasIncomingCall = false;
        this.isIncomingCallAnswered = true;
        console.log("Call was answered")
      });
    }
  }

  hungUp() {
    this._callService.hangUp();
    this.isIncomingCallAnswered = false;
  }
}
