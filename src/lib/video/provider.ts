/** Contrato del proveedor de video. Preparado para Cloudflare Stream y Mux. */

export interface PlaybackSource {
  /** Tipo de fuente para el player. */
  kind: "hls" | "iframe" | "mp4" | "none";
  /** URL de reproducción (signed cuando el proveedor lo permite). */
  url: string | null;
  /** Poster/portada. */
  poster: string | null;
  /** Epoch ms de expiración del token, si aplica. */
  expiresAt: number | null;
  /** Mensaje para estados sin video conectado (dev/mock). */
  notice?: string;
}

export interface VideoProvider {
  readonly name: string;
  /**
   * Genera una fuente de reproducción autorizada para un asset.
   * La autorización por enrollment se valida ANTES en el server (route handler).
   */
  getPlaybackSource(assetId: string | null, poster: string | null): Promise<PlaybackSource>;
}
