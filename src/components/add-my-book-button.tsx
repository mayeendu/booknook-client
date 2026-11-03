"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddMyBookButton({ bookId }: { bookId: string }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function saveBook() {
    if (saving) return;
    setSaving(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const response = await fetch(`${apiUrl}/my-books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save this book.");

      toast.success(result.alreadySaved ? "This book is already in My Books." : "Book added to My Books!");
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save this book. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-7">
      <button type="button" onClick={saveBook} disabled={saving} aria-busy={saving} className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b52b3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c83242] disabled:cursor-wait disabled:opacity-60">
        {saving ? "Adding..." : "Add My Book"}
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-[#a33a43]">{error}</p>}
    </div>
  );
}
