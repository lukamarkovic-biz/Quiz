import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, interval } from 'rxjs';
import { switchMap, takeUntil, map, take, filter } from 'rxjs/operators';
import * as TimerActions from './timer-quiz.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class TimerEffects {
    actions$ = inject(Actions)
    store = inject(Store)
 startTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimerActions.startTimer),
      switchMap(() =>
        interval(1000).pipe(
          map(() => TimerActions.tick()),
          takeUntil(this.actions$.pipe(ofType(TimerActions.stopTimer, TimerActions.timerExpired)))
        )
      )
    )
  );

  timerExpired$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TimerActions.tick),
        switchMap(() =>
            // Use the store to get the current state
            this.store.select('timerQuiz').pipe(
                take(1),
                map((state) => {
                    if (state.timeLeft <= 0) {
                        return TimerActions.timerExpired();
                    }
                    return null;
                }),
                filter(action => action !== null) // Only emit if it's not null
            )
        )
    )
);


}
