import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService) {}
  
  private actions$ = inject(Actions);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ username, email, password }) =>
        this.authService.register({ username, email, password }).pipe(
          map(() => AuthActions.registerSuccess({ message: 'Registration successful!' })),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.status === 409 ? 'Username or email already registered' : 'Registration failed' }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => AuthActions.loginSuccess({ user: response.user, token: response.token, message: 'Login successful!' })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: 'Invalid email or password' }))
          )
        )
      )
    )
  );
}
