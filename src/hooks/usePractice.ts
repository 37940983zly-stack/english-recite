import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import type { Word } from '@/types';

export function usePractice() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getRandomWord() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('words')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        setError('No words available for practice');
        return null;
      }

      // Select a random word
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex];
      setCurrentWord(randomWord);
      return randomWord;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch word';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function recordPractice(wordId: string, isCorrect: boolean) {
    try {
      const { error } = await supabase
        .from('practice_records')
        .insert([{ word_id: wordId, is_correct: isCorrect }]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to record practice';
      return { success: false, error: message };
    }
  }

  return {
    currentWord,
    loading,
    error,
    getRandomWord,
    recordPractice,
  };
}
