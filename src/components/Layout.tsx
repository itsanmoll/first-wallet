import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Create Wallet', path: '/create' },
  { name: 'Import Wallet', path: '/import' },
  { name: 'Send', path: '/send' },
  { name: 'Transactions', path: '/history' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col p-6">
        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Wallet</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block px-4 py-2 rounded text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 