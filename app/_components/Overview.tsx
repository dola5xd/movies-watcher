"use client";

import { useState } from "react";

function Overview({ overview }: { overview: string }) {
  const [short, setShortOverview] = useState<boolean>(true);
  const overviewText = short ? overview.slice(0, 100) + " ... " : overview;
  const isSmallScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1000px)").matches;
  if (!overview)
    return (
      <h1 className="text-sm text-primery-grey">No overview for this show!</h1>
    );

  return (
    <p className="text-base leading-relaxed text-primery-grey p-7">
      {isSmallScreen ? overviewText : overview}
      {isSmallScreen && (
        <span
          onClick={() => setShortOverview((prev) => !prev)}
          className="underline cursor-pointer text-primery-green"
        >
          {short ? "More" : " Less"}
        </span>
      )}
    </p>
  );
}

export default Overview;
