import React, { useState, useMemo } from 'react';
import { PiggyBank, Calendar, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';
import { MOCK_CONTRIBUTIONS } from '../constants';

const Contributions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate Summaries (Always use full dataset)
  const summary = useMemo(() => {
    const total = MOCK_CONTRIBUTIONS.reduce((sum, item) => sum + item.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthTotal = MOCK_CONTRIBUTIONS
      .filter(item => {
        const d = new Date(item.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    // Estimated Dividend: Assuming 12% return on total contributions for the year
    const estimatedDividend = total * 0.12;

    return { total, monthTotal, estimatedDividend };
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MOCK_CONTRIBUTIONS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(MOCK_CONTRIBUTIONS.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard 
          title="Total Contribution" 
          value={`KES ${summary.total.toLocaleString()}`} 
          icon={<PiggyBank size={28} className="text-[#16DBCC]" />}
          subtext="Lifetime contributions"
        />
        <StatCard 
          title="This Month" 
          value={`KES ${summary.monthTotal.toLocaleString()}`} 
          icon={<Calendar size={28} className="text-[#FF82AC]" />} 
          subtext="October 2023"
        />
        <StatCard 
          title="Est. Dividend (Year End)" 
          value={`KES ${summary.estimatedDividend.toLocaleString()}`} 
          icon={<TrendingUp size={28} className="text-[#396AFF]" />} 
          subtext="Based on 12% ROI"
        />
      </div>

      {/* Contributions Table */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-dark dark:text-white">Contribution History</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-bgLight dark:bg-gray-700 text-subtext dark:text-gray-300 rounded-full text-sm font-medium hover:text-dark dark:hover:text-white whitespace-nowrap">Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr className="text-left text-subtext dark:text-gray-400 text-sm font-medium">
                <th className="pb-4 pl-4 whitespace-nowrap">Transaction ID</th>
                <th className="pb-4 whitespace-nowrap">Date</th>
                <th className="pb-4 whitespace-nowrap">Type</th>
                <th className="pb-4 whitespace-nowrap">Method</th>
                <th className="pb-4 whitespace-nowrap">Status</th>
                <th className="pb-4 text-right pr-4 whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-4 pl-4 font-medium text-dark dark:text-white whitespace-nowrap">{item.transactionId}</td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">
                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'Monthly' ? 'bg-blue-50 text-primary' :
                        item.type === 'Penalty' ? 'bg-red-50 text-secondary' :
                        'bg-yellow-50 text-yellow-600'
                     }`}>
                       {item.type}
                     </span>
                  </td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{item.method}</td>
                  <td className="py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4 font-bold text-dark dark:text-white whitespace-nowrap">
                    KES {item.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-2 mt-6">
           <button 
             onClick={() => paginate(Math.max(1, currentPage - 1))}
             disabled={currentPage === 1}
             className="px-3 py-1 text-primary disabled:text-gray-300 dark:disabled:text-gray-600 font-medium whitespace-nowrap"
           >
             Previous
           </button>
           {Array.from({ length: totalPages }, (_, i) => (
             <button
               key={i + 1}
               onClick={() => paginate(i + 1)}
               className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium ${
                 currentPage === i + 1 ? 'bg-primary text-white' : 'text-primary hover:bg-blue-50 dark:hover:bg-gray-700'
               }`}
             >
               {i + 1}
             </button>
           ))}
           <button 
             onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
             disabled={currentPage === totalPages}
             className="px-3 py-1 text-primary disabled:text-gray-300 dark:disabled:text-gray-600 font-medium whitespace-nowrap"
           >
             Next
           </button>
        </div>
      </div>
    </div>
  );
};

export default Contributions;