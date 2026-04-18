import { X, Copy, Info, Layout, Zap, Cpu, FileJson, Gauge } from 'lucide-react';
import { Prompt } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

interface PromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  if (!prompt) return null;

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prompt, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `oneshot_${prompt.title.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-carbon/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-tactical-gray border border-tactical-border overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-tactical-border bg-carbon/50">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">{prompt.title}</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                <p className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">{prompt.targetModel} // {prompt.category}</p>
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-bullseye">
                  <Gauge className="w-3 h-3" />
                  EFFICIENCY: {prompt.tokenEfficiency}%
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2">
              <X className="w-5 h-5 sm:w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-h-[60vh] sm:max-h-[75vh] overflow-y-auto antialiased">
            <section>
              <div className="flex items-center gap-2 text-bullseye mb-3">
                <Copy className="w-4 h-4" />
                <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">The Precision Prompt</h4>
              </div>
              <div className="bg-carbon p-3 sm:p-4 border border-tactical-border font-mono text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {prompt.content}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <section className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-bullseye mb-2 sm:mb-3">
                    <Info className="w-4 h-4" />
                    <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">Why it works</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {prompt.whyItWorks}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-bullseye mb-2 sm:mb-3">
                    <Layout className="w-4 h-4" />
                    <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">Structure</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {prompt.structure}
                  </p>
                </div>
              </section>

              <section className="space-y-4 sm:space-y-6">
                {prompt.mdSkills && (
                  <div>
                    <div className="flex items-center gap-2 text-bullseye mb-2 sm:mb-3">
                      <Zap className="w-4 h-4" />
                      <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">MD Skills (Agent Instructions)</h4>
                    </div>
                    <div className="bg-carbon/50 p-3 border border-tactical-border rounded text-[10px] sm:text-[11px] font-mono text-gray-400 overflow-x-auto">
                      {prompt.mdSkills}
                    </div>
                  </div>
                )}

                {prompt.agentConfig && (
                  <div>
                    <div className="flex items-center gap-2 text-bullseye mb-2 sm:mb-3">
                      <Cpu className="w-4 h-4" />
                      <h4 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">Agent Configuration</h4>
                    </div>
                    <div className="p-3 border border-bullseye/20 bg-bullseye/5 rounded text-xs sm:text-sm text-gray-300">
                      <p className="font-mono text-[9px] sm:text-[11px] text-bullseye mb-1 uppercase tracking-tighter">Recommended Stack:</p>
                      {prompt.agentConfig}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 bg-carbon/50 border-t border-tactical-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[9px] sm:text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden xs:block">
              Status: Verified // Precision: {prompt.precisionRating}%
            </div>
            <div className="flex w-full sm:w-auto gap-2 sm:gap-4">
              <button
                onClick={exportToJson}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-3 border border-tactical-border text-gray-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white transition-all"
              >
                <FileJson className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(prompt.content);
                }}
                className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-bullseye text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-carbon transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
