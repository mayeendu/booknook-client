import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Book } from "@/lib/books";
import BookDetailesCard from "@/components/bookDetailesCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Book Detailes | BookNook",
};

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

async function BookDetails({ params }: BookDetailsPageProps) {
  const { id } = await params;
  let book: Book | undefined;

  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

    const apiUrl = process.env.BOOKS_API_URL ?? "http://localhost:5000/all-books";
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/${encodeURIComponent(id)}`, {
      headers: jwtToken?.token
        ? { authorization: `Bearer ${jwtToken.token}` }
        : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) throw new Error("Unable to fetch book details");

    book = (await res.json()) as Book;
  } catch {
    return (
      <div role="alert" className="py-16 text-center">
        <h2 className="font-serif text-2xl">
          We couldn&apos;t load this book.
        </h2>
        <p className="mt-3 text-[#777]">Please try again in a moment.</p>
        <a
          href={`/all-books/${encodeURIComponent(id)}`}
          className="mt-6 inline-block rounded bg-[#c83242] px-6 py-3 text-white hover:bg-[#b52b3a]"
        >
          Try again
        </a>
      </div>
    );
  }

  if (!book) notFound();

  return (
    <BookDetailesCard
      book={book}
      initialBookingDate={new Date().toISOString().slice(0, 10)}
    />
  );
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  return (
    <section className="w-full flex-1 bg-white px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-285">
        <Link
          href="/all-books"
          className="text-sm font-medium text-[#a33a43] underline-offset-4 hover:underline"
        >
          &larr; Back to all books
        </Link>
        <h1 className="mt-6 mb-10 font-serif text-3xl font-bold text-[#111] sm:text-4xl">
          Book Detailes
        </h1>
        <Suspense
          fallback={
            <p role="status" className="py-16 text-center text-[#777]">
              Loading book details...
            </p>
          }
        >
          <BookDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
}
