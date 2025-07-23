import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { StepService } from '../services/step.service';

export const checkStepGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const stepService = inject(StepService);
  const requiredStep = route.data['step'];
  const step = stepService.step();

  if (step && step === requiredStep) {
    return true;
  } else {
    return router.navigate(['step1']);
  }
};
