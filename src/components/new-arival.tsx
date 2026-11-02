import Link from "next/link";

const arrivals = [
  { title: "The Long Road", author: "Richard Marin", category: "Fiction", cover: "#394d48", ink: "#e8d17b" },
  { title: "Salt & Signal", author: "Ayesha Rahman", category: "Science", cover: "#303a61", ink: "#f7f2e8" },
  { title: "The Last Harvest", author: "Karen Perry", category: "History", cover: "#804735", ink: "#f6e8cf" },
  { title: "Paper Kites", author: "Joon Park", category: "Kids", cover: "#d5a94f", ink: "#272019" },
  { title: "Quiet Rivers", author: "Nadia Karim", category: "Fiction", cover: "#563a68", ink: "#f7f0e9" },
  { title: "Under Glass", author: "Tom Ellery", category: "Others", cover: "#ac3d48", ink: "#fff4ea" },
];

export default function NewArrival() {
  return (
    <section id="new-arrivals" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-277.5">
        <div className="mb-9 text-center sm:mb-10">
          <p className="mb-2 text-[10px] font-semibold tracking-[2px] text-[#9f4650]">FRESH ON THE SHELF</p>
          <h2 className="font-serif text-3xl tracking-[-0.7px] text-[#262326] sm:text-[36px]">New Arrivals</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {arrivals.map((book) => (
            <article key={book.title} className="rounded-[6px] border border-[#e9e7e3] p-3.5 transition-shadow hover:shadow-[0_8px_24px_rgba(35,30,25,0.08)]">
              <div
                className="flex h-44 flex-col justify-between rounded-[3px] p-4 shadow-[0_8px_15px_rgba(30,25,20,0.17)]"
                style={{ backgroundColor: book.cover, color: book.ink }}
                aria-label={`${book.title} book cover`}
              >
                <h3 className="font-serif text-[19px] font-bold leading-tight">{book.title}</h3>
                <p className="text-[8px] font-medium uppercase tracking-[1.3px]">{book.author}</p>
              </div>
              <div className="pt-3">
                <span className="inline-block rounded-full bg-[#f5e9e8] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.8px] text-[#91404a]">{book.category}</span>
                <h3 className="mt-1.5 font-serif text-[17px] leading-tight text-[#29272a]">{book.title}</h3>
                <p className="mt-0.5 text-[11px] text-[#77736f]">by {book.author}</p>
                <Link href="#books" aria-label={`View details for ${book.title}`} className="mt-3 flex h-7.5 items-center justify-center rounded-[3px] bg-[#a83c46] text-[9px] font-semibold tracking-[1px] text-white transition-colors hover:bg-[#91313b]">
                  VIEW DETAILS
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="#books" className="inline-flex h-9 items-center justify-center rounded-[3px] bg-[#a83c46] px-6 text-[9px] font-semibold tracking-[1px] text-white transition-colors hover:bg-[#91313b]">
            SEE ALL BOOKS
          </Link>
        </div>
      </div>
    </section>
  );
}
