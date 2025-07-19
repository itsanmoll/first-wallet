import React from 'react';
import { useWallet } from '../contexts/WalletContext';

const Dashboard: React.FC = () => {
  const { wallet } = useWallet();

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Wallet Overview</h2>
        <div className="text-gray-700 dark:text-gray-200 mb-4">{wallet?.address ? wallet.address : 'No wallet connected'}</div>
        <div className="text-3xl font-semibold text-green-600 dark:text-green-400 mb-2">{wallet?.balance ? `${wallet.balance} ETH` : '--'}</div>
        <div className="flex space-x-4 mt-4">
          <a href="/send" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Send</a>
          <a href="/history" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">History</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 