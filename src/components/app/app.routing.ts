import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {VideoCallerComponent} from "../video-caller/video-caller.component";
import {VideoRecepientComponent} from "../video-recepient/video-recepient.component";

const appRoutes: Routes = [
  {
    path: 'recepient',
    component: VideoRecepientComponent
  },
  {
    path: 'caller',
    component: VideoCallerComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
