"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Plane, HandHeart, BookCheck, Briefcase } from "lucide-react";

const services = [
  {
    title: "University Matching",
    description: "We analyze your academic profile and preferences to find your perfect university fit globally.",
    icon: Search,
  },
  {
    title: "Application Support",
    description: "Comprehensive help with essays, SOPs, CVs, and application forms from start to submission.",
    icon: PenTool,
  },
  {
    title: "Visa Guidance",
    description: "Step-by-step assistance through the complex student visa processes for any country.",
    icon: Plane,
  },
  {
    title: "Scholarship Search",
    description: "Maximize your funding with our extensive database of university and government scholarships.",
    icon: BookCheck,
  },
  {
    title: "Test Preparation",
    description: "Resources and connections to top-tier tutors for IELTS, TOEFL, SAT, GRE, and GMAT.",
    icon: Briefcase,
  },
  {
    title: "Pre-Departure Briefings",
    description: "Get ready for your new life abroad with accommodation help and cultural orientation.",
    icon: HandHeart,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4">Comprehensive Support</h2>
          <p className="text-slate-600 text-lg">Everything you need to successfully transition from your current studies to an international university.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
