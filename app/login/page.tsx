"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdLocalMovies } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
import { account } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";

type Inputs = { email: string; password: string };

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
      await account.createEmailPasswordSession(data.email, data.password);
      setLoggedInUser(await account.get());

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
          <p className="text-primery-grey text-base">Login to your account</p>
        </h1>
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
          Login
        </button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}

export default Page;
