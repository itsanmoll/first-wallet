import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

const CreateWallet: React.FC = () => {
  const { createWallet, wallet } = useWallet();
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    createWallet();
    setCreated(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Create New Wallet</h2>
      <button
        onClick={handleCreate}
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold mb-4"
      >
        Generate Wallet
      </button>
      {created && wallet.address && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          <div className="font-semibold">Wallet Created!</div>
          <div className="break-all text-xs mt-2">Address: {wallet.address}</div>
        </div>
      )}
      {created && !wallet.address && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          Failed to create wallet. Please try again.
        </div>
      )}
    </div>
  );
};

export default CreateWallet; 