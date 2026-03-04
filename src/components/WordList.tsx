import { useState } from 'react';
import type { Word } from '@/types';

interface WordListProps {
  words: Word[];
  onEdit: (word: Word) => void;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export function WordList({ words, onEdit, onDelete }: WordListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(id: string) {
    setDeleting(true);
    await onDelete(id);
    setDeleting(false);
    setDeleteId(null);
  }

  if (words.length === 0) {
    return (
      <div className="adventure-card text-center">
        <div className="text-8xl mb-4 animate-bounce-slow">📦</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">宝库是空的</h3>
        <p className="text-gray-500 text-lg">去收集你的第一个单词宝藏吧！✨</p>
      </div>
    );
  }

  return (
    <div className="adventure-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-adventure-blue-500 to-adventure-blue-600">
            <tr>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                ⚔️ 英文
              </th>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                📜 中文
              </th>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                📅 收集时间
              </th>
              <th className="px-8 py-5 text-right text-lg font-bold text-white uppercase tracking-wider">
                ⚙️ 操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-adventure-blue-100">
            {words.map((word) => (
              <tr key={word.id} className="hover:bg-adventure-blue-50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className="text-xl font-bold text-adventure-blue-700">{word.english}</span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className="text-lg text-gray-700">{word.chinese}</span>
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                  {new Date(word.created_at).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-8 py-5 whitespace-nowrap text-right">
                  <button
                    onClick={() => onEdit(word)}
                    className="text-adventure-blue-600 hover:text-adventure-blue-800 font-bold mr-4 text-lg hover:scale-110 transition-transform"
                  >
                    ✏️ 锻造
                  </button>
                  <button
                    onClick={() => setDeleteId(word.id)}
                    className="text-adventure-orange-500 hover:text-adventure-orange-700 font-bold text-lg hover:scale-110 transition-transform"
                  >
                    🗑️ 丢弃
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-adventure-lg max-w-md w-full p-8 border-4 border-adventure-orange-400 animate-pop-in">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">确定丢弃这个物品吗？</h3>
              <p className="text-gray-600 mb-6 text-lg">
                丢弃后就找不回来啦！
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="px-6 py-3 border-4 border-gray-300 rounded-xl hover:bg-gray-100 disabled:cursor-not-allowed font-bold text-lg transition-all hover:scale-105 shadow-adventure-sm"
                >
                  ❌ 取消
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  disabled={deleting}
                  className="px-6 py-3 bg-adventure-orange-500 text-white rounded-xl hover:bg-adventure-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold text-lg transition-all hover:scale-105 shadow-adventure"
                >
                  {deleting ? '⏳ 丢弃中...' : '🗑️ 确认丢弃'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
