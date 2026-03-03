import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import type { Word } from '@/types';

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWords();
  }, []);

  async function fetchWords() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('words')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch words');
    } finally {
      setLoading(false);
    }
  }

  async function createWord(english: string, chinese: string) {
    try {
      const { data, error } = await supabase
        .from('words')
        .insert([{ english, chinese }])
        .select()
        .single();

      if (error) throw error;

      setWords((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create word';
      return { success: false, error: message };
    }
  }

  async function updateWord(id: string, english: string, chinese: string) {
    try {
      const { data, error } = await supabase
        .from('words')
        .update({ english, chinese, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setWords((prev) => prev.map((word) => (word.id === id ? data : word)));
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update word';
      return { success: false, error: message };
    }
  }

  async function deleteWord(id: string) {
    try {
      const { error } = await supabase.from('words').delete().eq('id', id);

      if (error) throw error;

      setWords((prev) => prev.filter((word) => word.id !== id));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete word';
      return { success: false, error: message };
    }
  }

  return {
    words,
    loading,
    error,
    createWord,
    updateWord,
    deleteWord,
    refetch: fetchWords,
  };
}
