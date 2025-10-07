"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";
import { account, ID, uploadAvatar } from "../_lib/appwrite";
import { useSession } from "../_context/SessionContext";
import Logo from "../_components/Logo";
import { FaXmark } from "react-icons/fa6";
import Loading from "../loading";
import Spinner from "../_components/Spinner";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.custom<FileList>().refine((file) => file && file.length > 0, {
    message: "Avatar is required",
  }),
});

type Inputs = z.infer<typeof schema>;

export default function RegisterPage() {
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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: Inputs) => {
    try {
      setLoading(true);
      await account.create(ID.unique(), data.email, data.password, data.name);
      await account.createEmailPasswordSession(data.email, data.password);
      setLoggedInUser(await account.get());

      if (data.avatar?.length > 0) {
        await uploadAvatar(data.avatar[0]);
      }

      toast.success("Registered and logged in!");
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
    <main className="fixed inset-0 flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-y-6 bg-background">
      <Link
        href="/"
        className="flex items-center self-start gap-2 text-base text-primary-grey"
      >
        <CgArrowLeft />
        Back to Home
      </Link>

      <section className="flex flex-col w-full max-w-6xl overflow-hidden shadow-xl h-fit md:flex-row rounded-xl">
        <div className="relative w-full md:w-1/2 bg-[url('https://wallpapersok.com/images/high/american-horror-movie-posters-9pvmdtvz4cb0xl37.webp')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/75">
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 space-y-4 text-center text-white">
            <Logo />
            <p className="max-w-lg text-base text-gray-300">
              Join Movie Watcher and discover a world of cinema. Watch, rate,
              and share your favorite movies — all in one place.
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
                Let’s start your journey
              </h3>
              <p className="text-base text-primary-grey">
                Create your account now
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="off"
                {...register("name")}
                placeholder="Your name"
                className={`w-full bg-[#222] text-base px-4 py-2 rounded text-white border ${
                  errors.name ? "border-primary-red" : "border-[#444]"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-primary-red">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
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
                autoComplete="off"
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

            <div className="flex flex-col gap-y-4">
              <label className="block mb-1 text-sm font-medium text-white">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {avatarPreview && (
                  <div className="relative flex items-center gap-4 mb-3">
                    <Image
                      src={avatarPreview}
                      alt="Avatar Preview"
                      height={64}
                      width={64}
                      className="object-cover w-16 h-16 border rounded-full border-primary-grey"
                    />
                    <button
                      title="remove image"
                      type="button"
                      onClick={removeAvatar}
                      className="absolute top-0 text-base underline cursor-pointer right-full text-primary-red"
                    >
                      <FaXmark />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm text-white border rounded bg-[#222] border-primary-red hover:bg-primary-red transition cursor-pointer"
                >
                  {avatarPreview ? "Change Avatar" : "Upload Avatar"}
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                autoComplete="off"
                hidden
                {...register("avatar")}
                onChange={(e) => {
                  handleAvatarChange(e);
                }}
                ref={(e) => {
                  register("avatar").ref(e);
                  fileInputRef.current = e;
                }}
              />

              {errors.avatar && (
                <p className="mt-1 text-sm text-primary-red">
                  {errors.avatar.message as string}
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
                autoComplete="new-password"
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
              className="w-full py-3 text-base font-semibold text-white transition rounded bg-primary-red hover:bg-primary-red/75 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {message && (
              <p className="text-sm text-center text-primary-red">{message}</p>
            )}

            <p className="text-sm text-center text-primary-grey">
              Already have an account?{" "}
              <Link href="/login" className="text-white underline">
                Login
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
