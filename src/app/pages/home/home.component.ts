import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {MatCardModule} from '@angular/material/card';

import { UserService } from '../../services/user.service';
import { IndustryTypeEnum } from '../../core/enums/industry-type.enum';
import { UserRoleEnum } from '../../core/enums/user-role.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule
  ],
  providers: [
    UserService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private _userService = inject(UserService);
  private _destroyRef = inject(DestroyRef);
  user = signal({
    email: '',
    password: '',
    confirmPassword: '',
    industry: IndustryTypeEnum.marketing,
    experienceInYears: 0,
    yourRole: UserRoleEnum.developer,
    aboutUs: '',
  });

  ngOnInit(): void {
    this._userService.getUserData()
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(res => this.user.set(res))
  }

}
