"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import {
  OFFLINE_SEGMENTS,
  ONLINE_SEGMENTS,
  ALL_SEGMENTS,
  SEGMENT_FEE,
  type SegmentData,
} from "@/lib/segments-data";

// ─────────────────────────────────────────────────────────────────────────────
// Registration Form — Client Component
// ─────────────────────────────────────────────────────────────────────────────

interface FormErrors {
  [key: string]: string;
}

interface SuccessData {
  invoiceId: string;
  totalAmount: number;
  segmentCount: number;
  segments: SegmentData[];
}

// ── Segment Card ─────────────────────────────────────────────────────────────
function SegmentCard({
  segment,
  checked,
  onChange,
}: {
  segment: SegmentData;
  checked: boolean;
  onChange: (id: string) => void;
}) {
  return (
    <label
      htmlFor={`seg-${segment.id}`}
      className={`relative flex items-start gap-4 p-4 border cursor-pointer transition-all duration-200 group
        ${checked
          ? "border-[#C05A46] bg-[#C05A46]/[0.08] shadow-[0_0_20px_rgba(192,90,70,0.15)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
        }`}
    >
      {/* Checkbox */}
      <div className="mt-0.5 shrink-0">
        <input
          type="checkbox"
          id={`seg-${segment.id}`}
          checked={checked}
          onChange={() => onChange(segment.id)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-150
            ${checked ? "border-[#C05A46] bg-[#C05A46]" : "border-white/30 bg-transparent"}`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-base">{segment.emoji}</span>
          <p className={`font-bold text-sm tracking-wide transition-colors ${checked ? "text-white" : "text-white/80"}`}>
            {segment.name}
          </p>
          <span className={`text-[9px] font-black tracking-widest px-1.5 py-0.5 border ${
            segment.type === "ONLINE"
              ? "border-blue-500/40 text-blue-400 bg-blue-500/10"
              : "border-[#C8963E]/40 text-[#C8963E] bg-[#C8963E]/10"
          }`}>
            {segment.type}
          </span>
        </div>
        <p className="text-white/50 text-[11px] leading-relaxed">{segment.subtitle}</p>
      </div>

      {/* Fee */}
      <div className="shrink-0 text-right">
        <p className={`text-sm font-black ${checked ? "text-[#C05A46]" : "text-white/40"}`}>৳{segment.fee}</p>
      </div>

      {/* Active left border */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 ${checked ? "bg-[#C05A46]" : "bg-transparent"}`} />
    </label>
  );
}

// ── Success Modal ─────────────────────────────────────────────────────────────
function SuccessModal({ data, onClose }: { data: SuccessData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Red top accent */}
        <div className="h-1 bg-gradient-to-r from-[#C05A46] via-[#C8963E] to-[#C05A46]" />

        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-full">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="text-center text-2xl font-black text-white mb-2">Registration Successful!</h2>
          <p className="text-center text-white/50 text-sm mb-6">Your application has been received. Keep your Invoice ID safe.</p>

          {/* Invoice ID */}
          <div className="bg-[#0d0d0d] border border-[#C8963E]/30 p-4 text-center mb-5">
            <p className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-2">Invoice / Registration ID</p>
            <p className="text-2xl font-black text-[#C8963E] tracking-widest font-mono">{data.invoiceId}</p>
          </div>

          {/* Segments summary */}
          <div className="mb-5">
            <p className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-3">Registered Segments ({data.segmentCount})</p>
            <div className="flex flex-col gap-1.5">
              {data.segments.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{s.emoji} {s.name}</span>
                  <span className="text-[#C8963E] font-bold">৳{s.fee}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-white/10 pt-2 mt-1">
                <span className="text-white font-bold text-sm">Total</span>
                <span className="text-[#C8963E] font-black text-lg">৳{data.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-[#0a1a0a] border border-green-500/20 p-3 text-center mb-6">
            <p className="text-green-400/80 text-xs leading-relaxed">
              📧 A confirmation email has been sent. Your entry ticket will be delivered before the fest starts.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#C05A46] text-white font-black tracking-widest text-sm hover:bg-[#a84a38] transition-colors"
          >
            DONE — CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Form Component ───────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    classOrYear: "",
    additionalNote: "",
  });
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<string[]>([]);
  const [payment, setPayment] = useState({
    bkashOrNogodNumber: "",
    trxId: "",
  });
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalFee = selectedSegmentIds.length * SEGMENT_FEE;
  const hasOnlineSegment = selectedSegmentIds.some(
    (id) => ONLINE_SEGMENTS.some((s) => s.id === id)
  );
  const bkashNumber = process.env.NEXT_PUBLIC_BKASH_NUMBER ?? "01XXXXXXXXX";

  function toggleSegment(id: string) {
    setSelectedSegmentIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setErrors((e) => ({ ...e, segments: "" }));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  }

  function handlePaymentInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((err) => ({ ...err, screenshot: "Please select a JPEG, PNG, or WebP image." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((err) => ({ ...err, screenshot: "File must be under 5 MB." }));
      return;
    }
    setScreenshotFile(file);
    setErrors((err) => ({ ...err, screenshot: "" }));
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "A valid email address is required.";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "A valid phone number is required.";
    if (!formData.institution.trim()) newErrors.institution = "Institution is required.";
    if (!formData.classOrYear.trim()) newErrors.classOrYear = "Class/Year is required.";
    if (selectedSegmentIds.length === 0) newErrors.segments = "Please select at least one segment.";
    if (!payment.bkashOrNogodNumber.trim() || payment.bkashOrNogodNumber.length < 10)
      newErrors.bkashOrNogodNumber = "Mobile number used for payment is required.";
    if (!payment.trxId.trim()) newErrors.trxId = "Transaction ID is required.";
    if (!screenshotFile) newErrors.screenshot = "Payment screenshot is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError("");

    if (!validate()) {
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      // 1. Upload screenshot first
      setIsUploading(true);
      const uploadForm = new FormData();
      uploadForm.append("file", screenshotFile!);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const uploadData = await uploadRes.json();
      setIsUploading(false);

      if (!uploadData.success) {
        setGlobalError(uploadData.error ?? "Screenshot upload failed. Please try again.");
        return;
      }

      // 2. Submit registration
      setIsSubmitting(true);
      const regRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          institution: formData.institution.trim(),
          classOrYear: formData.classOrYear.trim(),
          additionalNote: formData.additionalNote.trim() || null,
          bkashOrNogodNumber: payment.bkashOrNogodNumber.trim(),
          trxId: payment.trxId.trim(),
          screenshotUrl: uploadData.url,
          segmentIds: selectedSegmentIds,
        }),
      });

      const regData = await regRes.json();
      setIsSubmitting(false);

      if (!regData.success) {
        setGlobalError(regData.error ?? "Registration failed. Please try again.");
        return;
      }

      const registeredSegments = ALL_SEGMENTS.filter((s) => selectedSegmentIds.includes(s.id));
      setSuccess({
        invoiceId: regData.invoiceId,
        totalAmount: regData.totalAmount,
        segmentCount: regData.segmentCount,
        segments: registeredSegments,
      });
    } catch {
      setIsUploading(false);
      setIsSubmitting(false);
      setGlobalError("Network error. Please check your connection and try again.");
    }
  }

  const inputClass = (field: string) =>
    `w-full bg-[#0d0d0d] border px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200
    focus:ring-1 focus:ring-[#C05A46] focus:border-[#C05A46]
    ${errors[field] ? "border-red-500" : "border-white/10 hover:border-white/20"}`;

  const isLoading = isUploading || isSubmitting;

  return (
    <>
      {success && (
        <SuccessModal
          data={success}
          onClose={() => {
            setSuccess(null);
            window.location.href = "/";
          }}
        />
      )}

      <div className="relative min-h-screen bg-[#0d0d0d] flex flex-col">
        <Navbar />

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C05A46]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#C8963E]/5 rounded-full blur-3xl" />
        </div>

        <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-28 pb-20">
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] font-black tracking-[0.4em] text-[#C8963E] uppercase mb-3">
              REVOLUTION 2.0
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-none mb-3">
              REGISTER{" "}
              <span className="text-[#C05A46] relative">
                NOW
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C05A46]" />
              </span>
            </h1>
            <p className="text-white/50 text-sm">
              Fill in your details to secure your spot in Revolution 2.0
            </p>
          </div>

          {/* HOW TO REGISTER notice */}
          <div className="bg-[#0a0a0a] border border-white/[0.08] p-5 mb-8">
            <p className="text-[10px] font-black tracking-[0.3em] text-[#C05A46] uppercase mb-3 flex items-center gap-2">
              <span className="w-4 h-4 flex items-center justify-center bg-[#C05A46] text-white text-[8px] font-black">!</span>
              HOW TO REGISTER
            </p>
            <ol className="text-white/50 text-xs space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Select your desired cultural segments below.</li>
              <li>Note the total fee and pay via <strong className="text-white/70">bKash</strong> (Send Money) to <strong className="text-[#C8963E] font-mono">{bkashNumber}</strong>.</li>
              <li>Use your <strong className="text-white/70">full name</strong> as the reference/note while sending.</li>
              <li>After payment, upload your transaction screenshot and fill in the TxnID.</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>

            {/* ── SECTION 1: Personal Info ────────────────────────────────── */}
            <div>
              <SectionHeader number="01" title="Personal Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={!!errors.fullName}>
                  <label className="form-label">Full Name <RequiredStar /></label>
                  <input name="fullName" value={formData.fullName} onChange={handleInput} placeholder="Your full name" className={inputClass("fullName")} />
                  <ErrorText msg={errors.fullName} />
                </div>
                <div data-error={!!errors.email}>
                  <label className="form-label">Email Address <RequiredStar /></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="email@example.com" className={inputClass("email")} />
                  <ErrorText msg={errors.email} />
                </div>
                <div data-error={!!errors.phone}>
                  <label className="form-label">Phone Number <RequiredStar /></label>
                  <input name="phone" value={formData.phone} onChange={handleInput} placeholder="+880 1XXX XXXXXX" className={inputClass("phone")} />
                  <ErrorText msg={errors.phone} />
                </div>
                <div data-error={!!errors.institution}>
                  <label className="form-label">Institution <RequiredStar /></label>
                  <input name="institution" value={formData.institution} onChange={handleInput} placeholder="Your school / college" className={inputClass("institution")} />
                  <ErrorText msg={errors.institution} />
                </div>
                <div className="sm:col-span-2" data-error={!!errors.classOrYear}>
                  <label className="form-label">Class / Year <RequiredStar /></label>
                  <input name="classOrYear" value={formData.classOrYear} onChange={handleInput} placeholder="e.g. Class 12 / 2nd Year / HSC 2026" className={inputClass("classOrYear")} />
                  <ErrorText msg={errors.classOrYear} />
                </div>
              </div>
            </div>

            {/* ── SECTION 2: Segment Selection ────────────────────────────── */}
            <div>
              <SectionHeader number="02" title="Select Segments" />

              {/* Fee summary */}
              {selectedSegmentIds.length > 0 && (
                <div className="mb-4 bg-[#C05A46]/10 border border-[#C05A46]/30 px-5 py-3 flex items-center justify-between">
                  <span className="text-white/70 text-sm">
                    {selectedSegmentIds.length} segment{selectedSegmentIds.length > 1 ? "s" : ""} selected
                  </span>
                  <span className="text-[#C05A46] font-black text-lg">৳{totalFee}</span>
                </div>
              )}

              {/* Online warning */}
              {hasOnlineSegment && (
                <div className="mb-4 bg-blue-500/10 border border-blue-500/30 px-5 py-3 flex items-start gap-3">
                  <span className="text-blue-400 text-base mt-0.5">ℹ️</span>
                  <p className="text-blue-300 text-xs leading-relaxed">
                    <strong>Online Segments Notice:</strong>{" "}
                    Online-এর কার্যক্রমগুলো অফিসিয়াল ফেসবুক ইভেন্ট পেজ থেকে পরিচালনা করা হবে।
                  </p>
                </div>
              )}

              {errors.segments && (
                <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
                  <span>⚠</span> {errors.segments}
                </p>
              )}

              {/* Offline segments */}
              <div className="mb-5">
                <p className="text-[10px] font-black tracking-[0.3em] text-[#C8963E] uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C8963E] rotate-45 inline-block" />
                  Offline Based Activities
                </p>
                <div className="flex flex-col gap-2">
                  {OFFLINE_SEGMENTS.map((seg) => (
                    <SegmentCard
                      key={seg.id}
                      segment={seg}
                      checked={selectedSegmentIds.includes(seg.id)}
                      onChange={toggleSegment}
                    />
                  ))}
                </div>
              </div>

              {/* Online segments */}
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rotate-45 inline-block" />
                  Online Based Activities
                </p>
                <div className="flex flex-col gap-2">
                  {ONLINE_SEGMENTS.map((seg) => (
                    <SegmentCard
                      key={seg.id}
                      segment={seg}
                      checked={selectedSegmentIds.includes(seg.id)}
                      onChange={toggleSegment}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── SECTION 3: Payment ──────────────────────────────────────── */}
            <div>
              <SectionHeader number="03" title="Registration Fee & Payment" />

              {/* Payment instructions card */}
              <div className="bg-[#0a0a0a] border border-white/[0.08] p-5 mb-5 text-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/70">Registration Fee</p>
                  <p className="text-[#C8963E] font-black text-lg">
                    ৳{totalFee || `${SEGMENT_FEE} × segments`}
                  </p>
                </div>
                <div className="h-px bg-white/[0.06] mb-3" />
                <div className="space-y-1.5 text-xs text-white/50">
                  <p>📱 Payment via: <strong className="text-white/80">bKash</strong> (Send Money)</p>
                  <p>📞 bKash Number: <strong className="text-[#C8963E] font-mono text-sm">{bkashNumber}</strong></p>
                  <p>📝 Reference: <strong className="text-white/80">Your full name</strong></p>
                  <p>After payment, upload the <strong className="text-white/80">transaction screenshot</strong> and enter your TxnID correctly.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={!!errors.trxId}>
                  <label className="form-label">Transaction ID (TxnID) <RequiredStar /></label>
                  <input name="trxId" value={payment.trxId} onChange={handlePaymentInput} placeholder="e.g. ABC1234XYZ" className={inputClass("trxId")} />
                  <ErrorText msg={errors.trxId} />
                </div>
                <div data-error={!!errors.bkashOrNogodNumber}>
                  <label className="form-label">Number Used for Payment <RequiredStar /></label>
                  <input name="bkashOrNogodNumber" value={payment.bkashOrNogodNumber} onChange={handlePaymentInput} placeholder="+880 1XXX XXXXXX" className={inputClass("bkashOrNogodNumber")} />
                  <ErrorText msg={errors.bkashOrNogodNumber} />
                </div>
              </div>

              {/* Screenshot upload */}
              <div className="mt-4" data-error={!!errors.screenshot}>
                <label className="form-label">
                  Upload Transaction Screenshot <RequiredStar />
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed cursor-pointer transition-all duration-200 p-5 text-center
                    ${screenshotFile
                      ? "border-green-500/40 bg-green-500/5"
                      : errors.screenshot
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-white/15 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.03]"
                    }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {screenshotPreview ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={screenshotPreview} alt="Screenshot preview" className="max-h-40 mx-auto object-contain" />
                      <p className="text-green-400 text-xs mt-2">✓ {screenshotFile?.name}</p>
                    </div>
                  ) : (
                    <div>
                      <svg className="w-8 h-8 mx-auto mb-2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <p className="text-white/40 text-sm">Click to upload screenshot</p>
                      <p className="text-white/25 text-xs mt-1">JPEG, PNG or WebP — max 5 MB</p>
                    </div>
                  )}
                </div>
                <ErrorText msg={errors.screenshot} />
              </div>
            </div>

            {/* ── SECTION 4: Additional Note ────────────────────────────── */}
            <div>
              <label className="form-label">Additional Note <span className="text-white/30 font-normal">(optional)</span></label>
              <textarea
                name="additionalNote"
                value={formData.additionalNote}
                onChange={handleInput}
                rows={3}
                placeholder="Anything you'd like us to know..."
                className={`${inputClass("additionalNote")} resize-none`}
              />
            </div>

            {/* Global error */}
            {globalError && (
              <div className="bg-red-500/10 border border-red-500/30 px-5 py-3">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <span>⚠</span> {globalError}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-4 bg-[#C05A46] text-white font-black tracking-widest text-sm uppercase
                hover:bg-[#a84a38] active:scale-[0.99] transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-[0_0_30px_rgba(192,90,70,0.4)] hover:shadow-[0_0_45px_rgba(192,90,70,0.6)]
                flex items-center justify-center gap-3 group btn-register"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isUploading ? "Uploading screenshot..." : "Submitting registration..."}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  SUBMIT REGISTRATION
                </>
              )}
            </button>

            <p className="text-white/25 text-xs text-center">
              All registrations are subject to review and final confirmation by the organizers.
            </p>
          </form>
        </main>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────────
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="text-[#C05A46] font-black text-3xl leading-none opacity-40">{number}</span>
      <h2 className="text-base font-black tracking-wider text-white uppercase">{title}</h2>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

function RequiredStar() {
  return <span className="text-[#C05A46] ml-0.5">*</span>;
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );
}
