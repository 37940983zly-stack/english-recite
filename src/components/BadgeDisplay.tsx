import { getCurrentBadge, getNextBadge, getBadgeProgress } from '@/utils/badges';

interface BadgeDisplayProps {
  correctCount: number;
}

export function BadgeDisplay({ correctCount }: BadgeDisplayProps) {
  const currentBadge = getCurrentBadge(correctCount);
  const nextBadge = getNextBadge(correctCount);
  const progress = getBadgeProgress(correctCount);

  return (
    <div className="adventure-card">
      <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-adventure-gold-500 to-yellow-400 bg-clip-text text-transparent">
        🏆 成就殿堂
      </h3>

      {/* 当前徽章 */}
      <div className="text-center mb-8">
        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-yellow-100 to-adventure-gold-100 shadow-glow-gold mb-4 transform hover:scale-110 transition-transform border-4 border-metal-gold animate-float">
          <div className="text-8xl mb-2">{currentBadge.emoji}</div>
          <div className="text-adventure-gold-800 font-bold text-xl">{currentBadge.name}</div>
          <div className="text-adventure-gold-600 text-sm mt-1">Lv.{currentBadge.level}</div>
        </div>
        <h4 className="text-2xl font-bold text-gray-800 mb-2">{currentBadge.name}</h4>
        <p className="text-gray-600 mb-2">{currentBadge.description}</p>
        <p className="text-adventure-gold-600 font-bold">已获得 {correctCount} 枚勋章</p>
      </div>

      {/* 进度条 */}
      {nextBadge && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-600">⚔️ 下一成就</span>
            <span className="text-sm font-bold text-adventure-gold-600">{progress.percentage}%</span>
          </div>
          <div className="treasure-progress">
            <div
              className="treasure-progress-fill"
              style={{ width: `${Math.min(progress.percentage, 100)}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            还需获得 <span className="font-bold text-adventure-gold-600">{progress.target - progress.current}</span> 枚勋章
          </p>
        </div>
      )}

      {/* 下一个徽章预览 */}
      {nextBadge && (
        <div className="bg-gradient-to-r from-adventure-blue-50 to-adventure-gold-50 rounded-xl p-6 border-4 border-dashed border-adventure-gold-300">
          <p className="text-center text-sm font-bold text-gray-600 mb-4">📜 待解锁成就</p>
          <div className="flex items-center justify-center gap-4">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${nextBadge.color} border-4 border-gray-300 animate-pulse-glow`}>
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
        <div className="bg-gradient-to-r from-metal-gold to-yellow-400 rounded-xl p-6 border-4 border-metal-gold shadow-glow-gold">
          <p className="text-center text-lg font-bold text-white">
            🎊 传奇达成！
          </p>
          <p className="text-center text-sm text-yellow-100 mt-2">
            你已成为真正的词汇大师！
          </p>
        </div>
      )}
    </div>
  );
}
