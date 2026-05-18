"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { RiContactsLine, RiHome2Line, RiInfoCardLine, RiServiceLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <RiHome2Line /> },
  { name: "About", href: "/about", icon: <RiInfoCardLine /> },
  { name: "Services", href: "/services", icon: <RiServiceLine /> },
  { name: "Contact", href: "/contact", icon: <RiContactsLine /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-2 md:px-4">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
            Tutors Finder
          </Link>
        
          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1 text-sm font-medium transition ${pathname === item.href
                    ? "text-sky-400"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex gap-2">
            <ModeToggle />
            <Button  className="bg-sky-400 dark:text-white text-gray-800" > <FaUserPlus />Sign Up</Button>
            <Button className="bg-purple-500 dark:text-white text-gray-800"> <FiLogIn />Login</Button>
          </div>


          {/* Mobile Menu */}
    
          <Sheet>

            {/* //show this in the right5 side of the screen on mobile device */}
            <div className="bg-red-500 md:hidden">
              <ModeToggle  />
            </div>

            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
             
             

            <SheetContent side="right">
              <div className="mt-6 flex flex-col gap-4 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium ${pathname === item.href
                        ? "text-sky-400"
                        : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
 
                <div className="mt-4 flex flex-col gap-2">
                  <Button className="bg-purple-500 dark:text-white text-gray-800">Login</Button>
                  <Button className="bg-sky-400 dark:text-white text-gray-800">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}