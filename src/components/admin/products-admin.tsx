"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertProduct, deleteProduct } from "@/app/admin/actions";
import { formatPrice } from "@/config/site.config";
import type { Product } from "@/lib/types/product";

type AdminProduct = Product & { active: boolean; position: number };

const CATEGORIES = [
  "Kits Profesionales",
  "Aftercare & Hogar",
  "Insumos & Descartables",
  "Skincare & Mirada",
];

type FormState = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  priceArs: string;
  image: string;
  badge: string;
  shortDesc: string;
  description: string;
  benefits: string;
  howToUse: string;
  anmatApproved: boolean;
  stock: boolean;
  active: boolean;
  position: string;
};

function emptyForm(position: number): FormState {
  return {
    slug: "",
    name: "",
    category: CATEGORIES[0],
    priceArs: "",
    image: "",
    badge: "",
    shortDesc: "",
    description: "",
    benefits: "",
    howToUse: "",
    anmatApproved: true,
    stock: true,
    active: true,
    position: String(position),
  };
}

function toForm(p: AdminProduct): FormState {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    priceArs: p.priceArs ? String(p.priceArs) : "",
    image: p.image ?? "",
    badge: p.badge ?? "",
    shortDesc: p.shortDesc ?? "",
    description: p.description ?? "",
    benefits: (p.benefits ?? []).join("\n"),
    howToUse: p.howToUse ?? "",
    anmatApproved: p.anmatApproved,
    stock: p.stock,
    active: p.active,
    position: String(p.position ?? 0),
  };
}

export function ProductsAdmin({ initial }: { initial: AdminProduct[] }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState | null>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function openNew() {
    setError(null);
    setForm(emptyForm(initial.length + 1));
  }
  function openEdit(p: AdminProduct) {
    setError(null);
    setForm(toForm(p));
  }

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => (f ? { ...f, [k]: v } : f));
  }

  function save() {
    if (!form) return;
    setError(null);
    const payload = {
      id: form.id,
      slug: form.slug.trim(),
      name: form.name.trim(),
      category: form.category,
      priceArs: form.priceArs === "" ? null : Number(form.priceArs.replace(/[^0-9]/g, "")),
      image: form.image.trim() || null,
      badge: form.badge.trim() || null,
      shortDesc: form.shortDesc.trim() || null,
      description: form.description.trim() || null,
      benefits: form.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      howToUse: form.howToUse.trim() || null,
      anmatApproved: form.anmatApproved,
      stock: form.stock,
      active: form.active,
      position: Number(form.position) || 0,
    };
    start(async () => {
      try {
        await upsertProduct(payload);
        setForm(null);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo guardar el producto");
      }
    });
  }

  function remove(id: string) {
    setError(null);
    start(async () => {
      try {
        await deleteProduct(id);
        setConfirmId(null);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo eliminar");
      }
    });
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/60">{initial.length} productos en la tienda</p>
        <button type="button" onClick={openNew} className="btn-primary btn-sm">
          + Nuevo producto
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-wine/40 bg-wine/10 px-4 py-3 text-sm text-blush">
          {error}
        </p>
      )}

      {/* FORM */}
      {form && (
        <div className="surface mt-5 p-6">
          <h2 className="font-display text-xl text-ink">
            {form.id ? "Editar producto" : "Nuevo producto"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Nombre"><input className="in" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Slug (URL, sin espacios)"><input className="in" value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} placeholder="kit-lash-lifting-pro" /></Field>
            <Field label="Categoría">
              <select className="in" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Precio (ARS)"><input className="in" inputMode="numeric" value={form.priceArs} onChange={(e) => set("priceArs", e.target.value.replace(/[^0-9]/g, ""))} placeholder="48500" /></Field>
            <Field label="Imagen (URL o /ruta)"><input className="in" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/products/kit.jpg" /></Field>
            <Field label="Badge (opcional)"><input className="in" value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Best Seller" /></Field>
            <Field label="Descripción corta" full><input className="in" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} /></Field>
            <Field label="Descripción" full><textarea className="in min-h-[90px]" value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
            <Field label="Beneficios (uno por línea)" full><textarea className="in min-h-[90px]" value={form.benefits} onChange={(e) => set("benefits", e.target.value)} /></Field>
            <Field label="Modo de uso" full><textarea className="in min-h-[70px]" value={form.howToUse} onChange={(e) => set("howToUse", e.target.value)} /></Field>
            <Field label="Posición (orden)"><input className="in" inputMode="numeric" value={form.position} onChange={(e) => set("position", e.target.value.replace(/[^0-9]/g, ""))} /></Field>
            <div className="flex flex-wrap items-center gap-5 pt-6">
              <Check label="ANMAT" checked={form.anmatApproved} onChange={(v) => set("anmatApproved", v)} />
              <Check label="En stock" checked={form.stock} onChange={(v) => set("stock", v)} />
              <Check label="Visible en la tienda" checked={form.active} onChange={(v) => set("active", v)} />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={save} disabled={pending || !form.name || !form.slug} className="btn-primary btn-sm">
              {pending ? "Guardando…" : "Guardar producto"}
            </button>
            <button type="button" onClick={() => setForm(null)} className="btn-ghost btn-sm">Cancelar</button>
          </div>
        </div>
      )}

      {/* LISTA */}
      <div className="mt-6 space-y-3">
        {initial.map((p) => (
          <div key={p.id} className="surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.image ? <img src={p.image} alt="" className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg text-ink">{p.name}</h3>
                  {!p.active && <span className="rounded-full bg-ink/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink/50">Oculto</span>}
                  {!p.stock && <span className="rounded-full bg-wine/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-wine">Sin stock</span>}
                </div>
                <p className="font-mono text-xs text-ink/50">{p.category} · {formatPrice(p.priceArs || null)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => openEdit(p)} className="btn-ghost btn-sm">Editar</button>
              {confirmId === p.id ? (
                <>
                  <button type="button" onClick={() => remove(p.id)} disabled={pending} className="btn-wine btn-sm">Confirmar</button>
                  <button type="button" onClick={() => setConfirmId(null)} className="btn-ghost btn-sm">No</button>
                </>
              ) : (
                <button type="button" onClick={() => setConfirmId(p.id)} className="btn-ghost btn-sm text-wine">Eliminar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">{label}</span>
      {children}
    </label>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink/75">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-ink/30 text-gold-dark" />
      {label}
    </label>
  );
}
