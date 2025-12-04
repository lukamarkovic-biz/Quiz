import { createAction, props } from '@ngrx/store';
import { Highscore } from '../../models/highscores';

// Akcija za učitavanje highscores
export const loadHighscores = createAction('[Highscore] Load Highscores');

// Akcija za uspešno učitavanje highscores
export const loadHighscoresSuccess = createAction(
  '[Highscore] Load Highscores Success',
  props<{ highscores: Highscore[]}>()
);

// Akcija za neuspešno učitavanje highscores
export const loadHighscoresFailure = createAction(
  '[Highscore] Load Highscores Failure',
  props<{ error: string }>()
);

export const setHighscore = createAction(
    '[Highscore] Set Highscore',
    props<{ highscore: Highscore }>()
  );
  
  export const setHighscoreSuccess = createAction(
    '[Highscore] Set Highscore Success',
    props<{ highscore: Highscore }>()
  );
  
  export const setHighscoreFailure = createAction(
    '[Highscore] Set Highscore Failure',
    props<{ error: any }>()
  );
