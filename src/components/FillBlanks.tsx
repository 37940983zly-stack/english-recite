import { useState, useEffect } from 'react';
import { generateFillBlanks, checkFillBlanksAnswer } from '@/utils/fillBlanks';
import type { Word } from '@/types';
import type { DifficultyLevel } from '@/utils/fillBlanks';

interface FillBlanksProps {
  word: Word;
  difficulty: DifficultyLevel;
  onSubmit: (isCorrect: boolean) => Promise<void>;
  onNext: () => void;
  showResult: boolean;
  isCorrect: boolean | null;
}

export function FillBlanks({ word, difficulty, onSubmit, onNext, showResult, isCorrect }: FillBlanksProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [fillBlankResult, setFillBlankResult] = useState(() => generateFillBlanks(word.english, difficulty));

  useEffect(() => {
    const result = generateFillBlanks(word.english, difficulty);
    setFillBlankResult(result);
    setUserAnswers(new Array(result.blankPositions.length).fill(''));
  }, [word, difficulty]);

  function handleInputChange(index: number, value: string) {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value.slice(-1);
    setUserAnswers(newAnswers);

    // Auto-focus next input
    if (value && index < userAnswers.length - 1) {
      setTimeout(() => {
        const nextInput = document.getElementById(`blank-${index + 1}`);
        nextInput?.focus();
      }, 50);
    }

    // Add shake animation on input
    const input = document.getElementById(`blank-${index}`);
    if (input) {
      input.classList.add('scale-110');
      setTimeout(() => input.classList.remove('scale-110'), 150);
    }
  }

  async function handleSubmit() {
    const correct = checkFillBlanksAnswer(word.english, userAnswers, fillBlankResult.blankPositions);
    await onSubmit(correct);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !userAnswers[index] && index > 0) {
      const prevInput = document.getElementById(`blank-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  }

  return (
    <div className="adventure-card max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-adventure-orange-500 to-adventure-gold-500 bg-clip-text text-transparent">
        ⚔️ 符文解密
      </h2>

      <div className="mb-10 text-center p-6 bg-gradient-to-r from-adventure-blue-50 to-adventure-gold-50 rounded-2xl border-4 border-adventure-blue-200">
        <p className="text-gray-600 text-xl mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">📜</span>
          <span>秘密卷轴</span>
        </p>
        <p className="text-4xl font-bold text-gray-900">{word.chinese}</p>
      </div>

      <div className="mb-10">
        <div className="flex flex-wrap justify-center items-center gap-3 text-4xl">
          {word.english.split('').map((letter, index) => {
            const blankIndex = fillBlankResult.blankPositions.indexOf(index);

            if (blankIndex !== -1) {
              return (
                <input
                  key={index}
                  id={`blank-${blankIndex}`}
                  type="text"
                  maxLength={1}
                  value={userAnswers[blankIndex] || ''}
                  onChange={(e) => handleInputChange(blankIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(blankIndex, e)}
                  disabled={showResult}
                  className={`w-16 h-20 text-center text-3xl font-bold border-4 rounded-xl focus:outline-none transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-adventure-green-100 border-adventure-green-500 text-adventure-green-700 shadow-glow-green'
                        : 'bg-adventure-orange-100 border-adventure-orange-500 text-adventure-orange-700'
                      : 'bg-white border-adventure-blue-300 hover:border-adventure-blue-500 hover:scale-105 focus:border-adventure-blue-500 focus:shadow-glow-blue'
                  }`}
                  autoFocus={blankIndex === 0}
                />
              );
            } else {
              return (
                <span key={index} className="text-gray-700 font-bold px-2">
                  {letter}
                </span>
              );
            }
          })}
        </div>

        {showResult && !isCorrect && (
          <div className="mt-6 text-center animate-shake">
            <p className="text-adventure-orange-600 text-xl font-bold mb-2">💔 挑战失败</p>
            <p className="text-gray-600 text-lg">正确符文是：</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{word.english}</p>
          </div>
        )}

        {showResult && isCorrect && (
          <div className="mt-6 text-center animate-pop-in">
            <p className="text-adventure-green-600 text-3xl font-bold mb-2">🏆 胜利！</p>
            <p className="text-gray-600 text-lg">你成功解开了符文！</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={userAnswers.some((answer) => !answer)}
            className="quest-btn"
          >
            🚀 发动攻击
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-adventure-green-500 to-teal-500 text-white py-4 px-12 rounded-xl hover:from-adventure-green-600 hover:to-teal-600 text-2xl font-bold shadow-adventure hover:shadow-adventure-lg transition-all hover:scale-105"
          >
            ➡️ 下一关
          </button>
        )}
      </div>
    </div>
  );
}
