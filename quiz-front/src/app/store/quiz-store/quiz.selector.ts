import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionState, adapter } from "./quiz.reducer";
import * as QuizActions from './quiz.actions'


export const selectQuestionState = createFeatureSelector<QuestionState>('question');

export const selectQuestions = createSelector(
    selectQuestionState,
    (state) => state.ids
    .map(ids => state.entities[ids])
    .filter(state => !!state)
)

export const selectCurrentQuestionId = createSelector(
    selectQuestionState,
    (state) => state.currentQuestionId
)

export const selectCurrentQuestion = createSelector(
  selectQuestionState,
  selectCurrentQuestionId,
  (state, currentQuestionId) => !!currentQuestionId ? state.entities[currentQuestionId] : null
);

export const selectScore = createSelector(
    selectQuestionState,
    (state) => !!state.score ? state.score : 0
);

export const selectShowResult = createSelector(
    selectQuestionState,
    (state) => !!state.showResult ? state.showResult: null
);

export const selectSelectedAnswer = createSelector(
    selectQuestionState,
    (state) => !!state.selectedAnswer? state.selectedAnswer: null,
)

export const selectToggle = createSelector(
    selectQuestionState,
    (state) => state.toggle
)