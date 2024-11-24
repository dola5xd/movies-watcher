import Link from "next/link";
import Header from "./_components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 px-10 text-center pt-28">
        <h2 className="font-bold text-primery-red">** Not Found **</h2>
        <p className="text-base">Could not find this page!</p>
        <Link
          href="/"
          className="px-2 py-1 duration-500 border border-white rounded hover:border-primery-red hover:text-primery-red"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
