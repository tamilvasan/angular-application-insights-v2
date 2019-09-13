# Angular Azure Application Insights implementation for JS SDK V2

## Connect your Angular client-side to Microsofts Application Insights with this easy-to-use Module.

> Application Insights is an extensible Application Performance Management (APM) service for web developers on multiple platforms. Use it to monitor your live web application. It will automatically detect performance anomalies. It includes powerful analytics tools to help you diagnose issues and to understand what users actually do with your app.

[![npm](https://img.shields.io/npm/v/angular-application-insights-v2.svg?label=npm%20version&color=5b1096&style=for-the-badge)](https://www.npmjs.com/package/angular-application-insights-v2)
[![NPM Downloads](https://img.shields.io/npm/dw/angular-application-insights-v2.svg?color=b31ae7&style=for-the-badge)](https://www.npmjs.com/package/angular-application-insights-v2)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e51384)](/LICENSE) 

---

## Installation

Install & save the library to your package.json:

```bash
$ npm i --save angular-application-insights-v2
```

---

## How to setup the AppModule configuration?

Now add ApplicationInsightsModule to your Angular Root `AppModule`:
* Import the Application Insights module and the service provider
* Add the Module to your imports
* Add ApplicationInsightsService to your providers list

```typescript
// 1) Import the Application Insights module and the service provider
import { ApplicationInsightsModule, ApplicationInsightsService } from 'angular-application-insights-v2';

@NgModule({
  imports: [
    // 2) Add the Module to your imports
    ApplicationInsightsModule.forRoot({
      instrumentationKey: 'Your-Application-Insights-instrumentationKey'
    })
  ],
  providers: [ 
     // 3) Add AppInsightsService to your providers list
     ApplicationInsightsService
  ]
})
export class AppRootModule { }
```
## How to track the page view?
This library automatically track the initial request of a page. If you want to additionally track page requests then you can use the 'trackPageView' function from ApApplicationInsightsService.
```ts
this.appInsightsService.trackPageView({name:'Home Page Product List Tab', uri:"https://www.products.com",isLoggedIn:true,properties: { 'user': user.id, "action": "ProductList" }});
```

## How to send custom events to Application Insights?

Through out your application you can now use the ApplicationInsightsService class to fire off Application Insights functionality.

```typescript
import { ApplicationInsightsService } from 'angular-application-insights-v2';

export class ShoppingCartComponent {
  public cart: [];
  constructor(private appInsightsService: ApplicationInsightsService) {}

  saveCart(user) {
    // Saving some sample user & cart product data
    this.appInsightsService.trackEvent({name:'ShoppingCart Saved',properties: { 'user': user.id, 'cart': cart.id }});
  }
}
```

## Usage with Aspnetcore-Angular2-Universal repo or JavaScriptServices ( apps w/ Server-side rendering )

> ie: https://github.com/TrilonIO/aspnetcore-angular-universal

First, make sure you are only importing the library & the server within the **browser-app.module** NgModule (do not share it within a common one, as the server isn't able to use this library during it's server-renders).

Secondly, make sure you are calling the `injector` to get AppInsightsService during **ngOnInit**:

```typescript
export class HomeComponent implements OnInit {

    private appInsightsService: ApplicationInsightsService;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId, private injector: Injector) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() { // <-- 
        if (this.isBrowser) { // <-- only run if isBrowser
            this.appInsightsService = <ApplicationInsightsService>this.injector.get(ApplicationInsightsService); // <-- using the Injector, get the Service
            this.appInsightsService.trackEvent({name:'Testing', properties: { 'user': 'me' }});
        } 
    }
}
```

## API

**ApplicationInsightsService** is an angular service which provides the wrapper the Application Insights instance and it has following API functions.

```ts
applicationInsightsService.trackEvent(event: Microsoft.ApplicationInsights.IEventTelemetry, customProperties:object);
applicationInsightsService.startTrackEvent(name: string);
applicationInsightsService.stopTrackEvent(name: string, properties?: object, measurements?:object);
applicationInsightsService.trackPageView(pageView: Microsoft.ApplicationInsights.IPageViewTelemetry);
applicationInsightsService.startTrackPage(name?: string);
applicationInsightsService.stopTrackPage(name?: string, url?: string, customProperties?: object);
applicationInsightsService.trackMetric(metric: Microsoft.ApplicationInsights.IMetricTelemetry, customProperties?:object);
applicationInsightsService.trackException(exception: Microsoft.ApplicationInsights.IExceptionTelemetry);
applicationInsightsService.trackTrace(trace: Microsoft.ApplicationInsights.ITraceTelemetry, customProperties?: object);
applicationInsightsService.setUserId(authenticatedUserId: string);
applicationInsightsService.clearUserId();
applicationInsightsService._onerror(exception: Microsoft.ApplicationInsights.IAutoExceptionTelemetry);
applicationInsightsService.trackPageViewPerformance(pageViewPerformance: Microsoft.ApplicationInsights.IPageViewPerformanceTelemetry);
applicationInsightsService.addTelemetryInitializer(telemetryInitializer: (item: Microsoft.ApplicationInsights.ITelemetryItem) => boolean | void);
```
---

# How to build from source?

```bash
npm run build
```

To lint all `*.ts` files:

```bash
npm run lint
```

----

# Credits

This project inspired by [TrilonIO/angular-application-insights](https://github.com/TrilonIO/angular-application-insights). Special thanks to @MarkPieszak


# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e51384)](/LICENSE) 

----

## Follow online:

Twitter: [@tamvasan](https://twitter.com/tamvasan)

