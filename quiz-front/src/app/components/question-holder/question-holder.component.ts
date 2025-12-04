import { Component, OnDestroy, OnInit } from '@angular/core';
import { Answer, Question } from '../../models/question';
import { Observable, of, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadQuestions, nextQuestion, selectAnswer, skipQuestion } from '../../store/quiz-store/quiz.actions';
import { selectCurrentQuestion, selectScore, selectSelectedAnswer, selectShowResult, selectToggle } from '../../store/quiz-store/quiz.selector';
import { selectTimeLeft } from '../../store/timer-quiz-store/timer-quiz.selector';
import { startTimer, stopTimer } from '../../store/timer-quiz-store/timer-quiz.actions';
import { Router } from '@angular/router';
import { Highscore } from '../../models/highscores';
import { setHighscore } from '../../store/highscore-store/highscore.actions';
import { User } from '../../models/users';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-question-holder',
  templateUrl: './question-holder.component.html',
  styleUrl: './question-holder.component.css'
})
export class QuestionHolderComponent implements OnInit, OnDestroy {
  currentQuestion$: Observable<Question | null | undefined> = of();
  score$: Observable<number> = of();
  showResult$: Observable<boolean | null> = of();
  selectedAnswer$: Observable<Answer | null> = of();
  toggle$: Observable<Boolean> = of();
  timeLeft$: Observable<number> = of();
  subscriptions: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(stopTimer());
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
    this.store.dispatch(startTimer());
    this.currentQuestion$ = this.store.select(selectCurrentQuestion);
    this.score$ = this.store.select(selectScore);
    this.showResult$ = this.store.select(selectShowResult);
    this.selectedAnswer$ = this.store.select(selectSelectedAnswer);
    this.toggle$ = this.store.select(selectToggle);
    this.timeLeft$ = this.store.select(selectTimeLeft);

    this.subscriptions.add(this.timeLeft$.subscribe(timeLeft => {
      if (timeLeft <= 0) {
        this.onSkip();
      }
    }));

    this.subscriptions.add(this.showResult$.subscribe(showResult => {
      if (showResult) {
        this.handleHighscore();
      }
    }));
  }

  handleHighscore() {
    this.score$.subscribe(score => {
      const token = sessionStorage.getItem('token')
      if(token){
      const decodedToken = jwt_decode.jwtDecode(token);
        console.log(decodedToken);
        const user: User = {
          id :Number(decodedToken.sub),
          username: '',
          email: '',
          password: ''
        }
      const newHighscore: Highscore = {
        user,
        score,
        gameType: 'Ko zna zna'
      };
      this.store.dispatch(stopTimer()); 
      this.store.dispatch(setHighscore({ highscore: newHighscore }));
    }
    });
  }

  onAnswerSelected(answer: Answer): void {
    this.store.dispatch(stopTimer());
    this.toggle$.pipe(take(1)).subscribe(toggle => {
      if (toggle) {
        this.store.dispatch(selectAnswer({ answer }));

        // Move to the next question after a delay
        setTimeout(() => {
          this.store.dispatch(startTimer());
          this.store.dispatch(nextQuestion());
        }, 1500);
      }
    });
  }

  onSkip() {
    this.store.dispatch(stopTimer());
    this.toggle$.pipe(take(1)).subscribe(toggle => {
      if (toggle) {
        this.store.dispatch(skipQuestion());

        // Move to the next question after a delay
        setTimeout(() => {
          this.store.dispatch(startTimer());
          this.store.dispatch(nextQuestion());
        }, 1500);
      }
    });
  }

  restartGame() {
    this.store.dispatch(loadQuestions());
  }

  goToHighScores() {
      this.router.navigate(['/highscore']);
  }
}