import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsocijacijaTerm } from '../../models/asocijacije';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrl: './term.component.css'
})
export class TermComponent {
  @Input() term : AsocijacijaTerm | null = null;
  @Output() termRevealed = new EventEmitter<AsocijacijaTerm>();



  onReveal() {
    if(this.term){
    if (!this.term.isRevealed) {
      this.termRevealed.emit(this.term);
    }
  }
  }
}