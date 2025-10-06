import { ReactNode } from "react";
import MoviesSlider from "../MoviesSlider";

function HomeSection({
  headText,
  children,
  className,
  data,
}: {
  headText?: string;
  children?: ReactNode;
  className?: string;
  data?: any[];
}) {
  return (
    <section className={`${className ?? ""} py-7 px-10 space-y-1.5`}>
      {headText && (
        <h2 className="text-2xl font-bold md:text-3xl">{headText}</h2>
      )}
      {data ? <MoviesSlider data={data} /> : children}
    </section>
  );
}

export default HomeSection;
