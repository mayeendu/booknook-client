"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DeleteBookDialog = ({ bookId, bookTitle }: { bookId: string; bookTitle: string }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pending = useRef(false);

    function handleOpenChange(nextOpen: boolean) {
        if (pending.current) return;
        setError(null);
        setOpen(nextOpen);
    }

    async function deleteBook() {
        if (pending.current) return;
        pending.current = true;
        setDeleting(true);
        setError(null);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
            const response = await fetch(`${apiUrl.replace(/\/$/, "")}/all-books/${encodeURIComponent(bookId)}`, {
                method: "DELETE",
                signal: AbortSignal.timeout(10000),
            });
            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.error || "Unable to delete this book. Please try again.");
            }
            toast.success("Book deleted successfully.");
            setOpen(false);
            router.replace("/all-books");
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to delete this book. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            pending.current = false;
            setDeleting(false);
        }
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={handleOpenChange}>
                <AlertDialogTrigger render={<button
                    type="button"
                    className="rounded bg-[#c83242] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b52b3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c83242]"
                />}>
                    Delete Book
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this book?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete &ldquo;{bookTitle}&rdquo; from the collection
                            and My Books. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && <p role="alert" className="text-sm text-[#a33a43]">{error}</p>}
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            type="button"
                            disabled={deleting}
                            aria-busy={deleting}
                            onClick={deleteBook}
                            className="bg-[#c83242] text-white hover:bg-[#b52b3a]"
                        >
                            {deleting && <Loader2 aria-hidden="true" className="animate-spin" />}
                            {deleting ? "Deleting..." : "Delete Book"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteBookDialog;
