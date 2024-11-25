"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdLocalMovies } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
import { account, ID, uploadAvatar } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";

type Inputs = {
  email: string;
  password: string;
  name: string;
  avatar: FileList;
};

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { setLoggedInUser } = useSession();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      // Create user account
      await account.create(ID.unique(), data.email, data.password, data.name);

      // Log the user in
      await account.createEmailPasswordSession(data.email, data.password);
      setLoggedInUser(await account.get());

      // Upload the avatar if it exists
      if (data.avatar && data.avatar.length > 0) {
        const avatarFile = data.avatar[0]; // Extract the first file from FileList
        await uploadAvatar(avatarFile);
      }

      toast.success("Logged in successfully!");
      router.push("./");
    } catch (error) {
      toast.error((error as Error).message);
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 pb-10 font-medium bg-primery-black-800 pt-36">
      <Link
        href={"/"}
        className="absolute flex items-center gap-2 text-sm top-20 lg:top-10 left-10"
      >
        <CgArrowLeft />
        Back To Home page
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-10 lg:w-1/2 gap-5 md:px-20 [&>div]:font-bold [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div>input]:bg-transparent [&>div>input]:outline [&>div>input]:outline-2 [&>div>input]:placeholder:text-primery-grey/25 [&>div>input]:outline-primery-grey/25 [&>div>input]:py-2 [&>div>input]:px-4 [&>div>input]:rounded [&>div>input]:text-base [&>div>input]:w-full [&>div>label]:text-base"
      >
        <h1 className="text-center text-nowrap">
          <span className="flex items-center gap-1">
            <MdLocalMovies />
            Movies Watcher
          </span>
          <p className="text-base text-primery-grey">
            Join us and create account!
          </p>
        </h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoComplete="off"
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.removeAttribute("readOnly");
            }}
            {...register("name", {
              required: "name is required",
            })}
            placeholder="name"
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
            autoComplete="off"
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.removeAttribute("readOnly");
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
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
            autoComplete="off"
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.removeAttribute("readOnly");
            }}
            {...register("avatar", { required: "avatar is required" })}
            placeholder="avatar"
            className={`bg-transparent outline outline-1 py-2 px-4 rounded w-full file:py-1 file:px-2 file:bg-transparent text-xs file:border file:border-primery-grey file:mr-2 file:text-primery-white ${
              errors.avatar ? "outline-primery-red" : "outline-primery-grey/25"
            }`}
          />
          {errors.avatar && (
            <span className="text-sm text-primery-red">
              {errors.avatar.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.removeAttribute("readOnly");
            }}
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
              errors.password
                ? "outline-primery-red"
                : "outline-primery-grey/25"
            }`}
          />
          {errors.password && (
            <span className="text-sm text-primery-red">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-3 text-lg font-bold duration-500 border border-white rounded bg-primery-black/90 hover:bg-black text-primery-grey disabled:cursor-not-allowed"
        >
          {" "}
          {loading ? "Register..." : "Register!"}
        </button>
        {message && <p className="text-sm text-primery-red">{message}</p>}
        <p className="text-base text-center text-primery-grey">
          Alerady have account?{" "}
          <Link href={"/login"} className="underline text-primery-white">
            Login now!
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Page;
