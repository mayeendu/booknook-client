import { auth } from "@/lib/auth";
import MyBookBookingCard, {
  type MyBookBooking,
} from "@/components/myBookBookingCard";
import { getBooks } from "@/lib/books";
import { headers } from "next/headers";
import { Suspense } from "react";

async function MyBookBookings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    return <div>Please sign in to view your bookings.</div>;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const [res, catalog] = await Promise.all([
    fetch(
      `${apiUrl}/my-bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    ),
    getBooks().catch(() => []),
  ]);
  if (!res.ok) {
    throw new Error("Unable to load your bookings.");
  }

  const result: unknown = await res.json();
  if (!Array.isArray(result)) {
    throw new Error("Invalid bookings response.");
  }
  const bookings = (result as MyBookBooking[]).map((booking) => {
    const bookId = booking.bookId || booking._id;
    const matchingBook = catalog.find(
      (book) =>
        (bookId && book._id === bookId) ||
        (booking.title && book.title === booking.title),
    );

    return {
      ...booking,
      bookImage:
        matchingBook?.image ||
        booking.bookImage ||
        (booking.userName ? undefined : booking.image),
    };
  });

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-sm font-semibold tracking-[0.16em] text-[#a33a43] uppercase">
          Your reading list
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#201d19] sm:text-4xl">
          My Book Bookings
        </h1>
        <p className="mt-2 text-[#716960]">
          Books you&apos;ve selected, with their booking dates.
        </p>
      </header>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9d0c5] bg-[#fcfaf6] px-6 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#302a24]">
            No book bookings yet
          </h2>
          <p className="mt-2 text-sm text-[#716960]">
            Selected books will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <MyBookBookingCard
              key={booking._id || `${booking.title || "booking"}-${index}`}
              booking={booking}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function MyBookBookingsPage() {
  return (
    <Suspense fallback={<p role="status">Loading your bookings...</p>}>
      <MyBookBookings />
    </Suspense>
  );
}
