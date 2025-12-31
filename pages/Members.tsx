import React, { useMemo } from 'react';
import { Users, Mail, Phone, Calendar, ShieldCheck, MoreVertical } from 'lucide-react';
import { MOCK_MEMBERS, CURRENT_USER } from '../constants';

const Members: React.FC = () => {
  // Logic: 
  // - Admin sees all members from all groups.
  // - Treasurer sees only members from their banking group.
  const displayedMembers = useMemo(() => {
    if (CURRENT_USER.role === 'Admin') {
      return MOCK_MEMBERS;
    }
    return MOCK_MEMBERS.filter(member => member.bankingGroup === CURRENT_USER.bankingGroup);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-3xl shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-dark dark:text-white">Group Members</h3>
            <p className="text-subtext dark:text-gray-400 text-sm">
              {CURRENT_USER.role === 'Admin' 
                ? 'Viewing all registered members across all banking groups.' 
                : `Viewing members of ${CURRENT_USER.bankingGroup}.`}
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2">
            <Users size={16} /> Add Member
          </button>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[900px]">
            <thead className="bg-bgLight dark:bg-gray-700 text-subtext dark:text-gray-300 text-left text-sm font-medium rounded-xl">
              <tr>
                <th className="p-4 rounded-l-xl whitespace-nowrap">Member</th>
                <th className="p-4 whitespace-nowrap">Contact</th>
                <th className="p-4 whitespace-nowrap">Role</th>
                <th className="p-4 whitespace-nowrap">Banking Group</th>
                <th className="p-4 whitespace-nowrap">Joined Date</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 rounded-r-xl whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-dark dark:text-gray-200">
              {displayedMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-dark dark:text-white">{member.name}</p>
                        <p className="text-xs text-subtext dark:text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-subtext dark:text-gray-400">
                      <Phone size={14} /> {member.phone}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                      member.role === 'Treasurer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
                    }`}>
                      {member.role === 'Admin' && <ShieldCheck size={12} />}
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">{member.bankingGroup}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-subtext dark:text-gray-400">
                     <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {member.joinedDate}
                     </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-subtext dark:text-gray-400 hover:text-dark dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                      <MoreVertical size={16} />
                    </button>
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

export default Members;