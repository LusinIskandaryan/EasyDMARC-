import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StepService } from '../../../../services/step.service';
import { UserRegistrationStepEnum } from '../../../../core/enums/user-registration-step.enum';
import { UserData } from '../../../../core/user-data.type';
import { matchPasswords } from '../../../../validators/match-asswords.validator';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _stepService = inject(StepService);

  form = this._formBuilder.group({
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],  
  },
  { validators: matchPasswords('password', 'confirmPassword') }
);

  ngOnInit(): void {
    this.form.patchValue(this._stepService.userData());
  }

  navigate(event: MouseEvent): void {
    event.stopPropagation();
    if (this.form.valid) {
      const formValue = this.form.value as UserData;
      this._stepService.setStep(UserRegistrationStepEnum.Step1);
      this._stepService.createStep(formValue);
      this._router.navigate(['step2']);
    }
  }

}
