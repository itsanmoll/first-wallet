import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

const SendTransaction: React.FC = () => {
  const { sendTransaction } = useWallet();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');
    try {
      const hash = await sendTransaction(to, amount);
      setTxHash(hash);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Send ETH</h2>
      <form onSubmit={handleSend} className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Address"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          step="any"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Sending...' : 'Send'}
        </button>
      </form>
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          Transaction sent!<br />
          <span className="break-all text-xs">Tx Hash: {txHash}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          Failed to send transaction. Please check the details and try again.
        </div>
      )}
    </div>
  );
};

export default SendTransaction; 