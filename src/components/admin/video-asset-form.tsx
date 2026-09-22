"use client";

import { useState, useTransition } from "react";
import { updateCourseVideoAsset } from "@/app/admin/actions";

export function VideoAssetForm({
  courseId,
  initialAssetId,
}: {
  courseId: string;
  initialAssetId: string | null;
}) {
  const [value, setValue] = useState(initialAssetId ?? "");
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(false);
    start(async () => {
      await updateCourseVideoAsset({ courseId, assetId: value });
      setSaved(true);
    });
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        placeholder="UID del video en Cloudflare Stream"
        className="flex-1 rounded-xl border border-ink/15 bg-ink/[0.03] px-4 py-2.5 text-sm text-ink outline-none focus:border-gold/60"
      />
      <button type="button" onClick={save} disabled={pending} className="btn-primary btn-sm">
        {pending ? "Guardando…" : saved ? "Guardado ✓" : "Guardar"}
      </button>
    </div>
  );
}
