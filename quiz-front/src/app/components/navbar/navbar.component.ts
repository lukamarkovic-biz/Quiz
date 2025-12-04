import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { logout } from '../../store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logout());
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']); // Preusmeri na login stranicu
  }
}
