import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookCard from "@/components/book-card";
import RemoveMyBookButton from "@/components/remove-my-book-button";
import type { Book } from "@/lib/books";

export const metadata: Metadata = {
  title: "My Books | BookNook",
  description: "Your saved books, together on one shelf.",
};

async function SavedBooks() {
  let books: Book[];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    const response = await fetch(`${apiUrl}/my-books`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Unable to load saved books");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid saved books response");
    books = data as Book[];
  } catch {
    return (
      <div role="alert" className="py-16 text-center">
        <h2 className="font-serif text-2xl">We couldn&apos;t load your books.</h2>
        <p className="mt-3 text-[#777]">Please try again in a moment.</p>
        <form action="/my-books" method="get" className="mt-6">
          <button type="submit" className="rounded bg-[#c83242] px-6 py-3 font-medium text-white hover:bg-[#b52b3a]">Try again</button>
        </form>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="font-serif text-3xl">Your shelf is waiting.</h2>
        <p className="mt-3 text-[#777]">Open a book&apos;s details and choose Add My Book to save it here.</p>
        <Link href="/all-books" className="mt-6 inline-block rounded bg-[#c83242] px-6 py-3 font-medium text-white hover:bg-[#b52b3a]">Browse books</Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 min-[400px]:grid-cols-2 lg:grid-cols-4">
      {books.map((book, index) => (
        <li key={book._id} className="relative">
          <BookCard book={book} loading={index < 4 ? "eager" : "lazy"} />
          <RemoveMyBookButton bookId={book._id} bookTitle={book.title} />
        </li>
      ))}
    </ul>
  );
}

export default function MyBooksPage() {
  return (
    <section className="w-full flex-1 bg-white">
      <div className="mx-auto max-w-370 px-4 pt-8 pb-16 sm:px-6 sm:pb-20">
        <h1 className="text-center font-serif text-3xl font-bold text-[#111] sm:text-4xl">My Books</h1>
        <p className="mt-3 mb-10 text-center text-[#777]">Your saved books, together on one shelf.</p>
        <Suspense fallback={<p role="status" className="py-16 text-center text-[#777]">Loading your books...</p>}>
          <SavedBooks />
        </Suspense>
      </div>
    </section>
  );
}
