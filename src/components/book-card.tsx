import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/books";

type BookCardProps = {
  book: Book;
  loading?: "eager" | "lazy";
};

export default function BookCard({ book, loading = "lazy" }: BookCardProps) {
  return (
    <article className="text-center">
      <div className="relative aspect-332/482 overflow-hidden bg-[#f5f5f5]">
        <Image
          src={book.image}
          alt={`Cover of ${book.title} by ${book.author.trim()}`}
          fill
          unoptimized
          loading={loading}
          sizes="(min-width: 1480px) 334px, (min-width: 1024px) 25vw, (min-width: 400px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="pt-7 sm:pt-8">
        <p className="text-sm font-medium tracking-[0.04em] text-[#777] uppercase sm:text-base lg:text-lg">
          {book.author.trim()}
        </p>
        <h2 className="mt-3 font-serif text-xl font-bold leading-snug tracking-wide text-[#111] sm:text-2xl lg:text-[26px]">
          {book.title}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-[#777] sm:text-lg">
          {book.totalCopies > 0
            ? `${book.totalCopies} ${book.totalCopies === 1 ? "copy" : "copies"} available`
            : "Currently unavailable"}
        </p>
        <Link
          href={`/all-books/${encodeURIComponent(book._id)}`}
          aria-label={`Book detailes: ${book.title}`}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[5px] bg-[#c83242] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b52b3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c83242]"
        >
          Book detailes
        </Link>
      </div>
    </article>
  );
}
