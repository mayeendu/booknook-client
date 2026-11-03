import type { Metadata } from "next";
import BookCard from "@/components/book-card";
import { getBooks, type Book } from "@/lib/books";
import { Suspense } from "react";
import { Link } from "lucide-react";

export const metadata: Metadata = {
    title: "All Books | BookNook",
    description: "Explore the BookNook collection and find your next favourite read.",
};

const gridClassName =
    "grid grid-cols-1 gap-x-8 gap-y-12 min-[400px]:grid-cols-2 lg:grid-cols-4";

function CollectionSkeleton() {
    return (
        <div role="status" aria-label="Loading books">
            <span className="sr-only">Loading the book collection...</span>
            <div className={gridClassName} aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="motion-safe:animate-pulse">
                        <div className="aspect-332/482 bg-[#f3f3f3]" />
                        <div className="mx-auto mt-8 h-4 w-1/2 rounded bg-[#efefef]" />
                        <div className="mx-auto mt-4 h-6 w-4/5 rounded bg-[#efefef]" />
                        <div className="mx-auto mt-3 h-4 w-1/3 rounded bg-[#efefef]" />
                    </div>
                ))}
            </div>
        </div>
    );
}

async function BookCollection() {
    let books: Book[];

    try {
        books = await getBooks();
    } catch {
        return (
            <div role="alert" className="py-24 text-center">
                <h2 className="font-serif text-3xl text-[#171717]">Our shelves are taking a moment.</h2>
                <p className="mt-3 text-base text-[#777]">
                    We couldn&apos;t load the books. Please try again in a moment.
                </p>
                {/* A full reload retries the failed server fetch on this same page. */}
                <Link href="/all-books" className="mt-6 inline-block rounded bg-[#c83242] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b52b3a]">
                    Try again
                </Link>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="py-24 text-center">
                <h2 className="font-serif text-3xl text-[#171717]">A new chapter is coming.</h2>
                <p className="mt-3 text-base text-[#777]">There are no books in the collection yet. Check back soon.</p>
            </div>
        );
    }

    return (
        <ul className={gridClassName}>
            {books.map((book, index) => (
                <li key={book._id}>
                    <BookCard book={book} loading={index < 4 ? "eager" : "lazy"} />
                </li>
            ))}
        </ul>
    );
}

export default function AllBooksPage() {
    return (
        <section aria-labelledby="collection-title" className="w-full flex-1 bg-white">
            <div className="mx-auto max-w-370 px-4 pt-8 pb-16 sm:px-6 sm:pb-20">
                <h1 id="collection-title" className="mb-10 text-center font-serif text-3xl font-bold tracking-tight text-[#111] sm:text-4xl">
                    All Books Collection
                </h1>
                <Suspense fallback={<CollectionSkeleton />}>
                    <BookCollection />
                </Suspense>
            </div>
        </section>
    );
}
