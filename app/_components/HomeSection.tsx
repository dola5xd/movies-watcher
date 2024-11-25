import { ReactElement } from "react";

function HomeSection({
  headH1,
  children,
  className,
}: {
  headH1?: string;
  children?: ReactElement | ReactElement[];
  className?: string;
}) {
  return (
    <section className={className + " my-7"}>
      {headH1 && (
        <h1 className="mb-4 ml-4 text-2xl font-bold md:text-3xl lg:ml-20">
          {headH1}
        </h1>
      )}
      {children}
    </section>
  );
}

export default HomeSection;
