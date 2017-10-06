import {Component} from "@angular/core";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {VideoCallStateManagerService} from "../../services/video-call-state-manager.service";
import {VideoCallManager} from "../../services/video-call-manager.service";

@Component({
  selector: 'video-caller',
  providers: [VideoCallManager, VideoCallStateManagerService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css'],
  viewProviders: [VideoCallWidgetComponent]
})
export class VideoCallerComponent {

   sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
  //valid until 25 August
   token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9ZGE2MjhhNzViZTdmMmVhNTAwODc5ZGRlMGNkMGE2MGZjZDM2MjViNDpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUwNzMwNDYzOSZub25jZT0wLjAzNzU1ODMzMzIwMDQyMDM0NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTA5OTAwMDk1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
}
