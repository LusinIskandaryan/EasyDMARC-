import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { industries } from '../../../../core/consts/industry-types';
import { roles } from '../../../../core/consts/role-types';
import { StepService } from '../../../../services/step.service';


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
export class Step2Component {

  private _stepService = inject(StepService);
  industries = industries;
  roles = roles;
  form = this._stepService.secondStepForm;

}
