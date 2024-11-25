"use client";

import Header from "../_components/Header";
import { useSession } from "../_context/SessionContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { account, updateUserData } from "../_lib/appwrite";

type Inputs = {
  email: string;
  name: string;
  avatar: FileList;
  phone: string;
};

function Page() {
  const { loggedInUser, setLoggedInUser } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: String(loggedInUser?.name),
      phone: String(loggedInUser?.phone),
      email: String(loggedInUser?.email),
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const previousAvatarId = loggedInUser?.prefs?.avatarId || null;
      await updateUserData(data.name, data.avatar, previousAvatarId);
      setLoggedInUser(await account.get());

      toast.success("User data updated successfully!");
      router.push("./");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <Header />
      <main className="px-5 pt-28 md:px-20">
        <h1>🙋‍♂️ Hi! {String(loggedInUser?.name)}</h1>
        <h3 className="text-center mt-7">Let&apos;s edit your profile!</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-7 md:px-7 bg-primery-black-700 py-10 md:py-7 rounded-lg mt-3 flex flex-col gap-5 [&>div>input]:bg-primery-black-800 [&>div>input:disabled]:bg-primery-black-900 [&>div>input:disabled]:text-primery-grey [&>div>input:disabled]:cursor-not-allowed "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Name"
              className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
                errors.name ? "outline-primery-red" : "outline-primery-grey/25"
              }`}
            />
            {errors.name && (
              <span className="text-sm text-primery-red">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                disabled: true,
              })}
              placeholder="Email"
              className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
                errors.email ? "outline-primery-red" : "outline-primery-grey/25"
              }`}
            />
            {errors.email && (
              <span className="text-sm text-primery-red">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="avatar">Profile Image</label>
            <input
              type="file"
              {...register("avatar")}
              placeholder="avatar"
              className={`bg-transparent outline outline-1 py-2 px-4 rounded w-full file:py-1 file:px-2 file:bg-transparent text-xs file:border file:border-primery-grey file:text-primery-white ${
                errors.avatar
                  ? "outline-primery-red"
                  : "outline-primery-grey/25"
              }`}
            />
            {errors.avatar && (
              <span className="text-sm text-primery-red">
                {errors.avatar.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="py-3 text-lg font-bold duration-500 border border-white rounded bg-primery-black/90 hover:border-primery-red hover:text-primery-red text-primery-grey"
          >
            Update
          </button>
        </form>
      </main>
    </>
  );
}

export default Page;
