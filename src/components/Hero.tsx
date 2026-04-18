import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            One Prompt. <br className="hidden sm:block" />
            <span className="text-bullseye">One Result.</span><br />
            Zero Hallucinations.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-sans max-w-2xl mx-auto mb-8 sm:mb-10">
            The definitive directory of high-precision prompts for modern AI tools and Codex. 
            Engineered for lethality and efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
