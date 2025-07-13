import React, { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useNavigate } from 'react-router-dom'
import { Copy, Eye, EyeOff, Check } from 'lucide-react'

const CreateWallet: React.FC = () => {
  const { createWallet, wallet } = useWallet()
  const navigate = useNavigate()
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const handleCreateWallet = () => {
    createWallet()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (wallet.isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Created Successfully!</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Address</h3>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <code className="text-sm text-gray-700 flex-1 break-all">
                  {wallet.address}
                </code>
                <button
                  onClick={() => copyToClipboard(wallet.address || '')}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Private Key</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showPrivateKey ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                    {showPrivateKey ? 'Hide' : 'Show'} Private Key
                  </button>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm text-gray-700 flex-1 break-all">
                    {showPrivateKey ? wallet.privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => copyToClipboard(wallet.privateKey || '')}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy private key"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Important Security Warning
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Save your private key in a secure location</li>
                      <li>Never share your private key with anyone</li>
                      <li>Anyone with your private key can access your funds</li>
                      <li>This is a demo wallet - don't store real funds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Wallet</h2>
        <p className="text-gray-600 mb-6">
          Generate a new Ethereum wallet with a unique private key
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Check className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-yellow-800">Demo Wallet</p>
              <p className="text-sm text-yellow-700">
                This creates a demo wallet for testing purposes. Never use this for real funds.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleCreateWallet}
            className="btn-primary w-full"
          >
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateWallet 