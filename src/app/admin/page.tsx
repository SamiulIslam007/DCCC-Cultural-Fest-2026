// File: src/app/admin/page.tsx
import AdminDashboard from "./AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — DCCC Cultural Fiesta 2026",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  return <AdminDashboard />;
}
