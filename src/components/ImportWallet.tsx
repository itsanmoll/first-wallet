import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

const ImportWallet: React.FC = () => {
  const { importWallet, wallet } = useWallet();
  const [privateKey, setPrivateKey] = useState('');
  const [imported, setImported] = useState<null | boolean>(null);

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importWallet(privateKey);
    setImported(success);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Import Wallet</h2>
      <form onSubmit={handleImport} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Private Key"
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        >
          Import
        </button>
      </form>
      {imported === true && wallet.address && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          <div className="font-semibold">Wallet Imported!</div>
          <div className="break-all text-xs mt-2">Address: {wallet.address}</div>
        </div>
      )}
      {imported === false && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          Failed to import wallet. Please check your private key.
        </div>
      )}
    </div>
  );
};

export default ImportWallet; 