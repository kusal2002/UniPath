"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2 } from "lucide-react";

export default function InquiryActions({ 
  id, 
  initialStatus, 
  initialNotes 
}: { 
  id: string, 
  initialStatus: string, 
  initialNotes: string | null 
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        router.refresh();
        alert("Updated successfully");
      }
    } catch (err) {
      alert("Error updating");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      alert("Error deleting");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
      <h3 className="text-lg font-bold font-serif text-slate-900 mb-6">Staff Actions</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Update Status</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
          >
            <option value="NEW">New</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="CONTACTED">Contacted</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Internal Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none"
            placeholder="Add notes about this applicant..."
          />
          <p className="text-xs text-slate-400 mt-1">These notes are only visible to staff.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-200 font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          Delete Inquiry
        </button>
      </div>
    </div>
  );
}
