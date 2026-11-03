import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBooks, type Book } from "@/lib/books";
import AddMyBookButton from "@/components/add-my-book-button";

export const metadata: Metadata = {
  title: "Book Detailes | BookNook",
};

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

async function BookDetails({ params }: BookDetailsPageProps) {
  const { id } = await params;
  let books: Book[];

  try {
    books = await getBooks();
  } catch {
    return (
      <div role="alert" className="py-16 text-center">
        <h2 className="font-serif text-2xl">We couldn&apos;t load this book.</h2>
        <p className="mt-3 text-[#777]">Please try again in a moment.</p>
        <a href={`/all-books/${encodeURIComponent(id)}`} className="mt-6 inline-block rounded bg-[#c83242] px-6 py-3 text-white hover:bg-[#b52b3a]">
          Try again
        </a>
      </div>
    );
  }

  const book = books.find((item) => item._id === id);
  if (!book) notFound();

  return (
    <article className="grid items-start gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14">
      <div className="relative mx-auto aspect-332/482 w-full max-w-85 overflow-hidden bg-[#f5f5f5] shadow-lg">
        <Image src={book.image} alt={`Cover of ${book.title}`} fill unoptimized loading="eager" sizes="(min-width: 400px) 340px, 100vw" className="object-cover" />
      </div>
      <div className="py-2">
        <p className="text-sm font-semibold tracking-[0.15em] text-[#a33a43] uppercase">{book.category}</p>
        <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#19191b] sm:text-5xl">{book.title}</h2>
        <p className="mt-4 text-lg text-[#777]">By {book.author.trim()}</p>
        <div className="mt-7 border-y border-[#e8e3da] py-5">
          <p className="font-medium text-[#55534f]">
            {book.totalCopies > 0
              ? `${book.totalCopies} ${book.totalCopies === 1 ? "copy" : "copies"} available`
              : "Currently unavailable"}
          </p>
        </div>

        <h3 className="mt-8 font-serif text-2xl font-semibold text-[#19191b]">About this book</h3>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#55534f]">
          {book.description || "No description is available for this book yet."}
        </p>
        <AddMyBookButton bookId={book._id} />
      </div>
    </article>
  );
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  return (
    <section className="w-full flex-1 bg-white px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-285">
        <Link href="/all-books" className="text-sm font-medium text-[#a33a43] underline-offset-4 hover:underline">
          &larr; Back to all books
        </Link>
        <h1 className="mt-6 mb-10 font-serif text-3xl font-bold text-[#111] sm:text-4xl">Book Detailes</h1>
        <Suspense fallback={<p role="status" className="py-16 text-center text-[#777]">Loading book details...</p>}>
          <BookDetails params={params} />
        </Suspense>
      </div>
    </section>
  );
}
