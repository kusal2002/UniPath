import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import InquiryForm from "@/components/landing/InquiryForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      
      <section id="apply" className="py-24 bg-brand-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-200/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 mb-4">Start Your Journey</h2>
            <p className="text-slate-600 text-lg">Take the first step towards your international education. Fill out the form below and our experts will be in touch.</p>
          </div>
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
