import React from 'react';
import { format } from 'date-fns';

interface UpdateStatusProps {
  lastUpdate: Date | null;
  isPolling: boolean;
}

export const UpdateStatus: React.FC<UpdateStatusProps> = ({ lastUpdate, isPolling }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <div className={`w-2 h-2 rounded-full ${isPolling ? 'bg-green-500' : 'bg-gray-500'}`} />
      <span>
        {isPolling ? 'Live Updates' : 'Updates Paused'}
      </span>
      {lastUpdate && (
        <span>• Last Update: {format(lastUpdate, 'HH:mm:ss')}</span>
      )}
    </div>
  );
}