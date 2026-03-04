import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "search_history";
const MAX_HISTORY = 10;

export interface SearchHistoryItem {
  code: string;
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from AsyncStorage on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SearchHistoryItem[];
        setHistory(parsed);
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = async (code: string) => {
    try {
      const trimmedCode = code.trim();
      if (!trimmedCode) return;

      // Remove duplicate if it exists
      const filtered = history.filter((item) => item.code !== trimmedCode);

      // Add new item to the beginning
      const newHistory = [
        { code: trimmedCode, timestamp: Date.now() },
        ...filtered,
      ].slice(0, MAX_HISTORY);

      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error adding to search history:", error);
    }
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  };

  const removeFromHistory = async (code: string) => {
    try {
      const filtered = history.filter((item) => item.code !== code);
      setHistory(filtered);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error removing from search history:", error);
    }
  };

  return {
    history,
    isLoading,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}
