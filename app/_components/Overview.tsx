"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScreen } from "../_context/ScreenContext";

function Overview({ overview }: { overview: string }) {
  const { isSmallScreen } = useScreen();
  const [expanded, setExpanded] = useState(false);

  const isLong = useMemo(() => overview && overview.length > 200, [overview]);
  const displayedText =
    isSmallScreen && !expanded && isLong
      ? overview.slice(0, 150) + "..."
      : overview;

  if (!overview)
    return (
      <p className="text-sm text-neutral-400 italic">
        No overview available for this show.
      </p>
    );

  return (
    <div className="w-full max-w-4xl text-primary-grey">
      <AnimatePresence mode="wait">
        <motion.p
          key={expanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-base leading-relaxed md:text-lg text-primary-grey"
        >
          {displayedText}
        </motion.p>
      </AnimatePresence>

      {/* Show toggle only if text is long */}
      {isSmallScreen && isLong && (
        <button
          onClick={() => setExpanded((p) => !p)}
          className="mt-2 text-sm font-medium text-primary-green hover:text-primary-green/80 transition-colors underline underline-offset-2 focus:outline-none"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default Overview;
