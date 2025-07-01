"use client";

import { motion } from "framer-motion";
import CompaniesSlide from "./CompaniesSlide";
import { componies } from "../_lib/constants";
import { useEffect, useState } from "react";

function CompaniesSlider() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Track screen size for responsiveness
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1000px)");
    const update = () => setIsSmallScreen(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Combine companies twice for infinite loop illusion
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
