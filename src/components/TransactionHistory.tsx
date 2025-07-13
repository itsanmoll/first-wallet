import React from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useNavigate } from 'react-router-dom'
import { Clock, ExternalLink } from 'lucide-react'

const TransactionHistory: React.FC = () => {
  const { wallet } = useWallet()
  const navigate = useNavigate()

  // Mock transaction data - in a real app, this would come from an API
  const mockTransactions = [
    {
      hash: '0x1234567890abcdef...',
      type: 'sent',
      amount: '0.1',
      to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: 'confirmed'
    },
    {
      hash: '0xabcdef1234567890...',
      type: 'received',
      amount: '0.05',
      from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      status: 'confirmed'
    }
  ]

  if (!wallet.isConnected) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet Not Connected</h2>
          <p className="text-gray-600 mb-6">
            Please create or import a wallet to view transaction history
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
        
        {mockTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600">
              Your transaction history will appear here once you make your first transaction.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockTransactions.map((tx, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tx.type === 'sent' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {tx.type === 'sent' ? 'Sent' : 'Received'} {tx.amount} ETH
                      </div>
                      <div className="text-sm text-gray-500">
                        {tx.type === 'sent' ? `To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : 
                         `From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {tx.timestamp.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Etherscan
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <Clock className="h-5 w-5 text-blue-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-800">Demo Data</p>
              <p className="text-sm text-blue-700">
                This shows mock transaction data. In a real implementation, 
                transactions would be fetched from the blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory 