import React from 'react';
import { Order } from '../types/Order';
import { format } from 'date-fns';

interface OrdersContainerProps {
  orders: Order[];
  type: 'BUY' | 'SELL';
}

export const OrdersContainer: React.FC<OrdersContainerProps> = ({ orders, type }) => {
  const filteredOrders = orders.filter(order => order.type === type && order.status === 'OPEN');

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Open {type} Orders
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-2">Time</th>
              <th className="pb-2">Pair</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="py-2 text-sm">{format(order.timestamp, 'HH:mm:ss')}</td>
                <td className="py-2 text-sm">{order.tradingPair}</td>
                <td className="py-2 text-sm">{order.amount.toFixed(4)}</td>
                <td className="py-2 text-sm">${order.price.toFixed(6)}</td>
                <td className="py-2 text-sm">${(order.amount * order.price).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}