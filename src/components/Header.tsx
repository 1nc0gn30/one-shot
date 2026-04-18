import { Crosshair, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Library', href: '/' },
    { label: 'Orchestration', href: '/orchestration' },
    { label: 'Premium', href: '#premium' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-carbon/80 backdrop-blur-md border-b border-tactical-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Crosshair className="w-6 h-6 text-bullseye" />
            </motion.div>
            <span className="text-xl font-display font-bold tracking-tighter">
              ONE <span className="text-bullseye">SHOT</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-tactical-gray border-b border-tactical-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
