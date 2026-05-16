"use client";

import { motion } from "framer-motion";
import { FiZap, FiCode, FiBox, FiCommand, FiShield, FiPackage } from "react-icons/fi";
import Link from "next/link";

const features = [
  {
    title: "Zero Dependencies",
    description: "Built from the ground up for modern browsers. No heavy libraries slowing down your Shopify theme.",
    icon: FiPackage,
    colSpan: "md:col-span-2 lg:col-span-1",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    title: "100% Type Safe",
    description: "Written in TypeScript. Every function, parameter, and DOM event is fully typed for flawless DX.",
    icon: FiShield,
    colSpan: "md:col-span-2 lg:col-span-2",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    title: "ESM & Tree-Shakeable",
    description: "Only import what you need. Your final bundle only includes the specific utilities you actually use in your sections.",
    icon: FiZap,
    colSpan: "md:col-span-2 lg:col-span-2",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    title: "Shopify Native",
    description: "Designed specifically for Shopify's Storefront Cart API and Liquid section patterns.",
    icon: FiBox,
    colSpan: "md:col-span-2 lg:col-span-1",
    color: "text-brand-pink",
    bg: "bg-brand-pink/10",
  },
];

export default function BentoGrid() {
  return (
    <section className="container mx-auto px-4 mt-32 z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
          Why Shopifylabs?
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Stop copying and pasting the same utility functions across every Shopify project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 rounded-2xl flex flex-col justify-between group cursor-default relative overflow-hidden ${feature.colSpan}`}
            >
              {/* Subtle glowing background orb */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${feature.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="z-10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
