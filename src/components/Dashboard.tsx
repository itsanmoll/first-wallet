import React from 'react'
import { useWallet } from '../contexts/WalletContext'
import { Link } from 'react-router-dom'
import { Copy, RefreshCw, Send, Download, Plus } from 'lucide-react'

const Dashboard: React.FC = () => {
  const { wallet, getBalance } = useWallet()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!wallet.isConnected) {
    return (
      <div className="max-w-md mx-auto magic-magic">
        <div className="card text-center magic-magic">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Web Wallet</h2>
          <p className="text-gray-600 mb-8">
            Create a new wallet or import an existing one to get started
          </p>
          <div className="space-y-4">
            <Link
              to="/create"
              className="btn-primary w-full flex items-center justify-center magic-magic"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Wallet
            </Link>
            <Link
              to="/import"
              className="btn-secondary w-full flex items-center justify-center magic-magic"
            >
              <Download className="h-5 w-5 mr-2" />
              Import Wallet
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 magic-magic">
      {/* Balance Card */}
      <div className="card magic-magic">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Balance</h2>
          <button
            onClick={getBalance}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors magic-magic"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
        <div className="text-3xl font-bold text-primary-600 mb-2">
          {parseFloat(wallet.balance).toFixed(4)} ETH
        </div>
        <p className="text-sm text-gray-500">
          ≈ ${(parseFloat(wallet.balance) * 2000).toFixed(2)} USD
        </p>
      </div>

      {/* Address Card */}
      <div className="card magic-magic">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet Address</h3>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg magic-magic">
          <code className="text-sm text-gray-700 flex-1 break-all">
            {wallet.address}
          </code>
          <button
            onClick={() => copyToClipboard(wallet.address || '')}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors magic-magic"
            title="Copy address"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card magic-magic">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/send"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors magic-magic"
          >
            <Send className="h-6 w-6 text-primary-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Send ETH</div>
              <div className="text-sm text-gray-500">Transfer to another address</div>
            </div>
          </Link>
          
          <Link
            to="/history"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors magic-magic"
          >
            <Download className="h-6 w-6 text-primary-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Transaction History</div>
              <div className="text-sm text-gray-500">View past transactions</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 magic-magic">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Security Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                This is a demo wallet. Never store real private keys in browser storage.
                For production use, consider hardware wallets or secure key management solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 