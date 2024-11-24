"use client";
import { componies } from "../_lib/constants";
import CompaniesSlide from "./CompaniesSlide";
import { motion } from "framer-motion";

function CompaniesSlider() {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden gap-[700px] py-10 pr-[50px]">
      <motion.div
        className="flex items-center justify-between w-full gap-7 px-7"
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
      <motion.div
        className="flex items-center justify-between w-full gap-7 px-7"
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
