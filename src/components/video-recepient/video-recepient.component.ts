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
  //valid until 1 January
  token = "T1==cGFydG5lcl9pZD00NTg5NzI0MiZzaWc9MDhkMTY2OGE2ZTUyYzg1MTk4ZTM0ZGJkNzk0OTE2MmZlYTA1YzlkMzpzZXNzaW9uX2lkPTFfTVg0ME5UZzVOekkwTW41LU1UUTVPREl3T0RjMU56VTBNMzU0U1RCeVpERTBNMDgwU0VnME16QkNkWGwyY0ZKV2MyZC1VSDQmY3JlYXRlX3RpbWU9MTUxMjEyMzU0NyZub25jZT0wLjYwMDM4MDAwNDUyNDc5ODkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxNDcxNTU0OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="


}
