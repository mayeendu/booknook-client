import Link from "next/link";

export default function BookNotFound() {
  return (
    <section className="px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-bold">Book not found</h1>
      <p className="mt-4 text-[#777]">This book is no longer in our collection.</p>
      <Link href="/all-books" className="mt-6 inline-block rounded bg-[#c83242] px-6 py-3 font-medium text-white hover:bg-[#b52b3a]">
        Back to all books
      </Link>
    </section>
  );
}
