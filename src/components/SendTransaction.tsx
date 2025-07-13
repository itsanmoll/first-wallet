import React, { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useNavigate } from 'react-router-dom'
import { Send, Check } from 'lucide-react'

const SendTransaction: React.FC = () => {
  const { wallet, sendTransaction, getBalance } = useWallet()
  const navigate = useNavigate()
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSend = async () => {
    if (!toAddress.trim() || !amount.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (parseFloat(amount) > parseFloat(wallet.balance)) {
      setError('Insufficient balance')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const txHash = await sendTransaction(toAddress.trim(), amount)
      setSuccess(`Transaction sent successfully! Hash: ${txHash}`)
      setToAddress('')
      setAmount('')
      await getBalance()
    } catch (err) {
      setError('Transaction failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!wallet.isConnected) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet Not Connected</h2>
          <p className="text-gray-600 mb-6">
            Please create or import a wallet to send transactions
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
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Send ETH</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 mb-2">
              To Address
            </label>
            <input
              id="toAddress"
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (ETH)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.0001"
              min="0"
              className="input-field"
            />
            <p className="text-sm text-gray-500 mt-1">
              Available: {parseFloat(wallet.balance).toFixed(4)} ETH
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <Check className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <Send className="h-5 w-5 text-blue-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-blue-800">Demo Transaction</p>
                <p className="text-sm text-blue-700">
                  This will attempt to send a real transaction on Ethereum mainnet.
                  Make sure you have sufficient ETH for gas fees.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Transaction
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendTransaction 