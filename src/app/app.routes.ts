import { Routes } from '@angular/router';

import { checkStepGuard } from './guards/check-step.guard';
import { UserRegistrationStepEnum } from './core/enums/user-registration-step.enum';

export const routes: Routes = [
    { 
        path: '',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
    },
    { 
        path: 'home',
        canActivate: [ checkStepGuard ],
        data: { step: UserRegistrationStepEnum.Done },
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    }
];
