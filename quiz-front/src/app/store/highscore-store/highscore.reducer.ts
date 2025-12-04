import { createReducer, on } from '@ngrx/store';
import * as HighscoreActions from './highscore.actions';
import { Highscore } from '../../models/highscores';

export interface HighscoreState {
  highscores: Highscore[];
}

export const initialState: HighscoreState = {
  highscores: [],
};

export const highscoreReducer = createReducer(
  initialState,
  on(HighscoreActions.loadHighscoresSuccess, (state, { highscores }) => ({
    highscores,
  })),
  on(HighscoreActions.setHighscoreSuccess, (state, { highscore }) => ({
    ...state,
    highscores: [...state.highscores, highscore], // Dodaj novi highscore
  })),
  on(HighscoreActions.setHighscoreFailure, (state, { error }) => ({
    ...state,
    error, // Postavi grešku
  })),
  on(HighscoreActions.setHighscoreSuccess, (state, { highscore }) => ({
    ...state,
    highscores: [...state.highscores, highscore], // Dodaj novi highscore
  }))
);
