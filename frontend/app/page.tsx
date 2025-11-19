'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { ArrowRight, Shield, Zap, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

function FloatingCard() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <FloatingCard />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-300 to-bank-accent bg-clip-text text-transparent animate-float">
            The Future of Banking
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Experience seamless, secure, and intelligent banking with AI-powered assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/accounts"
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white rounded-lg font-semibold transition-all hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bank-dark/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Why Choose SecureBank?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure & Safe',
                description: 'Bank-grade encryption and multi-factor authentication',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant transfers and real-time notifications',
              },
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Bank from anywhere, anytime, on any device',
              },
              {
                icon: TrendingUp,
                title: 'Smart Insights',
                description: 'AI-powered financial advice and analytics',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-bank-darker/50 backdrop-blur p-6 rounded-xl border border-primary-900/20 hover:border-primary-500/50 transition-all hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-all">
                  <feature.icon className="text-primary-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Banking Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of satisfied customers worldwide
          </p>
          <Link
            href="/accounts"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-bank-accent hover:from-primary-600 hover:to-bank-accent text-white rounded-lg font-semibold transition-all hover:scale-105"
          >
            <span>Open an Account</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
