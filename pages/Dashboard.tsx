import React from 'react';
import { Wallet, PiggyBank, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { WEEKLY_ACTIVITY_DATA, EXPENSE_STATS_DATA, MOCK_TRANSACTIONS } from '../constants';

interface DashboardProps {
  isDark?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDark }) => {
  const chartTextColor = isDark ? '#9CA3AF' : '#718EBF'; // gray-400 : subtext
  const chartGridColor = isDark ? '#374151' : '#F3F3F5'; // gray-700 : light gray
  const tooltipBgColor = isDark ? '#1F2937' : '#FFFFFF'; // gray-800 : white
  const tooltipTextColor = isDark ? '#F3F4F6' : '#343C6A';

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="My Balance" 
          value="KES 12,750" 
          icon={<Wallet size={28} className="text-[#FFBB38]" />}
          subtext="+2% this month"
        />
        <StatCard 
          title="Income" 
          value="KES 5,600" 
          icon={<ArrowDownCircle size={28} className="text-[#396AFF]" />} 
        />
        <StatCard 
          title="Expense" 
          value="KES 3,460" 
          icon={<ArrowUpCircle size={28} className="text-[#FF82AC]" />} 
        />
        <StatCard 
          title="Total Saving" 
          value="KES 7,920" 
          icon={<PiggyBank size={28} className="text-[#16DBCC]" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
          <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Weekly Activity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WEEKLY_ACTIVITY_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={15}
                barGap={10}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTextColor}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '10px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: tooltipBgColor,
                    color: tooltipTextColor
                  }}
                  itemStyle={{ color: tooltipTextColor }}
                />
                <Bar dataKey="deposit" name="Deposit" fill="#16DBCC" radius={[10, 10, 10, 10]} />
                <Bar dataKey="withdraw" name="Withdraw" fill="#1814F3" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Statistics Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm flex flex-col transition-colors">
          <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Expense Statistics</h3>
          <div className="h-[300px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EXPENSE_STATS_DATA}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {EXPENSE_STATS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{
                    borderRadius: '10px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: tooltipBgColor,
                    color: tooltipTextColor
                  }}
                  itemStyle={{ color: tooltipTextColor }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
             {EXPENSE_STATS_DATA.map((item) => (
               <div key={item.name} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.fill}}></div>
                 <span className="text-sm text-subtext dark:text-gray-400">{item.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Quick Transactions Table (Condensed) */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-dark dark:text-white">Recent Transactions</h3>
          <button className="text-primary font-medium hover:underline">See All</button>
        </div>
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr className="text-left text-subtext dark:text-gray-400 text-sm font-medium">
                <th className="pb-4 pl-4 whitespace-nowrap">Description</th>
                <th className="pb-4 whitespace-nowrap">Category</th>
                <th className="pb-4 whitespace-nowrap">Date</th>
                <th className="pb-4 text-right pr-4 whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.slice(0, 3).map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-4 pl-4 flex items-center gap-3 whitespace-nowrap">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      trx.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {trx.type === 'Credit' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                    </div>
                    <span className="font-medium text-dark dark:text-gray-100">{trx.description}</span>
                  </td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{trx.category}</td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{new Date(trx.date).toLocaleDateString()}</td>
                  <td className={`py-4 text-right pr-4 font-medium whitespace-nowrap ${
                    trx.type === 'Credit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {trx.type === 'Credit' ? '+' : '-'}KES {trx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;