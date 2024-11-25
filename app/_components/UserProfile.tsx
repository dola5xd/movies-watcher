import { useState } from "react";
import { account } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxAvatar } from "react-icons/rx";

function UserProfile() {
  const { loggedInUser, setLoggedInUser } = useSession();

  const navigate = useRouter();

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
    navigate.push("/");
  };

  const [menu, setMenu] = useState<boolean>(false);
  return (
    <>
      <span
        className="cursor-pointer"
        onClick={
          loggedInUser
            ? () => setMenu((prev) => !prev)
            : () => navigate.push("/login")
        }
      >
        {loggedInUser ? (
          <Image
            src={
              !loggedInUser.prefs.avatarId && loggedInUser.prefs.avatar
                ? loggedInUser.prefs.avatar
                : loggedInUser.prefs.avatarId
                ? `https://cloud.appwrite.io/v1/storage/buckets/6741ac790037f830945b/files/${loggedInUser.prefs.avatarId}/view?project=67419a430000aaacd6ba&project=67419a430000aaacd6ba`
                : "/default-avatar.avif"
            }
            width={40}
            height={40}
            quality={50}
            alt="Profile avatar"
            className="rounded-full object-cover w-[40px] h-[40px]"
          />
        ) : (
          <RxAvatar />
        )}
      </span>
      {menu && loggedInUser && (
        <ul className="absolute bg-black top-20 py-2 min-w-[150px] text-sm font-bold rounded flex flex-col text-center gap-2 [&>li]:py-4 [&>li]:px-4 -translate-x-5">
          <li className="flex flex-col items-center gap-2 border-b border-primery-grey">
            <Image
              src={
                !loggedInUser.prefs.avatarId && loggedInUser.prefs.avatar
                  ? loggedInUser.prefs.avatar
                  : loggedInUser.prefs.avatarId
                  ? `https://cloud.appwrite.io/v1/storage/buckets/6741ac790037f830945b/files/${loggedInUser.prefs.avatarId}/view?project=67419a430000aaacd6ba&project=67419a430000aaacd6ba`
                  : "/default-avatar.avif"
              }
              width={50}
              height={50}
              quality={50}
              alt="Profile avatar"
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
            <span>Hello {loggedInUser && loggedInUser.name}!</span>
          </li>
          <li className="border-b cursor-pointer border-primery-grey">
            <Link href={"/settings"}>Settings</Link>
          </li>
          <li className="cursor-pointer text-primery-red" onClick={logout}>
            Logout
          </li>
        </ul>
      )}
    </>
  );
}

export default UserProfile;
