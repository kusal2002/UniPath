export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, Calendar, DollarSign, MessageSquare } from "lucide-react";
import InquiryActions from "@/components/admin/InquiryActions";

export default async function InquiryDetail(props: { params: Promise<{ id?: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }
  if (!params.id) {
    notFound();
  }

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: params.id! }
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="text-sm text-slate-400">
            ID: <span className="font-mono">{inquiry.id}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-2">{inquiry.fullName}</h1>
          <p className="text-slate-500 flex items-center gap-2" suppressHydrationWarning>
            Application submitted on {format(new Date(inquiry.createdAt), "MMMM d, yyyy h:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Applicant Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <UserIcon /> Personal Information
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1"><Mail size={12}/> Email</div>
                  <a href={`mailto:${inquiry.email}`} className="text-brand-600 font-medium hover:underline">{inquiry.email}</a>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1"><Phone size={12}/> Phone</div>
                  <div className="text-slate-900">{inquiry.phone || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12}/> Nationality</div>
                  <div className="text-slate-900">{inquiry.nationality}</div>
                </div>
              </div>
            </div>

            {/* Academic Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <GraduationCap size={18} /> Academic Profile
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Current Level</div>
                  <div className="text-slate-900">{inquiry.educationLevel}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">GPA</div>
                  <div className="text-slate-900">{inquiry.gpa ? inquiry.gpa.toFixed(2) : "Not provided"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Target Major</div>
                  <div className="text-slate-900">{inquiry.preferredMajor}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Destinations</div>
                  <div className="text-slate-900">
                    {inquiry.preferredCountries && inquiry.preferredCountries.length > 0 
                      ? inquiry.preferredCountries.join(", ") 
                      : "Open to suggestions"}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar size={18}/> Intake & Budget
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Target Intake</div>
                  <div className="text-slate-900">{inquiry.intakeSeason} {inquiry.intakeYear}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={12}/> Budget Range</div>
                  <div className="text-slate-900">{inquiry.budgetRange || "Not specified"}</div>
                </div>
              </div>
            </div>

            {/* Message */}
            {inquiry.message && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                    <MessageSquare size={18}/> Student Message
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <InquiryActions 
              id={inquiry.id} 
              initialStatus={inquiry.status} 
              initialNotes={inquiry.notes} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}
