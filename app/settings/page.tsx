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
      <main className="h-screen pt-28 px-10">
        <h1>🙋‍♂️ Hi! {String(loggedInUser?.name)}</h1>
        <h3 className="mt-7 text-center">Let&apos;s edit your profile!</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-20 bg-primery-black-700 py-10 rounded-lg mt-3 flex flex-col gap-5 [&>div>input]:bg-primery-black-800 [&>div>input:disabled]:bg-primery-black-900 [&>div>input:disabled]:text-primery-grey [&>div>input:disabled]:cursor-not-allowed"
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
              <span className="text-primery-red text-sm">
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
              <span className="text-primery-red text-sm">
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
              className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
                errors.avatar
                  ? "outline-primery-red"
                  : "outline-primery-grey/25"
              }`}
            />
            {errors.avatar && (
              <span className="text-primery-red text-sm">
                {errors.avatar.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-primery-black/90 border duration-500 border-white hover:border-primery-red hover:text-primery-red py-3 text-primery-grey font-bold text-lg rounded"
          >
            Update
          </button>
        </form>
      </main>
    </>
  );
}

export default Page;
