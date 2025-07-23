import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserRegistrationStepEnum } from '../../../../core/enums/user-registration-step.enum';
import { StepService } from '../../../../services/step.service';
import { UserData } from '../../../../core/user-data.type';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _stepService = inject(StepService);
  
  form = this._formBuilder.group({
    aboutUs: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue(this._stepService.userData());
  }
    
  navigate(event: MouseEvent): void {
    event.stopPropagation();
    if (this.form.valid) {
      const formValue = this.form.value as unknown as UserData;
      this._stepService.setStep(UserRegistrationStepEnum.Step3);
      this._stepService.createStep(formValue);
      this._router.navigate(['/home']);
    }
  }
  
  navigateBack(event: MouseEvent): void {
    this.form.reset();
    event.stopPropagation();
    this._stepService.setStep(UserRegistrationStepEnum.Step2);
    this._router.navigate(['step2']);
  }

}
