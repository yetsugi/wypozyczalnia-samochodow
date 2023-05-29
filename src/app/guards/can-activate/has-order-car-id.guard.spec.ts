import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasOrderCarIdGuard } from './has-order-car-id.guard';

describe('hasOrderCarIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasOrderCarIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
