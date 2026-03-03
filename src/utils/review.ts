/**
 * 艾宾浩斯遗忘曲线复习间隔（天数）
 */
export const REVIEW_INTERVALS = [1, 2, 4, 7, 15];

/**
 * 复习计划状态
 */
export type ReviewStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

/**
 * 计算下次复习时间
 * @param lastReviewDate 上次复习时间
 * @param reviewStage 复习阶段（0-4，对应1,2,4,7,15天）
 * @returns 下次复习时间
 */
export function getNextReviewDate(lastReviewDate: Date, reviewStage: number): Date {
  const days = REVIEW_INTERVALS[Math.min(reviewStage, REVIEW_INTERVALS.length - 1)];
  const nextDate = new Date(lastReviewDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

/**
 * 检查是否到了复习时间
 * @param lastReviewDate 上次复习时间
 * @param reviewStage 复习阶段
 * @returns 是否需要复习
 */
export function needsReview(lastReviewDate: Date, reviewStage: number): boolean {
  const nextReviewDate = getNextReviewDate(lastReviewDate, reviewStage);
  return new Date() >= nextReviewDate;
}

/**
 * 获取复习阶段
 * @param correctCount 正确次数
 * @returns 复习阶段（0-4）
 */
export function getReviewStage(correctCount: number): number {
  if (correctCount >= 5) return 4; // 15天间隔
  if (correctCount >= 4) return 3; // 7天间隔
  if (correctCount >= 3) return 2; // 4天间隔
  if (correctCount >= 2) return 1; // 2天间隔
  return 0; // 1天间隔
}

/**
 * 计算复习优先级
 * @param lastReviewDate 上次复习时间
 * @param correctCount 正确次数
 * @param incorrectCount 错误次数
 * @returns 优先级分数（越高越优先）
 */
export function getReviewPriority(
  lastReviewDate: Date,
  correctCount: number,
  incorrectCount: number
): number {
  const now = new Date();
  const daysSinceReview = Math.floor((now.getTime() - lastReviewDate.getTime()) / (1000 * 60 * 60 * 24));
  const reviewStage = getReviewStage(correctCount);
  const expectedDays = REVIEW_INTERVALS[Math.min(reviewStage, REVIEW_INTERVALS.length - 1)];

  // 超过预期天数越多，优先级越高
  const overdueDays = Math.max(0, daysSinceReview - expectedDays);
  const priority = overdueDays * 10 + incorrectCount * 5;

  return priority;
}

/**
 * 获取复习状态描述
 */
export function getReviewStatus(reviewStage: number, correctCount: number): ReviewStatus {
  if (correctCount === 0) return 'new';
  if (reviewStage < 4) return 'learning';
  if (correctCount >= 5) return 'mastered';
  return 'reviewing';
}

/**
 * 获取复习状态标签
 */
export function getReviewStatusLabel(status: ReviewStatus): string {
  const labels = {
    new: '🆕 新单词',
    learning: '📚 学习中',
    reviewing: '🔄 复习中',
    mastered: '⭐ 已掌握',
  };
  return labels[status];
}
