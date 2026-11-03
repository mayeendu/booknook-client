import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/books";

export default function NewArrivalBookCard({ book }: { book: Book }) {
  return (
    <article className="rounded-[6px] border border-[#e9e7e3] p-3.5 transition-shadow hover:shadow-[0_8px_24px_rgba(35,30,25,0.08)]">
      <div className="relative h-44 overflow-hidden rounded-[3px] bg-[#f5f2ea] shadow-[0_8px_15px_rgba(30,25,20,0.17)]">
        <Image
          src={book.image}
          alt={`Cover of ${book.title} by ${book.author.trim()}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      <div className="pt-3">
        <span className="inline-block rounded-full bg-[#f5e9e8] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.8px] text-[#91404a]">{book.category}</span>
        <h3 className="mt-1.5 font-serif text-[17px] leading-tight text-[#29272a]">{book.title}</h3>
        <p className="mt-0.5 text-[11px] text-[#77736f]">by {book.author.trim()}</p>
        <Link href={`/all-books/${encodeURIComponent(book._id)}`} aria-label={`View details for ${book.title}`} className="mt-3 flex h-7.5 items-center justify-center rounded-[3px] bg-[#a83c46] text-[9px] font-semibold tracking-[1px] text-white transition-colors hover:bg-[#91313b]">
          VIEW DETAILS
        </Link>
      </div>
    </article>
  );
}
