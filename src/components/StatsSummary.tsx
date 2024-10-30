import React from 'react';
import { TradeStats } from '../types/Order';
import { format } from 'date-fns';

interface StatsSummaryProps {
  stats: TradeStats;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Trading Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Start Date:</p>
          <p>{format(stats.startDate, 'yyyy-MM-dd HH:mm:ss')}</p>
        </div>
        <div>
          <p className="font-semibold">End Date:</p>
          <p>{format(stats.endDate, 'yyyy-MM-dd HH:mm:ss')}</p>
        </div>
        {Object.entries(stats.startValue).map(([pair, value]) => (
          <div key={pair}>
            <p className="font-semibold">Start Value ({pair}):</p>
            <p>{value.toFixed(4)}</p>
          </div>
        ))}
        {Object.entries(stats.endValue).map(([pair, value]) => (
          <div key={pair}>
            <p className="font-semibold">End Value ({pair}):</p>
            <p>{value.toFixed(4)}</p>
          </div>
        ))}
        <div>
          <p className="font-semibold">Total Fees:</p>
          <p>{stats.totalFees.toFixed(4)} USDT</p>
        </div>
      </div>
    </div>
  );
}