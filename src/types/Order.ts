export interface Order {
  id: string;
  type: 'BUY' | 'SELL';
  status: 'OPEN' | 'CLOSED';
  tradingPair: string;
  price: number;
  amount: number;
  timestamp: Date;
  fee?: number;
}

export interface TradeStats {
  tradingPair: string;
  startDate: Date | null;
  endDate: Date | null;
  openOrders: Order[];
  closedOrders: Order[];
  totalFees: number;
  startValue?: number;
  endValue?: number;
}