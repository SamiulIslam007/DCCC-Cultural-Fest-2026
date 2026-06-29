import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("[POST /api/upload] Cloudinary environment variables are missing.");
      return NextResponse.json(
        { success: false, error: "Cloud storage configuration is missing on server." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Please upload a JPEG, PNG, or WebP image.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Uri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const ext = file.name.split(".").pop() ?? "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .slice(0, 40);
    const publicId = `${Date.now()}_${safeName}`;

    const result = await cloudinary.uploader.upload(base64Uri, {
      folder: "payment-screenshots",
      public_id: publicId,
      resource_type: "image",
      format: ext,
    });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("[POST /api/upload] Error:", error);
    return NextResponse.json(
      { success: false, error: "File upload failed. Please try again." },
      { status: 500 }
    );
  }
}
