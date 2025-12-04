import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadAsocijaciju, loadAsocijacijuSuccess, loadAsocijacijuFailure } from './asocijacije.actions';
import { AsocijacijeService } from '../../services/asocijacije-service/asocijacije.service';

@Injectable()
export class AsocijacijeEffects {
  constructor(
    private asocijacijeService: AsocijacijeService
  ) {}

  actions$ = inject(Actions);

  loadAsocijacije$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAsocijaciju),
      mergeMap(() =>
        this.asocijacijeService.getAsocijacija().pipe(
          map(asocijacija => loadAsocijacijuSuccess({ asocijacija })),
          catchError(error => of(loadAsocijacijuFailure({ error })))
        )
      )
    )
  );
}
