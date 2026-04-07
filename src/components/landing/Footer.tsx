"use client";

import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="bg-brand-500 text-slate-900 p-2 rounded-xl">
              <GraduationCap size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">UniPath</span>
          </Link>
          <p className="max-w-md text-slate-400 mb-8 leading-relaxed">
            Your trusted partner in navigating the complex landscape of international university admissions. We make your global education dreams a reality.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition"><Linkedin size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link href="#about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="#services" className="hover:text-white transition">Our Services</Link></li>
            <li><Link href="#careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition">Staff Portal</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} UniPath Consulting. All rights reserved.</p>
        <p>Designed for success.</p>
      </div>
    </footer>
  );
}
