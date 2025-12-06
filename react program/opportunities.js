 import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ExternalLink, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import OpportunityCard from '../components/opportunities/OpportunityCard';
import SignupModal from '../components/opportunities/SignupModal';

export default function Opportunities() {
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: () => base44.entities.Opportunity.list('-created_date', 100),
  });

  const filteredOpportunities = opportunities.filter((opp) => {
    const ageMatch = selectedAge === 'all' || opp.age_range === selectedAge;
    const interestMatch = selectedInterest === 'all' || opp.interest === selectedInterest;
    const searchMatch = !searchQuery || 
      opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return ageMatch && interestMatch && searchMatch;
  });

  const categories = [
    { label: 'All', value: 'all', emoji: '✨' },
    { label: 'Arts', value: 'arts', emoji: '🎨' },
    { label: 'Music', value: 'music', emoji: '🎵' },
    { label: 'STEM', value: 'stem', emoji: '🔬' },
    { label: 'Sports', value: 'sports', emoji: '⚽' },
    { label: 'Coding', value: 'coding', emoji: '💻' }
  ];

  const ageRanges = [
    { label: 'All Ages', value: 'all' },
    { label: '6-8 years', value: '6-8' },
    { label: '9-11 years', value: '9-11' },
    { label: '12-14 years', value: '12-14' },
    { label: '15-18 years', value: '15-18' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">100+ Free Programs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Free <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Opportunities</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover vetted programs that match your child's interests and schedule
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-500 shadow-lg"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Interest Categories */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-700">Interest</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedInterest(cat.value)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    selectedInterest === cat.value
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Age Range</h3>
            <div className="flex flex-wrap gap-3">
              {ageRanges.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setSelectedAge(age.value)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    selectedAge === age.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-bold text-gray-900">{filteredOpportunities.length}</span> programs found
          </p>
          <Link to={createPageUrl('CreateOpportunity')}>
            <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
              + Create Opportunity
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading opportunities...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredOpportunities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or create a new opportunity
            </p>
            <Link to={createPageUrl('CreateOpportunity')}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Create Opportunity
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Opportunities Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredOpportunities.map((opportunity, index) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                index={index}
                onSignup={() => setSelectedOpportunity(opportunity)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Signup Modal */}
      {selectedOpportunity && (
        <SignupModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </div>
  );
}
