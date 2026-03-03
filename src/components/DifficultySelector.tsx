import type { DifficultyLevel } from '@/utils/fillBlanks';
import { getDifficultyLabel, getDifficultyDescription } from '@/utils/fillBlanks';

interface DifficultySelectorProps {
  currentDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

export function DifficultySelector({ currentDifficulty, onDifficultyChange }: DifficultySelectorProps) {
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-4 border-purple-200">
      <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        🎯 选择难度等级
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {difficulties.map((difficulty) => {
          const isSelected = currentDifficulty === difficulty;
          return (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`p-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{getDifficultyLabel(difficulty).split(' ')[0]}</div>
                <div className="text-sm">{getDifficultyLabel(difficulty).split(' ')[1]}</div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-center mt-4 text-gray-600 text-sm">
        {getDifficultyDescription(currentDifficulty)}
      </p>
    </div>
  );
}
