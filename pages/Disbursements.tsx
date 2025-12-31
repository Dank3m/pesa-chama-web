import React, { useState } from 'react';
import { CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { MOCK_LOANS, CURRENT_USER } from '../constants';
import { Loan } from '../types';

const Disbursements: React.FC = () => {
  // Simulating local state for this view
  const [loans, setLoans] = useState<Loan[]>(MOCK_LOANS);

  const pendingLoans = loans.filter(l => l.status === 'Pending' || l.status === 'Approved');

  const handleStatusChange = (id: string, newStatus: Loan['status']) => {
    setLoans(prev => prev.map(loan => loan.id === id ? { ...loan, status: newStatus } : loan));
  };

  // Guard clause just in case
  if (CURRENT_USER.role !== 'Admin' && CURRENT_USER.role !== 'Treasurer') {
    return (
      <div className="flex items-center justify-center h-[50vh] text-subtext dark:text-gray-400">
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Loan Disbursements & Approvals</h3>
          <p className="text-subtext dark:text-gray-400">
             Manage member loan applications. Approve pending requests and disburse funds to approved loans.
             {CURRENT_USER.role === 'Treasurer' && <span className="block mt-1 text-xs text-primary font-medium">Viewing requests for your banking group.</span>}
          </p>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[900px]">
            <thead className="bg-bgLight dark:bg-gray-700 text-subtext dark:text-gray-300 text-left text-sm font-medium rounded-xl">
              <tr>
                <th className="p-4 rounded-l-xl whitespace-nowrap">Applicant</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Type</th>
                <th className="p-4 whitespace-nowrap">Date Applied</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 rounded-r-xl whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-dark dark:text-gray-200">
              {pendingLoans.map(loan => (
                <tr key={loan.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-4 font-medium text-dark dark:text-white whitespace-nowrap">{loan.applicantName}</td>
                  <td className="p-4 font-bold text-primary whitespace-nowrap">KES {loan.amount.toLocaleString()}</td>
                  <td className="p-4 text-subtext dark:text-gray-400 whitespace-nowrap">
                     <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs">{loan.type}</span>
                  </td>
                  <td className="p-4 text-subtext dark:text-gray-400 whitespace-nowrap">{new Date(loan.dateApplied).toLocaleDateString()}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${loan.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2 whitespace-nowrap">
                    {loan.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(loan.id, 'Approved')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 whitespace-nowrap transition"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button 
                         onClick={() => handleStatusChange(loan.id, 'Rejected')}
                         className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 whitespace-nowrap transition"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    )}
                    {loan.status === 'Approved' && (
                       <button 
                         onClick={() => handleStatusChange(loan.id, 'Disbursed')}
                         className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-xs hover:bg-blue-600 whitespace-nowrap transition"
                       >
                         <DollarSign size={14} /> Disburse Funds
                       </button>
                    )}
                  </td>
                </tr>
              ))}
              {pendingLoans.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-subtext dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                       <CheckCircle size={32} className="text-gray-200 dark:text-gray-600" />
                       <p>No pending loans requiring action.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Disbursements;