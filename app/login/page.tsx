"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
import { account } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";
import Logo from "../_components/Logo";
import Spinner from "../_components/Spinner";
import Loading from "../loading";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type Inputs = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const {
    loggedInUser,
    loading: loadingSession,
    setLoggedInUser,
  } = useSession();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: Inputs) => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(data.email, data.password);
      setLoggedInUser(await account.get());
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      const msg = (error as Error).message;
      setMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser && !loadingSession) {
      router.push("/");
    }
  }, [loggedInUser, loadingSession, router]);

  if (loading) return <Loading />;

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-y-6 bg-background md:py-0">
      <Link
        href="/"
        className="flex items-center self-start gap-2 text-base text-primary-grey"
      >
        <CgArrowLeft />
        Back to Home
      </Link>

      <section className="flex flex-col w-full max-w-6xl overflow-hidden shadow-xl h-3/4 md:flex-row rounded-xl">
        <div className="relative w-full md:w-1/2 bg-[url('https://wallpapersok.com/images/high/american-horror-movie-posters-9pvmdtvz4cb0xl37.webp')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/75">
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 space-y-4 text-center text-white">
            <Logo />

            <p className="max-w-lg text-base text-gray-300">
              Dive into a cinematic experience. Watch, review, and explore an
              ever-growing collection of films curated just for you.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-1/2 h-full">
            <Spinner className="w-10 h-10" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-full p-10 space-y-6 md:w-1/2 bg-primary-black-800/25"
          >
            <div className="space-y-1 text-center">
              <h3 className="text-2xl font-semibold text-white">
                Let’s continue our journey together
              </h3>
              <p className="text-base text-primary-grey">
                Login to your account
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                readOnly
                autoComplete="off"
                onClick={(e) => e.currentTarget.removeAttribute("readOnly")}
                {...register("email")}
                placeholder="you@example.com"
                className={`w-full bg-[#222] text-base px-4 py-2 rounded text-white border ${
                  errors.email ? "border-primary-red" : "border-[#444]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-primary-red">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                readOnly
                autoComplete="off"
                onClick={(e) => e.currentTarget.removeAttribute("readOnly")}
                {...register("password")}
                placeholder="••••••••"
                className={`w-full bg-[#222] text-base px-4 py-2 rounded text-white border ${
                  errors.password ? "border-primary-red" : "border-[#444]"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-primary-red">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-semibold text-white transition rounded bg-primary-red hover:bg-primary-red/75 disabled:opacity-50 hover:cursor-pointer"
            >
              Login
            </button>

            {message && (
              <p className="text-sm text-center text-primary-red">{message}</p>
            )}

            <p className="text-sm text-center text-primary-grey">
              Don’t have an account?{" "}
              <Link href="/register" className="text-white underline">
                Register
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
