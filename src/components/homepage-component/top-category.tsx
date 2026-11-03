import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Fiction",
    color: "#394d48",
    image: "/images/categories/fiction.jpg",
    alt: "An open book and a glowing candle beside a rainy window",
  },
  {
    name: "Science",
    color: "#303a61",
    image: "/images/categories/science.jpg",
    alt: "A scientist exploring samples with a microscope in a laboratory",
  },
  {
    name: "History",
    color: "#804735",
    image: "/images/categories/history.jpg",
    alt: "A stack of timeworn books with beautifully aged bindings",
  },
  {
    name: "Kids",
    color: "#d5a94f",
    image: "/images/categories/kids.jpg",
    alt: "A child discovering a picture book in warm afternoon sunlight",
  },
];

export default function TopCategory() {
  return (
    <section id="categories" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-310">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[2.5px] text-[#91414b]">PICK A SHELF</p>
          <h2 className="font-serif text-3xl tracking-[-1px] text-[#242226] sm:text-4xl">Top Categories</h2>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`#${category.name.toLowerCase()}`}
              aria-label={`Explore ${category.name} books`}
              className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-lg px-6 py-6 text-white shadow-sm transition duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a83c46] motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
              style={{ backgroundColor: category.color }}
            >
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(min-width: 1280px) 295px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/5" />
              <span aria-hidden="true" className="absolute inset-0 opacity-15" style={{ backgroundColor: category.color }} />
              <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-md border border-white/20 transition-colors duration-300 group-hover:border-white/40 motion-reduce:transition-none" />
              <span className="relative z-10 font-serif text-[32px] leading-tight">{category.name}</span>
              <span className="relative z-10 mt-1 flex items-center justify-between gap-3">
                <span className="text-xs font-medium tracking-[1.5px]">EXPLORE SHELF</span>
                <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25 group-focus-visible:bg-white/25 motion-reduce:transition-none">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
