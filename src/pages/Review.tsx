import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { FillBlanks } from '@/components/FillBlanks';
import type { Word } from '@/types';
import type { DifficultyLevel } from '@/utils/fillBlanks';

interface ReviewWord extends Word {
  correct_count: number;
  incorrect_count: number;
  last_practiced: string;
}

export function Review() {
  const [reviewWords, setReviewWords] = useState<ReviewWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [difficulty] = useState<DifficultyLevel>('medium');

  useEffect(() => {
    fetchReviewWords();
  }, []);

  async function fetchReviewWords() {
    try {
      setLoading(true);

      // 获取有练习记录的单词
      const { data: words, error } = await supabase
        .from('words')
        .select(`
          *,
          practice_records(count)
        `)
        .gte('practice_records.count', 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 获取每个单词的统计信息
      const wordsWithStats = await Promise.all(
        (words || []).map(async (word: any) => {
          const { data: records } = await supabase
            .from('practice_records')
            .select('is_correct, practiced_at')
            .eq('word_id', word.id)
            .order('practiced_at', { ascending: false });

          const correctCount = records?.filter((r) => r.is_correct).length || 0;
          const incorrectCount = records?.filter((r) => !r.is_correct).length || 0;
          const lastPracticed = records?.[0]?.practiced_at || null;

          return {
            ...word,
            correct_count: correctCount,
            incorrect_count: incorrectCount,
            last_practiced: lastPracticed,
          };
        })
      );

      setReviewWords(wordsWithStats);
    } catch (err) {
      console.error('Failed to fetch review words:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(correct: boolean) {
    setIsCorrect(correct);
    setShowResult(true);

    if (reviewWords[currentIndex]) {
      await supabase.from('practice_records').insert([
        {
          word_id: reviewWords[currentIndex].id,
          is_correct: correct,
        },
      ]);
    }
  }

  function handleNext() {
    setShowResult(false);
    setIsCorrect(null);
    setCurrentIndex((prev) => Math.min(prev + 1, reviewWords.length - 1));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-24 w-24 border-8 border-purple-200 border-t-purple-600"></div>
          <p className="mt-6 text-2xl text-gray-600 font-bold">加载复习单词...</p>
        </div>
      </div>
    );
  }

  if (reviewWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center border-4 border-purple-200">
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">太棒了！</h2>
          <p className="text-gray-600 text-lg">暂时没有需要复习的单词</p>
          <p className="text-gray-500 mt-4">继续练习新单词吧！</p>
        </div>
      </div>
    );
  }

  const currentWord = reviewWords[currentIndex];
  const progress = ((currentIndex + 1) / reviewWords.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            📖 艾宾浩斯复习
          </h1>
          <p className="text-gray-600 text-xl">科学复习，轻松记住单词！</p>
        </div>

        {/* 进度条 */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-4 border-purple-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-gray-700">
              进度：{currentIndex + 1} / {reviewWords.length}
            </span>
            <span className="font-bold text-purple-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 单词统计 */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-4 border-purple-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-3xl font-bold text-green-600">{currentWord.correct_count}</div>
              <div className="text-sm text-gray-600 font-bold">答对次数</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
              <div className="text-3xl font-bold text-red-600">{currentWord.incorrect_count}</div>
              <div className="text-sm text-gray-600 font-bold">答错次数</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600">
                {currentWord.correct_count > 0
                  ? Math.round((currentWord.correct_count / (currentWord.correct_count + currentWord.incorrect_count)) * 100)
                  : 0}%
              </div>
              <div className="text-sm text-gray-600 font-bold">正确率</div>
            </div>
          </div>
        </div>

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
