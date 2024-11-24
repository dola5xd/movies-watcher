import Link from "next/link";
import Header from "./_components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="pt-28 px-10 text-center flex flex-col items-center justify-center gap-4">
        <h2 className="text-primery-red font-bold">** Not Found **</h2>
        <p className="text-base">Could not find this page!</p>
        <Link
          href="/"
          className="border border-white px-2 py-1 rounded hover:border-primery-red hover:text-primery-red duration-500"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
