import { Copy, Target, ShieldAlert, Heart, Activity } from 'lucide-react';
import { Prompt } from '../types';
import { motion } from 'motion/react';
import React from 'react';

interface PromptCardProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelect, isFavorite, onToggleFavorite }) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative bg-tactical-gray border border-tactical-border p-5 sm:p-6 cursor-pointer hover:border-bullseye/50 transition-all"
      onClick={() => onSelect(prompt)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-[9px] sm:text-[10px] font-mono text-bullseye uppercase tracking-widest px-2 py-1 border border-bullseye/30">
            {prompt.category}
          </span>
          {prompt.isPremium && (
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-white bg-bullseye px-2 py-1 animate-pulse-red">
              <ShieldAlert className="w-3 h-3" />
              PREMIUM
            </div>
          )}
        </div>
        <button
          onClick={(e) => onToggleFavorite(prompt.id, e)}
          className={`p-1 transition-colors ${isFavorite ? 'text-bullseye' : 'text-gray-600 hover:text-bullseye'}`}
        >
          <Heart className={`w-4 h-4 sm:w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <h3 className="text-lg sm:text-xl font-display font-bold mb-2 group-hover:text-bullseye transition-colors leading-tight">
        {prompt.title}
      </h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-500">
          <Target className="w-3 h-3" />
          {prompt.targetModel}
        </div>
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-gray-600">
          <Activity className="w-3 h-3" />
          LATENCY: {prompt.latencyImpact}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
            <span>PRECISION RATING</span>
            <span>{prompt.precisionRating}%</span>
          </div>
          <div className="h-1 bg-tactical-border w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${prompt.precisionRating}%` }}
              className="h-full bg-bullseye"
            />
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-carbon font-mono text-xs font-bold uppercase tracking-widest hover:bg-bullseye hover:text-white transition-all"
        >
          <Copy className="w-4 h-4" />
          Copy Prompt
        </button>
      </div>
    </motion.div>
  );
}
