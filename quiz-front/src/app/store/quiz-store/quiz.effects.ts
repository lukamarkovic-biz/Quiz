import { inject, Injectable } from "@angular/core";
import { QuizService } from "../../services/quiz-service/quiz.service";
import * as QuizAcions from "./quiz.actions"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable() 
export class QuizEffects {
    constructor(private quizService: QuizService) {}
    action$ = inject(Actions);
    loadQuestions$ = createEffect(() => 
    this.action$.pipe(
        ofType(QuizAcions.loadQuestions),
        mergeMap(() =>
            this.quizService.getAll().pipe(
                map((questions) => QuizAcions.loadQuestionsSuccess({questions})),
                catchError(() => of({type: 'loadError'}))
            )
        )
    ));
}