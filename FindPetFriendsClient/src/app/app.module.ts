import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PwaHeaderModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-header';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaCartModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-cart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PwaFormModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-form';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { ProfileComponent } from './profile/profile.component';
import { PwaCheckboxesModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-checkboxes';
import { PwaImageModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-image';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PwaAutoinputModule } from '@bit/cagdas.pwaextendedcomponentscollection.pwa-autoinput';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ErrorPageComponent,
    HomeComponent,
    LoginComponent,
    ToastComponent,
    ProfileComponent
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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
