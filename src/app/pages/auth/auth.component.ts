import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { INavigationStep } from '../../core/models/navigation-step.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
  steps: INavigationStep[] = [
    { label: 'Step1', id: 0, path: 'step1' }, 
    { label: 'Step2', id: 1, path: 'step2' },
    { label: 'Step3', id: 2, path: 'step3' },
  ];

  currentStep = signal(0);

  navigate(event: StepperSelectionEvent): void {
    const nextStep = event.selectedIndex;
    this.currentStep.set(event.selectedIndex);
    const url = this.steps.find(el => el.id === nextStep)?.path;
    this._router.navigate([url]);
  }

}
