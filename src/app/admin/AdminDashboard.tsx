"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ALL_SEGMENTS } from "@/lib/segments-data";

// ─────────────────────────────────────────────────────────────────────────────
// Admin Dashboard — Client Component
// Requires adminKey prop (validated server-side before rendering)
// ─────────────────────────────────────────────────────────────────────────────

interface EmailLog {
  id: string;
  emailType: "INITIAL_REGISTRATION_CONFIRMATION" | "TICKET_DELIVERY";
  status: "SENT" | "FAILED";
  errorMsg: string | null;
  sentAt: string;
}

interface Segment { id: string; name: string; type: string; }

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  classOrYear: string;
  bkashOrNogodNumber: string;
  trxId: string;
  screenshotUrl: string;
  totalAmount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  segments: Segment[];
  emailLogs: EmailLog[];
  createdAt: string;
}

interface Stats { total: number; PENDING: number; APPROVED: number; REJECTED: number; }

type StatusFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  APPROVED: "text-green-400 bg-green-400/10 border-green-400/30",
  REJECTED: "text-red-400 bg-red-400/10 border-red-400/30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-2 py-0.5 text-[10px] font-black tracking-widest border uppercase ${STATUS_COLORS[status] ?? "text-white/50 bg-white/5 border-white/10"}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [segmentFilter, setSegmentFilter] = useState("");
  const [actionLoading, setActionLoading] = useState<string>("");
  const [retryLoading, setRetryLoading] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (segmentFilter) params.set("segment", segmentFilter);

      const res = await fetch(`/api/admin/registrations?${params}`);
      const data = await res.json();

      if (!data.success) throw new Error(data.error);
      setRegistrations(data.data);
      setStats(data.stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load registrations.");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, segmentFilter]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  async function handleApprove(registrationId: string, action: "APPROVE" | "REJECT") {
    setActionLoading(`${registrationId}-${action}`);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, action }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchRegistrations();
        if (action === "APPROVE" && !data.emailSent) {
          alert(`Registration approved! ⚠️ Ticket email failed: ${data.emailError}. Use Retry Email to resend.`);
        }
      } else {
        alert(`Error: ${data.error}`);
      }
    } finally {
      setActionLoading("");
    }
  }

  async function handleResendTicket(invoiceId: string) {
    setResendLoading(invoiceId);
    try {
      const res = await fetch("/api/admin/resend-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });
      const data = (await res.json()) as { success: boolean; error?: string; message?: string };

      if (data.success) {
        alert(`✅ ${data.message ?? "Ticket email sent successfully!"}`);
        await fetchRegistrations();
      } else {
        alert(`❌ ${data.error ?? "Failed to resend ticket email."}`);
      }
    } catch {
      alert("❌ An unexpected error occurred while resending the ticket.");
    } finally {
      setResendLoading("");
    }
  }

  async function handleRetryEmail(
    registrationId: string,
    emailType: "INITIAL_REGISTRATION_CONFIRMATION" | "TICKET_DELIVERY"
  ) {
    setRetryLoading(`${registrationId}-${emailType}`);
    try {
      const res = await fetch("/api/admin/retry-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, emailType }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Email sent successfully!");
        await fetchRegistrations();
      } else {
        alert(`❌ Email still failed: ${data.error}`);
      }
    } finally {
      setRetryLoading("");
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = "/admin/login";
      } else {
        alert("Failed to logout.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during logout.");
    }
  }

  const exportToCSV = () => {
    const approvedRegistrations = registrations.filter((r) => r.status === "APPROVED");
    
    if (approvedRegistrations.length === 0) {
      alert("No approved registrations to export.");
      return;
    }

    const escapeCSV = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const str = String(val);
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const headers = [
      "Invoice ID",
      "Full Name",
      "Email",
      "Phone",
      "Institution",
      "Class/Year",
      "Segments",
      "Amount (BDT)",
      "Payment Phone",
      "TrxID",
      "Registered At"
    ];

    const csvRows = [
      headers.join(","),
      ...approvedRegistrations.map((r) => {
        const segmentNames = r.segments.map((s) => s.name).join("; ");
        return [
          escapeCSV(r.id),
          escapeCSV(r.fullName),
          escapeCSV(r.email),
          escapeCSV(r.phone),
          escapeCSV(r.institution),
          escapeCSV(r.classOrYear),
          escapeCSV(segmentNames),
          escapeCSV(r.totalAmount),
          escapeCSV(r.bkashOrNogodNumber),
          escapeCSV(r.trxId),
          escapeCSV(new Date(r.createdAt).toLocaleString())
        ].join(",");
      })
    ];

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `dccc_approved_participants_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLatestFailedLog = (logs: EmailLog[]) =>
    logs.find((l) => l.status === "FAILED");

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-white/[0.06] px-6 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.4em] text-[#C8963E] uppercase mb-1">DCCC FIESTA 2026</p>
            <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-white/40 text-xs hover:text-white transition-colors">← Back to Site</a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-[#C05A46]/20 border border-[#C05A46]/40 text-[#C05A46] text-[10px] font-black tracking-widest uppercase hover:bg-[#C05A46] hover:text-white transition-all duration-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-white", border: "border-white/10" },
            { label: "Pending", value: stats.PENDING, color: "text-yellow-400", border: "border-yellow-400/20" },
            { label: "Approved", value: stats.APPROVED, color: "text-green-400", border: "border-green-400/20" },
            { label: "Rejected", value: stats.REJECTED, color: "text-red-400", border: "border-red-400/20" },
          ].map((stat) => (
            <div key={stat.label} className={`bg-[#0d0d0d] border ${stat.border} p-5`}>
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Status filter tabs */}
          <div className="flex gap-1 bg-[#0d0d0d] border border-white/[0.06] p-1">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all ${
                  statusFilter === s
                    ? "bg-[#C05A46] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Segment filter */}
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="bg-[#0d0d0d] border border-white/[0.06] text-white/70 text-xs px-4 py-2 outline-none focus:border-[#C05A46] transition-colors"
          >
            <option value="">All Segments</option>
            {ALL_SEGMENTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
            ))}
          </select>

          <div className="sm:ml-auto flex gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-[#C8963E]/20 border border-[#C8963E]/40 text-[#C8963E] text-xs font-black tracking-widest uppercase hover:bg-[#C8963E] hover:text-black transition-all duration-300 cursor-pointer"
            >
              📥 Export CSV
            </button>
            <button
              onClick={fetchRegistrations}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin text-[#C8963E]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button onClick={fetchRegistrations} className="mt-3 text-xs text-white/50 hover:text-white">Retry</button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-24 text-white/30 text-sm">No registrations found for the selected filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#0d0d0d] text-white/40 font-black tracking-widest uppercase text-[10px]">
                  {["Invoice ID", "Name / Contact", "Segments", "TxnID", "Screenshot", "Amount", "Status", "Email Log", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left border-b border-white/[0.06] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => {
                  const failedLog = getLatestFailedLog(reg.emailLogs);
                  const isExpanded = expandedId === reg.id;
                  const approveLoading = actionLoading === `${reg.id}-APPROVE`;
                  const rejectLoading = actionLoading === `${reg.id}-REJECT`;
                  const resendTicketLoading = resendLoading === reg.id;

                  return (
                    <React.Fragment key={reg.id}>
                      <tr
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                      >
                        {/* Invoice ID */}
                        <td className="px-4 py-3 font-mono text-[#C8963E] whitespace-nowrap font-bold">{reg.id}</td>

                        {/* Name / Contact */}
                        <td className="px-4 py-3">
                          <p className="text-white font-bold">{reg.fullName}</p>
                          <p className="text-white/40 mt-0.5">{reg.email}</p>
                          <p className="text-white/40">{reg.phone}</p>
                        </td>

                        {/* Segments */}
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-[160px]">
                            {reg.segments.map((s) => (
                              <span key={s.id} className="px-1.5 py-0.5 bg-[#C8963E]/10 border border-[#C8963E]/20 text-[#C8963E] text-[9px] font-bold whitespace-nowrap">
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* TxnID */}
                        <td className="px-4 py-3 font-mono text-white/70 whitespace-nowrap">{reg.trxId}</td>

                        {/* Screenshot */}
                        <td className="px-4 py-3">
                          <a
                            href={reg.screenshotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-400 hover:text-blue-300 underline text-[10px] whitespace-nowrap"
                          >
                            View →
                          </a>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-3 text-[#C8963E] font-black whitespace-nowrap">৳{reg.totalAmount}</td>

                        {/* Status */}
                        <td className="px-4 py-3"><StatusBadge status={reg.status} /></td>

                        {/* Email Log */}
                        <td className="px-4 py-3">
                          {reg.emailLogs.length > 0 ? (
                            <div className="space-y-1">
                              {reg.emailLogs.slice(0, 2).map((log) => (
                                <div key={log.id} className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.status === "SENT" ? "bg-green-400" : "bg-red-400"}`} />
                                  <span className="text-white/40 text-[9px] whitespace-nowrap">
                                    {log.emailType === "INITIAL_REGISTRATION_CONFIRMATION" ? "Confirm" : "Ticket"}: {log.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-white/20 text-[9px]">No logs</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {reg.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() => handleApprove(reg.id, "APPROVE")}
                                  disabled={!!actionLoading}
                                  className="px-2.5 py-1 bg-green-600/20 border border-green-600/40 text-green-400 text-[9px] font-black uppercase hover:bg-green-600/30 disabled:opacity-50 transition-colors whitespace-nowrap"
                                >
                                  {approveLoading ? "..." : "✓ Approve"}
                                </button>
                                <button
                                  onClick={() => handleApprove(reg.id, "REJECT")}
                                  disabled={!!actionLoading}
                                  className="px-2.5 py-1 bg-red-600/20 border border-red-600/40 text-red-400 text-[9px] font-black uppercase hover:bg-red-600/30 disabled:opacity-50 transition-colors whitespace-nowrap"
                                >
                                  {rejectLoading ? "..." : "✕ Reject"}
                                </button>
                              </>
                            )}

                            {/* Retry Email button for failed logs */}
                            {failedLog && (
                              <button
                                onClick={() => handleRetryEmail(reg.id, failedLog.emailType)}
                                disabled={!!retryLoading}
                                title={`Retry ${failedLog.emailType === "INITIAL_REGISTRATION_CONFIRMATION" ? "Confirmation" : "Ticket"} Email`}
                                className="px-2.5 py-1 bg-orange-600/20 border border-orange-600/40 text-orange-400 text-[9px] font-black uppercase hover:bg-orange-600/30 disabled:opacity-50 transition-colors whitespace-nowrap"
                              >
                                {retryLoading === `${reg.id}-${failedLog.emailType}` ? "..." : "↻ Retry Email"}
                              </button>
                            )}

                            {reg.status === "APPROVED" && (
                              <button
                                onClick={() => handleResendTicket(reg.id)}
                                disabled={!!resendLoading || !!retryLoading}
                                title="Resend ticket/invoice email to participant"
                                className="px-2.5 py-1 bg-blue-600/20 border border-blue-500/40 text-blue-300 text-[9px] font-black uppercase hover:bg-blue-600/40 hover:border-blue-400/60 disabled:opacity-50 transition-all duration-200 whitespace-nowrap"
                              >
                                {resendTicketLoading ? "..." : "🎟️ Resend Ticket"}
                              </button>
                            )}
                            {reg.status === "REJECTED" && !failedLog && (
                              <span className="text-red-400/50 text-[9px]">✕ Rejected</span>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExpanded && (
                        <tr className="bg-[#0a0a0a]">
                          <td colSpan={9} className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                              <div>
                                <p className="text-white/40 uppercase tracking-widest text-[9px] font-black mb-2">Details</p>
                                <p className="text-white/60">Institution: <span className="text-white">{reg.institution}</span></p>
                                <p className="text-white/60">Class/Year: <span className="text-white">{reg.classOrYear}</span></p>
                                <p className="text-white/60">Payment #: <span className="text-white font-mono">{reg.bkashOrNogodNumber}</span></p>
                                <p className="text-white/60">Registered: <span className="text-white">{new Date(reg.createdAt).toLocaleString()}</span></p>
                              </div>
                              <div>
                                <p className="text-white/40 uppercase tracking-widest text-[9px] font-black mb-2">All Segments</p>
                                {reg.segments.map((s) => (
                                  <p key={s.id} className="text-white/70 mb-0.5">{s.name} <span className="text-white/30">({s.type})</span></p>
                                ))}
                              </div>
                              <div>
                                <p className="text-white/40 uppercase tracking-widest text-[9px] font-black mb-2">Email History</p>
                                {reg.emailLogs.map((log) => (
                                  <div key={log.id} className="mb-1">
                                    <p className={`${log.status === "SENT" ? "text-green-400" : "text-red-400"}`}>
                                      {log.status === "SENT" ? "✓" : "✕"} {log.emailType === "INITIAL_REGISTRATION_CONFIRMATION" ? "Confirmation" : "Ticket"}
                                      <span className="text-white/30 ml-1">{new Date(log.sentAt).toLocaleString()}</span>
                                    </p>
                                    {log.errorMsg && <p className="text-red-400/60 text-[10px] ml-3">{log.errorMsg}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
