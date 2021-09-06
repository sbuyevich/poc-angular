import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  MsalModule,
  MsalGuard,  
  MsalRedirectComponent,  
} from "@azure/msal-angular";

import { PublicClientApplication, InteractionType, IPublicClientApplication } from '@azure/msal-browser'; // InteractionType added to imports

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { MaterialModule } from '../material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth-service';

import { environment } from '../environments/environment';
import { HomeComponent, FooterComponent, HeaderComponent, AsideComponent } from '../components';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;// set to true for IE 11

const publicClientApp = new PublicClientApplication({
  auth: {
    clientId: environment.sunnyPortalClientId,
    authority: "https://login.microsoftonline.com/" + environment.sunnyPortalTenantId, 
    redirectUri: environment.shellURL
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE,
  }
});
@NgModule({
  declarations: [		
    AppComponent,    
    HeaderComponent,    
    FooterComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(APP_ROUTES),
    ModuleFederationToolsModule,
    HttpClientModule,
    MaterialModule,
    MsalModule.forRoot( publicClientApp, 
    {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration     
    }, 
    null as any)
  ],
  providers: [ 
    MsalGuard,
    AuthService 
  ], 
  bootstrap: [AppComponent, MsalRedirectComponent]  
})

export class AppModule {  
}
