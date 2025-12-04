import { createAction, props } from "@ngrx/store";
import { Answer, Question } from "../../models/question";

export const loadQuestions = createAction('[Quiz] Load Questions');
export const loadQuestionsSuccess = createAction('[Quiz] Load Questions Success', props<{ questions: Question[] }>());
export const loadQuestionsFailure = createAction('[Quiz] Load Questions Failure', props<{ error: any }>());

export const selectAnswer = createAction('[Quiz] Select Answer', props<{ answer: Answer }>());
export const nextQuestion = createAction('[Quiz] Next Question');
export const completeQuiz = createAction('[Quiz] Complete Quiz');
export const skipQuestion = createAction('[Quiz] Skip Question')