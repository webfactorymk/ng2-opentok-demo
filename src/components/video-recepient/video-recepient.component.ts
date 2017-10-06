import {Component} from "@angular/core";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {VideoCallStateManagerService} from "../../services/video-call-state-manager.service";
import {VideoCallManager} from "../../services/video-call-manager.service";

@Component({
  selector: 'video-recepient',
  templateUrl: 'video-recepient.component.html',
  styleUrls: ['video-recepient.component.css'],
  providers: [VideoCallManager, VideoCallStateManagerService],
  viewProviders: [VideoCallWidgetComponent]
})

export class VideoRecepientComponent  {

  sessionId = "1_MX40NTg5NzI0Mn5-MTQ5ODIwODc1NzU0M354STByZDE0M080SEg0MzBCdXl2cFJWc2d-UH4";
  //valid until 25 August
  token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9ZWUzNTM1Mzk3NWNiNTI2N2IwZDJmYWQ3OTQyMzE5NGM1ZTY3NzhlMDpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUwNzMwNDY4MSZub25jZT0wLjc0OTQ5NDI1MzAyMTQ1MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTA5OTAwMTM4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"


}
