import type { PlaybackSource, VideoProvider } from "./provider";
import { env } from "@/lib/env";

/**
 * Proveedor Cloudflare Stream con SIGNED URLs.
 *
 * Flujo: se firma un token JWT para el UID del video usando la signing key de Stream,
 * y se entrega un HLS/iframe con ese token. Esto evita el acceso trivial no autorizado.
 * (Ningún sistema web evita por completo la grabación de pantalla; el objetivo es impedir
 * el acceso directo sin autorización.)
 *
 * Requiere: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN y, para firmar,
 * CLOUDFLARE_STREAM_KEY_ID + CLOUDFLARE_STREAM_KEY_JWK (ver SETUP.md §Video).
 */
export class CloudflareStreamProvider implements VideoProvider {
  readonly name = "cloudflare";

  async getPlaybackSource(
    assetId: string | null,
    poster: string | null
  ): Promise<PlaybackSource> {
    if (!assetId) {
      return {
        kind: "none",
        url: null,
        poster,
        expiresAt: null,
        notice: "Este curso todavía no tiene el video cargado en Cloudflare Stream.",
      };
    }

    // Si tenemos signing key, generamos un token firmado; si no, usamos el UID directo
    // (requiere que el video sea 'requireSignedURLs = false', no recomendado en prod).
    const token = await this.signToken(assetId);
    const customerSubdomain = env.cloudflareAccountId
      ? `customer-${env.cloudflareAccountId}.cloudflarestream.com`
      : "cloudflarestream.com";

    const idOrToken = token ?? assetId;
    const expiresAt = token ? Date.now() + 60 * 60 * 1000 : null; // ~1h

    // El iframe embed de Cloudflare Stream reproduce HLS internamente (sin hls.js).
    return {
      kind: "iframe",
      url: `https://${customerSubdomain}/${idOrToken}/iframe?poster=${encodeURIComponent(
        poster ?? `https://${customerSubdomain}/${idOrToken}/thumbnails/thumbnail.jpg`
      )}`,
      poster:
        poster ??
        `https://${customerSubdomain}/${idOrToken}/thumbnails/thumbnail.jpg`,
      expiresAt,
    };
  }

  /**
   * Firma un token JWT para Cloudflare Stream usando la key JWK (RS256).
   * Devuelve null si no hay signing key configurada.
   */
  private async signToken(uid: string): Promise<string | null> {
    if (!env.cloudflareStreamKeyId || !env.cloudflareStreamKeyJwk) return null;
    try {
      const jwk = JSON.parse(
        Buffer.from(env.cloudflareStreamKeyJwk, "base64").toString("utf8")
      ) as JsonWebKey;

      const encoder = new TextEncoder();
      const header = { alg: "RS256", kid: env.cloudflareStreamKeyId };
      const exp = Math.floor(Date.now() / 1000) + 60 * 60;
      const payload = { sub: uid, kid: env.cloudflareStreamKeyId, exp };

      const b64url = (buf: ArrayBuffer | Uint8Array) => {
        const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
        let str = "";
        bytes.forEach((b) => (str += String.fromCharCode(b)));
        return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      };

      const headerB64 = b64url(encoder.encode(JSON.stringify(header)));
      const payloadB64 = b64url(encoder.encode(JSON.stringify(payload)));
      const data = `${headerB64}.${payloadB64}`;

      const key = await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        encoder.encode(data)
      );
      return `${data}.${b64url(signature)}`;
    } catch {
      return null;
    }
  }
}
