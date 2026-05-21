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
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

export function Login() {
    const [login, setLogin]=useState("Login")
    const[loginWithGoogle, setLoginWithGoogle]=useState("Login with Google")

    // Email login
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const email = form.email.value;
        const password = form.password.value;

        const { data, error } = await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/",
                rememberMe: false,
            },
            {
                onRequest: () => {
                    setLogin("Signing in...");
                },
                onSuccess: () => {
                    toast.success("Login successful");
                    setLogin("Login");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    setLogin("Login");
                },
            }
        );

        // console.log(data, error);
    };

    // // Google login
    // const handleGoogleLogin = async () => {
    //     await authClient.signIn.social({
    //         provider: "google",
    //         callbackURL: "/",
    //     });
    //     setLoginWithGoogle("Signing in...");
    // };

    // Google login
const handleGoogleLogin = async () => {
    try {
        setLoginWithGoogle("Signing in...");

        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    } catch (error) {
        console.error("Google login failed:", error);
        setLoginWithGoogle("Continue with Google");
    }
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
                                    name="email"
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
                                    name="password"
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
                            {login}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">

                    <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Signup
                        </Link>
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle className="mr-2 text-lg" />
                        {loginWithGoogle}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}