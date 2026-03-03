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
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl mx-auto border-4 border-purple-200">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        ✏️ 填空挑战
      </h2>

      <div className="mb-10 text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200">
        <p className="text-gray-600 text-xl mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">📖</span>
          <span>中文意思</span>
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
                  className={`w-16 h-20 text-center text-3xl font-bold border-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : 'bg-white border-purple-300 hover:border-purple-500 hover:scale-105'
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
          <div className="mt-6 text-center animate-bounce">
            <p className="text-red-600 text-xl font-bold mb-2">❌ 答案不对哦</p>
            <p className="text-gray-600 text-lg">正确答案是：</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{word.english}</p>
          </div>
        )}

        {showResult && isCorrect && (
          <div className="mt-6 text-center animate-bounce">
            <p className="text-green-600 text-3xl font-bold mb-2">🎉 太棒了！</p>
            <p className="text-gray-600 text-lg">你答对了！</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={userAnswers.some((answer) => !answer)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-12 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            🚀 提交答案
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-12 rounded-2xl hover:from-green-600 hover:to-teal-600 text-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            ➡️ 下一个单词
          </button>
        )}
      </div>
    </div>
  );
}
