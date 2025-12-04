import { User } from "./users";

export interface Highscore {
    user: User;
    gameType: string;
    score: number;
  }
  