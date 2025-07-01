import Image from "next/image";

function CompaniesSlide({
  company,
}: {
  company: { logo: string; name: string };
}) {
  const { logo, name } = company;
  return (
    <Image
      src={logo}
      alt={name}
      height={100}
      width={100}
      className="object-contain object-center"
    />
  );
}

export default CompaniesSlide;
