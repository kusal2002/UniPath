"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe2, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-brand-50 to-slate-50">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-100 text-brand-700 text-sm font-medium mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Admissions for Fall 2024 are Open
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold font-serif text-slate-900 leading-[1.1] mb-6"
          >
            Your bridge to the world's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">best universities.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed"
          >
            Expert guidance for international students. Discover programs, secure scholarships, and simplify your application process with our dedicated consultants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="#apply" className="flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-medium hover:bg-brand-700 transition shadow-xl shadow-brand-200">
              Apply Now <ArrowRight size={20} />
            </Link>
            <Link href="#services" className="flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-medium border border-slate-200 hover:border-slate-300 transition shadow-sm hover:shadow-md">
              Explore Services
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Partner Universities", value: "500+", icon: GraduationCap },
            { label: "Countries", value: "25+", icon: Globe2 },
            { label: "Success Rate", value: "98%", icon: BookOpen },
            { label: "Students Placed", value: "10k+", icon: ArrowRight },
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur border border-white/40 p-6 rounded-2xl shadow-sm">
              <stat.icon className="text-brand-500 mb-4" size={28} />
              <div className="text-3xl font-bold font-serif text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
