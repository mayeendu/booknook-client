"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CalendarDays, CheckCircle2, Loader2, UserRound } from "lucide-react";
import type { Book } from "@/lib/books";

export type MyBookBooking = Partial<Book> & {
  bookingId?: string;
  bookingDate?: string;
  bookId?: string;
  bookImage?: string;
  userName?: string;
  email?: string;
};

type MyBookBookingCardProps = {
  booking: MyBookBooking;
};

export default function MyBookBookingCard({ booking }: MyBookBookingCardProps) {
  const [cancelling, setCancelling] = useState(false);
  const router = useRouter();
  const title = booking.title || "Untitled book";
  const author = booking.author?.trim() || "Author unavailable";
  const bookingId = booking.bookingId || booking._id;
  const bookId = booking.bookId || booking._id;
  const coverImage =
    booking.bookImage ||
    (booking.userName ? undefined : booking.image) ||
    "/images/books/reading-stack.jpg";
  const parsedBookingDate = booking.bookingDate
    ? new Date(booking.bookingDate)
    : null;
  const formattedDate =
    parsedBookingDate && !Number.isNaN(parsedBookingDate.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }).format(parsedBookingDate)
      : booking.bookingDate || "Date not provided";

  async function cancelBooking() {
    if (!bookingId || cancelling) return;

    setCancelling(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const response = await fetch(
        `${apiUrl}/my-bookings/${encodeURIComponent(bookingId)}`,
        { method: "DELETE", signal: AbortSignal.timeout(10000) },
      );

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to cancel this booking.");
      }

      toast.success("Booking cancelled.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to cancel this booking.",
      );
    } finally {
      setCancelling(false);
    }
  }

  return (
    <article className="grid gap-5 rounded-2xl border border-[#e9e4dc] bg-white p-4 shadow-[0_8px_28px_rgba(43,35,27,0.06)] transition-shadow hover:shadow-[0_14px_36px_rgba(43,35,27,0.10)] sm:grid-cols-[150px_minmax(0,1fr)_220px] sm:items-center sm:gap-6 sm:p-5">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-[#f0ece5] sm:aspect-5/4">
        <Image
          src={coverImage}
          alt={`Cover of ${title}`}
          fill
          unoptimized
          sizes="(min-width: 640px) 150px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 py-1">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#a33a43] uppercase">
          {booking.category || "Book booking"}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-[#201d19] sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#716960]">
          by <span className="font-medium text-[#39332d]">{author}</span>
        </p>
        {booking.userName && (
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-[#82796f]">
            <UserRound aria-hidden="true" className="size-4" />
            Booked by {booking.userName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-[#f8f6f1] p-4 sm:min-h-24 sm:justify-center sm:px-5">
        <div>
          <p className="text-xs font-medium text-[#82796f]">Booking date</p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 font-semibold text-[#302a24]">
              <CalendarDays
                aria-hidden="true"
                className="size-4 text-[#a33a43]"
              />
              {formattedDate}
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#e8f3eb] px-3 py-1.5 text-xs font-semibold text-[#397653]">
              <CheckCircle2 aria-hidden="true" className="size-4" />
              Selected
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={cancelBooking}
            disabled={!bookingId || cancelling}
            aria-busy={cancelling}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#d8c9c1] px-3 py-2 text-sm font-semibold text-[#9a4545] transition-colors hover:bg-[#f7e9e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33a43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelling && (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            )}
            Cancel
          </button>
          {bookId ? (
            <Link
              href={`/all-books/${encodeURIComponent(bookId)}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#a33a43] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#872f37] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33a43]"
            >
              View
            </Link>
          ) : (
            <span className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#a33a43]/50 px-3 py-2 text-sm font-semibold text-white">
              View
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
