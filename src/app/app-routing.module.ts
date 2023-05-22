import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent as CarsIndexView } from './views/cars/index/index.component';
import { FormComponent as CarsFormView } from './views/cars/form/form.component';
import { SummaryComponent as CarsSummaryView } from './views/cars/summary/summary.component';
import { PageNotFoundComponent as ErrorsPageNotFoundView } from './views/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cars',
  },
  {
    path: 'cars',
    title: getPageTitle('Samochody'),
    component: CarsIndexView,
  },
  {
    path: 'cars/:id/form',
    title: getPageTitle('Formularz'),
    component: CarsFormView,
  },
  {
    path: 'cars/summary',
    title: getPageTitle('Podsumowanie'),
    component: CarsSummaryView,
  },
  {
    path: '**',
    title: getPageTitle('404'),
    component: ErrorsPageNotFoundView,
  },
];

function getPageTitle(page: string): string {
  return `${page} | Wypożyczalnia samochodów`;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
