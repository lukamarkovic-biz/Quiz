import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Highscore } from '../../models/highscores';
import { selectHighscores } from '../../store/highscore-store/highscore.selector';
import { loadHighscores } from '../../store/highscore-store/highscore.actions';


@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrls: ['./highscore-list.component.css']
})
export class HighscoreListComponent implements OnInit {
  highscores$: Observable<Highscore[]> = of([]);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadHighscores());
    this.highscores$ = this.store.select(selectHighscores);
  }
}
