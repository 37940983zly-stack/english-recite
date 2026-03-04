import { supabase } from './supabase';
import { getCurrentBadge } from './badges';

const DEVICE_ID_KEY = 'wordhero_device_id';

export interface DeviceStats {
  id: string;
  device_id: string;
  total_correct_count: number;
  total_practice_count: number;
  current_level: number;
  last_practiced_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * 获取或创建设备ID
 * 首次访问时生成UUID并保存到localStorage
 * 后续访问从localStorage读取
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') {
    return 'mock-device-id';
  }

  try {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
      // 生成新设备ID
      deviceId = crypto.randomUUID();
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
      console.log('✨ New device ID generated:', deviceId);
    } else {
      console.log('📱 Existing device ID found:', deviceId);
    }

    return deviceId;
  } catch (error) {
    console.error('❌ Failed to access localStorage:', error);
    // 降级：生成会话级ID
    return crypto.randomUUID();
  }
}

/**
 * 清除设备ID（用于测试/调试）
 */
export function clearDeviceId(): void {
  try {
    localStorage.removeItem(DEVICE_ID_KEY);
    console.log('🗑️ Device ID cleared');
  } catch (error) {
    console.error('❌ Failed to clear device ID:', error);
  }
}

/**
 * 从数据库获取设备统计数据
 */
export async function getDeviceStats(deviceId: string): Promise<DeviceStats | null> {
  try {
    const { data, error } = await supabase
      .from('device_stats')
      .select('*')
      .eq('device_id', deviceId)
      .single();

    if (error) {
      // 如果记录不存在，返回null
      if (error.code === 'PGRST116') {
        console.log('📊 Device stats not found for:', deviceId);
        return null;
      }
      throw error;
    }

    if (data) {
      console.log('✅ Device stats loaded:', {
        correct: data.total_correct_count,
        total: data.total_practice_count,
        level: data.current_level,
      });
    }

    return data;
  } catch (error) {
    console.error('❌ Failed to fetch device stats:', error);
    return null;
  }
}

/**
 * 创建新的设备统计记录
 */
export async function createDeviceStats(deviceId: string): Promise<DeviceStats | null> {
  try {
    const { data, error } = await supabase
      .from('device_stats')
      .insert([
        {
          device_id: deviceId,
          total_correct_count: 0,
          total_practice_count: 0,
          current_level: 1,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('✨ New device stats created for:', deviceId);
    return data;
  } catch (error) {
    console.error('❌ Failed to create device stats:', error);
    return null;
  }
}

/**
 * 根据正确答题数计算等级
 */
function calculateLevel(correctCount: number): number {
  const badge = getCurrentBadge(correctCount);
  return badge.level;
}

/**
 * 更新设备统计数据
 * 使用乐观更新策略：先更新UI，后同步数据库
 */
export async function updateDeviceStats(
  deviceId: string,
  isCorrect: boolean
): Promise<DeviceStats | null> {
  try {
    // 1. 获取当前统计数据
    const current = await getDeviceStats(deviceId);

    if (!current) {
      // 如果记录不存在，创建新记录
      console.log('📝 Creating new device stats on first update...');
      return await createDeviceStats(deviceId);
    }

    // 2. 计算新值
    const newCorrectCount = current.total_correct_count + (isCorrect ? 1 : 0);
    const newPracticeCount = current.total_practice_count + 1;
    const newLevel = calculateLevel(newCorrectCount);

    // 3. 更新数据库
    const { data, error } = await supabase
      .from('device_stats')
      .update({
        total_correct_count: newCorrectCount,
        total_practice_count: newPracticeCount,
        current_level: newLevel,
        last_practiced_at: new Date().toISOString(),
      })
      .eq('device_id', deviceId)
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Device stats updated:', {
      correct: newCorrectCount,
      total: newPracticeCount,
      level: newLevel,
      leveledUp: newLevel > current.current_level,
    });

    return data;
  } catch (error) {
    console.error('❌ Failed to update device stats:', error);
    throw error; // 抛出错误以便调用方处理回滚
  }
}

/**
 * 获取设备统计信息（带自动创建）
 * 如果记录不存在，自动创建
 */
export async function getOrCreateDeviceStats(deviceId: string): Promise<DeviceStats | null> {
  let stats = await getDeviceStats(deviceId);

  if (!stats) {
    stats = await createDeviceStats(deviceId);
  }

  return stats;
}
