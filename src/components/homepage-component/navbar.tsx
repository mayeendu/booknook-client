"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
];

export default function NavbarSection() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name.trim().split(/\s+/)[0] || user?.name || "";

  const handleSignOut = async () => {
    await authClient.signOut();
  };

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
          {user ? (
            <Popover>
              <PopoverTrigger className="flex max-w-[min(48vw,18rem)] items-center gap-2 rounded-full py-1 pl-1 pr-2 text-left transition-colors hover:bg-[#f8f5ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c83242]/30">
                <Avatar className="size-9">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image ?? undefined}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0 truncate text-xs font-medium text-[#393530] sm:text-sm">
                  Welcome, {firstName}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#77716b]"
                />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[(--anchor-width)] gap-3 p-4"
              >
                <PopoverHeader>
                  <PopoverDescription className="break-all">
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>
                <Button onClick={handleSignOut} variant="destructive">
                  Sign out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {" "}
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-[5px] border border-[#222] px-6 text-[13px] font-semibold tracking-[1.4px] text-[#222] transition-colors hover:bg-neutral-50"
              >
                LOGIN
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 text-[13px] font-semibold tracking-[1.4px] text-white transition-colors hover:bg-[#b52b3a]"
              >
                SIGNUP
              </Link>{" "}
            </>
          )}
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
