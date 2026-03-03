import { getCurrentBadge, getNextBadge, getBadgeProgress } from '@/utils/badges';

interface BadgeDisplayProps {
  correctCount: number;
}

export function BadgeDisplay({ correctCount }: BadgeDisplayProps) {
  const currentBadge = getCurrentBadge(correctCount);
  const nextBadge = getNextBadge(correctCount);
  const progress = getBadgeProgress(correctCount);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-purple-200">
      <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        🏆 我的徽章
      </h3>

      {/* 当前徽章 */}
      <div className="text-center mb-8">
        <div className={`inline-block p-8 rounded-3xl bg-gradient-to-br ${currentBadge.color} shadow-2xl mb-4 transform hover:scale-110 transition-transform`}>
          <div className="text-8xl mb-2">{currentBadge.emoji}</div>
          <div className="text-white font-bold text-xl">{currentBadge.name}</div>
          <div className="text-white/80 text-sm mt-1">Lv.{currentBadge.level}</div>
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-2">{currentBadge.name}</h4>
        <p className="text-gray-600 mb-2">{currentBadge.description}</p>
        <p className="text-purple-600 font-bold">已答对 {correctCount} 题</p>
      </div>

      {/* 进度条 */}
      {nextBadge && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-600">距离下一徽章</span>
            <span className="text-sm font-bold text-purple-600">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress.percentage, 100)}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            还需答对 <span className="font-bold text-purple-600">{progress.target - progress.current}</span> 题
          </p>
        </div>
      )}

      {/* 下一个徽章预览 */}
      {nextBadge && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-purple-300">
          <p className="text-center text-sm font-bold text-gray-600 mb-4">下一徽章</p>
          <div className="flex items-center justify-center gap-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${nextBadge.color}`}>
              <div className="text-4xl">{nextBadge.emoji}</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">{nextBadge.name}</div>
              <div className="text-sm text-gray-600">Lv.{nextBadge.level} · {nextBadge.description}</div>
            </div>
          </div>
        </div>
      )}

      {/* 已达到最高等级 */}
      {!nextBadge && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-400">
          <p className="text-center text-lg font-bold text-yellow-700">
            🎉 恭喜！你已经达到最高等级！
          </p>
          <p className="text-center text-sm text-yellow-600 mt-2">
            真正的知识之神！
          </p>
        </div>
      )}
    </div>
  );
}
