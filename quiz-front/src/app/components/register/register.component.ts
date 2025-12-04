import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register } from '../../store/auth-store/auth.actions';
import { selectAuthError, selectAuthSuccess } from '../../store/auth-store/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.errorMessage$ = this.store.select(selectAuthError);
    this.successMessage$ = this.store.select(selectAuthSuccess);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.store.dispatch(register({ username, email, password }));
    }

    this.successMessage$.subscribe(successMessage => {
      if (successMessage) {
        this.router.navigate(['/login']); // Preusmeri na login stranicu
      }
    });
  }
}
