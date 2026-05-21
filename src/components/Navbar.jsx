"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { PiStudent } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow opacity-95 dark:bg-gray-800">
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-2 md:px-4">
          
          {/* Logo */}
          <Link
            href="/"
            className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-xl font-bold text-transparent"
          >
            Tutors Finder
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={`flex items-center gap-1 text-sm font-medium transition ${
                pathname === "/"
                  ? "text-sky-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <RiHome2Line />
              Home
            </Link>

            <Link
              href="/tutors"
              className={`flex items-center gap-1 text-sm font-medium transition ${
                pathname === "/tutors"
                  ? "text-sky-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GrUserManager />
              Tutors
            </Link>
            

            {session?.user && (
              <>
                <Link
                  href="/mybookings"
                  className={`flex items-center gap-1 text-sm font-medium transition ${
                    pathname === "/mybookings"
                      ? "text-sky-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PiStudent />
                  My Bookings
                </Link>
                <Link
                  href="/addtutor"
                  className={`flex items-center gap-1 text-sm font-medium transition ${
                    pathname === "/addtutor"
                      ? "text-sky-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  + Add Tutor
                </Link>
              </>
            )}

          </nav>

          {/* Right Side */}
          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />

            {session?.user ? (
              <>
                {/* User Image */}
                <Image
                  src={session.user.image || "/default-user.png"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border object-cover"
                />

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  className="bg-red-400 text-white hover:bg-red-500"
                >
                  <FiLogOut />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Sign Up */}
                <Link href="/signup">
                  <Button className="bg-sky-300 text-gray-800 hover:bg-sky-400 dark:text-white">
                    <FaUserPlus />
                    Sign Up
                  </Button>
                </Link>

                {/* Login */}
                <Link href="/login">
                  <Button className="bg-purple-300 text-gray-800 hover:bg-purple-400 dark:text-white">
                    <FiLogIn />
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-gray-500" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <div className="mt-6 flex flex-col gap-4 px-4">
                  
                  {/* User Info */}
                  {session?.user && (
                    <div className="flex items-center gap-3 border-b pb-4">
                      <Image
                        src={session.user.image || "/default-user.png"}
                        alt="User"
                        width={45}
                        height={45}
                        className="rounded-full border object-cover"
                      />

                      <div>
                        <h2 className="font-semibold">
                          {session.user.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Nav Links */}
                  <Link
                    href="/"
                    className={`flex items-center gap-2 text-base font-medium ${
                      pathname === "/"
                        ? "text-sky-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <RiHome2Line />
                    Home
                  </Link>

                  <Link
                    href="/tutors"
                    className={`flex items-center gap-2 text-base font-medium ${
                      pathname === "/tutors"
                        ? "text-sky-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <GrUserManager />
                    Tutors
                  </Link>

                  {/* Auth Buttons */}
                  <div className="mt-4 flex flex-col gap-2">
                    {session?.user ? (
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-red-400 text-white hover:bg-red-500"
                      >
                        <FiLogOut />
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button className="w-full bg-purple-300 text-gray-800 hover:bg-purple-400 dark:text-white">
                            <FiLogIn />
                            Login
                          </Button>
                        </Link>

                        <Link href="/signup">
                          <Button className="w-full bg-sky-300 text-gray-800 hover:bg-sky-400 dark:text-white">
                            <FaUserPlus />
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}