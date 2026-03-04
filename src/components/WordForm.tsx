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
    <form onSubmit={handleSubmit} className="adventure-card mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-adventure-blue-600 to-adventure-gold-500 bg-clip-text text-transparent">
        {wordToEdit ? '✏️ 锻造单词' : '✨ 发现新单词'}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-adventure-orange-50 border-2 border-adventure-orange-400 text-adventure-orange-700 rounded-2xl text-center font-medium animate-shake">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="english" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">🗡️</span>
            <span>English 英文</span>
          </label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="game-input"
            placeholder="例如：apple"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="chinese" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span>Chinese 中文</span>
          </label>
          <input
            type="text"
            id="chinese"
            value={chinese}
            onChange={(e) => setChinese(e.target.value)}
            className="game-input"
            placeholder="例如：苹果"
            disabled={submitting}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="quest-btn flex-1"
          >
            {submitting ? '⏳ 锻造中...' : wordToEdit ? '🔨 重铸' : '⚔️ 铸造'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-8 py-4 border-4 border-gray-300 rounded-xl hover:bg-gray-100 disabled:cursor-not-allowed text-lg font-bold transition-all hover:scale-105 shadow-adventure-sm"
            >
              ❌ 放弃
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
