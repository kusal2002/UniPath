"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  nationality: z.string().min(2, "Nationality is required"),
  educationLevel: z.string().min(1, "Please select education level"),
  gpa: z.string().optional(),
  preferredMajor: z.string().min(2, "Major is required"),
  intakeYear: z.string().min(4, "Year is required"),
  intakeSeason: z.string().min(2, "Season is required"),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educationLevel: "",
      intakeYear: "2024",
      intakeSeason: "Fall",
      budgetRange: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to submit");
      
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 flex flex-col items-center justify-center text-center rounded-3xl shadow-xl shadow-brand-100/50 border border-brand-100 max-w-2xl mx-auto"
      >
        <CheckCircle className="text-brand-500 w-20 h-20 mb-6" />
        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Application Received!</h3>
        <p className="text-slate-600 text-lg mb-8 max-w-md">
          Thank you for reaching out to UniPath. One of our expert consultants will review your profile and contact you within 24-48 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium transition"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="col-span-full mb-4">
        <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Student Inquiry Form</h3>
        <p className="text-slate-500">Fill in your details and let us guide you to the perfect university.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Full Name *</label>
        <input {...register("fullName")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="John Doe" />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email Address *</label>
        <input type="email" {...register("email")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="john@example.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Phone Number</label>
        <input {...register("phone")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="+1 (555) 000-0000" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Nationality *</label>
        <input {...register("nationality")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="e.g. Canadian" />
        {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Current Education Level *</label>
        <select {...register("educationLevel")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition appearance-none">
          <option value="">Select Level</option>
          <option value="High School">High School</option>
          <option value="Associate Degree">Associate Degree</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
        </select>
        {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">GPA (Optional)</label>
        <input {...register("gpa")} type="number" step="0.01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="4.0" />
      </div>

      <div className="space-y-2 col-span-full md:col-span-1">
        <label className="text-sm font-medium text-slate-700">Preferred Major / Program *</label>
        <input {...register("preferredMajor")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="e.g. Computer Science" />
        {errors.preferredMajor && <p className="text-red-500 text-xs mt-1">{errors.preferredMajor.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Intake Year *</label>
          <input {...register("intakeYear")} type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition" placeholder="2024" />
          {errors.intakeYear && <p className="text-red-500 text-xs mt-1">{errors.intakeYear.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Season *</label>
          <select {...register("intakeSeason")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition appearance-none">
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 col-span-full">
        <label className="text-sm font-medium text-slate-700">Message / Comments</label>
        <textarea {...register("message")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none" placeholder="Is there anything specific you want us to know?" />
      </div>

      <div className="col-span-full pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition shadow-lg shadow-brand-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={20} /> Submitting...</>
          ) : (
            "Submit Request"
          )}
        </button>
      </div>
    </form>
  );
}
