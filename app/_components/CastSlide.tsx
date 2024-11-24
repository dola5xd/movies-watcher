import Image from "next/image";
import { CastData } from "../_lib/Api";

const CastSlide: React.FC<CastData> = ({ name, character, profile_path }) => {
  return (
    <div className="relative flex items-center justify-start w-full gap-4 rounded-lg">
      <span className="relative items-center rounded-full min-h-20 min-w-20 aspect-square">
        <Image
          fill
          src={"http://image.tmdb.org/t/p/w500" + profile_path}
          alt={name + " Avatar"}
          quality={50}
          className="object-cover object-center rounded-full "
        />
      </span>
      <span className="flex flex-col gap-2 text-nowrap">
        <h3 className="text-sm">{name}</h3>
        <h5 className="text-xs text-primery-grey">{character}</h5>
      </span>
    </div>
  );
};

export default CastSlide;
