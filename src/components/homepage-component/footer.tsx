import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-[#211f22] px-6 text-[#d3d0d1] sm:px-10">
      <div className="mx-auto max-w-310 pt-12 sm:pt-14">
        <div className="grid gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1.2fr_1fr] lg:gap-12">
          <div>
            <Link href="#home" aria-label="Book Nook home" className="inline-flex items-end">
              <span className="size-12 rounded-xl bg-[#b63a48]" aria-hidden="true" />
              <span className="-ml-1 mb-0.5 font-serif text-lg font-bold tracking-[-1px] text-white">Book<span className="italic text-[#c94d5a]">Nook</span></span>
            </Link>
            <p className="mt-5 max-w-72 text-base leading-8 text-[#c9c6c7]">
              A small online library where readers share, borrow and return books.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold tracking-[2px] text-white">EXPLORE</h2>
            <ul className="space-y-2.5 text-base">
              <li><Link className="transition-colors hover:text-white" href="#home">Home</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#books">All Books</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#my-borrows">My Borrows</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold tracking-[2px] text-white">CONTACT</h2>
            <address className="space-y-2.5 text-base not-italic">
              <p><a className="transition-colors hover:text-white" href="mailto:hello@yourdomain.com">hello@[YOUR DOMAIN]</a></p>
              <p>[YOUR PHONE]</p>
              <p>Narsingdi, Bangladesh</p>
            </address>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold tracking-[2px] text-white">FOLLOW</h2>
            <ul className="space-y-2.5 text-base">
              <li><a className="transition-colors hover:text-white" href="#x">X</a></li>
              <li><a className="transition-colors hover:text-white" href="#facebook">Facebook</a></li>
              <li><a className="transition-colors hover:text-white" href="#instagram">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-[#413e41] py-5 text-sm text-[#c9c6c7] sm:flex-row sm:items-center">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p>Made for readers</p>
        </div>
      </div>
    </footer>
  );
}
