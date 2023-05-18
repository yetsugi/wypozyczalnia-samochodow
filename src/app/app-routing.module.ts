import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as Cars from './views/cars/cars';
import * as Errors from './views/errors/errors';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cars',
  },
  {
    path: 'cars',
    title: getPageTitle('Samochody'),
    component: Cars.IndexView,
  },
  {
    path: 'cars/form',
    title: getPageTitle('Formularz'),
    component: Cars.FormView,
  },
  {
    path: 'cars/summary',
    title: getPageTitle('Podsumowanie'),
    component: Cars.SummaryView,
  },
  {
    path: '**',
    title: getPageTitle('404'),
    component: Errors.PageNotFoundView,
  },
];

function getPageTitle(page: string): string {
  return `${page} | Wypożyczalnia samochodów`;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
