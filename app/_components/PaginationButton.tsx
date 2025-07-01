import React from "react";

function PaginationButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary-black-800 text-white border-none rounded-sm font-medium flex items-center justify-center gap-2 py-3 px-5 duration-300 [&:has(span:last-child)]:pl-2 [&:has(span:first-child)]:pr-2 [&>svg]:h-8 [&>svg]:w-8 [&:hover:not(:disabled)]:bg-primary-black-900 [&:hover:not(:disabled)]:text-primary-grey text-base cursor-pointer disabled:cursor-not-allowed [&:hover:disabled]:text-primary-red ${className}`}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
