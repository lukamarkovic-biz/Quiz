import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from '../../models/question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
  @Input() answer: Answer | null = null;
  @Input() selectedAnswer: Answer | null = null; // Pass the selected answer from the parent
  @Output() answerClicked: EventEmitter<Answer> = new EventEmitter<Answer>();

  onClick() {
    if(this.answer)
      return this.answerClicked.emit(this.answer);
  }
}
