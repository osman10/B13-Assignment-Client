"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function SignUp() {
    const handleSubmit =async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.value;
        // TODO: Implement signup logic here, e.g., send data to backend API


const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            toast.success("Signup successful! Please check your email to verify your account.");
        },
        onError: (ctx) => {
            // display the error message
            toast.error(ctx.error.message);
        },
});
};

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-3xl font-bold text-center">
                Signup Page
            </h1>

            <p className="text-center my-4 text-muted-foreground">
                Welcome! Please sign up for an account.
            </p>

            <Card className="w-full max-w-sm">
                <CardHeader>
                     <CardDescription>
                        Enter your name, email and password below
                        to create an account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">

                            {/* Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="image">
                                    Image
                                </Label>

                                <Input
                                    id="image"
                                    type="text"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6"
                        >
                            Signup
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">

                    <p className="text-sm text-center">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                    <Button
                        variant="outline"
                        className="w-full"
                    >
                        <FcGoogle className="mr-2 text-lg" />
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}