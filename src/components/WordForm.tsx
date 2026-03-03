import { useState, useEffect } from 'react';
import type { Word } from '@/types';

interface WordFormProps {
  wordToEdit?: Word | null;
  onSubmit: (english: string, chinese: string) => Promise<{ success: boolean; error?: string }>;
  onCancel?: () => void;
}

export function WordForm({ wordToEdit, onSubmit, onCancel }: WordFormProps) {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wordToEdit) {
      setEnglish(wordToEdit.english);
      setChinese(wordToEdit.chinese);
    } else {
      setEnglish('');
      setChinese('');
    }
    setError(null);
  }, [wordToEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!english.trim() || !chinese.trim()) {
      setError('⚠️ 请填写英文和中文哦！');
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await onSubmit(english.trim(), chinese.trim());

    if (result.success) {
      setEnglish('');
      setChinese('');
      if (onCancel) onCancel();
    } else {
      setError('❌ ' + (result.error || '保存失败，请重试'));
    }

    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4 border-purple-200">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {wordToEdit ? '✏️ 编辑单词' : '✨ 添加新单词'}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl text-center font-medium animate-bounce">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="english" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">🔤</span>
            <span>English 英文</span>
          </label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="w-full px-6 py-4 text-xl border-3 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all"
            placeholder="例如：apple"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="chinese" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span>Chinese 中文</span>
          </label>
          <input
            type="text"
            id="chinese"
            value={chinese}
            onChange={(e) => setChinese(e.target.value)}
            className="w-full px-6 py-4 text-xl border-3 border-gray-300 rounded-2xl focus:ring-4 focus:ring-pink-400 focus:border-pink-500 transition-all"
            placeholder="例如：苹果"
            disabled={submitting}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            {submitting ? '⏳ 保存中...' : wordToEdit ? '💾 更新' : '🚀 添加'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-8 py-4 border-3 border-gray-300 rounded-2xl hover:bg-gray-100 disabled:cursor-not-allowed text-lg font-bold transition-all hover:scale-105"
            >
              ❌ 取消
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
