import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import SendTransaction from './components/SendTransaction';
import TransactionHistory from './components/TransactionHistory';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateWallet />} />
          <Route path="/import" element={<ImportWallet />} />
          <Route path="/send" element={<SendTransaction />} />
          <Route path="/history" element={<TransactionHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 