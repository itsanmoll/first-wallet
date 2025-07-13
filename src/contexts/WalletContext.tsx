import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'

interface WalletState {
  address: string | null
  privateKey: string | null
  balance: string
  isConnected: boolean
}

interface WalletContextType {
  wallet: WalletState
  createWallet: () => void
  importWallet: (privateKey: string) => boolean
  disconnect: () => void
  getBalance: () => Promise<void>
  sendTransaction: (to: string, amount: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    privateKey: null,
    balance: '0',
    isConnected: false
  })

  // Initialize provider (using Ethereum mainnet for demo)
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo')

  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom()
    const newWalletState: WalletState = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      balance: '0',
      isConnected: true
    }
    setWallet(newWalletState)
    localStorage.setItem('wallet', JSON.stringify(newWalletState))
  }

  const importWallet = (privateKey: string): boolean => {
    try {
      const wallet = new ethers.Wallet(privateKey)
      const newWalletState: WalletState = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        balance: '0',
        isConnected: true
      }
      setWallet(newWalletState)
      localStorage.setItem('wallet', JSON.stringify(newWalletState))
      return true
    } catch (error) {
      console.error('Invalid private key:', error)
      return false
    }
  }

  const disconnect = () => {
    setWallet({
      address: null,
      privateKey: null,
      balance: '0',
      isConnected: false
    })
    localStorage.removeItem('wallet')
  }

  const getBalance = async () => {
    if (!wallet.address) return

    try {
      const balance = await provider.getBalance(wallet.address)
      const balanceInEth = ethers.formatEther(balance)
      setWallet(prev => ({ ...prev, balance: balanceInEth }))
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    if (!wallet.privateKey || !wallet.address) {
      throw new Error('Wallet not connected')
    }

    try {
      const walletInstance = new ethers.Wallet(wallet.privateKey, provider)
      const amountInWei = ethers.parseEther(amount)
      
      const tx = await walletInstance.sendTransaction({
        to,
        value: amountInWei
      })

      await tx.wait()
      await getBalance() // Refresh balance after transaction
      
      return tx.hash
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }

  // Load wallet from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet')
    if (savedWallet) {
      const parsedWallet = JSON.parse(savedWallet)
      setWallet(parsedWallet)
    }
  }, [])

  // Fetch balance when wallet is connected
  useEffect(() => {
    if (wallet.isConnected) {
      getBalance()
    }
  }, [wallet.address])

  const value: WalletContextType = {
    wallet,
    createWallet,
    importWallet,
    disconnect,
    getBalance,
    sendTransaction
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
} 