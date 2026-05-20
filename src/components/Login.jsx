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

export function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        // TODO: Implement login logic here, e.g., send data to backend API
    };

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-3xl font-bold text-center">
                Login Page
            </h1>

            <p className="text-center my-4 text-muted-foreground">
                Welcome! Please login to your account.
            </p>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardDescription>
                        Enter your email and password below
                        to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">


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

        
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6"
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">

                    <p className="text-sm text-center">
                        Dont have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Signup
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