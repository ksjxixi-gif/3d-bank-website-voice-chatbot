'use client';

import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-bank-dark/50 backdrop-blur rounded-2xl border border-primary-900/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-bank-darker text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-500 to-bank-accent hover:from-primary-600 hover:to-bank-accent text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {[
              {
                icon: Phone,
                title: 'Phone',
                content: '+1 (555) 123-4567',
                description: 'Mon-Fri 9am-6pm EST',
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'support@securebank.com',
                description: 'We'll respond within 24 hours',
              },
              {
                icon: MapPin,
                title: 'Office',
                content: '123 Banking Street',
                description: 'New York, NY 10001',
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                content: 'Available 24/7',
                description: 'Click the chatbot icon to start',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-bank-dark/50 backdrop-blur rounded-xl border border-primary-900/20 hover:border-primary-500/50 p-6 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-primary-400 font-medium mb-1">{item.content}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
