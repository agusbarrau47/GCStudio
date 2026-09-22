"use client";

import { useState } from "react";

export function CheckoutButton({
  productId,
  label = "Comprar",
}: {
  productId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el checkout");
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la compra");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button type="button" onClick={onClick} disabled={loading} className="btn-primary w-full">
        {loading ? "Redirigiendo…" : label}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-blush">
          {error}
        </p>
      )}
    </div>
  );
}
