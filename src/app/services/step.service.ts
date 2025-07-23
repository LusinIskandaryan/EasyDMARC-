import { inject, Injectable, signal } from '@angular/core';

import { UserRegistrationStepEnum } from '../core/enums/user-registration-step.enum';
import { IndustryTypeEnum } from '../core/enums/industry-type.enum';
import { UserRoleEnum } from '../core/enums/user-role.enum';
import { UserData } from '../core/user-data.type';
import { matchPasswords } from '../validators/match-asswords.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { numberBetween } from '../validators/number-between.validator';
import { INavigationStep } from '../core/models/navigation-step.model';

@Injectable({
  providedIn: 'root',
})

export class StepService {
  private _formBuilder = inject(FormBuilder);
  step = signal(UserRegistrationStepEnum.Step1);
  userData = signal({
    email: '',
    password: '',
    confirmPassword: '',
    industry: null as unknown as IndustryTypeEnum,
    experienceInYears: null as unknown as number,
    yourRole: null as unknown as UserRoleEnum,
    aboutUs: '',
  });
  currentStepIndex = signal(0);
  firstStepForm = this._formBuilder.group({
      email: [ this.userData().email, [ Validators.required, Validators.email ] ],
      password: [ this.userData().password, Validators.required],
      confirmPassword: [ this.userData().confirmPassword, Validators.required],  
    },
    { validators: matchPasswords('password', 'confirmPassword') }
  );
  secondStepForm = this._formBuilder.group({
      industry: [this.userData().industry as IndustryTypeEnum | null, Validators.required],
      experienceInYears: [this.userData().experienceInYears as number | null, [Validators.required, numberBetween(0, 50)]],
      yourRole: [this.userData().yourRole as UserRoleEnum | null, Validators.required],
    });

  thirdStepForm = this._formBuilder.group({
    aboutUs: [this.userData().aboutUs, Validators.required],
  });
  steps: INavigationStep[] = [
      { label: 'Step1', id: 0, path: 'step1', stepControl: this.firstStepForm }, 
      { label: 'Step2', id: 1, path: 'step2', stepControl: this.secondStepForm },
      { label: 'Step3', id: 2, path: 'step3', stepControl: this.thirdStepForm },
    ];

  setStep(step: UserRegistrationStepEnum) {
    this.step.set(step);
  }

  setCurrentStepIndex(index: number): void {
    this.currentStepIndex.set(index);
  }

  updateUserStepData(data: UserData): void {
    this.userData.update((prev) => ({...prev, ...data}));
  }

}
