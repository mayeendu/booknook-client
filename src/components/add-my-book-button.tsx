"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Book } from "@/lib/books";
import { getBearerAuthHeaders } from "@/lib/auth-client";

type AddMyBookButtonProps = {
  book: Book;
  bookingDate: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function AddMyBookButton({
  book,
  bookingDate,
  user,
}: AddMyBookButtonProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function saveBook() {
    if (saving) return;
    if (!user?.email) {
      const message = "Please sign in before booking a book.";
      setError(message);
      toast.error(message);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const { _id: bookId, ...bookDetails } = book;
      const bookingData = {
        ...bookDetails,
        bookId,
        userName: user.name,
        email: user.email,
        userImage: user.image,
        bookImage: book.image,
        bookingDate,
      };
      const authHeaders = await getBearerAuthHeaders();
      const response = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(result.error || "Unable to create this booking.");

      toast.success("Booking created successfully!");
      router.push("/all-books");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create this booking. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={saveBook}
        disabled={saving}
        aria-busy={saving}
        className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b52b3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c83242] disabled:cursor-wait disabled:opacity-60"
      >
        {saving ? "Adding..." : "Add My Book"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-[#a33a43]">
          {error}
        </p>
      )}
    </div>
  );
}
