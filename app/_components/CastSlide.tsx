import Image from "next/image";
import { CastData } from "../_lib/Api";

const CastSlide: React.FC<CastData> = ({ name, character, profile_path }) => {
  return (
    <div className="relative flex items-center justify-start rounded-lg gap-4 w-full">
      <span className="relative min-h-20 min-w-20 rounded-full items-center aspect-square">
        <Image
          fill
          src={"http://image.tmdb.org/t/p/w500" + profile_path}
          alt={name + " Avatar"}
          quality={50}
          className=" object-cover rounded-full object-center "
        />
      </span>
      <span className="flex flex-col gap-2 text-nowrap">
        <h3 className="text-sm">{name}</h3>
        <h5 className="text-primery-grey text-xs">{character}</h5>
      </span>
    </div>
  );
};

export default CastSlide;
