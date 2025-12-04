import { createReducer, on } from "@ngrx/store";
import { Answer, Question } from "../../models/question";
import {createEntityAdapter, EntityState} from "@ngrx/entity"
import * as QuizActions from "./quiz.actions"


export interface QuestionState extends EntityState<Question> {
    currentQuestionId: string | number | null;
    score: number;
    selectedAnswer: Answer | null;
    showResult: boolean;
    toggle: boolean;
}

export const adapter = createEntityAdapter<Question>();

export const initialState : QuestionState = adapter.getInitialState({
    currentQuestionId: null,
    score: 0,
    selectedAnswer: null,
    showResult: false,
    toggle: true,
});

export const questionsReducer = createReducer(
    initialState,
    on(QuizActions.loadQuestionsSuccess, (state, { questions }) =>
        adapter.setAll(questions, {
          ...state,
          score: 0,
          currentQuestionId: questions.length > 0 ? questions[Math.floor(Math.random() * questions.length)].id : null,
          showResult: false,
          toggle: true,
        })
      ),
      
      // Akcija za izbor odgovora
      on(QuizActions.selectAnswer, (state, { answer }) => {
        const newScore = state.score + (answer.isCorrect ? 10 : -5);
        return {
          ...state,
          selectedAnswer: answer,
          score: newScore,
          toggle: false, // Postavljamo toggle na false nakon izbora odgovora
        };
      }),
    
      // Akcija za prelazak na sledeće pitanje
      on(QuizActions.nextQuestion, (state) => {
        const remainingQuestionIds = state.ids.filter(id => id !== state.currentQuestionId) as number[];
        const nextQuestionId = remainingQuestionIds.length > 0 ? remainingQuestionIds[Math.floor(Math.random() * remainingQuestionIds.length)] : null;
    
        return {
          ...state,
          ids: remainingQuestionIds,
          currentQuestionId: nextQuestionId,
          selectedAnswer: null,
          toggle: true,
          showResult: remainingQuestionIds.length === 0,
        };
      }),

      on(QuizActions.skipQuestion, (state) => {
        if(!state.currentQuestionId)
          return state;

        const currentQuestion = state.entities[state.currentQuestionId];
        if (currentQuestion) {
          const correctAnswer = currentQuestion.answers.find(answer => answer.isCorrect) || null;
          return {
            ...state,
            selectedAnswer: correctAnswer,
            toggle: false,
          };
        }
    
        return state;
      }),
)