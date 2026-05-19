import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

export function SignUp() {
    return (
        <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mt-10">Signup Page</h1>
            <p className="text-center my-4 text-gray-600">Welcome! Please sign up for an account.</p>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up for an account</CardTitle>
                    <CardDescription>
                        Enter your name, email and password below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password"  
                                    placeholder="Enter your password" r
                                    equired 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="text"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Signup
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">

                    <p>Already have an account? <Link href="/login" className="text-blue-500 hover:underline"> Login</Link></p>

                    <Button variant="outline" className="w-full">
                        <FcGoogle /> Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
