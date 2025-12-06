import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Users, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Donate() {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = ['10', '25', '50', '100', '250'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert('Please complete all fields');
      return;
    }

    const donationAmount = customAmount || amount;
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl px-4"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You! 💙
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Your generous support helps us provide free opportunities to children who need them most.
          </p>
          <p className="text-gray-500">
            This is a demo. In production, payments would be processed securely through Stripe or PayPal.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full mb-4">
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Support Our Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Make a <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Difference</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us maintain the platform, expand outreach, and keep opportunities free for every child
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500" />
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <Label className="text-sm font-bold text-gray-700 mb-3 block">
                  Select Amount
                </Label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount('');
                      }}
                      className={`py-4 px-4 rounded-xl font-bold transition-all ${
                        amount === preset && !customAmount
                          ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount('');
                    }}
                    placeholder="Custom amount"
                    className="pl-12 rounded-xl border-2 py-6 text-lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-bold text-gray-700">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-2 rounded-xl border-2 py-6 text-lg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-bold text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-2 rounded-xl border-2 py-6 text-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-6 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Donate ${customAmount || amount}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                This is a demo. In production, payments would be processed securely through Stripe or PayPal. We never store payment details on our servers.
              </p>
            </form>
          </motion.div>

          {/* Impact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Your Impact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">$10</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Basic Support</p>
                    <p className="text-sm text-white/90">Helps maintain our platform for one month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">$50</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Program Boost</p>
                    <p className="text-sm text-white/90">Connects 50 families with opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold">$100+</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Community Builder</p>
                    <p className="text-sm text-white/90">Funds outreach to underserved communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Where Your Money Goes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Platform & Infrastructure</span>
                  <span className="font-bold text-gray-900">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '40%'}} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Outreach & Marketing</span>
                  <span className="font-bold text-gray-900">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '30%'}} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Program Vetting</span>
                  <span className="font-bold text-gray-900">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{width: '20%'}} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Support & Operations</span>
                  <span className="font-bold text-gray-900">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{width: '10%'}} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
