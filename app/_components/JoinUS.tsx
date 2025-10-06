"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "../_context/SessionContext";

export default function JoinUS() {
  const { loggedInUser } = useSession();

  const backgroundImage =
    "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg";

  if (loggedInUser)
    return (
      <section
        className="relative overflow-hidden rounded-2xl bg-black text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0" />

        <div className="relative z-10 flex flex-col items-start justify-center px-8 py-20 md:px-16 md:py-32 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            Welcome back,{" "}
            <span className="text-primary-red">{loggedInUser.name}</span> 👋
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-xl"
          >
            Discover trending movies and shows picked just for you. Dive into a
            world of entertainment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link
              href="/movies"
              className="bg-primary-red px-8 py-3 rounded-lg text-black font-medium hover:bg-green-500 transition-all"
            >
              Explore Movies
            </Link>
            <Link
              href="/series"
              className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all"
            >
              Browse TV Shows
            </Link>
          </motion.div>
        </div>
      </section>
    );

  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-black text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0" />

      <div className="relative z-10 flex flex-col items-start justify-center px-8 py-20 md:px-16 md:py-32 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight"
        >
          Join <span className="text-primary-red">Movie Watcher</span> Now!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-300 max-w-xl"
        >
          Get access to exclusive content, personalized recommendations, and
          more all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          <Link
            href="/register"
            className="bg-primary-red px-8 py-3 rounded-lg font-medium text-white hover:bg-primary-red/75 transition-all"
          >
            Register Now
          </Link>
          <Link
            href="/login"
            className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all"
          >
            Login
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
