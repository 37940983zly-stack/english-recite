export interface Badge {
  level: number;
  name: string;
  emoji: string;
  description: string;
  requirement: number; // 需要答对的题目数
  color: string;
}

export const badges: Badge[] = [
  // L1-L10: 粗糙石器
  { level: 1, name: '小石子', emoji: '🪨', description: '初学乍练', requirement: 1, color: 'from-gray-400 to-gray-600' },
  { level: 2, name: '碎石', emoji: '💎', description: '渐入佳境', requirement: 5, color: 'from-gray-400 to-gray-600' },
  { level: 3, name: '磨石', emoji: '🔩', description: '勤学苦练', requirement: 10, color: 'from-gray-400 to-gray-600' },
  { level: 4, name: '粗石', emoji: '🪵', description: '小有成就', requirement: 20, color: 'from-gray-400 to-gray-600' },
  { level: 5, name: '石器', emoji: '🔨', description: '熟能生巧', requirement: 35, color: 'from-gray-400 to-gray-600' },
  { level: 6, name: '石斧', emoji: '🪓', description: '技艺精进', requirement: 50, color: 'from-gray-400 to-gray-600' },
  { level: 7, name: '石镐', emoji: '⛏️', description: '进步神速', requirement: 75, color: 'from-gray-400 to-gray-600' },
  { level: 8, name: '岩块', emoji: '🧱', description: '出类拔萃', requirement: 100, color: 'from-gray-400 to-gray-600' },
  { level: 9, name: '石碑', emoji: '🗿', description: '卓越非凡', requirement: 150, color: 'from-gray-400 to-gray-600' },
  { level: 10, name: '大地之魂', emoji: '🌍', description: '初级大师', requirement: 200, color: 'from-yellow-400 to-yellow-600' },

  // L11-L20: 金属与青铜
  { level: 11, name: '铜币', emoji: '🪙', description: '初涉金属', requirement: 250, color: 'from-orange-400 to-orange-600' },
  { level: 12, name: '铜块', emoji: '🟫', description: '金属学徒', requirement: 300, color: 'from-orange-400 to-orange-600' },
  { level: 13, name: '青铜', emoji: '🥉', description: '青铜之路', requirement: 350, color: 'from-orange-400 to-orange-600' },
  { level: 14, name: '铜镜', emoji: '🪞', description: '映照真知', requirement: 400, color: 'from-orange-400 to-orange-600' },
  { level: 15, name: '青铜剑', emoji: '⚔️', description: '勇往直前', requirement: 450, color: 'from-orange-400 to-orange-600' },
  { level: 16, name: '铜钟', emoji: '🔔', description: '声名远扬', requirement: 500, color: 'from-orange-400 to-orange-600' },
  { level: 17, name: '青铜盾', emoji: '🛡️', description: '坚韧不拔', requirement: 600, color: 'from-orange-400 to-orange-600' },
  { level: 18, name: '铜壶', emoji: '🏺', description: '博学多才', requirement: 700, color: 'from-orange-400 to-orange-600' },
  { level: 19, name: '青铜像', emoji: '🗿', description: '技艺精湛', requirement: 800, color: 'from-orange-400 to-orange-600' },
  { level: 20, name: '青铜之王', emoji: '👑', description: '青铜大师', requirement: 1000, color: 'from-orange-600 to-red-600' },

  // L21-L30: 白银时代
  { level: 21, name: '银币', emoji: '🪙', description: '银光初现', requirement: 1200, color: 'from-gray-200 to-gray-400' },
  { level: 22, name: '银块', emoji: '🔲', description: '白银之路', requirement: 1400, color: 'from-gray-200 to-gray-400' },
  { level: 23, name: '银饰', emoji: '💍', description: '精美绝伦', requirement: 1600, color: 'from-gray-200 to-gray-400' },
  { level: 24, name: '银杯', emoji: '🏆', description: '银杯荣耀', requirement: 1800, color: 'from-gray-200 to-gray-400' },
  { level: 25, name: '银剑', emoji: '⚔️', description: '银光闪闪', requirement: 2000, color: 'from-gray-200 to-gray-400' },
  { level: 26, name: '银月', emoji: '🌙', description: '月光如银', requirement: 2500, color: 'from-gray-200 to-gray-400' },
  { level: 27, name: '银星', emoji: '⭐', description: '星光璀璨', requirement: 3000, color: 'from-gray-200 to-gray-400' },
  { level: 28, name: '银莲花', emoji: '🪷', description: '纯洁高雅', requirement: 3500, color: 'from-gray-200 to-gray-400' },
  { level: 29, name: '银凤凰', emoji: '🦅', description: '银翼高飞', requirement: 4000, color: 'from-gray-200 to-gray-400' },
  { level: 30, name: '圣银之眼', emoji: '👁️', description: '白银大师', requirement: 5000, color: 'from-blue-300 to-purple-400' },

  // L31-L40: 黄金时代
  { level: 31, name: '金币', emoji: '🪙', description: '黄金初现', requirement: 6000, color: 'from-yellow-400 to-yellow-600' },
  { level: 32, name: '金块', emoji: '🧱', description: '黄金之路', requirement: 7000, color: 'from-yellow-400 to-yellow-600' },
  { level: 33, name: '金冠', emoji: '👑', description: '王者风范', requirement: 8000, color: 'from-yellow-400 to-yellow-600' },
  { level: 34, name: '金杯', emoji: '🏆', description: '金杯辉煌', requirement: 9000, color: 'from-yellow-400 to-yellow-600' },
  { level: 35, name: '金剑', emoji: '⚔️', description: '金光万丈', requirement: 10000, color: 'from-yellow-400 to-yellow-600' },
  { level: 36, name: '金阳', emoji: '☀️', description: '如日中天', requirement: 12000, color: 'from-yellow-400 to-orange-500' },
  { level: 37, name: '金狮', emoji: '🦁', description: '勇猛如狮', requirement: 14000, color: 'from-yellow-400 to-orange-500' },
  { level: 38, name: '金龙', emoji: '🐉', description: '龙腾虎跃', requirement: 16000, color: 'from-yellow-400 to-orange-500' },
  { level: 39, name: '金麒麟', emoji: '🦄', description: '祥瑞之兆', requirement: 18000, color: 'from-yellow-400 to-orange-500' },
  { level: 40, name: '至尊金勋', emoji: '🏅', description: '黄金大师', requirement: 20000, color: 'from-yellow-500 to-red-500' },

  // L41-L45: 钻石时代
  { level: 41, name: '钻石碎片', emoji: '💎', description: '钻石启程', requirement: 25000, color: 'from-cyan-400 to-blue-500' },
  { level: 42, name: '蓝钻石', emoji: '💠', description: '璀璨夺目', requirement: 30000, color: 'from-cyan-400 to-blue-500' },
  { level: 43, name: '粉钻石', emoji: '💗', description: '粉红奇迹', requirement: 35000, color: 'from-pink-400 to-pink-600' },
  { level: 44, name: '钻石王', emoji: '🤴', description: '钻石王者', requirement: 40000, color: 'from-cyan-400 to-blue-600' },
  { level: 45, name: '永恒王座', emoji: '👑', description: '永恒之光', requirement: 50000, color: 'from-purple-500 to-pink-600' },

  // L46-L50: 神话至尊
  { level: 46, name: '星辰使者', emoji: '✨', description: '星辰之力', requirement: 65000, color: 'from-indigo-500 to-purple-600' },
  { level: 47, name: '不死凤凰', emoji: '🔥', description: '浴火重生', requirement: 80000, color: 'from-orange-500 to-red-600' },
  { level: 48, name: '虚空行者', emoji: '🌌', description: '虚空之主', requirement: 100000, color: 'from-purple-600 to-indigo-800' },
  { level: 49, name: '时空领主', emoji: '⏰', description: '掌控时空', requirement: 150000, color: 'from-blue-600 to-purple-700' },
  { level: 50, name: '至尊·知识神冕', emoji: '🌟', description: '知识之神', requirement: 200000, color: 'from-yellow-400 via-purple-500 to-pink-500' },
];

/**
 * 根据正确答题数获取当前徽章
 */
export function getCurrentBadge(correctCount: number): Badge {
  for (let i = badges.length - 1; i >= 0; i--) {
    if (correctCount >= badges[i].requirement) {
      return badges[i];
    }
  }
  return badges[0];
}

/**
 * 获取下一个徽章
 */
export function getNextBadge(correctCount: number): Badge | null {
  for (let i = 0; i < badges.length; i++) {
    if (correctCount < badges[i].requirement) {
      return badges[i];
    }
  }
  return null;
}

/**
 * 计算到下一个徽章的进度
 */
export function getBadgeProgress(correctCount: number): { current: number; target: number; percentage: number } {
  const currentBadge = getCurrentBadge(correctCount);
  const nextBadge = getNextBadge(correctCount);

  if (!nextBadge) {
    return { current: correctCount, target: correctCount, percentage: 100 };
  }

  const current = correctCount - currentBadge.requirement;
  const target = nextBadge.requirement - currentBadge.requirement;
  const percentage = Math.round((current / target) * 100);

  return { current, target, percentage };
}
