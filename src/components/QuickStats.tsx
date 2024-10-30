import React from 'react';
import { TradeStats } from '../types/Order';

interface QuickStatsProps {
  stats: TradeStats;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const totalOrders = stats.openOrders.length + stats.closedOrders.length;
  const totalVolume = [...stats.openOrders, ...stats.closedOrders]
    .reduce((sum, order) => sum + (order.amount * order.price), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-blue-600 text-sm font-medium">Total Orders</p>
        <p className="text-2xl font-bold text-blue-900">{totalOrders}</p>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <p className="text-green-600 text-sm font-medium">Open Orders</p>
        <p className="text-2xl font-bold text-green-900">{stats.openOrders.length}</p>
      </div>
      <div className="bg-purple-50 rounded-lg p-4">
        <p className="text-purple-600 text-sm font-medium">Trading Volume</p>
        <p className="text-2xl font-bold text-purple-900">${totalVolume.toFixed(2)}</p>
      </div>
      <div className="bg-red-50 rounded-lg p-4">
        <p className="text-red-600 text-sm font-medium">Total Fees</p>
        <p className="text-2xl font-bold text-red-900">${stats.totalFees.toFixed(2)}</p>
      </div>
    </div>
  );
}