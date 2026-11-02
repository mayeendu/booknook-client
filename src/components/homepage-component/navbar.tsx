import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "#books" },
  { label: "Add Book", href: "add-book" },
  { label: "My Books", href: "#my-books" },
  { label: "My Borrows", href: "#my-borrows" },
];

export default function NavbarSection() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex min-h-20 max-w-310 items-center justify-between gap-8 px-6 sm:px-10">
        <Link
          href="#home"
          aria-label="Book Nook home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="size-9 rounded-xl bg-[#c83242]" aria-hidden="true" />
          <span className="font-serif text-[27px] font-bold leading-none tracking-[-1.5px] text-[#171717]">
            Book<span className="italic text-[#c83242]">Nook</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={index === 0 ? "page" : undefined}
              className={`relative py-2 text-[15px] font-medium transition-colors hover:text-[#c83242] ${
                index === 0
                  ? "text-[#c83242] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#c83242]"
                  : "text-[#252525]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="#login"
            className="inline-flex h-12 items-center justify-center rounded-[5px] border border-[#222] px-6 text-[13px] font-semibold tracking-[1.4px] text-[#222] transition-colors hover:bg-neutral-50"
          >
            LOGIN
          </Link>
          <Link
            href="#register"
            className="inline-flex h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 text-[13px] font-semibold tracking-[1.4px] text-white transition-colors hover:bg-[#b52b3a]"
          >
            REGISTER
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-6 overflow-x-auto border-t border-neutral-100 px-6 py-3 md:hidden"
      >
        {links.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={index === 0 ? "page" : undefined}
            className={`whitespace-nowrap text-sm font-medium ${index === 0 ? "text-[#c83242]" : "text-neutral-700"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
