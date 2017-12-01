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
  //valid until 1 January
   token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9ZjhmMDRlOTI2NGVlYWUzOWIzZGFjZGEzN2ZjNmVlMGEzMGUxNmI3OTpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUxMjEyMzUxMSZub25jZT0wLjEzOTI3NTkzNzk2MzQ0NTg0JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1MTQ3MTU1MTEmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0="
}
