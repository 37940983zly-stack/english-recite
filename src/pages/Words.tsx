import { useState } from 'react';
import { useWords } from '@/hooks/useWords';
import { WordForm } from '@/components/WordForm';
import { WordList } from '@/components/WordList';
import type { Word } from '@/types';

export function Words() {
  const { words, loading, error, createWord, updateWord, deleteWord } = useWords();
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  async function handleCreate(english: string, chinese: string) {
    return await createWord(english, chinese);
  }

  async function handleUpdate(english: string, chinese: string) {
    if (!editingWord) return { success: false, error: '没有要编辑的单词' };
    const result = await updateWord(editingWord.id, english, chinese);
    if (result.success) {
      setEditingWord(null);
    }
    return result;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            📚 我的单词本
          </h1>
          <p className="text-gray-600 text-xl">添加、管理和学习你的单词</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border-4 border-red-300 text-red-700 rounded-3xl text-center font-bold text-lg">
            ❌ {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-8 border-purple-200 border-t-purple-600"></div>
            <p className="mt-6 text-xl text-gray-600 font-bold">加载中...</p>
          </div>
        ) : (
          <>
            <WordForm
              wordToEdit={editingWord}
              onSubmit={editingWord ? handleUpdate : handleCreate}
              onCancel={() => setEditingWord(null)}
            />
            <WordList
              words={words}
              onEdit={setEditingWord}
              onDelete={deleteWord}
            />
          </>
        )}
      </div>
    </div>
  );
}
