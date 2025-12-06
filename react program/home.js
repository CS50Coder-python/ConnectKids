import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Users, 
  Trophy, 
  Rocket,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function Home() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState('9-11');
  const [selectedInterest, setSelectedInterest] = useState('coding');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        // If user doesn't have user_type, redirect to complete profile
        if (currentUser && !currentUser.user_type) {
          navigate(createPageUrl('CompleteProfile'));
        }
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, [navigate]);

  const features = [
    {
      icon: Heart,
      title: 'Completely Free',
      description: 'Zero cost to families. No hidden fees, ever.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Low-Tech Friendly',
      description: 'Works with basic phones and low bandwidth.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from volunteers and professionals.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { value: '36M', label: 'People in Poverty', sublabel: 'Need Access' },
    { value: '15M', label: 'Children Without', sublabel: 'Summer Programs' },
    { value: '24.6M', label: 'Families Denied', sublabel: 'After-school Access' }
  ];

  const categories = [
    { name: 'Arts & Crafts', value: 'arts', emoji: '🎨', count: '24' },
    { name: 'Music', value: 'music', emoji: '🎵', count: '18' },
    { name: 'STEM', value: 'stem', emoji: '🔬', count: '20' },
    { name: 'Sports', value: 'sports', emoji: '⚽', count: '16' },
    { name: 'Coding', value: 'coding', emoji: '💻', count: '22' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>Free for Every Child</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Connect Children to
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Free Opportunities</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every child deserves to explore their passions. We connect families from low-income communities with free online extracurriculars in arts, science, coding, sports, and more.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to={createPageUrl('Opportunities')}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all">
                    Find Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl('CreateOpportunity')}>
                  <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-xl font-semibold">
                    Create Opportunity
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No cost</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Vetted programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Age-matched</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Quick Match Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Quick Match</h3>
                  <p className="text-sm text-gray-500">Find programs instantly</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age Range
                  </label>
                  <select
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  >
                    <option value="6-8">6 to 8 years</option>
                    <option value="9-11">9 to 11 years</option>
                    <option value="12-14">12 to 14 years</option>
                    <option value="15-18">15 to 18 years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest
                  </label>
                  <select
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  >
                    <option value="arts">Arts and Crafts</option>
                    <option value="music">Music</option>
                    <option value="stem">STEM</option>
                    <option value="sports">Sports and Fitness</option>
                    <option value="coding">Coding</option>
                  </select>
                </div>

                <Link to={createPageUrl('Opportunities')} className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Show Free Options
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>All programs are vetted and completely free</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose ConnectKids?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We remove every barrier standing between children and their potential
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600">
              Over 100+ free programs across 5 interest areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={createPageUrl('Opportunities')}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <div className="font-bold text-gray-900 mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} programs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to unlock opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Families</h3>
              </div>
              <ol className="space-y-3 text-gray-600 ml-15">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-semibold">→</span>
                  Tell us your child's age, interests and availability
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-semibold">→</span>
                  We match them to vetted free programs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-semibold">→</span>
                  Sign up and start learning—completely free
                </li>
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Volunteers</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you run a free program or want to volunteer, share your offering with us. We handle outreach and scheduling so you can focus on teaching.
              </p>
              <Link to={createPageUrl('CreateOpportunity')}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Share a Program
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Unlock Opportunities?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of families giving their children access to free, quality extracurriculars
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl('Opportunities')}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl font-semibold shadow-xl">
                  Browse Programs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Donate')}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl font-semibold">
                  Support Our Mission
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
