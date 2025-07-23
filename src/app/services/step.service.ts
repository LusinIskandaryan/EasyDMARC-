import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserRegistrationStepEnum } from '../core/enums/user-registration-step.enum';
import { IndustryTypeEnum } from '../core/enums/industry-type.enum';
import { UserRoleEnum } from '../core/enums/user-role.enum';
import { UserData } from '../core/user-data.type';

@Injectable({
  providedIn: 'root',
})

export class StepService {
  step = signal('');
  userData = signal({
    email: '',
    password: '',
    confirmPassword: '',
    industry: IndustryTypeEnum.marketing,
    experienceInYears: 0,
    yourRole: UserRoleEnum.developer,
    aboutUs: '',
  });

  setStep(step: UserRegistrationStepEnum) {
    this.step.set(step);
  }

  createStep(data: UserData): Observable<UserData> {
    this.userData.update((prev) => ({...prev, ...data}));
    return of(data);
  }

}
