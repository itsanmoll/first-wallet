# Web Wallet

A modern, secure web-based cryptocurrency wallet built with React, TypeScript, and ethers.js.

## Features

- 🔐 **Wallet Creation & Management** - Generate new wallets and import existing ones
- 💰 **Balance Display** - Real-time ETH balance with USD conversion
- 📤 **Send Transactions** - Send ETH to other addresses
- 📋 **Transaction History** - View past transactions (demo data)
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔒 **Security Features** - Private key management with encryption warnings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web-wallet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating a New Wallet

1. Click "Create New Wallet" on the dashboard
2. Review the security warnings
3. Click "Create Wallet"
4. **IMPORTANT**: Save your private key in a secure location
5. Never share your private key with anyone

### Importing an Existing Wallet

1. Click "Import Wallet" on the dashboard
2. Enter your private key
3. Click "Import Wallet"

### Sending ETH

1. Navigate to the "Send" page
2. Enter the recipient's address
3. Enter the amount to send
4. Click "Send Transaction"

## Security Notice

⚠️ **This is a demo wallet for educational purposes only.**

- Private keys are stored in browser localStorage (not secure for production)
- Never use this wallet for real funds
- For production use, consider hardware wallets or secure key management solutions
- Always test with small amounts first

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: ethers.js v6
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── CreateWallet.tsx
│   ├── ImportWallet.tsx
│   ├── SendTransaction.tsx
│   ├── TransactionHistory.tsx
│   └── Layout.tsx
├── contexts/           # React contexts
│   └── WalletContext.tsx
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This wallet is for educational and demonstration purposes only. It is not intended for production use with real funds. Always use established, audited wallet solutions for real cryptocurrency transactions. # first-wallet
