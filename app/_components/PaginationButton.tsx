import React from "react";

function PaginationButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-primery-black-800 text-white border-none rounded-sm font-medium flex items-center justify-center gap-2 py-3 px-5 duration-300 [&:has(span:last-child)]:pl-2 [&:has(span:first-child)]:pr-2 [&>svg]:h-8 [&>svg]:w-8 [&:hover:not(:disabled)]:bg-primery-black-900 [&:hover:not(:disabled)]:text-primery-grey text-base cursor-pointer [&:disabled]:cursor-not-allowed [&:hover:disabled]:text-primery-red"
    >
      {children}
    </button>
  );
}

export default PaginationButton;
