"use client";

import { motion } from "motion/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../_lib/constants";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationButton from "./PaginationButton";

function Pagination({ total: totalPages }: { total: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = totalPages;

  function goToPage(page: number) {
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function nextPage() {
    if (currentPage < pageCount) goToPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) goToPage(currentPage - 1);
  }

  if (pageCount <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > pageCount) {
      end = pageCount;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full gap-5 py-8 md:flex-row md:justify-between"
    >
      {/* Info Text */}
      <motion.p
        className="text-xs text-gray-400 md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Showing{" "}
        <span className="font-semibold text-white">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-white">
          {Math.min(currentPage * PAGE_SIZE, totalPages * PAGE_SIZE)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalPages * PAGE_SIZE}
        </span>{" "}
        results
      </motion.p>

      {/* Page Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <motion.button
          title="Previous page"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-md transition-all duration-300 ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-primary-red/80"
          } bg-primary-red/50 text-white`}
        >
          <HiChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <motion.div
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <PaginationButton
              onClick={() => goToPage(page)}
              className={`px-3 py-1.5 border rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-primary-red text-white border-primary-red"
                  : "bg-black border-gray-600 text-gray-300 hover:bg-gray-800"
              } transition-all duration-300`}
            >
              {page}
            </PaginationButton>
          </motion.div>
        ))}

        {/* Next */}
        <motion.button
          title="Next page"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`p-2 rounded-md transition-all duration-300 ${
            currentPage === pageCount
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-primary-red/80"
          } bg-primary-red/50 text-white`}
        >
          <HiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Pagination;
