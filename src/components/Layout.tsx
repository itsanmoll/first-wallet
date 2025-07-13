import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'
import { Wallet, Plus, Download, Send, History, LogOut } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { wallet, disconnect } = useWallet()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Wallet },
    { name: 'Create Wallet', href: '/create', icon: Plus },
    { name: 'Import Wallet', href: '/import', icon: Download },
    { name: 'Send', href: '/send', icon: Send },
    { name: 'History', href: '/history', icon: History },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Web Wallet</h1>
            </div>
            
            {wallet.isConnected && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </div>
                <button
                  onClick={disconnect}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          {wallet.isConnected && (
            <nav className="w-64 mr-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <ul className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>
          )}

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout 