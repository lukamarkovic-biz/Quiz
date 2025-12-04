import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AsocijacijaColumn, AsocijacijaTerm } from '../../models/asocijacije';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { revealTerm, updateUserInput } from '../../store/asocijacije-store/asocijacije.actions';
import { filter, map, Observable, of, Subscription } from 'rxjs';
import { selectUserInput } from '../../store/asocijacije-store/asocijacije.selector';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit, OnDestroy{
  @Input() column: AsocijacijaColumn | null = null;
  @Input() enableInput: boolean | null = null;

  private subscription: Subscription = new Subscription();
  userSolution: string = '';

  constructor(private store : Store<AppState>) { }

  ngOnInit() {
  this.store.select(selectUserInput)
  .pipe(
    filter(userInput => !!userInput.columnId || userInput.columnId === null),
    map(userInput => userInput.columnId === this.column?.columnId ? userInput.input : ''),
  )
  .subscribe(userInputValue => {
    this.userSolution = userInputValue;
  });
}

  reveal(term: AsocijacijaTerm) {
    if(this.column){
      const id = this.column.terms.findIndex((oldTerm) => term === oldTerm);
      this.store.dispatch(revealTerm({columnId: this.column.columnId, termIndex: id}))
    }   
  }

  onSolutionInputChange(value: string) {
    const userInput = value;
    if (this.column) {
      this.store.dispatch(updateUserInput({ columnId: this.column.columnId, userInput: userInput }));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if(this.column)
    this.store.dispatch(updateUserInput({ columnId: this.column.columnId, userInput: value }));
  }

  isDisabled() {
    if(this.column)
      return !(this.column.enableInput && this.enableInput);
    return true;
  }
}
