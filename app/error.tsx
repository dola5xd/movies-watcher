"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-10 text-center pt-28 min-h-[70vh]">
      <h3 className="font-bold text-primary-red">** Not Found **</h3>
      <p className="text-AXxl">{error.message}</p>
      <Link
        href="/"
        className="px-2 py-1 text-lg duration-500 border border-white rounded hover:border-primary-red hover:text-primary-red"
      >
        Return Home
      </Link>
    </div>
  );
}
