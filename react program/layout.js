import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Heart, Sparkles, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.reload();
  };

  const navItems = [
    { name: 'Home', page: 'Home' },
    { name: 'Why It Matters', page: 'Statistics' },
    { name: 'Impact', page: 'Impact' },
    { name: 'Opportunities', page: 'Opportunities' },
    { name: 'Create', page: 'CreateOpportunity' },
    { name: 'Donate', page: 'Donate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ConnectKids
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Free opportunities for every child
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentPageName === item.page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isLoading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-2 ml-2">
                      <div className="px-3 py-2 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-semibold text-purple-600">
                            {user.user_type === 'organizer' ? 'Organizer' : 'Parent'}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => base44.auth.redirectToLogin(window.location.href)}
                      className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      size="sm"
                    >
                      Login / Sign Up
                    </Button>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      currentPageName === item.page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!isLoading && (
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 bg-purple-50 rounded-lg mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-600">
                              {user.full_name || user.email}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {user.user_type === 'organizer' ? 'Organizer Account' : 'Parent Account'}
                          </div>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => base44.auth.redirectToLogin(window.location.href)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        Login / Sign Up
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ConnectKids</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Made with care to expand opportunity across the United States. Every child deserves access to extracurricular activities.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.page}>
                    <Link
                      to={createPageUrl(item.page)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Get In Touch</h3>
              <p className="text-gray-300 text-sm mb-2">
                Email: hello@connectkids.org
              </p>
              <p className="text-gray-300 text-sm">
                We'd love to hear from families, volunteers, and partners.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Built with love for every child</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} ConnectKids. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
