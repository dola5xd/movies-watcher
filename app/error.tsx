"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "./_components/Header";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 px-10 text-center pt-28">
        <h2 className="font-bold text-primery-red">** Not Found **</h2>
        <p className="text-AXxl">{error.message}</p>
        <Link
          href="/"
          className="px-2 py-1 text-lg duration-500 border border-white rounded hover:border-primery-red hover:text-primery-red"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
