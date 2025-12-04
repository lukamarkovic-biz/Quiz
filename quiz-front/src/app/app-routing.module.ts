import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { KoznaznaPageComponent } from './components/koznazna-page/koznazna-page.component';
import { AsocijacijePageComponent } from './components/asocijacije-page/asocijacije-page.component';
import { HighscorePageComponent } from './components/highscore-page/highscore-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './components/guards/auth.guard';
import { HighscoreListComponent } from './components/highscore-list/highscore-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games', component: GamesPageComponent, canActivate: [AuthGuard] },
  { path:'games/koznazna', component: KoznaznaPageComponent, canActivate: [AuthGuard]},
  { path:'games/asocijacije', component: AsocijacijePageComponent, canActivate: [AuthGuard]},
  { path:'highscore', component: HighscoreListComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
