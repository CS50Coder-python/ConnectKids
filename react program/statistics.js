import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertCircle, Target, ArrowUpRight } from 'lucide-react';

export default function Statistics() {
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    {
      value: 36000000,
      suffix: '',
      label: 'People in Poverty',
      sublabel: 'Including millions of children most likely to lack extracurriculars',
      icon: Users,
      color: 'from-red-500 to-pink-500'
    },
    {
      value: 15000000,
      suffix: '',
      label: 'Low-Income Children',
      sublabel: 'Who did not have summer learning opportunities in 2023',
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500'
    },
    {
      value: 24600000,
      suffix: '',
      label: 'Families Reporting',
      sublabel: 'Inability to access afterschool programs (60% increase since 2004)',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const participationGap = {
    lower: 14,
    higher: 27,
    label: 'Participation Gap',
    sublabel: 'in structured summer experiences between income levels'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [countersStarted, end, duration]);

    return <>{count.toLocaleString()}</>;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full mb-4">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">The Opportunity Gap Crisis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">It Matters</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Millions of children in the United States want to join extracurricular programs but cannot. Cost, transportation, limited local options, low bandwidth, and minimal public awareness prevent children from exploring their interests and building essential skills.
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {countersStarted && <AnimatedCounter end={stat.value} />}
                {stat.suffix}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Participation Gap Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-1 mb-12 shadow-xl"
        >
          <div className="bg-white rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {participationGap.label}
              </h3>
              <p className="text-gray-600">{participationGap.sublabel}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
                <div className="text-6xl font-bold text-red-600 mb-2">
                  {countersStarted && <AnimatedCounter end={participationGap.lower} duration={1500} />}%
                </div>
                <p className="font-semibold text-gray-900">Lower-Income Children</p>
                <p className="text-sm text-gray-600 mt-1">Limited access to summer programs</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="text-6xl font-bold text-green-600 mb-2">
                  {countersStarted && <AnimatedCounter end={participationGap.higher} duration={1500} />}%
                </div>
                <p className="font-semibold text-gray-900">Higher-Income Children</p>
                <p className="text-sm text-gray-600 mt-1">Regular program participation</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ArrowUpRight className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Nearly 2x gap:</span>
                <span>Higher-income children have almost double the participation rate</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Neglectedness</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cost and accessibility remain primary barriers. Surveys show families want participation but are shut out due to price, transportation, or awareness.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Policy attention fluctuates, leaving millions without consistent access to the opportunities they deserve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Long-Term Impact</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Research links extracurricular participation to higher engagement, college attendance, better earnings, and stronger social capital.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each child gaining access benefits themselves, their families, and society as a whole.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Together, We Can Close This Gap</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Every child deserves the chance to explore their interests and develop their talents, regardless of family income.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/Opportunities" className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
              Browse Programs
            </a>
            <a href="/CreateOpportunity" className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-all">
              Create Opportunity
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
