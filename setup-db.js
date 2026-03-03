import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqtlpxzcwtmhoajghoqn.supabase.co';
const supabaseKey = '2.sb_publishable_aDsXD2ralLFgnLr4jlOtCg_wsQw6QmM';

const sql = `
-- 创建 words 表
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  english VARCHAR(255) NOT NULL,
  chinese VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_words_english ON words(english);

-- 启用 RLS
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON words;
CREATE POLICY "Enable read access for all users" ON words FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON words;
CREATE POLICY "Enable insert for all users" ON words FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON words;
CREATE POLICY "Enable update for all users" ON words FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON words;
CREATE POLICY "Enable delete for all users" ON words FOR DELETE USING (true);

-- 创建 practice_records 表
CREATE TABLE IF NOT EXISTS practice_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  practiced_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practice_records_word_id ON practice_records(word_id);

ALTER TABLE practice_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all access for practice_records" ON practice_records;
CREATE POLICY "Enable all access for practice_records" ON practice_records FOR ALL USING (true) WITH CHECK (true);
`;

async function setupDatabase() {
  console.log('🔧 Setting up Supabase database...');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ query: sql })
    });

    const result = await response.text();

    if (response.ok) {
      console.log('✅ Database setup completed!');
      console.log('Tables created: words, practice_records');
      console.log('RLS policies enabled');
    } else {
      console.log('Response:', result);
      console.log('⚠️ Note: You may need to run the SQL manually in Supabase SQL Editor');
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.log('⚠️ Please run the SQL manually in Supabase Dashboard → SQL Editor');
  }
}

setupDatabase();
