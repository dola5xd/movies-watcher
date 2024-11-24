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
      {headH1 && <h1 className="font-bold text-2xl ml-4">{headH1}</h1>}
      {children}
    </section>
  );
}

export default HomeSection;
