import { createReducer, on } from '@ngrx/store';
import * as TimerActions from './timer-asocijacije.actions';

export interface TimerAsocijacijeState {
  timeLeft: number;
  isRunning: boolean;
}

export const initialQuizState: TimerAsocijacijeState = {
  timeLeft: 120,
  isRunning: false,
};

export const timerAsocijacijeReducer = createReducer(
  initialQuizState,
  on(TimerActions.startTimer, (state) => ({
    ...state,
    isRunning: true,
    timeLeft: 120,
  })),
  on(TimerActions.tick, (state) => ({
    ...state,
    timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
  })),
  on(TimerActions.stopTimer, (state) => ({
    ...state,
    isRunning: false,
  })),
  on(TimerActions.timerExpired, (state) => ({
    ...state,
    isRunning: false,
    timeLeft: 0,
  })),
);
