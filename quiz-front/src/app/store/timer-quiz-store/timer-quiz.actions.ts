// timer.actions.ts
import { createAction, props } from '@ngrx/store';

export const startTimer = createAction('[Timer-Quiz] Start Timer');
export const tick = createAction('[Timer-Quiz] Tick');
export const stopTimer = createAction('[Timer-Quiz] Stop Timer');
export const timerExpired = createAction('[Timer-Quiz] Timer Expired');
