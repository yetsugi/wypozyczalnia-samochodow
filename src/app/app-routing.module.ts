import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent as CarsIndexView } from './views/cars/index/index.component';
import { FormComponent as CarsFormView } from './views/cars/form/form.component';
import { SummaryComponent as CarsSummaryView } from './views/cars/summary/summary.component';
import { PageNotFoundComponent as ErrorsPageNotFoundView } from './views/errors/page-not-found/page-not-found.component';

import { hasOrderCarIdGuard } from './guards/can-activate/has-order-car-id.guard';
import { hasCompleteOrderGuard } from './guards/can-activate/has-complete-order.guard';
import { doesntHaveOrderIdGuard } from './guards/can-activate/doesnt-have-order-id.guard';

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
    path: 'cars/form',
    title: getPageTitle('Formularz'),
    component: CarsFormView,
    canActivate: [hasOrderCarIdGuard, doesntHaveOrderIdGuard],
  },
  {
    path: 'cars/summary',
    title: getPageTitle('Podsumowanie'),
    component: CarsSummaryView,
    canActivate: [hasCompleteOrderGuard],
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
