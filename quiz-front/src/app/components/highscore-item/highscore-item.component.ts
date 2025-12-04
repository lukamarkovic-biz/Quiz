import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-highscore-item',
  templateUrl: './highscore-item.component.html',
  styleUrl: './highscore-item.component.css'
})
export class HighscoreItemComponent {
  @Input() username: string = '';
  @Input() type: string = '';
  @Input() score: number = 0;
}
