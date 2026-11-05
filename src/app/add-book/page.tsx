"use client";

import { useState, type FormEvent } from "react";
import { BookOpen, ImagePlus, Loader2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type BookFormData = {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
};

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Number.isInteger(formData.totalCopies) || formData.totalCopies < 1) {
      toast.error("Total copies must be a positive whole number.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const { data: tokenData, error: tokenError } = await authClient.token();
      if (tokenError || !tokenData?.token) {
        throw new Error("Please sign in again to add a book.");
      }

      const response = await fetch(`${apiUrl}/add-book`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let message = `Server error (${response.status})`;

        if (errorBody) {
          try {
            const errorData: unknown = JSON.parse(errorBody);
            if (
              typeof errorData === "object" &&
              errorData !== null &&
              "error" in errorData &&
              typeof errorData.error === "string"
            ) {
              message = errorData.error;
            } else {
              message = errorBody;
            }
          } catch {
            message = errorBody;
          }
        }

        throw new Error(message);
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
        totalCopies: 1,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <main className="min-h-screen bg-[#f5f2ea] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[#f0e2df] text-[#a83c46]">
            <BookOpen size={25} strokeWidth={1.7} />
          </div>

          <p className="mb-2 text-xs font-semibold tracking-[2.5px] text-[#91414b]">
            SHARE YOUR SHELF
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-[-1px] text-[#242226] sm:text-5xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-base text-[#696661]">
            Share a book with the BookNook community.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-xl border border-[#e5e0d6] bg-white p-6 shadow-[0_16px_45px_rgba(42,35,28,0.07)] sm:p-9"
        >
          {/* Book information */}
          <section>
            <h2 className="mb-5 border-b border-[#eeeae2] pb-3 font-serif text-xl text-[#29272a]">
              Book Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Book Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Alchemist"
                  className="w-full rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29272a] outline-none transition placeholder:text-[#aaa59c] focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Author <span className="text-red-500">*</span>
                </label>

                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Paulo Coelho"
                  className="w-full rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29272a] outline-none placeholder:text-[#aaa59c] focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29272a] outline-none focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="totalCopies"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Total Copies <span className="text-red-500">*</span>
                </label>

                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29272a] outline-none focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Book Cover URL <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <ImagePlus
                    size={18}
                    className="absolute left-3 top-3 text-[#989188]"
                  />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/book.jpg"
                    className="w-full rounded-md border border-[#dedbd4] bg-white py-3 pl-10 pr-4 text-sm text-[#29272a] outline-none placeholder:text-[#aaa59c] focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-[#4b4945]"
                >
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description of the book..."
                  className="w-full resize-none rounded-md border border-[#dedbd4] bg-white px-4 py-3 text-sm text-[#29272a] outline-none placeholder:text-[#aaa59c] focus:border-[#a83c46] focus:ring-2 focus:ring-[#a83c46]/10"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#a83c46] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#91313b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Adding Book...
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Book
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
