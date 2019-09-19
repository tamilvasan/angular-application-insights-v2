import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApplicationInsightsService } from './src/application-insights.service';
import { ApplicationInsightsConfig } from './src/application-insights.config';
import { CommonModule } from '@angular/common';

export {ApplicationInsightsService} from './src/application-insights.service';
export { ApplicationInsightsConfig } from './src/application-insights.config';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [ ApplicationInsightsService ]
})

export class ApplicationInsightsModule {
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
