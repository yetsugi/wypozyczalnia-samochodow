import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Cars from './views/cars/cars';
import * as Errors from './views/errors/errors';

import { IndexComponent } from './views/cars/index/index.component';
import { FormComponent } from './views/cars/form/form.component';
import { SummaryComponent } from './views/cars/summary/summary.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,

    Cars.IndexView,
    Cars.FormView,
    Cars.SummaryView,

    Errors.PageNotFoundView
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
