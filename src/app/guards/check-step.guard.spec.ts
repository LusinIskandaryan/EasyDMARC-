import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkStepGuard } from './check-step.guard';

describe('checkStepGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkStepGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
