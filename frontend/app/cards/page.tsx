'use client';

import { CreditCard, Shield, Percent, Gift, Check } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Card3D({ color }: { color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh rotation={[0.2, 0.3, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

const cards = [
  {
    id: 1,
    name: 'Platinum Rewards Card',
    type: 'Credit Card',
    color: '#c0c0c0',
    rewards: '3% cash back',
    fee: '$0 annual fee',
    features: [
      'No foreign transaction fees',
      'Purchase protection',
      'Extended warranty',
      'Travel insurance',
    ],
  },
  {
    id: 2,
    name: 'Gold Travel Card',
    type: 'Credit Card',
    color: '#ffd700',
    rewards: '5x points on travel',
    fee: '$95 annual fee',
    features: [
      'Airport lounge access',
      'Priority boarding',
      'Travel credits',
      'Concierge service',
    ],
  },
  {
    id: 3,
    name: 'Student Cash Card',
    type: 'Debit Card',
    color: '#6366f1',
    rewards: '2% cash back',
    fee: '$0 fees',
    features: [
      'No overdraft fees',
      'Free ATM withdrawals',
      'Mobile banking',
      'Budgeting tools',
    ],
  },
];

export default function CardsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero with 3D Card */}
        <div className="relative h-80 mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Card3D color="#6366f1" />
            </Canvas>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
              Premium Credit & Debit Cards
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Earn rewards, enjoy benefits, and experience secure transactions
            </p>
          </div>
        </div>

        {/* Card Offerings */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-br from-bank-dark to-bank-darker rounded-2xl border border-primary-900/20 hover:border-primary-500/50 transition-all hover:scale-105 overflow-hidden group"
            >
              {/* Card Visual */}
              <div
                className="h-48 p-6 flex flex-col justify-between"
                style={{
                  background: `linear-gradient(135deg, ${card.color}dd, ${card.color}88)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="text-white" size={32} />
                  <Shield className="text-white opacity-80" size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{card.name}</p>
                  <p className="text-white/80 text-sm">**** **** **** 1234</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Rewards</p>
                    <p className="text-lg font-semibold text-primary-400">{card.rewards}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Fee</p>
                    <p className="text-lg font-semibold text-white">{card.fee}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {card.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-all">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Percent,
              title: 'Competitive Rates',
              description: 'Low APR and flexible payment options',
            },
            {
              icon: Gift,
              title: 'Exclusive Rewards',
              description: 'Earn points and cash back on every purchase',
            },
            {
              icon: Shield,
              title: 'Fraud Protection',
              description: '24/7 monitoring and zero liability coverage',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-bank-dark/50 backdrop-blur p-6 rounded-xl border border-primary-900/20 hover:border-primary-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
