import React from 'react';
import { Order } from '../types/Order';
import { format } from 'date-fns';

interface RecentOrdersProps {
  orders: Order[];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-2">Time</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Fee</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, index) => (
            <tr key={`${order.id}-${order.timestamp.getTime()}-${index}`} className="border-t border-gray-100">
              <td className="py-2 text-sm">{format(order.timestamp, 'HH:mm:ss')}</td>
              <td className={`py-2 text-sm ${
                order.type === 'BUY' ? 'text-green-600' : 'text-red-600'
              }`}>
                {order.type}
              </td>
              <td className="py-2 text-sm">{order.amount.toFixed(4)}</td>
              <td className="py-2 text-sm">${order.price.toFixed(6)}</td>
              <td className="py-2 text-sm">{order.fee ? `$${order.fee.toFixed(6)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}