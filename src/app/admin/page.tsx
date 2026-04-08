"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileSearch, LogOut, ArrowRight, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
      return;
    }

    // Fetch inquiries
    fetch("/api/inquiries")
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error("Error fetching inquiries:", err));
  }, [session, status, router]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the admin dashboard",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ callbackUrl: "/admin/login" });
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-blue-100 text-blue-700 border-blue-200";
      case "IN_REVIEW": return "bg-amber-100 text-amber-700 border-amber-200";
      case "CONTACTED": return "bg-purple-100 text-purple-700 border-purple-200";
      case "ENROLLED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "CLOSED": return "bg-slate-100 text-slate-700 border-slate-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">UniPath Admin</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Welcome, {session.user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition">
            View Live Site
          </Link>
          <div className="w-px h-6 bg-slate-200"></div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-2">Student Inquiries</h2>
            <p className="text-slate-500">Manage and track all student applications.</p>
          </div>
          
          <div className="bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm inline-flex items-center gap-2 text-sm font-medium text-slate-600">
            Total Inquiries: <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded-md">{inquiries.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <FileSearch size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No inquiries yet</h3>
              <p className="text-slate-500">When students submit the form, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm string text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Student Name</th>
                    <th className="px-6 py-4 font-medium">Program Interest</th>
                    <th className="px-6 py-4 font-medium">Date Received</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{inquiry.fullName}</div>
                        <div className="text-sm text-slate-500">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{inquiry.preferredMajor || "Undecided"}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          {inquiry.educationLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600" suppressHydrationWarning>
                        {formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/admin/${inquiry.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition"
                        >
                          Details <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
