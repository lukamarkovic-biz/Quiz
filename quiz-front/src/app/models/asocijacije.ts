export interface AsocijacijaTerm {
    text: string;    // The term to display
    isRevealed: boolean; // Indicates if the term is revealed
  }
  
  export interface AsocijacijaColumn {
    columnId: string;      // 'A', 'B', 'C', 'D'
    terms: AsocijacijaTerm[]; // List of terms
    solution: string; // Solution for this column
    isRevealed: boolean; // Indicates if the column solution is revealed
    revealAllTerms: boolean;
    enableInput: boolean;
    points: number;
  }
  
  export interface AsocijacijaGame {
    id: number;
    columns: AsocijacijaColumn[]; // List of columns (A, B, C, D)
    finalSolution: string; // Final solution for the whole game
    enableInput: boolean;
    isRevealed: boolean;
  }
