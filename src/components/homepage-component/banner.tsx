import Link from "next/link";

const books = [
  {
    title: <>The<br />Long<br />Road</>,
    author: "RICHARD MARIN",
    color: "bg-[#294b42]",
    titleColor: "text-[#e8c76b]",
    height: "h-58",
    offset: "mt-6",
  },
  {
    title: <>Under<br />Glass</>,
    author: "TOM ELLERY",
    color: "bg-[#c92f40]",
    titleColor: "text-white",
    height: "h-67",
    offset: "mt-5",
  },
  {
    title: <>Salt &amp;<br />Signal</>,
    author: "AYESHA<br />RAHMAN",
    color: "bg-[#203e64]",
    titleColor: "text-white",
    height: "h-57.5",
    offset: "mt-0",
  },
];

export default function BannerSection() {
  return (
    <section id="home" className="overflow-hidden bg-[#f5f2ea]">
      <div className="mx-auto grid min-h-112.5 max-w-310 items-center gap-14 px-6 py-16 sm:px-10 lg:min-h-122.5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-0 lg:py-20">
        <div className="max-w-140">
          <p className="mb-5 text-[13px] font-semibold tracking-[3px] text-[#a33a43]">
            A SMALL ONLINE LIBRARY
          </p>
          <h1 className="font-serif text-[clamp(3.25rem,6vw,4.75rem)] font-medium leading-[0.98] tracking-[-2.4px] text-[#19191b]">
            Find your next<br className="hidden sm:block" /> favourite read.
          </h1>
          <p className="mt-5 max-w-122.5 text-[17px] leading-[1.7] text-[#55534f] sm:text-[18px]">
            Browse a shelf shared by real readers, borrow a book for a few days, and return it when you are done.
          </p>
          <Link
            href="#books"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 text-[13px] font-semibold tracking-[1.3px] text-white transition-colors hover:bg-[#b52b3a]"
          >
            BROWSE BOOKS
          </Link>
          <div className="mt-9 flex items-center gap-2" aria-label="Slide 1 of 3">
            <span className="h-1 w-9 bg-[#c83242]" />
            <span className="h-1 w-9 bg-[#d5d0c4]" />
            <span className="h-1 w-9 bg-[#d5d0c4]" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:justify-end" aria-label="Featured books">
          {books.map((book, index) => (
            <article
              key={index}
              aria-label={`Featured book ${index + 1} by ${book.author.replace("<br />", " ")}`}
              className={`relative flex w-[min(29%,160px)] ${book.height} ${book.offset} flex-col justify-between rounded-[5px] p-4 shadow-[0_15px_25px_rgba(35,32,25,0.16)] sm:w-38.75 sm:p-5`}
              style={{ transform: `rotate(${index === 1 ? "0deg" : index === 0 ? "-0.5deg" : "0.4deg"})` }}
            >
              <h2 className={`font-serif text-[clamp(1.05rem,2vw,1.55rem)] font-bold leading-[1.04] ${book.titleColor}`}>
                {book.title}
              </h2>
              <p className="text-[9px] font-medium leading-normal tracking-[1.7px] text-[#f2d87f] sm:text-[10px]">
                {book.author.split("<br />").map((line) => <span key={line} className="block">{line}</span>)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
