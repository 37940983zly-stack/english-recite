import type { FillBlankResult } from '@/types';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

/**
 * 生成填空练习
 * @param word - 要处理的单词
 * @param difficulty - 难度等级
 * @returns 填空结果对象
 */
export function generateFillBlanks(word: string, difficulty: DifficultyLevel = 'medium'): FillBlankResult {
  const letters = word.split('');
  const wordLength = letters.length;

  let blanksCount: number;

  switch (difficulty) {
    case 'easy':
      // 初级：随机挖2个空
      blanksCount = Math.min(2, wordLength - 1);
      break;
    case 'medium':
      // 中级：挖50%
      blanksCount = Math.floor(wordLength * 0.5);
      break;
    case 'hard':
      // 高级：留首尾
      blanksCount = Math.max(1, wordLength - 2);
      break;
    case 'expert':
      // 专家：全空（保留首字母作为提示）
      blanksCount = wordLength - 1;
      break;
    default:
      blanksCount = Math.floor(wordLength * 0.5);
  }

  // 至少保留首字母
  blanksCount = Math.min(blanksCount, wordLength - 1);
  blanksCount = Math.max(1, blanksCount);

  // 可挖空的位置（排除首字母）
  const availablePositions = Array.from({ length: wordLength - 1 }, (_, i) => i + 1);

  // 随机选择要挖空的位置
  const blankPositions: number[] = [];
  for (let i = 0; i < blanksCount && availablePositions.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    blankPositions.push(availablePositions.splice(randomIndex, 1)[0]);
  }
  blankPositions.sort((a, b) => a - b);

  // 生成显示提示和挖空答案
  const displayedHint = letters
    .map((letter, index) => (blankPositions.includes(index) ? '_' : letter))
    .join(' ');

  const blanks = blankPositions.map((position) => letters[position]);

  return {
    word,
    blanks,
    displayedHint,
    blankPositions,
  };
}

/**
 * 验证填空答案
 * @param originalWord - 原始单词
 * @param userAnswers - 用户填入的字母
 * @param blankPositions - 空白位置
 * @returns 是否正确
 */
export function checkFillBlanksAnswer(
  originalWord: string,
  userAnswers: string[],
  blankPositions: number[]
): boolean {
  const userWordArray = originalWord.split('');

  // 用用户答案替换空白位置的字母
  blankPositions.forEach((position, index) => {
    userWordArray[position] = userAnswers[index]?.toLowerCase() || '';
  });

  const userWord = userWordArray.join('');
  return userWord.toLowerCase() === originalWord.toLowerCase();
}

/**
 * 获取难度等级的中文名称
 */
export function getDifficultyLabel(difficulty: DifficultyLevel): string {
  const labels = {
    easy: '⭐ 初级',
    medium: '⭐⭐ 中级',
    hard: '⭐⭐⭐ 高级',
    expert: '👑 专家',
  };
  return labels[difficulty];
}

/**
 * 获取难度等级的描述
 */
export function getDifficultyDescription(difficulty: DifficultyLevel): string {
  const descriptions = {
    easy: '随机挖2个空，简单模式',
    medium: '挖空50%，适合练习',
    hard: '只保留首尾字母，有挑战',
    expert: '只保留首字母，最高难度',
  };
  return descriptions[difficulty];
}
