import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { INavigationStep } from '../../core/models/navigation-step.model';
import { StepService } from '../../services/step.service';
import { UserRegistrationStepEnum } from '../../core/enums/user-registration-step.enum';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    MatStepperModule,
    MatIconModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private _router = inject(Router);
  private _stepService = inject(StepService);
  steps: INavigationStep[] = this._stepService.steps;

  currentStep = this._stepService.currentStepIndex;

  navigate(event: StepperSelectionEvent): void {
    const { selectedIndex, previouslySelectedIndex } = event;
    const nextStep = this.steps.find(el => el.id === selectedIndex) || this.steps[0];
    const prevStep = this.steps.find(el => el.id === previouslySelectedIndex ) || this.steps[0];
    if (prevStep.stepControl.valid || prevStep.id > nextStep.id) {
      this._stepService.setCurrentStepIndex(event.selectedIndex);
      this._stepService.setStep(nextStep.label as UserRegistrationStepEnum)
      this._router.navigate([nextStep.path]);
    }
  }

}
