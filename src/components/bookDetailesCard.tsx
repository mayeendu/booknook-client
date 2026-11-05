"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import type { Book } from "@/lib/books";
import AddMyBookButton from "@/components/add-my-book-button";
import EditBookDialog from "@/components/edit-book-dialog";
import DeleteBookDialog from "@/components/delet-book-dialog";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type BookDetailesCardProps = {
  book: Book;
  initialBookingDate: string;
};

export default function BookDetailesCard({
  book,
  initialBookingDate,
}: BookDetailesCardProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [bookingDate, setBookingDate] = useState(initialBookingDate);

  function handleBookingDateChange(event: ChangeEvent<HTMLInputElement>) {
    setBookingDate(event.currentTarget.value);
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-[#eee7dd] bg-white shadow-[0_24px_70px_rgba(56,43,30,0.10)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee7dd] bg-[#fcfaf6] px-5 py-4 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#8b8175] uppercase">
          Book details
        </p>
        <div className="flex flex-wrap gap-2">
          <EditBookDialog book={book} />
          <DeleteBookDialog bookId={book._id} bookTitle={book.title} />
        </div>
      </div>

      <div className="grid items-center gap-9 p-5 sm:p-8 md:grid-cols-[minmax(250px,0.78fr)_1.22fr] md:gap-12 md:p-12">
        <div className="relative mx-auto w-full max-w-87.5 rounded-2xl bg-[#f3eee6] p-3 shadow-[0_18px_36px_rgba(54,40,28,0.16)] sm:p-4">
          <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-[#e8e0d4]">
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              unoptimized
              loading="eager"
              sizes="(min-width: 768px) 350px, 80vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="py-1 md:py-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#f7e9e7] px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-[#a33a43] uppercase">
              {book.category}
            </span>
            <span
              className={`inline-flex items-center gap-2 text-sm font-medium ${book.totalCopies > 0 ? "text-[#397653]" : "text-[#9a5b50]"}`}
            >
              <span
                className={`size-2 rounded-full ${book.totalCopies > 0 ? "bg-[#4d9a6a]" : "bg-[#bd7365]"}`}
              />
              {book.totalCopies > 0
                ? `${book.totalCopies} ${book.totalCopies === 1 ? "copy" : "copies"} available`
                : "Currently unavailable"}
            </span>
          </div>

          <h2 className="mt-5 font-serif text-4xl leading-[1.08] font-bold tracking-tight text-[#211d19] sm:text-5xl lg:text-[3.5rem]">
            {book.title}
          </h2>
          <p className="mt-4 text-lg text-[#716960]">
            by{" "}
            <span className="font-semibold text-[#39332d]">
              {book.author.trim()}
            </span>
          </p>

          <div className="my-7 h-px bg-linear-to-r from-[#d9c9b9] via-[#eee7dd] to-transparent" />

          <h3 className="font-serif text-2xl font-semibold text-[#211d19]">
            A little about this book
          </h3>
          <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#696158]">
            {book.description ||
              "No description is available for this book yet."}
          </p>

          <div className="mt-8 rounded-2xl border border-[#eee7dd] bg-[#fcfaf6] p-4 sm:p-5">
            <label
              htmlFor="booking-date"
              className="block text-sm font-semibold text-[#39332d]"
            >
              Choose a booking date
            </label>
            <Input
              id="booking-date"
              type="date"
              name="bookingDate"
              aria-label="booking date"
              value={bookingDate}
              onChange={handleBookingDateChange}
              className="mt-2 h-11 rounded-xl border-[#e2d9ce] bg-white px-3"
            />
            <AddMyBookButton book={book} bookingDate={bookingDate} user={user} />
          </div>
        </div>
      </div>
    </article>
  );
}
