// timer.actions.ts
import { createAction, props } from '@ngrx/store';

export const startTimer = createAction('[Timer-Asocijacije] Start Timer');
export const tick = createAction('[Timer-Asocijacije] Tick');
export const stopTimer = createAction('[Timer-Asocijacije] Stop Timer');
export const timerExpired = createAction('[Timer-Asocijacije] Timer Expired');
