import { Order, TradeStats } from '../types/Order';

export function parseLogFile(content: string): TradeStats {
  const lines = content.split('\n');
  const orders: Order[] = [];
  let totalFees = 0;

  lines.forEach(line => {
    if (line.includes('EVENT_LOG')) {
      try {
        const jsonStr = line.substring(line.indexOf('{'));
        const event = JSON.parse(jsonStr);

        if (['BuyOrderCreatedEvent', 'SellOrderCreatedEvent', 'OrderFilledEvent'].includes(event.event_name)) {
          const order: Order = {
            id: event.order_id,
            type: event.event_name.includes('Buy') ? 'BUY' : 'SELL',
            status: event.event_name.includes('Filled') ? 'CLOSED' : 'OPEN',
            tradingPair: event.trading_pair,
            amount: parseFloat(event.amount),
            price: parseFloat(event.price),
            timestamp: new Date(event.timestamp * 1000)
          };

          if (event.trade_fee) {
            const feePercent = parseFloat(event.trade_fee.percent);
            order.fee = order.amount * order.price * feePercent;
            totalFees += order.fee;
          }

          orders.push(order);
        }
      } catch (error) {
        console.error('Error parsing log line:', error);
      }
    }
  });

  const openOrders = orders.filter(order => order.status === 'OPEN');
  const closedOrders = orders.filter(order => order.status === 'CLOSED');

  const startDate = new Date(Math.min(...orders.map(o => o.timestamp.getTime())));
  const endDate = new Date(Math.max(...orders.map(o => o.timestamp.getTime())));

  const pairs = [...new Set(orders.map(o => o.tradingPair))];
  const startValue = {};
  const endValue = {};

  pairs.forEach(pair => {
    const pairOrders = orders.filter(o => o.tradingPair === pair);
    startValue[pair] = pairOrders[0].price;
    endValue[pair] = pairOrders[pairOrders.length - 1].price;
  });

  return {
    startDate,
    endDate,
    startValue,
    endValue,
    totalFees,
    openOrders,
    closedOrders
  };
}