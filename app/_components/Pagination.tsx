"use client";

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
    router.push(`?${params.toString()}`);
  }

  function nextPage() {
    if (currentPage < pageCount) goToPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) goToPage(currentPage - 1);
  }

  if (pageCount <= 1) return null;

  // Generate visible page numbers (e.g., [2, 3, 4, 5, 6])
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
    <div className="flex flex-col-reverse items-center justify-center w-full md:flex- gap-y-5 py-7">
      <p className="ml-[0.8rem] [&>span]:font-semibold text-sm lg:text-base">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount
            ? totalPages * PAGE_SIZE
            : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{totalPages * PAGE_SIZE}</span> results
      </p>

      <div className="flex items-center gap-2">
        <button
          title="previous page"
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-3 duration-500 rounded cursor-pointer outline-2 outline-primary-red hover:bg-primary-red"
        >
          <HiChevronLeft />
        </button>

        {getPageNumbers().map((page) => (
          <PaginationButton
            key={page}
            onClick={() => goToPage(page)}
            className={`${
              currentPage === page ? "bg-primary-red" : "black-800k"
            } border border-gray-300 `}
          >
            {page}
          </PaginationButton>
        ))}

        <button
          title="next page"
          type="button"
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="px-3 py-3 duration-500 rounded cursor-pointer outline-2 outline-primary-red hover:bg-primary-red "
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
