import BannerSection from "@/components/homepage-component/banner";
import NewArrival from "@/components/homepage-component/new-arival";
import BorrowBooks from "@/components/homepage-component/borrow-books";
import TopCategory from "@/components/homepage-component/top-category";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <BannerSection />
      <NewArrival />

      <BorrowBooks />
      <TopCategory />
    </main>
  );
}
