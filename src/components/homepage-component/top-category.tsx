import Link from "next/link";

const categories = [
  { name: "Fiction", color: "#394d48" },
  { name: "Science", color: "#303a61" },
  { name: "History", color: "#804735" },
  { name: "Kids", color: "#d5a94f" },
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
              className="group flex aspect-square flex-col justify-end rounded-lg px-6 py-6 text-white transition-transform duration-200 hover:-translate-y-1"
              style={{ backgroundColor: category.color }}
            >
              <span className="font-serif text-[32px] leading-tight">{category.name}</span>
              <span className="mt-1 text-xs font-medium tracking-[1.5px]">EXPLORE SHELF</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
