import {Component, OnInit} from "@angular/core";
import {OpentokService} from "../../services/opentok/opentok.service";

@Component({
  selector: 'video-caller',
  providers: [OpentokService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css']
})
export class VideoCallerComponent implements OnInit {

  constructor(private _callService: OpentokService) {

  }

  ngOnInit(): void {
    let sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
    //valid until 20 July
    let token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9NDYxMmIxMjIwYTEzODQ5Mjk2MmIyNWUyMTA0NzEyZDZlMzNjOGNkMDpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTQ5ODIwODc5NiZub25jZT0wLjY4NTYxODMxMTE0NDMxMjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUwMDgwMDcyOQ=="

    this._callService.connectToSession(sessionId, token).subscribe(() => {
      console.log("caller has connected")
    });
  }

  call() {
    this._callService.initPublisher();
    this._callService.onOpenMediaAccessDialog().subscribe(() => {
      alert(" allow Camera")
      console.log(" allow Camera")
    });

    this._callService.onMediaAccessDenied().subscribe(() => {
        alert(" Camera Disabled")
        console.log(" Camera Disabled")
      });

    this._callService.call().subscribe(() => {
      console.log("Call was finished")
    });
  }
}
