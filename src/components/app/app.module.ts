import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {VideoRecepientComponent} from "../video-recepient/video-recepient.component";
import {VideoCallerComponent} from "../video-caller/video-caller.component";
import {routing} from "./app.routing";
import {LoadingComponent} from "../shared/loading/loading.component";
import {VideoCallWidgetComponent} from "../shared/video-call-widget/video-call-widget.component";
import {OpentokModule} from "";


@NgModule({
  declarations: [
    AppComponent,
    VideoCallerComponent,
    VideoRecepientComponent,
    LoadingComponent,
    VideoCallWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    OpentokModule.forRoot({apiKey: "45897242"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
