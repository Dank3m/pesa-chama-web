import React, { useState, useMemo } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const Transactions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Income' | 'Expense'>('All');
  const itemsPerPage = 5;
  
  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(trx => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Income') return trx.type === 'Credit';
      if (activeFilter === 'Expense') return trx.type === 'Debit';
      return true;
    });
  }, [activeFilter]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Recent Transactions</h3>
        
        {/* Filters */}
        <div className="flex gap-8 mb-6 border-b border-gray-100 dark:border-gray-700 pb-1 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveFilter('All')}
            className={`text-base font-medium pb-3 px-2 whitespace-nowrap transition-colors relative ${
              activeFilter === 'All' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            All Transactions
            {activeFilter === 'All' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
          </button>
          <button 
            onClick={() => setActiveFilter('Income')}
            className={`text-base font-medium pb-3 px-2 whitespace-nowrap transition-colors relative ${
              activeFilter === 'Income' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            Income
            {activeFilter === 'Income' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
          </button>
          <button 
            onClick={() => setActiveFilter('Expense')}
            className={`text-base font-medium pb-3 px-2 whitespace-nowrap transition-colors relative ${
              activeFilter === 'Expense' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            Expense
            {activeFilter === 'Expense' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
          </button>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[800px]">
             <thead className="border-b border-gray-100 dark:border-gray-700">
               <tr className="text-left text-subtext dark:text-gray-400 text-sm font-medium">
                 <th className="pb-4 pl-4 whitespace-nowrap">Description</th>
                 <th className="pb-4 whitespace-nowrap">Transaction ID</th>
                 <th className="pb-4 whitespace-nowrap">Type</th>
                 <th className="pb-4 whitespace-nowrap">Category</th>
                 <th className="pb-4 whitespace-nowrap">Date</th>
                 <th className="pb-4 text-right pr-4 whitespace-nowrap">Amount</th>
               </tr>
             </thead>
             <tbody>
               {currentItems.map((trx) => (
                 <tr key={trx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                   <td className="py-4 pl-4 font-medium text-dark dark:text-gray-100 whitespace-nowrap flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        trx.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {trx.type === 'Credit' ? <ArrowDownCircle size={16} /> : <ArrowUpCircle size={16} />}
                      </div>
                      {trx.description}
                   </td>
                   <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{trx.transactionId}</td>
                   <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{trx.type}</td>
                   <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">
                     <span className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-full text-xs">
                       {trx.category}
                     </span>
                   </td>
                   <td className="py-4 text-subtext dark:text-gray-400 whitespace-nowrap">{new Date(trx.date).toLocaleDateString()}</td>
                   <td className={`py-4 text-right pr-4 font-medium whitespace-nowrap ${
                     trx.type === 'Credit' ? 'text-green-500' : 'text-red-500'
                   }`}>
                     {trx.type === 'Credit' ? '+' : '-'}KES {trx.amount.toLocaleString()}
                   </td>
                 </tr>
               ))}
               {currentItems.length === 0 && (
                 <tr>
                   <td colSpan={6} className="py-8 text-center text-subtext dark:text-gray-500">
                     No transactions found for this category.
                   </td>
                 </tr>
               )}
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
             disabled={currentPage === totalPages || totalPages === 0}
             className="px-3 py-1 text-primary disabled:text-gray-300 dark:disabled:text-gray-600 font-medium whitespace-nowrap"
           >
             Next
           </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;