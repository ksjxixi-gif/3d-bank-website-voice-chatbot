'use client';

import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, PiggyBank } from 'lucide-react';

const accounts = [
  {
    id: 1,
    type: 'Checking Account',
    balance: 12_543.50,
    accountNumber: '****1234',
    icon: Wallet,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    type: 'Savings Account',
    balance: 45_231.80,
    accountNumber: '****5678',
    icon: PiggyBank,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    type: 'Credit Card',
    balance: -2_543.20,
    accountNumber: '****9012',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
  },
];

const transactions = [
  { id: 1, description: 'Salary Deposit', amount: 5000, type: 'credit', date: '2024-11-18' },
  { id: 2, description: 'Grocery Shopping', amount: -123.45, type: 'debit', date: '2024-11-17' },
  { id: 3, description: 'Online Transfer', amount: -500, type: 'debit', date: '2024-11-17' },
  { id: 4, description: 'Freelance Payment', amount: 1200, type: 'credit', date: '2024-11-16' },
  { id: 5, description: 'Restaurant', amount: -85.30, type: 'debit', date: '2024-11-15' },
];

export default function AccountsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
          My Accounts
        </h1>

        {/* Account Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <div
                key={account.id}
                className="bg-gradient-to-br from-bank-dark to-bank-darker p-6 rounded-2xl border border-primary-900/20 hover:border-primary-500/50 transition-all hover:scale-105 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-gray-400 text-sm">{account.accountNumber}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{account.type}</h3>
                <p className={`text-3xl font-bold ${account.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <div className="bg-bank-dark/50 backdrop-blur rounded-2xl border border-primary-900/20 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-bank-darker/50 rounded-lg hover:bg-bank-darker transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="text-green-400" size={20} />
                    ) : (
                      <ArrowUpRight className="text-red-400" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
