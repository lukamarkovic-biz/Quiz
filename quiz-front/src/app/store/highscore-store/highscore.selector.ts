import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HighscoreState } from './highscore.reducer';

export const selectHighscoreState = createFeatureSelector<HighscoreState>('highscores');

export const selectHighscores = createSelector(
  selectHighscoreState,
  (state: HighscoreState) => state.highscores // Pretpostavljamo da je 'highscores' niz objekata { username, type, score }
);
