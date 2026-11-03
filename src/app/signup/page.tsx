"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-12 sm:px-6 sm:py-20">
            <Card className="gap-7 overflow-hidden rounded-2xl border border-[#e5e0d6] bg-white py-8 text-[#29272a] shadow-[0_20px_65px_-20px_rgba(70,42,32,0.18)] sm:py-10">
                <CardHeader className="gap-3 px-6 text-center sm:px-10">
                    <CardTitle className="font-serif text-3xl font-semibold tracking-tight text-[#19191b] sm:text-4xl">Welcome to BookNook</CardTitle>
                    <CardDescription className="text-sm leading-6 text-[#77716b]">
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 sm:px-10">
                    <form>
                        <FieldGroup className="gap-6">
                            <Field className="gap-3">
                                <Button variant="outline" type="button" className="h-12 w-full gap-3 rounded-lg border-[#dedbd4] bg-white text-sm font-medium text-[#393530] shadow-none transition-colors hover:border-[#a33a43]/40 hover:bg-[#f8f5ef] hover:text-[#a33a43]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Apple
                                </Button>
                                <Button variant="outline" type="button" className="h-12 w-full gap-3 rounded-lg border-[#dedbd4] bg-white text-sm font-medium text-[#393530] shadow-none transition-colors hover:border-[#a33a43]/40 hover:bg-[#f8f5ef] hover:text-[#a33a43]">
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
                                Or Sign Up with
                            </FieldSeparator>
                            <Field className="gap-2.5">
                                <FieldLabel htmlFor="name" className="text-sm font-medium text-[#4b4945]">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="h-12 rounded-lg border-[#dedbd4] bg-[#fdfcf9] px-4 text-[#29272a] shadow-none transition-colors placeholder:text-[#aaa59c] focus-visible:border-[#a33a43] focus-visible:ring-[3px] focus-visible:ring-[#a33a43]/10"
                                />
                            </Field>

                            <Field className="gap-2.5">
                                <FieldLabel htmlFor="image" className="text-sm font-medium text-[#4b4945]">Image</FieldLabel>
                                <Input
                                    id="image"
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    required
                                    className="h-12 rounded-lg border-[#dedbd4] bg-[#fdfcf9] px-4 text-[#29272a] shadow-none transition-colors placeholder:text-[#aaa59c] focus-visible:border-[#a33a43] focus-visible:ring-[3px] focus-visible:ring-[#a33a43]/10"
                                />
                            </Field>


                            <Field className="gap-2.5">
                                <FieldLabel htmlFor="email" className="text-sm font-medium text-[#4b4945]">Email</FieldLabel>
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
                                    <FieldLabel htmlFor="password" className="text-sm font-medium text-[#4b4945]">Password</FieldLabel>

                                </div>
                                <Input
                                    id="password" type="password" name="password" required className="h-12 rounded-lg border-[#dedbd4] bg-[#fdfcf9] px-4 text-[#29272a] shadow-none transition-colors focus-visible:border-[#a33a43] focus-visible:ring-[3px] focus-visible:ring-[#a33a43]/10" />
                            </Field>
                            <Field className="gap-5 pt-1">
                                <Button type="submit" className="h-12 w-full rounded-lg bg-[#c83242] text-sm font-semibold tracking-wide text-white shadow-[0_6px_16px_-6px_rgba(200,50,66,0.45)] transition-colors hover:bg-[#b52b3a] focus-visible:border-[#c83242] focus-visible:ring-[#c83242]/20">Sign Up</Button>
                                <FieldDescription className="text-center">
                                    Have an account? <Link href="/login">Login</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
