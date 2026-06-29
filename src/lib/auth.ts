// File: src/lib/auth.ts

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(email: string): Promise<string> {
  const adminPassword = process.env.ADMIN_PASSWORD || "dccadmin321";
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = `${email}:${expires}`;
  const hash = await sha256(`${payload}:${adminPassword}`);
  return `${payload}:${hash}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return false;
    const [email, expiresStr, hash] = parts;
    const expires = parseInt(expiresStr, 10);

    // Verify expiration
    if (isNaN(expires) || expires < Date.now()) return false;

    // Verify email matches the admin email
    const adminEmail = process.env.ADMIN_EMAIL || "dccc@gmail.com";
    if (email !== adminEmail) return false;

    // Verify signature
    const adminPassword = process.env.ADMIN_PASSWORD || "dccadmin321";
    const payload = `${email}:${expiresStr}`;
    const expectedHash = await sha256(`${payload}:${adminPassword}`);
    return hash === expectedHash;
  } catch (e) {
    console.error("Session verification error:", e);
    return false;
  }
}
