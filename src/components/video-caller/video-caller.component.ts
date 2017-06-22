import { Component } from '@angular/core';
import {OpentokService} from "../../services/opentok/opentok.service";

@Component({
  selector: 'video-caller',
  providers: [OpentokService],
  templateUrl: 'video-caller.component.html',
  styleUrls: ['video-caller.component.css']
})
export class VideoCallerComponent {
  constructor(private _callService: OpentokService) {

  }

  call(){

  }
}
