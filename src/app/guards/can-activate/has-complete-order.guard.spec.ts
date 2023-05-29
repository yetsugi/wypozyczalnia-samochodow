import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasCompleteOrderGuard } from './has-complete-order.guard';

describe('hasCompleteOrderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasCompleteOrderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
