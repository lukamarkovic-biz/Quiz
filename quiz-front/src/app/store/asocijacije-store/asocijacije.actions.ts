import { createAction, props } from "@ngrx/store";
import { AsocijacijaColumn, AsocijacijaGame } from "../../models/asocijacije";

export const loadAsocijaciju = createAction('[Asocijacjije] Load Asocijaciju');
export const loadAsocijacijuSuccess = createAction('[Asocijacije] Load Asicijaciju Success', props<{asocijacija: AsocijacijaGame}>());
export const loadAsocijacijuFailure = createAction('[Asocijacije] Load Asocijacije Failure', props<{ error: any }>());

export const revealTerm = createAction('[Asocijacije] Reveal Term', props<{columnId: string, termIndex: number}>());
export const updateUserInput = createAction('[Asocijacije] Update User Input',props<{ columnId: string; userInput: string }>());
export const checkUserInput = createAction('[Asocijacije] Check User Input');
export const endGame = createAction('[Asocijacije] End Asocijaciju')
