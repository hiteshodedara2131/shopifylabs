"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const commands = [
  "npx @shopifylabs/cli create section hero",
  "Generating sections/hero.liquid...",
  "Generating assets/hero.js...",
  "Generating assets/hero.css...",
  "Done! ✨ Section is ready.",
];

export default function TerminalShowcase() {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        setLines(prev => [...prev, commands[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-4 mt-32 z-10 mb-20">
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white leading-tight">
            Scaffold sections <br />
            <span className="text-gradient">in seconds.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The CLI automatically generates your Liquid schemas, sets up asset tags, and wires up a boilerplate JavaScript module with DOM-ready checks. 
          </p>
          <Link href="/docs/cli" className="text-brand-blue font-semibold hover:text-brand-teal transition-colors flex items-center gap-2 justify-center lg:justify-start">
            Explore the CLI docs &rarr;
          </Link>
        </div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-lg glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-[#070B14]/80 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            </div>
            <div className="mx-auto text-xs text-slate-500 font-mono">bash - shopifylabs</div>
          </div>
          
          {/* Body */}
          <div className="p-6 font-mono text-sm bg-[#0F172A]/80 h-64 flex flex-col justify-end">
            {lines.map((line, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-2 ${i === 0 ? 'text-brand-teal' : i === commands.length - 1 ? 'text-green-400' : 'text-slate-300'}`}
              >
                {i === 0 ? <span className="text-pink-500 mr-2">$</span> : null}
                {line}
              </motion.div>
            ))}
            {lines.length < commands.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-slate-400 mt-2"
              />
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
