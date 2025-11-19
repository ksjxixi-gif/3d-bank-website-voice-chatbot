'use client';

import { DollarSign, Home, Car, GraduationCap, Briefcase, Check } from 'lucide-react';

const loanTypes = [
  {
    id: 1,
    name: 'Home Loan',
    icon: Home,
    rate: '3.5%',
    term: 'Up to 30 years',
    amount: 'Up to $1M',
    features: ['Fixed & variable rates', 'No prepayment penalty', 'Quick approval'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Auto Loan',
    icon: Car,
    rate: '4.2%',
    term: 'Up to 7 years',
    amount: 'Up to $100K',
    features: ['New & used vehicles', 'Flexible payment', 'Same-day approval'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    name: 'Student Loan',
    icon: GraduationCap,
    rate: '2.9%',
    term: 'Up to 15 years',
    amount: 'Up to $200K',
    features: ['Deferred payments', 'Grace period', 'Low interest rate'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    name: 'Business Loan',
    icon: Briefcase,
    rate: '5.5%',
    term: 'Up to 10 years',
    amount: 'Up to $5M',
    features: ['Growth capital', 'Equipment financing', 'Line of credit'],
    color: 'from-orange-500 to-red-500',
  },
];

export default function LoansPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Loan Solutions for Every Need
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Competitive rates, flexible terms, and fast approvals to help you achieve your goals
          </p>
        </div>

        {/* Loan Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {loanTypes.map((loan) => {
            const Icon = loan.icon;
            return (
              <div
                key={loan.id}
                className="bg-gradient-to-br from-bank-dark to-bank-darker p-8 rounded-2xl border border-primary-900/20 hover:border-primary-500/50 transition-all hover:scale-105 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${loan.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{loan.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Starting at</p>
                    <p className="text-3xl font-bold text-primary-400">{loan.rate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Loan Term</p>
                    <p className="text-white font-semibold">{loan.term}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Loan Amount</p>
                    <p className="text-white font-semibold">{loan.amount}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {loan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="text-green-400" size={16} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all">
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Calculator Section */}
        <div className="bg-bank-dark/50 backdrop-blur rounded-2xl border border-primary-900/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Loan Calculator</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2">Loan Amount ($)</label>
              <input
                type="number"
                placeholder="50,000"
                className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Interest Rate (%)</label>
              <input
                type="number"
                placeholder="3.5"
                step="0.1"
                className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Loan Term (years)</label>
              <input
                type="number"
                placeholder="15"
                className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-bank-accent hover:from-primary-600 hover:to-bank-accent text-white rounded-lg font-semibold transition-all">
            Calculate Monthly Payment
          </button>
        </div>
      </div>
    </main>
  );
}
