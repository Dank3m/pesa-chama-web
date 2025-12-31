import React, { useState } from 'react';
import { Edit2, Bell, Shield } from 'lucide-react';
import { CURRENT_USER } from '../constants';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit-profile' | 'preferences' | 'security'>('edit-profile');
  
  // Mock state for preferences toggles
  const [toggles, setToggles] = useState({
    digitalPayment: true,
    merchantOrder: false,
    recommendations: true,
    twoFactor: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-3xl shadow-sm min-h-[600px] transition-colors">
      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-gray-100 dark:border-gray-700 mb-8 overflow-x-auto no-scrollbar">
         <button 
           onClick={() => setActiveTab('edit-profile')}
           className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors relative ${activeTab === 'edit-profile' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
         >
           Edit Profile
           {activeTab === 'edit-profile' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
         </button>
         <button 
           onClick={() => setActiveTab('preferences')}
           className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors relative ${activeTab === 'preferences' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
         >
           Preferences
           {activeTab === 'preferences' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
         </button>
         <button 
           onClick={() => setActiveTab('security')}
           className={`pb-3 px-2 font-medium whitespace-nowrap transition-colors relative ${activeTab === 'security' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
         >
           Security
           {activeTab === 'security' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
         </button>
      </div>

      {/* Edit Profile Tab */}
      {activeTab === 'edit-profile' && (
        <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4">
             <div className="relative">
               <img 
                src={CURRENT_USER.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
               />
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-700 transition">
                 <Edit2 size={14} />
               </button>
             </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Your Name</label>
               <input type="text" defaultValue={CURRENT_USER.name} className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">User Name</label>
               <input type="text" defaultValue="Charlene Reed" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Email</label>
               <input type="email" defaultValue={CURRENT_USER.email} className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Date of Birth</label>
               <input type="text" defaultValue="25 January 1990" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Present Address</label>
               <input type="text" defaultValue="San Jose, California, USA" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Permanent Address</label>
               <input type="text" defaultValue="San Jose, California, USA" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">City</label>
               <input type="text" defaultValue="San Jose" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Postal Code</label>
               <input type="text" defaultValue="45962" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Country</label>
               <input type="text" defaultValue="USA" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             
             <div className="md:col-span-2 flex justify-end mt-4">
               <button className="bg-primary text-white px-12 py-3 rounded-2xl font-medium hover:bg-blue-700 transition w-full md:w-auto">
                 Save
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="max-w-3xl animate-in fade-in duration-300 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Currency</label>
               <input type="text" defaultValue="KES" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-subtext dark:text-gray-400 text-sm">Time Zone</label>
               <input type="text" defaultValue="(GMT+03:00) Nairobi" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
             </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-dark dark:text-white mb-4">Notification Settings</h4>
            
            <div className="space-y-4">
              {/* Digital Currency Notification Toggle */}
              <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="mt-1"><Bell size={20} className="text-primary" /></div>
                   <div>
                     <p className="font-medium text-dark dark:text-white text-base">Digital Currency Notification</p>
                     <p className="text-subtext dark:text-gray-400 text-xs">Receive notification for every transaction</p>
                   </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={toggles.digitalPayment} onChange={() => handleToggle('digitalPayment')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Merchant Order Notification Toggle */}
              <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="mt-1"><Bell size={20} className="text-primary" /></div>
                   <div>
                     <p className="font-medium text-dark dark:text-white text-base">Merchant Order Notification</p>
                     <p className="text-subtext dark:text-gray-400 text-xs">Receive notification for every merchant order</p>
                   </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={toggles.merchantOrder} onChange={() => handleToggle('merchantOrder')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Recommendations Notification Toggle */}
              <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                   <div className="mt-1"><Bell size={20} className="text-primary" /></div>
                   <div>
                     <p className="font-medium text-dark dark:text-white text-base">Recommendations Notification</p>
                     <p className="text-subtext dark:text-gray-400 text-xs">Receive recommendations from our platform</p>
                   </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={toggles.recommendations} onChange={() => handleToggle('recommendations')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
             <button className="bg-primary text-white px-12 py-3 rounded-2xl font-medium hover:bg-blue-700 transition w-full md:w-auto">
               Save Preferences
             </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="max-w-2xl animate-in fade-in duration-300 space-y-8">
           <div className="space-y-4">
             <h4 className="text-lg font-bold text-dark dark:text-white">Change Password</h4>
             <div className="space-y-3">
               <div>
                 <label className="text-subtext dark:text-gray-400 text-sm mb-1 block">Current Password</label>
                 <input type="password" placeholder="********" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
               </div>
               <div>
                 <label className="text-subtext dark:text-gray-400 text-sm mb-1 block">New Password</label>
                 <input type="password" placeholder="********" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
               </div>
               <div>
                 <label className="text-subtext dark:text-gray-400 text-sm mb-1 block">Confirm Password</label>
                 <input type="password" placeholder="********" className="w-full p-4 rounded-2xl bg-bgLight dark:bg-gray-700 border border-transparent text-dark dark:text-white outline-none focus:border-primary transition-colors" />
               </div>
             </div>
           </div>

           <div className="space-y-4 pt-4">
             <h4 className="text-lg font-bold text-dark dark:text-white">Two-Factor Authentication</h4>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-100 rounded-full text-green-600">
                      <Shield size={20}/>
                   </div>
                   <div>
                     <p className="font-medium text-dark dark:text-white">Enable 2FA</p>
                     <p className="text-xs text-subtext dark:text-gray-400">Secure your account with 2FA</p>
                   </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={toggles.twoFactor} onChange={() => handleToggle('twoFactor')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
             </div>
           </div>

           <div className="flex justify-end mt-8">
             <button className="bg-primary text-white px-12 py-3 rounded-2xl font-medium hover:bg-blue-700 transition w-full md:w-auto">
               Save Security Settings
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Settings;