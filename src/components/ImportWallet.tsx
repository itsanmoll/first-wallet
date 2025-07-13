import React, { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const ImportWallet: React.FC = () => {
  const { importWallet } = useWallet()
  const navigate = useNavigate()
  const [privateKey, setPrivateKey] = useState('')
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImport = async () => {
    if (!privateKey.trim()) {
      setError('Please enter a private key')
      return
    }

    setIsLoading(true)
    setError('')

    const success = importWallet(privateKey.trim())
    
    if (success) {
      navigate('/')
    } else {
      setError('Invalid private key. Please check and try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Import Wallet</h2>
        <p className="text-gray-600 mb-6">
          Import an existing wallet using your private key
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700 mb-2">
              Private Key
            </label>
            <div className="relative">
              <input
                id="privateKey"
                type={showPrivateKey ? 'text' : 'password'}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPrivateKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
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
                    Never share your private key. This demo wallet stores keys in browser storage,
                    which is not secure for real funds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleImport}
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Importing...' : 'Import Wallet'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportWallet 