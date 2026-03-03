export interface Word {
  id: string;
  english: string;
  chinese: string;
  created_at: string;
  updated_at: string;
}

export interface PracticeRecord {
  id: string;
  word_id: string;
  is_correct: boolean;
  practiced_at: string;
}

export interface FillBlankResult {
  word: string;
  blanks: string[];
  displayedHint: string;
  blankPositions: number[];
}
