import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/session";
import { env } from "@/lib/env";

/**
 * Crea una subida resumable (tus) "direct creator upload" en Cloudflare Stream.
 * El token NUNCA se expone al browser: el server pide la URL de subida de un solo uso
 * y devuelve su Location + el uid del video. El browser sube con tus a esa Location.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!env.cloudflareAccountId || !env.cloudflareApiToken) {
    return NextResponse.json(
      { error: "Cloudflare Stream no configurado. Cargá CLOUDFLARE_ACCOUNT_ID y CLOUDFLARE_API_TOKEN en Vercel." },
      { status: 409 }
    );
  }

  let body: { uploadLength?: number; name?: string; maxDurationSeconds?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const uploadLength = Number(body.uploadLength);
  if (!uploadLength || uploadLength <= 0) {
    return NextResponse.json({ error: "uploadLength requerido" }, { status: 400 });
  }
  const maxDur =
    body.maxDurationSeconds && body.maxDurationSeconds > 0
      ? Math.min(body.maxDurationSeconds, 21600)
      : 21600;
  const name = (body.name || "video").slice(0, 120);
  const b64 = (s: string) => Buffer.from(s, "utf-8").toString("base64");
  const meta = `name ${b64(name)},maxDurationSeconds ${b64(String(maxDur))}`;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.cloudflareAccountId}/stream?direct_user=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.cloudflareApiToken}`,
        "Tus-Resumable": "1.0.0",
        "Upload-Length": String(uploadLength),
        "Upload-Metadata": meta,
      },
    }
  );

  if (res.status !== 201) {
    const t = await res.text();
    return NextResponse.json(
      { error: `Cloudflare error ${res.status}: ${t.slice(0, 300)}` },
      { status: 502 }
    );
  }

  const location = res.headers.get("Location");
  const uid = res.headers.get("stream-media-id");
  if (!location) {
    return NextResponse.json({ error: "Cloudflare no devolvió Location" }, { status: 502 });
  }
  return NextResponse.json({ location, uid });
}
