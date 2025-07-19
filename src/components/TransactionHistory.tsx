import React from 'react';

// Define a Transaction type for the placeholder
interface Transaction {
  hash: string;
  to: string;
  amount: string;
  status: string;
}

// Placeholder for transaction data
const transactions: Transaction[] = [
  // Example: { hash: '0x123...', to: '0xabc...', amount: '0.5', status: 'Success' }
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Transaction History</h2>
      {transactions.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center">No transactions found.</div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((tx, idx) => (
            <li key={idx} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="font-mono text-xs break-all text-gray-700 dark:text-gray-200">{tx.hash}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">To: {tx.to}</div>
              </div>
              <div className="mt-2 md:mt-0 md:ml-4 flex items-center space-x-2">
                <span className="text-green-600 dark:text-green-400 font-semibold">{tx.amount} ETH</span>
                <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">{tx.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory; 