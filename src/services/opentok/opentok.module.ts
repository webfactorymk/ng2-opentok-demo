import {NgModule, ModuleWithProviders} from "@angular/core";
import {OpentokService} from "./opentok.service";
import {OpentokConfig} from "./opentok.config";

@NgModule({})

export class OpentokModule {
  static forRoot(opentokConfig?: OpentokConfig): ModuleWithProviders {
    return {
      ngModule: OpentokModule,
      providers: [{provide: OpentokConfig, useValue: opentokConfig}
        , OpentokService]
    }
  }
}
