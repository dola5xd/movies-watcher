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
import { motion } from "framer-motion";

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
    <main className="fixed h-screen w-screen inset-0 z-50 flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-background md:px-10">
      {/* Back Button */}
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 text-sm text-gray-400 hover:text-white transition-colors self-start"
      >
        <CgArrowLeft size={20} />
        Back to Home
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col w-full max-w-6xl overflow-hidden shadow-2xl md:flex-row rounded-2xl bg-background h-[70vh]"
      >
        {/* Left Side (Hero) */}
        <div className="relative hidden w-1/2 md:flex">
          <Image
            src="https://wallpapersok.com/images/high/american-horror-movie-posters-9pvmdtvz4cb0xl37.webp"
            alt="Cinema background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          <div className="relative z-10 flex flex-col justify-center h-full p-10 space-y-4 text-center text-white">
            <Logo />
            <p className="max-w-md mx-auto text-base text-gray-300">
              Join <span className="text-primary-red">Movies Watcher</span> and
              explore a world of cinema. Discover, rate, and share your favorite
              films — all in one place.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full gap-4 p-8 md:w-1/2"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-white">
              Let’s start your journey
            </h3>
            <p className="text-sm text-gray-400">Create your account now</p>
          </motion.div>

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className={`w-full bg-[#1b1b1b] text-white text-base px-4 py-2 rounded-lg outline-none border ${
                errors.name ? "border-red-500" : "border-gray-700"
              } focus:border-primary-red transition-all`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-primary-red">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full bg-[#1b1b1b] text-white text-base px-4 py-2 rounded-lg outline-none border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } focus:border-primary-red transition-all`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-primary-red">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-sm text-gray-300">Profile Image</label>

            {avatarPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-20 h-20 mx-auto"
              >
                <Image
                  src={avatarPreview}
                  alt="Avatar Preview"
                  fill
                  className="object-cover rounded-full border border-gray-600"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  title="Remove"
                  className="absolute flex items-center justify-center w-3 h-3 bg-red-500 rounded-full -top-2 -right-2 text-xs text-white hover:bg-red-600 transition"
                >
                  <FaXmark />
                </button>
              </motion.div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 text-sm text-white transition border rounded-lg border-primary-red hover:bg-primary-red"
            >
              {avatarPreview ? "Change Avatar" : "Upload Avatar"}
            </button>

            <input
              type="file"
              accept="image/*"
              hidden
              {...register("avatar")}
              onChange={handleAvatarChange}
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

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full bg-[#1b1b1b] text-white text-base px-4 py-2 rounded-lg outline-none border ${
                errors.password ? "border-red-500" : "border-gray-700"
              } focus:border-primary-red transition-all`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-primary-red">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 text-base font-semibold text-white transition rounded-lg bg-primary-red hover:bg-primary-red/80 disabled:opacity-50"
          >
            {loading ? <Spinner className="w-6 h-6" /> : "Register"}
          </motion.button>

          {message && (
            <p className="text-sm text-center text-primary-red">{message}</p>
          )}

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white underline">
              Login
            </Link>
          </p>
        </form>
      </motion.section>
    </main>
  );
}
