import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';


// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    RegisterComponent
      ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
