"use client";

import { motion } from "framer-motion";
import CompaniesSlide from "./CompaniesSlide";
import { componies } from "../_lib/constants";
import { useScreen } from "../_context/ScreenContext";

function CompaniesSlider() {
  const { isSmallScreen } = useScreen();

  const allCompanies = [...componies, ...componies, ...componies];

  return (
    <div className="relative w-full overflow-x-hidden p-10">
      <motion.div
        className="flex gap-16 w-max"
        animate={{ x: ["0%", "-33.3%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isSmallScreen ? 15 : 25,
        }}
      >
        {allCompanies.map((company, index) => (
          <CompaniesSlide key={`${company.name}-${index}`} company={company} />
        ))}
      </motion.div>
    </div>
  );
}

export default CompaniesSlider;
