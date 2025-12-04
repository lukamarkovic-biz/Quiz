import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TimerAsocijacijeState } from './timer-asocijacije.reducer';

// Selektor za izdvajanje celog stanja tajmera
export const selectTimerState = createFeatureSelector<TimerAsocijacijeState>('timerAsocijacije');

// Selektor za izdvajanje vremena koje je preostalo
export const selectTimeLeft = createSelector(
  selectTimerState,
  (state: TimerAsocijacijeState) => state.timeLeft
);

// Selektor za izdvajanje statusa da li tajmer radi
export const selectIsRunning = createSelector(
  selectTimerState,
  (state: TimerAsocijacijeState) => state.isRunning
);
