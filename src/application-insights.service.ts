import { Injectable } from '@angular/core';
import {
  ApplicationInsights,
  IAppInsights,
  IEventTelemetry,
  IPageViewTelemetry,
  IExceptionTelemetry,
  ITraceTelemetry,
  IAutoExceptionTelemetry,
  IMetricTelemetry,
  ITelemetryItem,
  IPageViewPerformanceTelemetry
} from '@microsoft/applicationinsights-web';
import { Router, ActivatedRouteSnapshot, ResolveEnd} from '@angular/router';
import { ApplicationInsightsConfig } from './application-insights.config'

@Injectable()
export class ApplicationInsightsService implements IAppInsights {
  private appInsights: ApplicationInsights;
  constructor(private config: ApplicationInsightsConfig) {
    this.appInsights = new ApplicationInsights({
      config: <any>config
    });
  }

  init(router:Router): void {
    if (this.config.instrumentationKey) {
      try {
        this.appInsights.loadAppInsights();
        router.events.subscribe((event:any) => {
          if(event instanceof ResolveEnd){
           const activatedComponent = this.getActivatedComponent(event.state.root);
            if (activatedComponent) {
              this.trackPageView({ name: `${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, uri: event.urlAfterRedirects });
            }
          }});
      }
      catch (ex) {
        console.warn('Angular application insights Error [loadAppInsights]: ', ex);
      }
    }
    else {
      console.warn('An instrumentationKey value is required to initialize AppInsightsService');
    }
  }
 
  trackEvent(event: IEventTelemetry, customProperties?: { [key: string]: any; }) {
    try {
      this.appInsights.trackEvent(event, customProperties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackEvent]: ', ex);
    }
  }

  startTrackEvent(name: string) {
    try {
      this.appInsights.startTrackEvent(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackEvent]: ', ex);
    }
  }
  stopTrackEvent(name: string, properties?: Object, measurements?: Object) {
    try {
      this.appInsights.stopTrackEvent(name, <any>properties, <any>measurements);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackEvent]: ', ex);
    }
  }

  trackPageView(pageView: IPageViewTelemetry) {
    try {
      this.appInsights.trackPageView(pageView);
    } catch (ex) {
      console.warn('Angular application insights Error [trackPageView]: ', ex);
    }
  }

  startTrackPage(name?: string) {
    try {
      this.appInsights.startTrackPage(name);
    } catch (ex) {
      console.warn('Angular application insights Error [startTrackPage]: ', ex);
    }
  }
  stopTrackPage(name?: string, url?: string, customProperties?: Object) {
    try {
      this.appInsights.stopTrackPage(name, url, customProperties);
    } catch (ex) {
      console.warn('Angular application insights Error [stopTrackPage]: ', ex);
    }
  }
  trackException(exception: IExceptionTelemetry): void {
    try {
      this.appInsights.trackException(exception);
    } catch (ex) {
      console.warn('Angular application insights Error [trackException]: ', ex);
    }
  }
  _onerror(exception: IAutoExceptionTelemetry): void {
    try {
      this.appInsights._onerror(exception);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }
  trackTrace(trace: ITraceTelemetry, customProperties?: { [key: string]: any; }): void {
    try {
      this.appInsights.trackTrace(trace, customProperties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }
  trackMetric(metric: IMetricTelemetry, customProperties?: { [key: string]: any; }): void {
    try {
      this.appInsights.trackMetric(metric, customProperties);
    } catch (ex) {
      console.warn('Angular application insights Error [trackTrace]: ', ex);
    }
  }
  addTelemetryInitializer(telemetryInitializer: (item: ITelemetryItem) => boolean | void) {
    try {
      this.appInsights.addTelemetryInitializer(telemetryInitializer);
    } catch (ex) {
      console.warn('Angular application insights Error [addTelemetryInitializer]: ', ex);
    }
  }
  trackPageViewPerformance(pageViewPerformance: IPageViewPerformanceTelemetry): void {
    try {
      this.appInsights.trackPageViewPerformance(pageViewPerformance);
    } catch (ex) {
      console.warn('Angular application insights Error [trackPageViewPerformance]: ', ex);
    }
  }
  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}