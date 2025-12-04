import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HighscoreActions from './highscore.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HighscoreService } from '../../services/highscore-service/highscore.service';

@Injectable()
export class HighscoreEffects {
  constructor(private highscoreService: HighscoreService) {}
  private actions$ = inject(Actions)  

  loadHighscores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HighscoreActions.loadHighscores),
      mergeMap(() =>
        this.highscoreService.getHighscores().pipe(
          map((highscores) =>
            HighscoreActions.loadHighscoresSuccess({ highscores })
          ),
          catchError((error) =>
            of(HighscoreActions.loadHighscoresFailure({ error: error.message }))
          )
        )
      )
    )
  );
  setHighscore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HighscoreActions.setHighscore),
      mergeMap(action =>
        this.highscoreService.setHighscore(action.highscore).pipe(
          map(highscore => HighscoreActions.setHighscoreSuccess({ highscore })),
          catchError(error => of(HighscoreActions.setHighscoreFailure({ error })))
        )
      )
    )
  );
}
