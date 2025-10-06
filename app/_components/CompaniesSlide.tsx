import Image from "next/image";

function CompaniesSlide({
  company,
}: {
  company: { logo: string; name: string };
}) {
  const { logo, name } = company;

  return (
    <div className="flex items-center justify-center w-[100px] h-[100px] relative">
      <Image
        src={logo}
        alt={name}
        fill
        className="object-contain object-center"
        sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
        priority={false}
      />
    </div>
  );
}

export default CompaniesSlide;
