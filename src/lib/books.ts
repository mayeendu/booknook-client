export type Book = {
  _id: string;
  title: string;
  author: string;
  image: string;
  totalCopies: number;
  category: string;
  description: string;
};

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(
    process.env.BOOKS_API_URL ?? "http://localhost:5000/all-books",
    { cache: "no-store", signal: AbortSignal.timeout(10000) },
  );

  if (!response.ok) throw new Error("Unable to fetch the book collection");

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Invalid book collection response");
  return data as Book[];
}
