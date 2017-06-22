import { Component } from '@angular/core';
import {OpentokService} from "../../services/opentok/opentok.service";

@Component({
  selector: 'video-recepient',
  templateUrl: 'video-recepient.component.html',
  styleUrls: ['video-recepient.component.css'],
  providers: [OpentokService]
})
export class VideoRecepientComponent {
  constructor(private _callService: OpentokService) {
  }

  call(){

  }
}
