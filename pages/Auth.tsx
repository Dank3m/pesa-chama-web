import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgLight dark:bg-gray-900 p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-lg w-full max-w-md transition-colors">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            P
          </div>
          <span className="text-2xl font-bold text-dark dark:text-white">PesaChama.</span>
        </div>

        <h2 className="text-2xl font-bold text-dark dark:text-white mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-subtext dark:text-gray-400 text-center mb-8">
          {isLogin ? 'Enter your credentials to access your account' : 'Sign up to start managing your savings'}
        </p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-dark dark:text-gray-200 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-dark dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-primary outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-400" 
                placeholder="John Doe" 
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-dark dark:text-gray-200 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-dark dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-primary outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-400" 
              placeholder="user@example.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-gray-200 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-dark dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-primary outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-400" 
              placeholder="••••••••" 
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-dark dark:text-gray-200 mb-2">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-dark dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-primary outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-400" 
                placeholder="••••••••" 
              />
            </div>
          )}

          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-subtext dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;