import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrl: './highscore.component.css'
})
export class HighscoreComponent {
  constructor(userService: UserService) {};

  
}
