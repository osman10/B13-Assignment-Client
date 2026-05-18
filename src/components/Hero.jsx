"use client";

import Tutor from "@/assets/Tutor.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <div className="container mx-auto p-4 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col space-y-5"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent"
                    >
                        Find Your Perfect Tutor
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-muted-foreground max-w-[400px]"
                    >
                        Connect with qualified tutors in your area and advance your learning journey.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500 w-fit"
                    >
                        Explore Tutors
                    </motion.button>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.03 }}
                >
                    <Image
                        src={Tutor}
                        alt="Tutor"
                        className="object-cover rounded-2xl shadow-lg"
                        height={800}
                        width={800}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;