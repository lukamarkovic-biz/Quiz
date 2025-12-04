import { createReducer, on } from "@ngrx/store";
import { AsocijacijaGame } from "../../models/asocijacije";
import * as AsocijacijeActions from "./asocijacije.actions"
import { booleanAttribute } from "@angular/core";



export interface AsocijacijeState{
    asocijacija: AsocijacijaGame,
    enableInput: boolean,
    enableReveal: boolean,
    revealAll: boolean,
    score: number,
    userInput: {
        columnId: string | null,
        input: string
    }
}

export const initialState: AsocijacijeState = {
    asocijacija: {} as AsocijacijaGame,
      enableInput: false,
      enableReveal: false,
      revealAll: false,
      score: 0,
      userInput:{
        columnId: '',
        input: '',
      }
};

export const asocijacijeReducer = createReducer(
    initialState,
    on(AsocijacijeActions.loadAsocijacijuSuccess, (state, { asocijacija }) => ({
        ...state,
        asocijacija,
        score: 0
      })),
    
      on(AsocijacijeActions.loadAsocijacijuSuccess, (state, { asocijacija }) => {
        const updatedColumns = asocijacija.columns.map(column => ({
          ...column,
          points: 25 // Ovde postavljamo fiksnu vrednost poena
        }));
      
        return {
          ...state,
          asocijacija: {
            ...asocijacija,
            columns: updatedColumns,
          },
        };
      }),

    on(AsocijacijeActions.revealTerm, (state, { columnId, termIndex }) => {
        const updatedColumns = state.asocijacija.columns.map((column) => {
          if (column.columnId === columnId) {
            const updatedTerms = column.terms.map((term, index) =>
              index === termIndex ? { ...term, isRevealed: true } : term
            );
            return { ...column, terms: updatedTerms, enableInput: true, points: column.points - 5};
          }
          return column;
        });
      
        return {
          ...state,
          enableInput: true,
          asocijacija: {
            ...state.asocijacija,
            columns: updatedColumns
          },
        };
      }),
      on(AsocijacijeActions.updateUserInput, (state, { columnId, userInput }) => ({
        ...state,
        userInput: {
          columnId,
          input: userInput
        }
      })),
    
      // Provera unosa korisnika na osnovu tačnog rešenja
      on(AsocijacijeActions.checkUserInput, (state) => {
        const { columnId, input } = state.userInput;
        if (columnId) {
            if(columnId == 'asocijacija'){
                const isCorrect = state.asocijacija.finalSolution.toLowerCase() == input.toLowerCase();
                const updatedColumns = state.asocijacija.columns.map((column) => {
                    const revealedTerms = column.terms.map(term => ({
                            ...term,
                            isRevealed: true
                          }));
                      return {
                        ...column,
                        isRevealed: true,
                        enableInput: false,
                        terms: revealedTerms
                    }
                  });
                const pointsToAdd = updatedColumns.reduce((accumulator, column) => {
                  return accumulator + column.points;
                }, 0) + 5;                
                return {
                    ...state,
                    asocijacija:{
                        ...state.asocijacija,
                        columns: isCorrect? updatedColumns : state.asocijacija.columns,
                        isRevealed: isCorrect,
                    },
                    revealAll : isCorrect,
                    enableInput: isCorrect,
                    score: state.score + (isCorrect? pointsToAdd: 0)
                }
            }
            const pointsToAdd = state.asocijacija.columns.find(column => column.columnId === columnId)?.points || 0;
          const updatedColumns = state.asocijacija.columns.map((column) => {
            if (column.columnId === columnId && column.solution.toLowerCase() === input.toLowerCase()) {
                const revealedTerms = column.terms.map(term => ({
                    ...term,
                    isRevealed: true
                  }));
              return {
                ...column,
                isRevealed: true,
                enableInput: false,
                terms: revealedTerms,
                points: 0,
              };
            }
            return column;
          });
          const isMatching = updatedColumns.some(column => column.columnId === columnId && column.isRevealed)
          const isFinalMatching = state.asocijacija.enableInput || isMatching
          return {
            ...state,
            asocijacija: {
              ...state.asocijacija,
              columns: updatedColumns,
              enableInput: isFinalMatching
            },
            userInput: {
              columnId: null,
              input: '',
            },
            enableInput: isMatching,
            score: isMatching? (state.score + pointsToAdd) : state.score,
          };
        }
        return state;
      }),
      on(AsocijacijeActions.endGame, (state) => {
        const updatedColumns = state.asocijacija.columns.map((column) => {
          const revealedTerms = column.terms.map(term => ({
                  ...term,
                  isRevealed: true
                }));
            return {
              ...column,
              isRevealed: true,
              enableInput: false,
              terms: revealedTerms
          }
        })
        return {
          ...state,
          asocijacija:{
            ...state.asocijacija,
            columns:updatedColumns,
            isRevealed: true
          },
          revealAll: true,
        }
      })
);