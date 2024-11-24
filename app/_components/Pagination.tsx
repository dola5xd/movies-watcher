"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../_lib/constants";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationButton from "./PaginationButton";

function Pagination({ total: pageNumber }: { total: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = pageNumber;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    params.set("page", String(next));
    router.push(`?${params.toString()}`);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    params.set("page", String(prev));
    router.push(`?${params.toString()}`);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-y-5 items-center justify-between py-7">
      <p className="ml-[0.8rem] [&>span]:font-semibold text-sm">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount
            ? pageNumber * PAGE_SIZE
            : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{pageNumber * PAGE_SIZE}</span> results
      </p>

      <div className="flex gap-2">
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </div>
    </div>
  );
}

export default Pagination;
