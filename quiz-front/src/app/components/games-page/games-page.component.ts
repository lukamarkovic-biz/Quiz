import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrl: './games-page.component.css'
})
export class GamesPageComponent {
  constructor(private router: Router  ) {}

  goToKoznaZna() {
    this.router.navigate(['/games/koznazna']);
  }

  goToAsocijacije() {
    this.router.navigate(['/games/asocijacije']);
  }
}
