"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

// Photography: https://www.pexels.com/photo/3747513/,
// https://www.pexels.com/photo/13278839/, https://www.pexels.com/photo/25037483/
const slides = [
  {
    eyebrow: "A SMALL ONLINE LIBRARY",
    title: "Find your next favourite read.",
    description: "Browse a shelf shared by real readers, borrow a book for a few days, and return it when you are done.",
    image: "/images/books/reading-stack.jpg",
    alt: "A stack of books waiting to be read in a quiet library",
    caption: "A little curiosity. A whole new chapter.",
    background: "bg-[#f5f2ea]",
  },
  {
    eyebrow: "WANDER THROUGH THE SHELVES",
    title: "So many stories. One perfect escape.",
    description: "From page-turning adventures to thoughtful discoveries, find a book that takes you somewhere new.",
    image: "/images/books/library-shelves.jpg",
    alt: "Rows of books lining the shelves of a warmly lit library",
    caption: "Your next adventure is on the shelf.",
    background: "bg-[#edf1ec]",
  },
  {
    eyebrow: "MAKE TIME FOR A GOOD BOOK",
    title: "Slow down. Turn a page. Stay awhile.",
    description: "Make a little room for reading. Discover a favourite, borrow it from our community, and let the story unfold.",
    image: "/images/books/sunlit-library.jpg",
    alt: "Sunlight falling across books and wooden shelves in a peaceful library",
    caption: "Find a quiet moment between the pages.",
    background: "bg-[#f4ece7]",
  },
];

export default function BannerSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="home" aria-label="Discover your next book">
      <Carousel opts={{ loop: true }} setApi={setApi} className="overflow-hidden">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <CarouselItem key={slide.image} className={`pl-0 ${slide.background}`} aria-label={`${index + 1} of ${slides.length}`} aria-hidden={current !== index} inert={current !== index}>
                <div className="mx-auto grid max-w-310 items-center gap-10 px-6 pt-12 pb-8 sm:px-10 sm:pt-16 lg:min-h-140 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-16 lg:pb-12 xl:px-0">
                  <div className="max-w-140">
                    <p className="mb-5 text-xs font-semibold tracking-[3px] text-[#a33a43] sm:text-[13px]">{slide.eyebrow}</p>
                    <Heading className="font-serif text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.04] tracking-[-2px] text-[#19191b]">{slide.title}</Heading>
                    <p className="mt-5 max-w-122.5 text-base leading-[1.7] text-[#55534f] sm:text-lg">{slide.description}</p>
                    <Link href="/all-books" tabIndex={current === index ? 0 : -1} className="mt-8 inline-flex h-12 items-center justify-center rounded-[5px] bg-[#c83242] px-7 text-[13px] font-semibold tracking-[1.3px] text-white transition-colors hover:bg-[#b52b3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c83242]">
                      BROWSE BOOKS
                    </Link>
                  </div>
                  <figure className="relative isolate overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(35,32,25,0.4)]">
                    <div className="relative aspect-4/3 sm:aspect-5/4">
                      <Image src={slide.image} alt={slide.alt} fill sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw" loading={index === 0 ? "eager" : "lazy"} className="object-cover" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-6 pt-16 pb-6 font-serif text-xl text-white sm:text-2xl">{slide.caption}</figcaption>
                  </figure>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className={`${slides[current].background} transition-colors duration-300`}>
          <div className="mx-auto flex max-w-310 items-center justify-between px-6 pb-8 sm:px-10 xl:px-0">
            <div className="flex items-center gap-2" aria-label="Choose a banner slide">
              {slides.map((slide, index) => (
                <button key={slide.image} type="button" aria-label={`Go to slide ${index + 1}: ${slide.title}`} aria-current={current === index ? "true" : undefined} onClick={() => api?.scrollTo(index)} className="group flex h-11 w-10 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c83242]">
                  <span className={`h-1 w-full rounded-full transition-colors ${current === index ? "bg-[#c83242]" : "bg-[#d5d0c4] group-hover:bg-[#a33a43]"}`} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <CarouselPrevious className="static m-0 size-11 border-[#d5d0c4] bg-transparent text-[#19191b] hover:bg-white/70" />
              <CarouselNext className="static m-0 size-11 border-[#d5d0c4] bg-transparent text-[#19191b] hover:bg-white/70" />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
}
