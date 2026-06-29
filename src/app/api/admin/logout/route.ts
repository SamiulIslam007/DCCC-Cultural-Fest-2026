// File: src/app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/admin/logout] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to logout." },
      { status: 500 }
    );
  }
}
