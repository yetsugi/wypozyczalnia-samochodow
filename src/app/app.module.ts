import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/cars/index/index.component';
import { FormComponent } from './views/cars/form/form.component';
import { SummaryComponent } from './views/cars/summary/summary.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FormComponent,
    SummaryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
