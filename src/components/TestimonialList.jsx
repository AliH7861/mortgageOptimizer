import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const testimonialList = [
  {
    img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
    name: "Julian Olano",
    position: "Data Fusion Challenge Partner",
    content:
      "Ali is a driven and detail-oriented individual who approaches problems with a data-first mindset, consistently delivering solutions that meet and exceed design goals.",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
    name: "Sydney Smith",
    position: "Special Projects Coordinator",
    content:
      "Ali consistently impressed me with his ability to take on projects and elevate them through his technical expertise. He not only applied his strong coding skills to deliver effective solutions but also took it a step further by identifying opportunities to optimize processes for future projects. ",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
    name: "John Leo",
    position: "Mentor & Project Lead",
    content:
      "What stands out most is Ali’s passion for impactful solutions and his strong sense of empathy in teamwork.",
  },
];

export const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const timeoutRef = useRef(null);

  const { img, name, position, content } = testimonialList[index];

  // Auto-advance every 15 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonialList.length);
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  // Manual dot click
  const handleSelect = (selectedIndex) => {
    if (selectedIndex === index) return;
    setDirection(selectedIndex > index ? 1 : -1);
    setIndex(selectedIndex);
    clearTimeout(timeoutRef.current); // Reset timer
  };

  return (
    <section id="testimonials" className="py-8 md:py-16 relative z-10">
      <div className="container px-4 mx-auto max-w-3xl">
        <div className="relative flex flex-col items-center text-center">
          {/* Decorative Quotes */}
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="absolute -top-8 left-2 text-[64px] text-red-500/20 pointer-events-none z-0 pb-4"
          />
          <FontAwesomeIcon
            icon={faQuoteRight}
            className="absolute -bottom-8 right-2 text-[64px] text-red-500/20 pointer-events-none z-0"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 * direction }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full z-10"
            >
              <p className="text-xl md:text-2xl font-medium mb-8 text-center z-10 text-white-900 dark:text-white-100 drop-shadow-lg pt-12 pl-8 pr-8">
                {content}
              </p>
              <div className="flex flex-col items-center justify-center mt-4 z-10">
                <h4 className="text-lg font-bold text-red-500">{name}</h4>
                <p className="opacity-80 text-sm text-white-700 dark:text-white-300">{position}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialList.map((item, i) => (
            <button
              key={i}
              aria-label={`View testimonial ${i + 1}`}
              className={`w-5 h-5 rounded-full transition-all duration-10 
                ${index === i
                  ? "scale-125 bg-red-500 shadow-md"
                  : "bg-gray-300 dark:bg-gray-700"
                }`}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
