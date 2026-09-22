import type { VideoProvider } from "./provider";
import { CloudflareStreamProvider } from "./cloudflare";
import { MockVideoProvider } from "./mock";
import { env } from "@/lib/env";

/** Selecciona el proveedor de video según VIDEO_PROVIDER. Extensible a Mux. */
export function getVideoProvider(): VideoProvider {
  switch (env.videoProvider) {
    case "cloudflare":
      return new CloudflareStreamProvider();
    // case "mux": return new MuxProvider(); // arquitectura preparada
    default:
      return new MockVideoProvider();
  }
}

export type { PlaybackSource, VideoProvider } from "./provider";
