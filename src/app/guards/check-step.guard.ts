import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { StepService } from '../services/step.service';
import { UserRegistrationStepEnum } from '../core/enums/user-registration-step.enum';

export const checkStepGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const stepService = inject(StepService);
  const requiredStep = route.data['step'] as UserRegistrationStepEnum;
  const step = stepService.step;
  const requiredStepItem = stepService.steps.find(el => el.label === requiredStep ) || stepService.steps[0];
  const stepItem = stepService.steps.find(el => el.label === step() ) || stepService.steps[0];

  if (requiredStepItem.id < stepItem.id || (requiredStepItem.id > stepItem.id && requiredStepItem.stepControl.valid)) {
    stepService.setCurrentStepIndex(requiredStepItem.id);
    stepService.setStep(requiredStep as UserRegistrationStepEnum);
  }

  if (step() !== requiredStep) {
    return router.navigate(['/step1']);
  }
    return true;
};
