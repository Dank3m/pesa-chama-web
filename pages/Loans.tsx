import React, { useState, useMemo, useEffect } from 'react';
import { DollarSign, Briefcase, User, Calculator, CheckCircle, XCircle, AlertCircle, X, Loader2 } from 'lucide-react';
import { CalculationPeriod, Loan } from '../types';
import { MOCK_LOANS, CURRENT_USER } from '../constants';

// --- Loan Application Modal ---
interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Loan>) => Promise<void>;
  defaultAmount?: number;
  defaultDuration?: number;
}

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  defaultAmount = 5000, 
  defaultDuration = 12 
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: defaultAmount,
    duration: defaultDuration,
    type: 'Personal',
    purpose: ''
  });

  // Reset/Update form when defaults change or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        amount: defaultAmount,
        duration: defaultDuration
      }));
    }
  }, [isOpen, defaultAmount, defaultDuration]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        amount: Number(formData.amount),
        repaymentPeriod: Number(formData.duration),
        type: formData.type as any,
        // purpose: formData.purpose // This would be sent to the backend
      });
      onClose();
    } catch (error) {
      console.error("Failed to apply", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] transition-colors">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700 shrink-0">
          <h3 className="text-xl font-bold text-dark dark:text-white">Apply for a Loan</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-dark dark:text-gray-400 font-semibold text-xs mt-0.5">KES</span>
                <input 
                  type="number" 
                  required
                  min="100"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full pl-12 pr-4 py-3 bg-bgLight dark:bg-gray-900 rounded-xl border border-transparent dark:border-gray-700 focus:border-primary outline-none text-dark dark:text-white font-medium transition" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Duration (Months)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-bgLight dark:bg-gray-900 rounded-xl border border-transparent dark:border-gray-700 focus:border-primary outline-none text-dark dark:text-white font-medium transition" 
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Loan Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-bgLight dark:bg-gray-900 rounded-xl border border-transparent dark:border-gray-700 focus:border-primary outline-none text-dark dark:text-white font-medium transition appearance-none cursor-pointer"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Emergency">Emergency</option>
                  </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Purpose of Loan</label>
              <textarea 
                rows={3}
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                placeholder="Briefly describe why you need this loan..."
                className="w-full px-4 py-3 bg-bgLight dark:bg-gray-900 rounded-xl border border-transparent dark:border-gray-700 focus:border-primary outline-none text-dark dark:text-white font-medium transition resize-none" 
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-3 text-subtext font-medium hover:text-dark dark:hover:text-white transition bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Loan Calculator Component ---
const LoanCalculator = ({ onApply }: { onApply: (amount: number, duration: number) => void }) => {
  const [amount, setAmount] = useState<number>(10000);
  const [rate, setRate] = useState<number>(10);
  const [duration, setDuration] = useState<number>(12);
  const [period, setPeriod] = useState<'Months' | 'Years'>('Months');
  const [compoundFreq, setCompoundFreq] = useState<CalculationPeriod>(CalculationPeriod.Monthly);
  const [interestRatePeriod, setInterestRatePeriod] = useState<'Monthly' | 'Yearly'>('Yearly');

  const results = useMemo(() => {
    // Formula: A = P(1 + r/n)^(nt)
    // P = amount, r = annual rate/100, n = times per year, t = years
    
    const P = amount;
    
    // Normalize rate to annual decimal
    let annualRate = rate;
    if (interestRatePeriod === 'Monthly') {
      annualRate = rate * 12;
    }
    const r = annualRate / 100;
    
    // Determine n (times compounded per year)
    let n = 12;
    if (compoundFreq === CalculationPeriod.Daily) n = 365;
    if (compoundFreq === CalculationPeriod.Weekly) n = 52;
    if (compoundFreq === CalculationPeriod.Monthly) n = 12;
    if (compoundFreq === CalculationPeriod.Yearly) n = 1;

    // Determine t (time in years)
    const t = period === 'Months' ? duration / 12 : duration;

    const A = P * Math.pow((1 + r / n), (n * t));
    const totalInterest = A - P;
    
    const totalMonths = t * 12;
    const monthlyPayment = totalMonths > 0 ? A / totalMonths : A;

    return {
      totalRepayment: A,
      interest: totalInterest,
      monthlyInstallment: monthlyPayment
    };
  }, [amount, rate, duration, period, compoundFreq, interestRatePeriod]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-gray-700 rounded-full text-primary">
          <Calculator size={24} />
        </div>
        <h3 className="text-xl font-bold text-dark dark:text-white">Loan Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Loan Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-subtext dark:text-gray-400 text-xs mt-0.5">KES</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium" 
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Duration</label>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium" 
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Period</label>
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value as any)}
                className="w-full px-2 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium"
              >
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Interest Rate (%)</label>
             <div className="flex gap-4">
               <input 
                  type="number" 
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="flex-1 px-4 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium" 
                />
                <select 
                  value={interestRatePeriod}
                  onChange={(e) => setInterestRatePeriod(e.target.value as 'Monthly' | 'Yearly')}
                  className="w-1/3 px-2 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-subtext dark:text-gray-400 mb-2">Compounding</label>
            <select 
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(e.target.value as CalculationPeriod)}
              className="w-full px-4 py-3 bg-bgLight dark:bg-gray-700 rounded-xl border-none outline-none text-dark dark:text-white font-medium"
            >
              <option value={CalculationPeriod.Daily}>Daily</option>
              <option value={CalculationPeriod.Weekly}>Weekly</option>
              <option value={CalculationPeriod.Monthly}>Monthly</option>
              <option value={CalculationPeriod.Yearly}>Yearly</option>
            </select>
          </div>
        </div>

        <div className="bg-bgLight dark:bg-gray-700 rounded-2xl p-6 flex flex-col justify-center space-y-6 transition-colors">
          <div>
            <p className="text-subtext dark:text-gray-300 text-sm mb-1">Monthly Installment</p>
            <h2 className="text-3xl font-bold text-dark dark:text-white">KES {results.monthlyInstallment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
             <div className="flex justify-between mb-2">
               <span className="text-subtext dark:text-gray-400">Total Interest</span>
               <span className="font-semibold text-red-500">KES {results.interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-subtext dark:text-gray-400">Total Repayment</span>
               <span className="font-semibold text-primary">KES {results.totalRepayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
             </div>
          </div>
          <button 
            onClick={() => onApply(amount, period === 'Months' ? duration : duration * 12)}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Apply for this Amount
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Loans Page ---
const Loans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Calculator'>('Overview');
  const [loans, setLoans] = useState<Loan[]>(MOCK_LOANS);
  const [loanCategory, setLoanCategory] = useState<'Active' | 'Completed'>('Active');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaults, setModalDefaults] = useState({ amount: 5000, duration: 12 });

  const displayedLoans = useMemo(() => {
    return loans.filter(loan => {
      if (loanCategory === 'Active') {
        return ['Pending', 'Approved', 'Disbursed'].includes(loan.status);
      }
      return ['Repaid', 'Rejected'].includes(loan.status);
    });
  }, [loans, loanCategory]);

  const handleOpenModal = (amount: number = 5000, duration: number = 12) => {
    setModalDefaults({ amount, duration });
    setIsModalOpen(true);
  };

  const handleApplyLoan = async (data: Partial<Loan>) => {
    // Simulate API Call to github repo endpoint
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newLoan: Loan = {
          id: Math.random().toString(36).substr(2, 9),
          applicantName: CURRENT_USER.name,
          amount: data.amount || 0,
          type: data.type as any,
          dateApplied: new Date().toISOString(),
          status: 'Pending',
          repaymentPeriod: data.repaymentPeriod || 12,
          interestRate: 10 // Default mock rate
        };
        setLoans([newLoan, ...loans]);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="space-y-6">
      <LoanApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplyLoan}
        defaultAmount={modalDefaults.amount}
        defaultDuration={modalDefaults.duration}
      />

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-1 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('Overview')}
          className={`pb-3 px-4 font-medium transition-colors relative whitespace-nowrap ${activeTab === 'Overview' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
        >
          My Loans
          {activeTab === 'Overview' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('Calculator')}
          className={`pb-3 px-4 font-medium transition-colors relative whitespace-nowrap ${activeTab === 'Calculator' ? 'text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
        >
          Calculator
          {activeTab === 'Calculator' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-lg"></div>}
        </button>
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-dark dark:text-white">My Loans</h3>
                
                {/* Active/Completed Filter */}
                <div className="bg-bgLight dark:bg-gray-700 p-1 rounded-xl flex">
                  <button 
                    onClick={() => setLoanCategory('Active')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${loanCategory === 'Active' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
                  >
                    Active
                  </button>
                  <button 
                    onClick={() => setLoanCategory('Completed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${loanCategory === 'Completed' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white'}`}
                  >
                    Completed
                  </button>
                </div>
             </div>

             {/* Updated Table Container */}
             <div className="overflow-x-auto pb-4">
               <table className="w-full min-w-[900px]">
                 <thead className="bg-bgLight dark:bg-gray-700 text-subtext dark:text-gray-300 text-left text-sm font-medium rounded-xl">
                   <tr>
                     <th className="p-4 rounded-l-xl whitespace-nowrap">Loan No.</th>
                     <th className="p-4 whitespace-nowrap">Money</th>
                     <th className="p-4 whitespace-nowrap">Status</th>
                     <th className="p-4 whitespace-nowrap">Left to Repay</th>
                     <th className="p-4 rounded-r-xl whitespace-nowrap">Action</th>
                   </tr>
                 </thead>
                 <tbody className="text-dark dark:text-gray-200">
                   {displayedLoans.map((loan, idx) => (
                     <tr key={loan.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                       <td className="p-4 font-medium whitespace-nowrap">0{idx + 1}.</td>
                       <td className="p-4 whitespace-nowrap">KES {loan.amount.toLocaleString()}</td>
                       <td className="p-4 whitespace-nowrap">
                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                           loan.status === 'Approved' ? 'bg-green-100 text-green-600' :
                           loan.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                           loan.status === 'Disbursed' ? 'bg-blue-100 text-blue-600' :
                           loan.status === 'Repaid' ? 'bg-indigo-100 text-indigo-600' :
                           'bg-red-100 text-red-600'
                         }`}>
                           {loan.status}
                         </span>
                       </td>
                       <td className="p-4 text-subtext dark:text-gray-400 whitespace-nowrap">
                          {loan.status === 'Disbursed' ? `KES ${(loan.amount * 0.8).toLocaleString()}` : 
                           loan.status === 'Repaid' ? 'KES 0' : '-'}
                       </td>
                       <td className="p-4 whitespace-nowrap">
                         {loan.status === 'Disbursed' ? (
                           <button className="px-4 py-2 border border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-white transition">
                             Repay
                           </button>
                         ) : loan.status === 'Repaid' || loan.status === 'Rejected' ? (
                            <span className="text-sm text-subtext dark:text-gray-500 italic">Closed</span>
                         ) : (
                           <span className="text-sm text-subtext dark:text-gray-500 italic">Wait for approval</span>
                         )}
                       </td>
                     </tr>
                   ))}
                   {displayedLoans.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-subtext dark:text-gray-400">
                          No {loanCategory.toLowerCase()} loans found.
                        </td>
                      </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>

           {/* Quick Apply Card */}
           <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div className="w-12 h-12 bg-red-100 text-secondary rounded-full flex items-center justify-center mb-4">
                  <Briefcase />
                </div>
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Need Cash?</h3>
                <p className="text-subtext dark:text-gray-400 text-sm mb-6">Apply for a quick personal or business loan with competitive interest rates.</p>
                <div className="space-y-4">
                  <div 
                    onClick={() => handleOpenModal(50000, 12)}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-bgLight dark:bg-gray-700 p-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition gap-2"
                  >
                     <div className="flex items-center gap-3">
                       <User size={20} className="text-subtext dark:text-gray-400"/>
                       <span className="text-sm font-medium text-dark dark:text-white">Personal Loan</span>
                     </div>
                     <span className="font-bold text-dark dark:text-white">KES 50,000</span>
                  </div>
                  <div 
                    onClick={() => handleOpenModal(100000, 24)}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-bgLight dark:bg-gray-700 p-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition gap-2"
                  >
                     <div className="flex items-center gap-3">
                       <Briefcase size={20} className="text-subtext dark:text-gray-400"/>
                       <span className="text-sm font-medium text-dark dark:text-white">Corporate Loan</span>
                     </div>
                     <span className="font-bold text-dark dark:text-white">KES 100,000</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleOpenModal()} 
                className="w-full mt-6 bg-dark dark:bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-black transition"
              >
                Apply Now
              </button>
           </div>
        </div>
      )}

      {activeTab === 'Calculator' && (
        <div>
          <LoanCalculator onApply={handleOpenModal} />
        </div>
      )}
    </div>
  );
};

export default Loans;