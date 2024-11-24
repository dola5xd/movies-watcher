"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { account } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function ActionBtns({ type, id }: { type: string; id: number }) {
  const bookmarkedShow = {
    showID: id,
    type,
  };

  const { loggedInUser, setLoggedInUser } = useSession();
  const navigate = useRouter();

  const bookmarked =
    loggedInUser?.prefs.savedShows?.filter(
      (show: { showID: number; type: string }) => show.showID === id
    ) || [];

  const bookmark = async function () {
    if (loggedInUser) {
      try {
        const savedShows = loggedInUser.prefs.savedShows || [];
        const updatedSavedShows =
          bookmarked.length > 0
            ? [
                ...savedShows.filter(
                  (show: { showID: number; type: string }) => show.showID !== id
                ),
              ]
            : [...savedShows, bookmarkedShow];

        await account.updatePrefs({
          ...loggedInUser.prefs,
          savedShows: updatedSavedShows,
        });

        // Update the loggedInUser state with the new savedShows
        setLoggedInUser({
          ...loggedInUser,
          prefs: {
            ...loggedInUser.prefs,
            savedShows: updatedSavedShows,
          },
        });

        if (bookmarked.length > 0)
          toast.success("This show deleted from bookmarked list!", {
            className: "text-xs",
          });
        else toast.success("This show added to bookmarked list!");
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      navigate.push("/login");
    }
  };

  const link = `https://vidsrc.me/embed/${type}/${id}`;
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      <Link href={link} target="_blank">
        <button
          className="bg-primery-green text-base px-5 py-2 rounded hover:bg-opacity-90 duration-500 flex items-center gap-2 hover:w-full [&>span]:hidden [&>span]:hover:inline"
          title="Watch show"
        >
          <FaPlay className="min-w-[10px]" />
          Watch Now!
        </button>
      </Link>
      <button
        className="bg-primery-red py-2 px-2 text-black rounded duration-500 [&>svg]:stroke-black hover:[&>svg]:fill-black"
        name="bookmarkButton"
        title="Bookmark show!"
        onClick={bookmark}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={bookmarked.length > 0 ? "black" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="duration-500 size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default ActionBtns;
