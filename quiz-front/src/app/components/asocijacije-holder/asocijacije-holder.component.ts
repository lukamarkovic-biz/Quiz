import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AsocijacijaColumn, AsocijacijaGame } from '../../models/asocijacije';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAsocijacijaGame, selectColumns, selectEnableInput, selectFinalSolution, selectScore, selectUserInput } from '../../store/asocijacije-store/asocijacije.selector';
import { filter, map, Observable, of, Subscription } from 'rxjs';
import { checkUserInput, endGame, loadAsocijaciju, updateUserInput } from '../../store/asocijacije-store/asocijacije.actions';
import { Router } from '@angular/router';
import { selectTimeLeft } from '../../store/timer-asocijacije-store/timer-asocijacije.selector';
import { startTimer, stopTimer } from '../../store/timer-asocijacije-store/timer-asocijacije.actions';
import { Highscore } from '../../models/highscores';
import { setHighscore } from '../../store/highscore-store/highscore.actions';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../models/users';

@Component({
  selector: 'app-asocijacije-holder',
  templateUrl: './asocijacije-holder.component.html',
  styleUrl: './asocijacije-holder.component.css'
})
export class AsocijacijeHolderComponent implements OnInit, OnDestroy {
  enableInput$: Observable<boolean> = of(false);
  columns$: Observable<AsocijacijaColumn[]> = of([]);
  userFinalInput: string = '';
  asocijacija$: Observable<AsocijacijaGame> = of();
  enableFinalInput: boolean = false;
  score$: Observable<number> = of();
  timeLeft$: Observable<number> = of();
  subscriptions: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadAsocijaciju());
    this.enableInput$ = this.store.select(selectEnableInput);
    this.asocijacija$ = this.store.select(selectAsocijacijaGame);
    this.score$ = this.store.select(selectScore);
    this.timeLeft$ = this.store.select(selectTimeLeft);
    this.store.dispatch(startTimer());

    const userInput$ = this.store.select(selectUserInput).pipe(
      filter(userInput => !!userInput.columnId || userInput.columnId === null),
      map(userInput => {
        this.userFinalInput = "";
        return userInput.columnId === 'asocijacija' ? userInput.input : '';
      })
    );

    const timeLeft$ = this.timeLeft$.pipe(
      filter(timeLeft => timeLeft <= 0),
      map(() => this.onTimeExpired())
    );

    const asocijacijaSubscription = this.asocijacija$.subscribe(asocijacija => {
      if (asocijacija.isRevealed) {
        const token = sessionStorage.getItem('token');
        if(token){
        const decodedToken = jwt_decode.jwtDecode(token);
        console.log(decodedToken);
        const user: User = {
          id :Number(decodedToken.sub),
          username: '',
          email: '',
          password: ''
        }
        this.score$.subscribe(score => {
          const newHighscore: Highscore = {
            score: score,
            user: user,
            gameType: 'Asocijacije'
          };
          this.store.dispatch(stopTimer())
          this.store.dispatch(setHighscore({ highscore: newHighscore }));
        });
      }
        }
    });

    this.subscriptions.add(userInput$.subscribe(userInputValue => {
      this.userFinalInput = userInputValue;
    }));

    this.subscriptions.add(timeLeft$.subscribe());
    this.subscriptions.add(asocijacijaSubscription);
  }

  submitSolution() {
    this.store.dispatch(checkUserInput());
    this.asocijacija$.subscribe(asocijacija => this.enableFinalInput = asocijacija.enableInput);
    this.userFinalInput = '';
  }

  onInputChange(value: string) {
    this.store.dispatch(updateUserInput({ columnId: 'asocijacija', userInput: value }));
  }

  restartGame() {
    this.store.dispatch(loadAsocijaciju());
    this.store.dispatch(startTimer());
  }

  goToHighScores() {
    this.router.navigate(['/highscore']);
  }

  onTimeExpired() {
    this.store.dispatch(endGame());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.store.dispatch(stopTimer()); // Oslobodi sve pretplate kada komponenta bude uništena
  }
}