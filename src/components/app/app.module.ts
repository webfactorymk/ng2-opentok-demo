import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {VideoRecepientComponent} from "../video-recepient/video-recepient.component";
import {VideoCallerComponent} from "../video-caller/video-caller.component";
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    VideoCallerComponent,
    VideoRecepientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
