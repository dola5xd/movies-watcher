"use client";

import { useSession } from "../_context/SessionContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { account, updateUserData } from "../_lib/appwrite";
import { useEffect, useState } from "react";

// ✅ Zod Schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar: z
    .custom<FileList>()
    .refine((files) => files instanceof FileList, {
      message: "Avatar must be a file upload",
    })
    .optional(),
});

type Inputs = z.infer<typeof schema>;

function Page() {
  const { loggedInUser, setLoggedInUser } = useSession();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: loggedInUser?.name || "",
      email: loggedInUser?.email || "",
      phone: loggedInUser?.phone || "",
    },
  });

  const avatarWatch = watch("avatar");
  useEffect(() => {
    const file = avatarWatch?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [avatarWatch]);

  const onSubmit = async (data: Inputs) => {
    try {
      const previousAvatarId = loggedInUser?.prefs?.avatarId || null;
      const avatar = data.avatar || undefined;

      await updateUserData(data.name, avatar, previousAvatarId);
      setLoggedInUser(await account.get());
      toast.success("Profile updated successfully!");
      router.push("./");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#181818] p-8 rounded-xl border border-[#2a2a2a] shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <h2 className="mb-1 text-2xl font-bold">
            👋 Hello, {loggedInUser?.name || "User"}
          </h2>
          <p className="mb-4 text-sm text-gray-400">
            Update your profile information
          </p>

          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`w-full bg-[#222] text-base border rounded px-4 py-2 outline-none transition focus:ring-1 ${
                errors.name ? "border-primary-red" : "border-gray-600"
              } focus:border-primary-red focus:ring-primary-red`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-primary-red">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              disabled
              className="w-full bg-[#2a2a2a] text-base border border-gray-600 text-gray-400 rounded px-4 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone")}
              className={`w-full bg-[#222] text-base border rounded px-4 py-2 outline-none transition focus:ring-1 ${
                errors.phone ? "border-primary-red" : "border-gray-600"
              } focus:border-primary-red focus:ring-primary-red`}
              placeholder="Phone (optional)"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-primary-red">
                {errors.phone.message}
              </p>
            )}
          </div>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            {...register("avatar")}
            className="hidden"
          />

          <button
            type="submit"
            className="py-2 mt-4 text-base font-semibold text-black transition duration-500 bg-white rounded cursor-pointer hover:bg-gray-200"
          >
            Save Changes
          </button>
        </form>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <label
            htmlFor="avatar"
            className="relative w-40 h-40 overflow-hidden transition border-2 border-gray-700 rounded-full cursor-pointer group hover:border-primary-red"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Avatar Preview"
                className="object-cover object-top w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-500 bg-gray-800">
                Click to upload
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold transition bg-black opacity-0 bg-opacity-40 group-hover:opacity-100 text-primary-red">
              Change
            </div>
          </label>
          <p className="max-w-xs text-sm text-gray-400">
            Tap the image to upload a new profile picture.
          </p>
          {errors.avatar && (
            <p className="mt-1 text-sm text-primary-red">
              {errors.avatar.message as string}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Page;
