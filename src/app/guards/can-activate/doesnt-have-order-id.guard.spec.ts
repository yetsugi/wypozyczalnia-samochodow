import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { doesntHaveOrderIdGuard } from './doesnt-have-order-id.guard';

describe('doesntHaveOrderIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => doesntHaveOrderIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
