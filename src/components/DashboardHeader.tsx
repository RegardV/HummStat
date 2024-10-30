import React from 'react';
import { format, differenceInMinutes, isValid } from 'date-fns';
import { TradeStats } from '../types/Order';

interface DashboardHeaderProps {
  stats: TradeStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ stats }) => {
  const formatDate = (date: Date | null): string => {
    if (!date || !isValid(date)) {
      return 'N/A';
    }
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  const calculateRuntime = (start: Date | null, end: Date | null): string => {
    if (!start || !end || !isValid(start) || !isValid(end)) {
      return 'N/A';
    }
    const minutes = differenceInMinutes(end, start);
    return `${minutes} minutes`;
  };

  const tradingPair = stats.tradingPair || 'N/A';
  const startDate = stats.startDate instanceof Date ? stats.startDate : null;
  const endDate = stats.endDate instanceof Date ? stats.endDate : null;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Trading Pair</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">{tradingPair}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Start Time</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatDate(startDate)}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">End Time</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatDate(endDate)}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Runtime</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {calculateRuntime(startDate, endDate)}
          </p>
        </div>
      </div>
    </div>
  );
};