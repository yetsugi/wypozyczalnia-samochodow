import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

export const hasCompleteOrderGuard: CanActivateFn = (route, state) => {
  const orderService = inject(OrderService);
  const router = inject(Router);

  if (orderService.hasAllProperties()) {
    return true;
  }

  return router.parseUrl('/cars');
};
