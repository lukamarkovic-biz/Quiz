import { createReducer, on } from '@ngrx/store';
import * as TimerActions from './timer-quiz.actions';

export interface TimerQuizState {
  timeLeft: number;
  isRunning: boolean;
}

export const initialQuizState: TimerQuizState = {
  timeLeft: 10,
  isRunning: false,
};

export const timerQuizReducer = createReducer(
  initialQuizState,
  on(TimerActions.startTimer, (state) => ({
    ...state,
    isRunning: true,
    timeLeft: 10,
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
