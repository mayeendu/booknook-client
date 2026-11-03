"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

type RemoveMyBookButtonProps = {
  bookId: string;
  bookTitle: string;
};

export default function RemoveMyBookButton({ bookId, bookTitle }: RemoveMyBookButtonProps) {
  const [removing, setRemoving] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const busy = removing || refreshing;

  async function removeBook() {
    if (busy) return;
    setRemoving(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const response = await fetch(`${apiUrl}/my-books/${encodeURIComponent(bookId)}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to remove this book. Please try again.");
      }

      toast.success("Book removed from My Books. It is available in All Books.");
      startTransition(() => router.refresh());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to remove this book. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setRemoving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={removeBook}
        disabled={busy}
        aria-busy={busy}
        aria-label={`Remove ${bookTitle} from My Books`}
        title="Remove from My Books"
        className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-[#e8e3da] bg-white text-[#a33a43] shadow-sm transition-colors hover:bg-[#f5e9e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c83242] disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <X className="size-5" aria-hidden="true" />}
      </button>
      {error && <p role="alert" className="mt-3 text-center text-sm text-[#a33a43]">{error}</p>}
    </>
  );
}
