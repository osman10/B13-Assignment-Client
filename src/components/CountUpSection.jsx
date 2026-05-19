"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    number: 100,
    suffix: "+",
    label: "Teachers",
  },
  {
    id: 2,
    number: 1000,
    suffix: "+",
    label: "Students",
  },
  {
    id: 3,
    number: 10,
    suffix: " Years",
    label: "Experience",
  },
  {
    id: 4,
    number: 500,
    suffix: "+",
    label: "Supported By",
  },
];

const CountUpSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2 initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl text-gray-500 py-5 dark:text-white font-bold text-center">Our Achievement</motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background border rounded-2xl shadow-sm p-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
              <CountUp
                end={item.number}
                duration={3}
                enableScrollSpy
              />
              {item.suffix}
            </h2>

            <p className="text-muted-foreground mt-2">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CountUpSection;