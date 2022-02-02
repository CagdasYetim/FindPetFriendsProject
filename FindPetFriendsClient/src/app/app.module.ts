import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PwaHeaderModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-header';
import { PwaCartModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-cart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PwaFormModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-form';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { ProfileComponent } from './profile/profile.component';
import { PwaCheckboxesModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-checkboxes';
import { PwaImageModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PwaAutoinputModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-autoinput';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PwaFloatbuttonModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-floatbutton';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { EventsComponent } from './events/events.component';
import { AgmCoreModule } from '@agm/core';
import {MatSelectModule} from '@angular/material/select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ErrorPageComponent,
    HomeComponent,
    LoginComponent,
    ToastComponent,
    ProfileComponent,
    DialogComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PwaHeaderModule,
    PwaCartModule,
    PwaCheckboxesModule,
    PwaImageModule,
    HttpClientModule,
    PwaFormModule,
    PwaAutoinputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    PwaFloatbuttonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcFpvV5mW2d5a1qLlo2noOkVQZgzpe4pw'
    }),
    /* Remove ServiceWorkerModule for normal Website Build */
    ServiceWorkerModule.register(environment.serviceWorkerScript, {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    } ,
    {
      provide : LocationStrategy,
      useClass : HashLocationStrategy
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
