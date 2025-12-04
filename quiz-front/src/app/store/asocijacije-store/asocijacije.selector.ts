import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AsocijacijeState } from './asocijacije.reducer';

// Selektor za celokupno stanje "Asocijacija"
export const selectAsocijacijaState = createFeatureSelector<AsocijacijeState>('asocijacije');

// Selektor za dobijanje celokupne igre "Asocijacije"
export const selectAsocijacijaGame = createSelector(
  selectAsocijacijaState,
  (state: AsocijacijeState) => state.asocijacija
);

// Selektor za dobijanje kolona igre
export const selectColumns = createSelector(
  selectAsocijacijaGame,
  (game) => game.columns
);

// Selektor za dobijanje određene kolone prema njenom ID-u
export const selectColumnById = (columnId: string) =>
  createSelector(selectColumns, (columns) => columns.find(column => column.columnId === columnId));

// Selektor za dobijanje konačnog rešenja igre
export const selectFinalSolution = createSelector(
  selectAsocijacijaGame,
  (game) => game.finalSolution
);

// Selektor za proveru da li je konačno rešenje otkriveno
export const selectIsFinalRevealed = createSelector(
  selectAsocijacijaGame,
  (game) => game.finalSolution
);

export const selectUserInput = createSelector(
    selectAsocijacijaState,
    (state) => state.userInput
  );

export const selectEnableInput = createSelector(
    selectAsocijacijaState,
    (state) => state.enableInput
)

export const selectScore = createSelector(
  selectAsocijacijaState,
  (state) => state.score
)
