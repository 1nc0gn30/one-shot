import { useState, useMemo, useEffect } from 'react';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import OrchestrationPage from './components/OrchestrationPage';
import { PromptCard } from './components/PromptCard';
import PromptModal from './components/PromptModal';
import { SAMPLE_PROMPTS } from './data/prompts';
import { Prompt } from './types';
import { motion } from 'motion/react';

const CATEGORIES = ['All', 'Logic & Code', 'Integration/API', 'Premium', 'Data Transformation', 'Creative', 'Favorites'];

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const isOrchestrationPage = path === '/orchestration';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('oneshot_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('oneshot_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const title = isOrchestrationPage
      ? 'Orchestration Conductor Guide | ONE SHOT'
      : 'ONE SHOT';
    const description = isOrchestrationPage
      ? 'Learn how to orchestrate Ollama, Hermes, Codex, OpenCode, Claude Code, and Gemini CLI for better local/cloud coding workflows.'
      : 'The definitive directory of high-precision prompts for modern AI tools and Codex. Tactical Minimalist aesthetic for high-precision results.';
    const canonical = isOrchestrationPage
      ? 'https://one-shot.757tech.pro/orchestration'
      : 'https://one-shot.757tech.pro/';

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (property) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setCanonical = (href: string) => {
      let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setCanonical(canonical);
  }, [isOrchestrationPage]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredPrompts = useMemo(() => {
    return SAMPLE_PROMPTS.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.targetModel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || 
        (activeCategory === 'Favorites' ? favorites.includes(prompt.id) : prompt.category === activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, favorites]);

  return (
    <div className="min-h-screen bg-carbon text-white selection:bg-bullseye selection:text-white relative">
      <div className="scanline-effect" />
      <Header />
      
      {isOrchestrationPage ? (
        <OrchestrationPage />
      ) : (
        <main className="pb-24">
          <Hero />
          
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <div className="flex sm:flex-wrap gap-2 mb-8 sm:mb-12 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-hide justify-start sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest border transition-all ${
                    activeCategory === cat 
                      ? 'bg-bullseye border-bullseye text-white' 
                      : 'bg-tactical-gray/50 border-tactical-border text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-tactical-border pb-4 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Active Directory // {activeCategory}
                </h2>
                <span className="text-[9px] sm:text-[10px] font-mono text-bullseye bg-bullseye/10 px-2 py-0.5 border border-bullseye/20">
                  {filteredPrompts.length} TARGETS ACQUIRED
                </span>
              </div>
              <div className="flex items-center gap-6 text-[9px] sm:text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  UPLINK: STABLE
                </motion.div>
              </div>
            </div>

            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id} 
                    prompt={prompt} 
                    onSelect={setSelectedPrompt}
                    isFavorite={favorites.includes(prompt.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-tactical-border bg-tactical-gray/20">
                <p className="font-mono text-gray-500 uppercase tracking-widest">
                  No targets found in current sector. Adjust rangefinder.
                </p>
              </div>
            )}
          </div>
        </main>
      )}

      <footer className="border-t border-tactical-border py-12 bg-tactical-gray/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
            <div className="w-2 h-2 rounded-full bg-bullseye animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">System Online // v1.2.0</span>
          </div>
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © 2026 ONE SHOT PLATFORM. ALL RIGHTS RESERVED. // PRECISION ENGINEERED.
          </p>
        </div>
      </footer>

      <PromptModal 
        prompt={isOrchestrationPage ? null : selectedPrompt} 
        onClose={() => setSelectedPrompt(null)} 
      />
    </div>
  );
}
