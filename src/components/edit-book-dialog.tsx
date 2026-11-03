"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Book } from "@/lib/books";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { ImagePlus, Loader2, Pencil } from "lucide-react";



const categories = ["Fiction", "Science", "History", "Kids", "Others"];
type BookFormData = Omit<Book, "_id" | "totalCopies"> & { totalCopies: string };

function initialValues(book: Book): BookFormData {
    return { title: book.title, author: book.author, category: book.category,
        image: book.image, description: book.description ?? "", totalCopies: String(book.totalCopies) };
}

const EditBookDialog = ({ book }: { book: Book }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<BookFormData>(() => initialValues(book));

    function handleOpenChange(nextOpen: boolean) {
        if (loading) return;
        if (nextOpen) {
            setFormData(initialValues(book));
            setError(null);
        }
        setOpen(nextOpen);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (loading) return;
        const totalCopies = Number(formData.totalCopies);
        if (!Number.isSafeInteger(totalCopies) || totalCopies < 0 || !formData.totalCopies.trim()) {
            setError("Total copies must be a non-negative whole number.");
            return;
        }
        if ([formData.title, formData.author, formData.category, formData.image, formData.description].some((value) => !value.trim())) {
            setError("Please complete all required fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
            const response = await fetch(`${apiUrl.replace(/\/$/, "")}/all-books/${encodeURIComponent(book._id)}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, title: formData.title.trim(), author: formData.author.trim(),
                    image: formData.image.trim(), description: formData.description.trim(), totalCopies }),
                signal: AbortSignal.timeout(10000),
            });
            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.error || "Unable to update this book. Please try again.");
            }
            toast.success("Book updated successfully!");
            setOpen(false);
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to update this book. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button
                variant="outline"
                className="h-auto rounded border border-[#a33a43] px-5 py-2.5 text-sm font-semibold text-[#a33a43] transition-colors hover:bg-[#a33a43]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a33a43]" />}>
                <Pencil />
                Edit Book

            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl" showCloseButton={!loading}>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>
                        Update this book&apos;s information, then save your changes.
                    </DialogDescription>
                </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8 rounded-xl border border-[#e5e0d6] bg-white p-6 shadow-[0_16px_45px_rgba(42,35,28,0.07)] sm:p-9"
                        >
                            <fieldset disabled={loading} className="min-w-0 space-y-6">
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

                                            {Array.from(new Set([...categories, book.category])).filter(Boolean).map((category) => (
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
                                            min="0"
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

                            {error && <p role="alert" className="text-sm text-[#a33a43]">{error}</p>}
                            <div className="flex flex-wrap justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                            <button
                                type="submit"
                                disabled={loading}
                                aria-busy={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#a83c46] px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#91313b] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Pencil size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                            </div>
                            </fieldset>
                        </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;
