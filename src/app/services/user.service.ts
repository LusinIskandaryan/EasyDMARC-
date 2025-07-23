import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { Observable, switchMap } from 'rxjs';

import { UserData } from '../core/user-data.type';
import { StepService } from './step.service';

@Injectable()

export class UserService {

  private _http = inject(HttpClient);
  private _stepService = inject(StepService);
  private _userData = toObservable(this._stepService.userData);
  private _url = '/data.json';

  getUserData(): Observable<UserData> { 
    return this._http.get<UserData>(this._url)
      .pipe(
        switchMap(() => this._userData)
      );
  }
}
