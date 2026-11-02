const steps = [
  {
    number: "01",
    title: "Add a book",
    description: "Share a title from your own shelf with the community, along with how many copies you can lend.",
  },
  {
    number: "02",
    title: "Borrow for a few days",
    description: "Pick any available book and confirm in one click. Each reader can hold one copy of a title at a time.",
  },
  {
    number: "03",
    title: "Return when done",
    description: "Finished reading? Return it from My Borrows and the copy goes straight back on the shelf.",
  },
];

export default function BorrowBooks() {
  return (
    <section id="how-it-works" className="bg-[#f5f2ea] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-310">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[2.5px] text-[#91414b]">SIMPLE BY DESIGN</p>
          <h2 className="font-serif text-3xl tracking-[-1px] text-[#242226] sm:text-4xl">How Borrowing Works</h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3 md:gap-7">
          {steps.map((step) => (
            <article key={step.number} className="min-h-66 rounded-lg border-t-4 border-[#a83c46] bg-white px-7 py-8 sm:px-9 sm:py-9">
              <p className="font-serif text-4xl font-semibold text-[#a83c46]">{step.number}</p>
              <h3 className="mt-4 font-serif text-[22px] leading-tight text-[#29272a]">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-[#696661]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
