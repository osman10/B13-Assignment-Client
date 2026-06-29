import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BookOpen, GraduationCap, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t">
      <div className="container mx-auto px-5 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Tutors Finder
            </h2>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-7">
              Find qualified tutors, book learning sessions online, and improve
              your academic journey with experienced educators.
            </p>
          </div>

          {/* Learning Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Learning Services
            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/tutors"
                  className="hover:text-sky-500 flex items-center gap-2"
                >
                  <GraduationCap size={18} />
                  Browse Tutors
                </Link>
              </li>

              <li>
                <Link
                  href="/addtutor"
                  className="hover:text-sky-500 flex items-center gap-2"
                >
                  <BookOpen size={18} />
                  Become a Tutor
                </Link>
              </li>

              <li>
                <Link
                  href="/mybookings"
                  className="hover:text-sky-500"
                >
                  My Booked Sessions
                </Link>
              </li>

              <li>
                <Link
                  href="/my-tutors"
                  className="hover:text-sky-500"
                >
                  My Tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Contact
            </h3>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-1" />
                <span>Mirpur, Kushtia, Bangladesh</span>
              </li>

              <li className="flex gap-3">
                <Phone size={18} className="mt-1" />
                <span>+880 1737 290987</span>
              </li>

              <li className="flex gap-3">
                <Mail size={18} className="mt-1" />
                <span>osman.mirpur55@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition hover:scale-110"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:scale-110"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition hover:scale-110"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition hover:scale-110"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition hover:scale-110"
              >
                <FaGithub />
              </a>
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Learn anytime. Grow every day.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-sky-500">
            Tutors Finder
          </span>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;