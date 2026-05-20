"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/css/styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Banner1 from "@/assets/Banner1.jpg";
import Banner2 from "@/assets/Banner2.jpg";
import Banner3 from "@/assets/Banner3.jpg";

// ✅ Correct Link import
import Link from "next/link";
import { motion } from "framer-motion";

export default function SwiperSlideComponent() {
  return (
    <>
      <motion.h2 initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl text-gray-500 py-5 dark:text-white font-bold text-center">At a Glance</motion.h2>


      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

         <SwiperSlide>
          <div
            className="h-[500px] w-full flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${Banner1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full bg-black/40 w-full">
              <h1 className="text-4xl font-bold text-white">
                Right Place to find your tutor online
              </h1>

              <Link
                href="/tutors"
                className="bg-green-500 hover:bg-green-600 transition rounded-2xl px-4 py-2 mt-5 text-white"
              >
                Explore Tutor
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[500px] w-full"
            style={{
              backgroundImage: `url(${Banner2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full bg-black/40 w-full">
              <h1 className="text-4xl font-bold text-white">
                Explore the best tutors online and get the best learning experience
              </h1>

              <Link
                href="/tutors"
                className="bg-violet-500 hover:bg-violet-600 transition rounded-2xl px-4 py-2 mt-5 text-white"
              >
                Explore Tutor
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[500px] w-full flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${Banner3.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full bg-black/40 w-full">
              <h1 className="text-4xl font-bold text-white">
                Best Service for finding your tutor online
              </h1>

              <Link
                href="/tutors"
                className="bg-blue-500 hover:bg-blue-600 transition rounded-2xl px-4 py-2 mt-5 text-white"
              >
                Explore Tutor
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}