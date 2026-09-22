import { describe, it, expect } from "vitest";
import {
  mapMercadoPagoStatus,
  statusGrantsAccess,
  shouldProcessEvent,
} from "./payments";

describe("mapeo de estados de Mercado Pago", () => {
  it("approved => paid", () => {
    expect(mapMercadoPagoStatus("approved")).toBe("paid");
  });
  it("pending / in_process => pending", () => {
    expect(mapMercadoPagoStatus("pending")).toBe("pending");
    expect(mapMercadoPagoStatus("in_process")).toBe("pending");
  });
  it("rejected / cancelled => estados correspondientes", () => {
    expect(mapMercadoPagoStatus("rejected")).toBe("rejected");
    expect(mapMercadoPagoStatus("cancelled")).toBe("cancelled");
  });
  it("refunded / charged_back => refunded", () => {
    expect(mapMercadoPagoStatus("refunded")).toBe("refunded");
    expect(mapMercadoPagoStatus("charged_back")).toBe("refunded");
  });
  it("estado desconocido => pending (conservador)", () => {
    expect(mapMercadoPagoStatus("lo-que-sea")).toBe("pending");
  });
});

describe("concesión de acceso", () => {
  it("solo 'paid' concede acceso", () => {
    expect(statusGrantsAccess("paid")).toBe(true);
    expect(statusGrantsAccess("pending")).toBe(false);
    expect(statusGrantsAccess("rejected")).toBe(false);
    expect(statusGrantsAccess("refunded")).toBe(false);
  });
});

describe("idempotencia de webhooks", () => {
  it("procesa un evento nuevo", () => {
    const processed = new Set<string>(["mp:1", "mp:2"]);
    expect(shouldProcessEvent(processed, "mp:3")).toBe(true);
  });
  it("no reprocesa un evento ya visto (duplicado)", () => {
    const processed = new Set<string>(["mp:1"]);
    expect(shouldProcessEvent(processed, "mp:1")).toBe(false);
  });
  it("ignora event id vacío", () => {
    expect(shouldProcessEvent(new Set(), "")).toBe(false);
  });
});
