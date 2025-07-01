function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={`block w-20 h-20 rounded-full border-r-10 border-r-primary-red animate-spin ${className}`}
    />
  );
}

export default Spinner;
