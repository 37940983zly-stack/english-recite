-- 创建 device_stats 表用于持久化设备成就统计
-- 执行位置：Supabase Dashboard → SQL Editor

-- 1. 创建表结构
CREATE TABLE IF NOT EXISTS device_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id VARCHAR(255) UNIQUE NOT NULL,
  total_correct_count INTEGER NOT NULL DEFAULT 0,
  total_practice_count INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  last_practiced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_device_stats_device_id
  ON device_stats(device_id);

CREATE INDEX IF NOT EXISTS idx_device_stats_last_practiced
  ON device_stats(last_practiced_at DESC);

-- 3. 启用行级安全策略 (RLS)
ALTER TABLE device_stats ENABLE ROW LEVEL SECURITY;

-- 4. 创建公开访问策略（因为这是一个无需认证的应用）
DROP POLICY IF EXISTS "Enable read access for device_stats" ON device_stats;
CREATE POLICY "Enable read access for device_stats"
  ON device_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for device_stats" ON device_stats;
CREATE POLICY "Enable insert for device_stats"
  ON device_stats FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for device_stats" ON device_stats;
CREATE POLICY "Enable update for device_stats"
  ON device_stats FOR UPDATE USING (true);

-- 5. 创建自动更新 updated_at 的函数
CREATE OR REPLACE FUNCTION update_device_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. 创建触发器
DROP TRIGGER IF EXISTS update_device_stats_updated_at_trigger ON device_stats;
CREATE TRIGGER update_device_stats_updated_at_trigger
  BEFORE UPDATE ON device_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_device_stats_updated_at();

-- 7. 添加表注释
COMMENT ON TABLE device_stats IS '设备成就统计数据表，用于跨会话保存用户的成就进度';
COMMENT ON COLUMN device_stats.device_id IS '设备唯一标识 (UUID v4)';
COMMENT ON COLUMN device_stats.total_correct_count IS '累计正确答题次数（成就等级依据）';
COMMENT ON COLUMN device_stats.total_practice_count IS '累计练习总次数';
COMMENT ON COLUMN device_stats.current_level IS '当前徽章等级（冗余字段便于查询）';
