import React, { useState, useMemo } from 'react';
import { Receipt, Calendar, TrendingDown, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import { MOCK_EXPENSES } from '../constants';

const Expenses: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate Summaries
  const summary = useMemo(() => {
    const total = MOCK_EXPENSES.reduce((sum, item) => sum + item.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthTotal = MOCK_EXPENSES
      .filter(item => {
        const d = new Date(item.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    return { total, monthTotal };
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MOCK_EXPENSES.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(MOCK_EXPENSES.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Total Expenses" 
          value={`KES ${summary.total.toLocaleString()}`} 
          icon={<TrendingDown size={28} className="text-[#FE5C73]" />}
          subtext="Lifetime expenses"
        />
        <StatCard 
          title="This Month" 
          value={`KES ${summary.monthTotal.toLocaleString()}`} 
          icon={<Calendar size={28} className="text-[#343C6A]" />} 
          subtext="October 2023"
        />
      </div>

      {/* Expenses Table */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-dark dark:text-white">Expense History</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-blue-700 transition">Record Expense</button>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr className="text-left text-subtext dark:text-gray-400 text-sm font-medium">
                <th className="pb-4 pl-4 whitespace-nowrap">Description</th>
                <th className="pb-4 whitespace-nowrap">Category</th>
                <th className="pb-4 whitespace-nowrap">Date</th>
                <th className="pb-4 whitespace-nowrap">Status</th>
                <th className="pb-4 whitespace-nowrap">Approved By</th>
                <th className="pb-4 text-right pr-4 whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-4 pl-4 font-medium text-dark dark:text-white whitespace-nowrap flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-secondary shrink-0">
                        <Receipt size={14} />
                    </div>
                    {item.description}
                  </td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">
                     <span className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-full text-xs">
                       {item.category}
                     </span>
                  </td>
                  <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                   <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{item.approvedBy || '-'}</td>
                  <td className="py-4 text-right pr-4 font-bold text-red-500 whitespace-nowrap">
                    -KES {item.amount.toLocaleString()}
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

export default Expenses;