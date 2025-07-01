import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-10 text-center pt-28">
      <h3 className="font-bold text-primary-red">** Not Found **</h3>
      <p className="text-base">Could not find this page!</p>
      <Link
        href="/"
        className="px-2 py-1 duration-500 border border-white rounded hover:border-primary-red hover:text-primary-red"
      >
        Return Home
      </Link>
    </div>
  );
}
