"use client"
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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import BookNowButton from "@/components/BookNowButton";
import Image from "next/image";




const TutorDetails = ({ tutor }) => {
    const { _id, PhotoURL, TutorName, Subject, HourlyFee, TotalSlots, Available, SessionStartDate, SessionEndDate, Institution, Experience, Location, TeachingMode, Description } = tutor;

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [login, setLogin] = useState("Login")
    const [loginWithGoogle, setLoginWithGoogle] = useState("Login with Google")

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
                // callbackURL: "/",
                rememberMe: false,
            },
            {
                onRequest: () => {
                    setLogin("Signing in...");
                },
                onSuccess: () => {
                    toast.success("Login successful");
                    setLogin("Login");
                    router.push(`/tutors/${_id}`);
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
        <>
            {!session ? (
                <div>
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
                </div>






            ) : (
                <div>
                    <div className="container mx-auto p-6">
                        <div className="border rounded-xl p-4 shadow flex flex-col md:flex-row gap-10 items-center text-gray-800  dark:bg-gray-800">
                            {/* Tutor Photo */}
                            <div className="flex-1 ">
                                <Image src={PhotoURL} alt={TutorName} width={100} height={100} className="w-full rounded-lg" />
                            </div>
                            {/* Tutor Information */}
                            <div className="flex-1">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                                        <div className="flex items-center gap-6 mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold">{TutorName}</h2>
                                                <p className="text-gray-600">{Subject} Tutor</p>
                                            </div>
                                        </div>

                                        <table className="w-full border border-gray-300">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Hourly Fee</td>
                                                    <td className="p-3">${HourlyFee}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Total Slots</td>
                                                    <td className="p-3">{TotalSlots}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Available</td>
                                                    <td className="p-3">{Available}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">
                                                        Session Start Date
                                                    </td>
                                                    <td className="p-3">
                                                        {new Date(SessionStartDate).toUTCString()}
                                                    </td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">
                                                        Session End Date
                                                    </td>
                                                    <td className="p-3">
                                                        {new Date(SessionEndDate).toUTCString()}
                                                    </td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Institution</td>
                                                    <td className="p-3">{Institution}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Experience</td>
                                                    <td className="p-3">{Experience}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Location</td>
                                                    <td className="p-3">{Location}</td>
                                                </tr>

                                                <tr className="border-b">
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Teaching Mode</td>
                                                    <td className="p-3">{TeachingMode}</td>
                                                </tr>

                                                <tr>
                                                    <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Description</td>
                                                    <td className="p-3">{Description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <BookNowButton TutorName={TutorName} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TutorDetails;










