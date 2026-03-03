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
      <div className="bg-white rounded-3xl shadow-xl p-16 text-center border-4 border-dashed border-purple-300">
        <div className="text-8xl mb-4 animate-bounce">📚</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">单词本还是空的</h3>
        <p className="text-gray-500 text-lg">快来添加第一个单词吧！✨</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-500 to-pink-500">
            <tr>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                📝 英文
              </th>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                📖 中文
              </th>
              <th className="px-8 py-5 text-left text-lg font-bold text-white uppercase tracking-wider">
                📅 添加时间
              </th>
              <th className="px-8 py-5 text-right text-lg font-bold text-white uppercase tracking-wider">
                ⚙️ 操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-purple-100">
            {words.map((word) => (
              <tr key={word.id} className="hover:bg-purple-50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <span className="text-xl font-bold text-purple-700">{word.english}</span>
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
                    className="text-blue-600 hover:text-blue-800 font-bold mr-4 text-lg hover:scale-110 transition-transform"
                  >
                    ✏️ 编辑
                  </button>
                  <button
                    onClick={() => setDeleteId(word.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg hover:scale-110 transition-transform"
                  >
                    🗑️ 删除
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-4 border-red-300 animate-bounce-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">确定要删除吗？</h3>
              <p className="text-gray-600 mb-6 text-lg">
                这个单词删除后就找不回来啦！
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="px-6 py-3 border-3 border-gray-300 rounded-2xl hover:bg-gray-100 disabled:cursor-not-allowed font-bold text-lg transition-all hover:scale-105"
                >
                  ❌ 取消
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  disabled={deleting}
                  className="px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold text-lg transition-all hover:scale-105"
                >
                  {deleting ? '⏳ 删除中...' : '🗑️ 确认删除'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
