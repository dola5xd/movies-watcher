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
      <h2 className="text-sm text-primary-grey">No overview for this show!</h2>
    );

  return (
    <p className="text-base leading-relaxed text-primary-grey p-7">
      {isSmallScreen ? overviewText : overview}
      {isSmallScreen && (
        <span
          onClick={() => setShortOverview((prev) => !prev)}
          className="underline cursor-pointer text-primary-green"
        >
          {short ? "More" : " Less"}
        </span>
      )}
    </p>
  );
}

export default Overview;
