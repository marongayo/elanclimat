"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTENT = [
  {
    title: "From a Vision to a Trusted Name",
    subtitle: "Since 2018",
    description:
      "Established in 2018, what started as a passion for smarter, sustainable buildings has grown into a full-service engineering company, bringing precision, innovation, energy economics and dependability to every system we touch across Kenya.",
    cta: "Partner With Us",
    images: [
      { src: "/images/fandymuch.jpg", alt: "Outdoor HVAC system" },
      {
        src: "/images/coldroom.webp",
        alt: "Cold room facility with open door showing interior shelves",
      },
      { src: "/images/solar.jpg", alt: "Solar panels installation" },
    ],
  },
  {
    title: "Engineering for Every Building's Needs",
    subtitle: "Unmatched Craftmanship",
    description:
      "We design, install, and maintain HVAC, solar, refrigeration, electrical, and elevator systems, delivering reliable, energy-efficient solutions that keep homes and businesses running at peak performance across Kenya.",
    cta: "Explore Our Services",
    images: [
      { src: "/images/lift.jpg", alt: "Elevator installation" },
      {
        src: "/images/elevator.jpg",
        alt: "Elevator interior with wood paneling and mirror",
      },
      { src: "/images/liftrpr.png", alt: "Elevator installation" },
    ],
  },
  {
    title: "Leading with Purpose, Building for Tomorrow",
    subtitle: "CSR & ESG Strategies",
    description:
      "We are committed to ethical leadership, environmental stewardship, and community impact, engineering sustainable systems that reduce carbon footprints, empower local talent, and build a cleaner, more resilient future for Kenya.",
    cta: "Learn More",
    images: [
      { src: "/images/boadroom.jpg", alt: "Image of the boardroom" },
      { src: "/images/treeplanting.jpg", alt: "Tree planting activity" },
      { src: "/images/social.jpg", alt: "Social engagement activity" },
    ],
  },
];

const TAB_LABELS = ["Our Story", "About Us", "Corporate"];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    // Page load: whole section slides up from bottom
    <motion.section
      className="bg-[#FAF8F5] min-h-screen flex items-center justify-center p-6 md:p-12 font-sans text-[#000000]"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Images */}
        <div className="grid grid-cols-2 grid-rows-[60%_40%] gap-4 h-[580px]">
          {/* Top image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${currentIndex}`}
              className="col-span-2 row-span-1 relative rounded-4xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={CONTENT[currentIndex].images[0].src}
                alt={CONTENT[currentIndex].images[0].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom-left image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bl-${currentIndex}`}
              className="relative rounded-4xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, scale: 0.88, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -30 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <Image
                src={CONTENT[currentIndex].images[1].src}
                alt={CONTENT[currentIndex].images[1].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom-right image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`br-${currentIndex}`}
              className="relative rounded-4xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, scale: 0.88, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -30 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.18,
              }}
            >
              <Image
                src={CONTENT[currentIndex].images[2].src}
                alt={CONTENT[currentIndex].images[2].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Text */}
        <div className="flex flex-col h-145">
          {/* Pill tabs */}
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-100 p-0.5 shadow-sm self-start">
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setCurrentIndex(i)}
                className={`cursor-pointer px-5 py-2 text-sm tracking-wide transition-all duration-200 ${
                  currentIndex === i
                    ? "bg-black text-white font-semibold"
                    : "text-gray-500 hover:text-gray-800 font-medium"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Animated text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              className="flex flex-col flex-1 justify-start gap-4 pt-6 pb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {CONTENT[currentIndex].subtitle}
              </motion.span>

              <motion.h1
                className="text-4xl sm:text-[54px] font-extrabold tracking-tight leading-[1.1] text-[#111111]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
              >
                {CONTENT[currentIndex].title}
              </motion.h1>

              <motion.p
                className="text-gray-500 text-base sm:text-lg leading-relaxed font-normal"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.26 }}
              >
                {CONTENT[currentIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div>
            <button
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className={`group cursor-pointer flex items-center space-x-4 pl-6 pr-2 py-2 font-bold uppercase text-xs tracking-wider shadow-md transition-all duration-300 ${
                ctaHovered
                  ? "bg-transparent border-2 border-black text-black"
                  : "bg-black border-2 border-transparent text-white"
              }`}
            >
              <span>{CONTENT[currentIndex].cta}</span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45 ${
                  ctaHovered ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <ArrowUpRight className="w-5 h-5" strokeWidth={3.5} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
