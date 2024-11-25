"use client";
import { componies } from "../_lib/constants";
import CompaniesSlide from "./CompaniesSlide";
import { motion } from "framer-motion";

function CompaniesSlider() {
  const isSmallScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1000px)").matches;
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden gap-[700px] py-10 pr-[50px] lg:pt-20">
      <motion.div
        className="flex items-center justify-between w-full gap-7 px-7 lg:px-20"
        variants={{
          animate: { x: isSmallScreen ? "-412%" : "0" },
          init: { x: 0 },
        }}
        animate="animate"
        initial="init"
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 10,
          repeatDelay: 0,
          repeatType: "loop",
        }}
      >
        {componies.map((company) => (
          <CompaniesSlide company={company} key={company.name} />
        ))}
      </motion.div>
      <motion.div
        className="flex items-center justify-between w-full gap-7 px-7 lg:hidden"
        variants={{
          animate: { x: "-412%" },
          init: { x: 0 },
        }}
        animate="animate"
        initial="init"
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 10,
          repeatDelay: 0,
          repeatType: "loop",
        }}
      >
        {componies.map((company) => (
          <CompaniesSlide company={company} key={company.name} />
        ))}
      </motion.div>
    </div>
  );
}

export default CompaniesSlider;
