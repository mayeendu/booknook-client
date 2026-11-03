import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { getBooks, type Book } from "@/lib/books";
import NewArrivalBookCard from "@/components/homepage-component/new-arrival-book-card";

async function ArrivalBooks() {
  await connection();

  let books: Book[];

  try {
    books = await getBooks();
  } catch {
    return <p role="alert" className="py-10 text-center text-sm text-[#77736f]">We couldn&apos;t load the new arrivals. Please try again later.</p>;
  }

  if (books.length === 0) {
    return <p className="py-10 text-center text-sm text-[#77736f]">New books are on the way. Check back soon!</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.slice(0, 6).map((book) => <NewArrivalBookCard key={book._id} book={book} />)}
    </div>
  );
}

export default function NewArrival() {
  return (
    <section id="new-arrivals" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-277.5">
        <div className="mb-9 text-center sm:mb-10">
          <p className="mb-2 text-[10px] font-semibold tracking-[2px] text-[#9f4650]">FRESH ON THE SHELF</p>
          <h2 className="font-serif text-3xl tracking-[-0.7px] text-[#262326] sm:text-[36px]">New Arrivals</h2>
        </div>

        <Suspense fallback={<p role="status" className="py-10 text-center text-sm text-[#77736f]">Loading new arrivals...</p>}>
          <ArrivalBooks />
        </Suspense>

        <div className="mt-8 text-center">
          <Link href="/all-books" className="inline-flex h-9 items-center justify-center rounded-[3px] bg-[#a83c46] px-6 text-[9px] font-semibold tracking-[1px] text-white transition-colors hover:bg-[#91313b]">
            SEE ALL BOOKS
          </Link>
        </div>
      </div>
    </section>
  );
}
