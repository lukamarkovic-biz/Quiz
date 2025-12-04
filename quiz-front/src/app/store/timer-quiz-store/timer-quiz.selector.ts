import { createSelector, createFeatureSelector } from '@ngrx/store';
import { timerQuizReducer, TimerQuizState } from './timer-quiz.reducer';

// Selektor za izdvajanje celog stanja tajmera
export const selectTimerState = createFeatureSelector<TimerQuizState>('timerQuiz');

// Selektor za izdvajanje vremena koje je preostalo
export const selectTimeLeft = createSelector(
  selectTimerState,
  (state: TimerQuizState) => state.timeLeft
);

// Selektor za izdvajanje statusa da li tajmer radi
export const selectIsRunning = createSelector(
  selectTimerState,
  (state: TimerQuizState) => state.isRunning
);
