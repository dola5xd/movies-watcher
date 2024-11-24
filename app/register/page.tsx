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
  const router = useRouter();
  const { setLoggedInUser } = useSession();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
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
    }
  };

  return (
    <main className="h-screen flex items-center flex-col justify-center gap-4 bg-primery-black-800 font-medium">
      <Link
        href={"/"}
        className="absolute top-20 left-10 flex items-center gap-2 text-sm"
      >
        <CgArrowLeft />
        Back To Home page
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-10 gap-5 [&>div]:font-bold [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div>input]:bg-transparent [&>div>input]:outline [&>div>input]:outline-1 [&>div>input]:placeholder:text-primery-grey/25 [&>div>input]:outline-primery-grey/25 [&>div>input]:py-2 [&>div>input]:px-4 [&>div>input]:rounded [&>div>input]:text-base [&>div>input]:w-full [&>div>label]:text-base"
      >
        <h1 className="text-center text-nowrap">
          <span className="flex items-center gap-1">
            <MdLocalMovies />
            Movies Watcher
          </span>
          <p className="text-primery-grey text-base">
            Join us and create account!
          </p>
        </h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "name is required",
            })}
            placeholder="name"
            className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
              errors.name ? "outline-primery-red" : "outline-primery-grey/25"
            }`}
          />
          {errors.name && (
            <span className="text-primery-red">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
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
            <span className="text-primery-red">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="avatar">Profile Image</label>
          <input
            type="file"
            {...register("avatar", { required: "avatar is required" })}
            placeholder="avatar"
            className={`bg-transparent outline outline-1 py-2 px-4 rounded text-base w-full ${
              errors.avatar ? "outline-primery-red" : "outline-primery-grey/25"
            }`}
          />
          {errors.avatar && (
            <span className="text-primery-red">{errors.avatar.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
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
            <span className="text-primery-red">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-primery-black/90 border hover:bg-black duration-500 border-white py-3 text-primery-grey font-bold text-lg rounded"
        >
          Register
        </button>
        {message && <p className="text-sm text-primery-red">{message}</p>}
        <p className="text-base text-center text-primery-grey">
          Alerady have account?
          <Link href={"/login"} className="underline text-primery-white">
            Login now!
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Page;
