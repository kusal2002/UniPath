"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-600 text-white p-2 rounded-xl group-hover:bg-brand-700 transition">
            <GraduationCap size={24} />
          </div>
          <span className="font-serif text-2xl font-bold text-slate-800 tracking-tight">UniPath</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="#services" className="hover:text-brand-600 transition">Home</Link>
          <Link href="#services" className="hover:text-brand-600 transition">Services</Link>
          <Link href="#destinations" className="hover:text-brand-600 transition">Destinations</Link>
          {/* <Link href="#how-it-works" className="hover:text-brand-600 transition">How it Works</Link> */}
          <Link href="/admin" className="hover:text-brand-600 transition text-sm">Staff Login</Link>
        </nav>
        <Link href="#apply" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-200">
          Start Journey
        </Link>
      </div>
    </header>
  );
}
