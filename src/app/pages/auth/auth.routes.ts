import { Routes } from '@angular/router';

import { checkStepGuard } from '../../guards/check-step.guard';
import { UserRegistrationStepEnum } from '../../core/enums/user-registration-step.enum';

export const authRoutes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./auth.component').then(m => m.AuthComponent),
        children: [
             {
                path: 'step1',
                loadComponent: () =>
                    import('./components/step1/step1.component').then((m) => m.Step1Component),
            },
            {
                path: 'step2',
                canActivate: [ checkStepGuard ],
                data: { step: UserRegistrationStepEnum.Step1 },
                loadComponent: () =>
                    import('./components/step2/step2.component').then((m) => m.Step2Component),
            },
            {
                path: 'step3',
                canActivate: [ checkStepGuard ],
                data: { step: UserRegistrationStepEnum.Step2 },
                loadComponent: () =>
                    import('./components/step3/step3.component').then((m) => m.Step3Component),
            },
            { 
                path: '', 
                redirectTo: 'step1', 
                pathMatch: 'full' },
        ],
        
    }
];
