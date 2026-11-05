"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function LogInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Login failed:", error);
        toast.error(error.message || "Unable to log in.");
        return;
      }

      toast.success("You are logged in.");
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-12 sm:px-6 sm:py-20">
      <Card className="gap-7 overflow-hidden rounded-2xl border border-[#e5e0d6] bg-white py-8 text-[#29272a] shadow-[0_20px_65px_-20px_rgba(70,42,32,0.18)] sm:py-10">
        <CardHeader className="gap-3 px-6 text-center sm:px-10">
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight text-[#19191b] sm:text-2xl">
            Welcome to BookNook
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-[#77716b]">
            Login with your Email or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-10">
          <form onSubmit={handleEmailLogIn}>
            <FieldGroup className="gap-6">
              <Field className="gap-3">
                <Button
                  variant="outline"
                  type="button"
                  className="h-12 w-full gap-3 rounded-lg border-[#dedbd4] bg-white text-sm font-medium text-[#393530] shadow-none transition-colors hover:border-[#a33a43]/40 hover:bg-[#f8f5ef] hover:text-[#a33a43]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="text-xs text-[#989188] after:bg-[#e8e3da] *:data-[slot=field-separator-content]:bg-white *:data-[slot=field-separator-content]:px-4">
                Or Email
              </FieldSeparator>

              <Field className="gap-2.5">
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium text-[#4b4945]"
                >
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="username@example.com"
                  required
                  className="h-12 rounded-lg border-[#dedbd4] bg-[#fdfcf9] px-4 text-[#29272a] shadow-none transition-colors placeholder:text-[#aaa59c] focus-visible:border-[#a33a43] focus-visible:ring-[3px] focus-visible:ring-[#a33a43]/10"
                />
              </Field>
              <Field className="gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium text-[#4b4945]"
                  >
                    Password
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className="h-12 rounded-lg border-[#dedbd4] bg-[#fdfcf9] px-4 text-[#29272a] shadow-none transition-colors focus-visible:border-[#a33a43] focus-visible:ring-[3px] focus-visible:ring-[#a33a43]/10"
                />
              </Field>
              <Field className="gap-5 pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-lg bg-[#c83242] text-sm font-semibold tracking-wide text-white shadow-[0_6px_16px_-6px_rgba(200,50,66,0.45)] transition-colors hover:bg-[#b52b3a] focus-visible:border-[#c83242] focus-visible:ring-[#c83242]/20"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t Have an account? <Link href="/signup">Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
