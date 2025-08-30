import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Common } from '../common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _commonService: Common, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this._commonService.checkAuth().pipe(
      map((res) => true),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
