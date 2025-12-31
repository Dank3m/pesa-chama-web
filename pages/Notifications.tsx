import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';

const Notifications: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-3xl shadow-sm min-h-[600px] transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-dark dark:text-white">Notifications</h3>
        <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.length > 0 ? (
          MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border flex gap-4 transition-colors ${
                notif.read 
                  ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' 
                  : 'bg-blue-50 dark:bg-gray-700 border-blue-100 dark:border-gray-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                notif.type === 'success' ? 'bg-green-100 text-green-600' : 
                notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-primary'
              }`}>
                {notif.type === 'success' ? <CheckCircle size={20} /> : 
                 notif.type === 'alert' ? <AlertCircle size={20} /> : <Info size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`font-semibold ${notif.read ? 'text-dark dark:text-gray-200' : 'text-primary'}`}>{notif.title}</h4>
                  <span className="text-xs text-subtext dark:text-gray-400">{notif.time}</span>
                </div>
                <p className="text-subtext dark:text-gray-300 text-sm mt-1">{notif.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
             <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 mb-4">
               <Bell size={32} />
             </div>
             <p className="text-subtext dark:text-gray-400">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;