import type { DifficultyLevel } from '@/utils/fillBlanks';
import { getDifficultyLabel, getDifficultyDescription } from '@/utils/fillBlanks';

interface DifficultySelectorProps {
  currentDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

const difficultyIcons: Record<DifficultyLevel, string> = {
  easy: '🛡️',
  medium: '⚔️',
  hard: '🏹',
  expert: '🔥',
};

export function DifficultySelector({ currentDifficulty, onDifficultyChange }: DifficultySelectorProps) {
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];

  return (
    <div className="adventure-card mb-6">
      <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-adventure-orange-500 to-adventure-gold-500 bg-clip-text text-transparent">
        🛡️ 挑战等级
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {difficulties.map((difficulty) => {
          const isSelected = currentDifficulty === difficulty;
          return (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`p-4 rounded-xl font-bold text-lg transition-all hover:scale-105 border-4 ${
                isSelected
                  ? 'bg-gradient-to-br from-adventure-gold-400 to-adventure-orange-500 text-white shadow-adventure border-adventure-gold-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">{difficultyIcons[difficulty]}</div>
                <div className="text-sm">{getDifficultyLabel(difficulty).split(' ')[1]}</div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-center mt-4 text-gray-600 text-sm bg-adventure-blue-50 rounded-lg p-3">
        {getDifficultyDescription(currentDifficulty)}
      </p>
    </div>
  );
}
