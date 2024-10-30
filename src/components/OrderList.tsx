import React from 'react';
import { Order } from '../types/Order';
import { format } from 'date-fns';

interface OrderListProps {
  orders: Order[];
  title: string;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Pair</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{format(order.timestamp, 'yyyy-MM-dd HH:mm:ss')}</td>
                <td className={`px-4 py-2 ${order.type === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                  {order.type}
                </td>
                <td className="px-4 py-2">{order.tradingPair}</td>
                <td className="px-4 py-2">{order.amount.toFixed(4)}</td>
                <td className="px-4 py-2">{order.price.toFixed(6)}</td>
                <td className="px-4 py-2">{(order.amount * order.price).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}