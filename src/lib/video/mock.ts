import type { PlaybackSource, VideoProvider } from "./provider";

/**
 * Proveedor MOCK (desarrollo). No hay video hospedado: el player muestra un
 * estado de "demostración" con la portada del curso. No entrega URLs premium.
 */
export class MockVideoProvider implements VideoProvider {
  readonly name = "mock";

  async getPlaybackSource(
    _assetId: string | null,
    poster: string | null
  ): Promise<PlaybackSource> {
    return {
      kind: "none",
      url: null,
      poster,
      expiresAt: null,
      notice:
        "Modo desarrollo: el video se reproducirá cuando conectes el proveedor (Cloudflare Stream) y subas el material. Ver SETUP.md §Video.",
    };
  }
}
