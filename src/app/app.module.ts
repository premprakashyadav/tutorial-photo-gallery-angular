import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { ControllersService } from './services/controllers.service';
import { LoadingService } from './services/loading.service';
import { ProviderService } from './services/provider.service';
import { SharedDataProvider } from './services/shared-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    HttpClientModule, AppRoutingModule],
  providers: [
  //   AuthGuardService,
  //  // AuthenticationService,
  //   ProviderService,
  //   LoadingService,
  //   ControllersService,
  //   SharedDataProvider
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
