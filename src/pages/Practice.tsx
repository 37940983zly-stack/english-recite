import { useState, useEffect } from 'react';
import { usePractice } from '@/hooks/usePractice';
import { FillBlanks } from '@/components/FillBlanks';
import { DifficultySelector } from '@/components/DifficultySelector';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import type { DifficultyLevel } from '@/utils/fillBlanks';

export function Practice() {
  const { currentWord, loading, error, getRandomWord, recordPractice } = usePractice();
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    getRandomWord();
  }, []);

  async function handleSubmit(correct: boolean) {
    setIsCorrect(correct);
    setShowResult(true);
    setStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    if (currentWord) {
      await recordPractice(currentWord.id, correct);
    }
  }

  function handleNext() {
    setShowResult(false);
    setIsCorrect(null);
    getRandomWord();
  }

  function handleDifficultyChange(newDifficulty: DifficultyLevel) {
    setDifficulty(newDifficulty);
    // Regenerate current word with new difficulty
    setShowResult(false);
    setIsCorrect(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-24 w-24 border-8 border-purple-200 border-t-purple-600"></div>
          <p className="mt-6 text-2xl text-gray-600 font-bold">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md border-4 border-red-300">
          <div className="text-center">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">出现错误</h2>
            <p className="text-gray-600 mb-6 text-lg">{error}</p>
            <p className="text-sm text-gray-500 bg-gray-100 p-4 rounded-2xl">
              请先在单词本中添加一些单词，再来练习吧！
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentWord) {
    return null;
  }

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            🎮 闯关练习
          </h1>
          <p className="text-gray-600 text-xl">通过填空练习，轻松记住单词！</p>
        </div>

        {/* 统计面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 练习统计 */}
          {stats.total > 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-purple-200">
              <h3 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                📊 今日统计
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600">{stats.correct}</div>
                  <div className="text-sm text-gray-600 font-bold">答对</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-600 font-bold">总题数</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
                  <div className="text-sm text-gray-600 font-bold">正确率</div>
                </div>
              </div>
            </div>
          )}

          {/* 徽章显示 */}
          <BadgeDisplay correctCount={stats.correct} />
        </div>

        <DifficultySelector
          currentDifficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
        />

        <FillBlanks
          word={currentWord}
          difficulty={difficulty}
          onSubmit={handleSubmit}
          onNext={handleNext}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      </div>
    </div>
  );
}
