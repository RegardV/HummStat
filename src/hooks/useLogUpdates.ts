import { useState, useEffect, useCallback, useRef } from 'react';
import { TradeStats } from '../types/Order';
import { parseLogFile } from '../utils/logParser';

const POLLING_INTERVAL = 5000; // 5 seconds

export function useLogUpdates() {
  const [tradeStats, setTradeStats] = useState<TradeStats | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const fileRef = useRef<File | null>(null);

  const processLogFile = useCallback((content: string) => {
    try {
      const stats = parseLogFile(content);
      setTradeStats(stats);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error processing log file:', error);
    }
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    fileRef.current = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      processLogFile(content);
      setIsPolling(true);
    };
    reader.readAsText(file);
  }, [processLogFile]);

  // Poll for updates by reading the file again
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPolling && fileRef.current) {
      intervalId = setInterval(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          processLogFile(content);
        };
        reader.readAsText(fileRef.current!);
      }, POLLING_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPolling, processLogFile]);

  return {
    tradeStats,
    lastUpdate,
    handleFileUpload,
    isPolling
  };
}