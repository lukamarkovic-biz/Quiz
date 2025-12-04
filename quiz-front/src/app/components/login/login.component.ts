import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { selectAuthError, selectAuthSuccess } from '../../store/auth-store/auth.selector';
import { login } from '../../store/auth-store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.errorMessage$ = this.store.select(selectAuthError);
    this.successMessage$ = this.store.select(selectAuthSuccess);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ email, password }));
    }

    this.successMessage$.subscribe(successMessage => {
      if (successMessage === 'Login successful!') {
        this.router.navigate(['/games']); // Preusmeri na login stranicu
      }
    });
  }
}
