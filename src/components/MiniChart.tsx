import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Order } from '../types/Order';
import { format } from 'date-fns';

interface MiniChartProps {
  orders: Order[];
}

export const MiniChart: React.FC<MiniChartProps> = ({ orders }) => {
  const data = orders.map(order => ({
    time: order.timestamp,
    price: order.price
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis 
          dataKey="time"
          tickFormatter={(time) => format(time, 'HH:mm:ss')}
          interval="preserveStartEnd"
        />
        <YAxis 
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toFixed(6)}`}
        />
        <Tooltip 
          contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
          labelFormatter={(label) => format(new Date(label), 'yyyy-MM-dd HH:mm:ss')}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#6366f1" 
          dot={false} 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}