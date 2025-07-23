import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { industries } from '../../../../core/consts/industry-types';
import { roles } from '../../../../core/consts/role-types';
import { numberBetween } from '../../../../validators/number-between.validator';
import { UserRegistrationStepEnum } from '../../../../core/enums/user-registration-step.enum';
import { StepService } from '../../../../services/step.service';
import { UserData } from '../../../../core/user-data.type';
import { IndustryTypeEnum } from '../../../../core/enums/industry-type.enum';
import { UserRoleEnum } from '../../../../core/enums/user-role.enum';


@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _stepService = inject(StepService);
  industries = industries;
  roles = roles;

  form = this._formBuilder.group({
      industry: [IndustryTypeEnum.marketing, Validators.required],
      experienceInYears: [0, [Validators.required, numberBetween(0, 50)]],
      yourRole: [UserRoleEnum.developer, Validators.required],
    });

    ngOnInit(): void {
      this.form.patchValue(this._stepService.userData());
    }
  
    navigate(event: MouseEvent): void {
      event.stopPropagation();
      if (this.form.valid) {
        const formValue = this.form.value as unknown as UserData;
        this._stepService.setStep(UserRegistrationStepEnum.Step2);
        this._stepService.createStep(formValue);
        this._router.navigate(['step3']);
      }
    }

    navigateBack(event: MouseEvent): void {
      this.form.reset();
      event.stopPropagation();
      this._stepService.setStep(UserRegistrationStepEnum.Step1);
      this._router.navigate(['step1']);
    }

}
