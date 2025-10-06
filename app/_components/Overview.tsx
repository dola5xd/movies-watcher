"use client";

import { useState } from "react";
import { useScreen } from "../_context/ScreenContext";

function Overview({ overview }: { overview: string }) {
  const [short, setShortOverview] = useState<boolean>(true);
  const overviewText = short ? overview.slice(0, 100) + " ... " : overview;
  const { isSmallScreen } = useScreen();

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
