import React, { useState } from 'react';
import { OrderList } from './components/OrderList';
import { TradeChart } from './components/TradeChart';
import { StatsSummary } from './components/StatsSummary';
import { DashboardCard } from './components/DashboardCard';
import { QuickStats } from './components/QuickStats';
import { RecentOrders } from './components/RecentOrders';
import { MiniChart } from './components/MiniChart';
import { DashboardHeader } from './components/DashboardHeader';
import { OrdersContainer } from './components/OrdersContainer';
import { UpdateStatus } from './components/UpdateStatus';
import { useLogUpdates } from './hooks/useLogUpdates';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');
  const { tradeStats, lastUpdate, handleFileUpload, isPolling } = useLogUpdates();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">HumStat</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`${
                    activeTab === 'dashboard'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`${
                    activeTab === 'analytics'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Analytics
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdate && (
                <UpdateStatus lastUpdate={lastUpdate} isPolling={isPolling} />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept=".log,.txt"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tradeStats ? (
          activeTab === 'dashboard' ? (
            <div className="space-y-6">
              <DashboardHeader stats={tradeStats} />
              <QuickStats stats={tradeStats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard title="Price Trend">
                  <MiniChart orders={[...tradeStats.openOrders, ...tradeStats.closedOrders]} />
                </DashboardCard>
                
                <DashboardCard title="Recent Orders">
                  <RecentOrders orders={[...tradeStats.openOrders, ...tradeStats.closedOrders].sort(
                    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
                  )} />
                </DashboardCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersContainer 
                  orders={tradeStats.openOrders} 
                  type="BUY" 
                />
                <OrdersContainer 
                  orders={tradeStats.openOrders} 
                  type="SELL" 
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <StatsSummary stats={tradeStats} />
              <TradeChart orders={[...tradeStats.openOrders, ...tradeStats.closedOrders]} />
              <OrderList orders={tradeStats.openOrders} title="Open Orders" />
              <OrderList orders={tradeStats.closedOrders} title="Closed Orders" />
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Welcome to HumStat Trading Analytics</h3>
            <p className="mt-1 text-sm text-gray-500">Upload a log file to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;