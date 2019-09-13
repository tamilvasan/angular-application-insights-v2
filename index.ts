import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { ApplicationInsightsService } from './src/application-insights.service';
import { ApplicationInsightsConfig } from './src/application-insights.config';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export {ApplicationInsightsService} from './src/application-insights.service';
export { ApplicationInsightsConfig } from './src/application-insights.config';

@NgModule({
  imports: [RouterModule,CommonModule],
  declarations: [],
  exports: [],
  providers: [ ApplicationInsightsService ]
})

export class ApplicationInsightsModule {

  constructor (
    @Optional() @SkipSelf() parentModule: ApplicationInsightsModule,
    appInsightsService: ApplicationInsightsService
  ) {
    if (!parentModule) {
        appInsightsService.init();
    }
  }
  static forRoot(config: ApplicationInsightsConfig): ModuleWithProviders {
    return {
      ngModule: ApplicationInsightsModule,
      providers: [
        { provide: ApplicationInsightsConfig, useValue: config },
        ApplicationInsightsService
      ]
    };
  }

}
