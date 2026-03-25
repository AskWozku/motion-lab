import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { BackgroundConfig } from '../../types';
import { BackgroundRenderer } from '../BackgroundRenderer';
import { ErrorBoundary } from '../ErrorBoundary';

interface HeroProps {
  viewMode: 'desktop' | 'mobile';
  config: BackgroundConfig;
  theme: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ viewMode, config, theme }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-12 pointer-events-none relative">
      {/* Desktop Background */}
      {viewMode === 'desktop' && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <BackgroundRenderer config={config} theme={theme} />
            </AnimatePresence>
          </ErrorBoundary>
        </div>
      )}

      <motion.div
        layout
        animate={{
          width: viewMode === 'mobile' ? 375 : '100%',
          height: viewMode === 'mobile' ? 667 : '100%',
        }}
        className={cn(
          "relative flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden",
          viewMode === 'mobile' ? "glass rounded-[3rem] border-white/20 shadow-2xl p-8" : ""
        )}
      >
        {/* Mobile Background */}
        {viewMode === 'mobile' && (
          <div className="absolute inset-0 z-0">
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <BackgroundRenderer config={config} theme={theme} />
              </AnimatePresence>
            </ErrorBoundary>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-8 flex flex-col items-center"
        >
          <div className="flex flex-col items-center gap-1 mb-4">
            <span className={cn(
              "font-black text-2xl tracking-tight",
              "text-neutral-900 dark:text-white"
            )}>
              Motion Lab
            </span>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-widest">Interactive Background Engines</p>
          </div>

          <h2 className={cn(
            "font-black tracking-tighter leading-[0.9]",
            viewMode === 'mobile' ? "text-5xl" : "text-8xl",
            "text-neutral-900 dark:text-white"
          )}>
            <span className="opacity-20 dark:opacity-30">Your App's Vibe,</span><br />
            <span className="text-indigo-600 dark:text-white">Engineered.</span>
          </h2>
          <p className={cn(
            "text-neutral-700 dark:text-neutral-300 leading-relaxed mx-auto font-medium",
            viewMode === 'mobile' ? "text-sm max-w-xs" : "text-xl max-w-xl"
          )}>
            The definitive playground for high-performance background motion.
            Design your atmosphere, preview on any device, and export
            production-ready code or technical prompts to ship it instantly.
          </p>
          <a
            href="https://wozku.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors tracking-wide"
          >
            An open-source project by <span className="font-bold">Wozku</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
