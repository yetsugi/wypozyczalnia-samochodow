import '@angular/common/locales/global/pl';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { IndexComponent as CarsIndexView } from './views/cars/index/index.component';
import { FormComponent as CarsFormView } from './views/cars/form/form.component';
import { SummaryComponent as CarsSummaryView } from './views/cars/summary/summary.component';
import { PageNotFoundComponent as ErrorsPageNotFoundView } from './views/errors/page-not-found/page-not-found.component';

import { ListComponent as CarsListComponent } from './views/components/cars/list/list.component';

@NgModule({
  declarations: [
    AppComponent,

    CarsIndexView,
    CarsFormView,
    CarsSummaryView,

    ErrorsPageNotFoundView,

    CarsListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'zł' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
