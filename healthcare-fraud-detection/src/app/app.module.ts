import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ModelInfoComponent } from './model-info/model-info.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';
import { FraudDetectorComponent } from './fraud-detector/fraud-detector.component';
// import { FindIdComponent } from './home/get-id-button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModelInfoComponent,
    TeamComponent,
    LoginComponent,
    CreateAccountComponent,
    FraudDetectorComponent
    // FindIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
