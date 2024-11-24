"use client";

import { useState } from "react";

function Overview({ overview }: { overview: string }) {
  const [short, setShortOverview] = useState<boolean>(true);
  const overviewText = short ? overview.slice(0, 100) + " ... " : overview;

  if (!overview)
    return (
      <h1 className="text-primery-grey text-sm">No overview for this show!</h1>
    );

  return (
    <p className="text-base leading-relaxed text-primery-grey">
      {overviewText}
      <span
        onClick={() => setShortOverview((prev) => !prev)}
        className=" text-primery-green underline cursor-pointer"
      >
        {short ? "More" : " Less"}
      </span>
    </p>
  );
}

export default Overview;
