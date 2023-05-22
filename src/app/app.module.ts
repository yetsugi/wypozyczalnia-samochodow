import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Cars from './views/cars/cars';
import * as Errors from './views/errors/errors';

@NgModule({
  declarations: [
    AppComponent,

    Cars.IndexView,
    Cars.FormView,
    Cars.SummaryView,

    Errors.PageNotFoundView,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
