import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./_styles/globals.css";
import { SessionProvider } from "./_context/SessionContext";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const cairoFont = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Movie Watcher | Platform for all Watchers!",
  description:
    "Welcome to Movie Watcher, your ultimate destination for all things cinema! Dive into a vast collection of movies from various genres, including action, drama, comedy, and more. Stay updated with the latest releases, explore timeless classics, and discover hidden gems. Our platform offers detailed movie descriptions, cast information, user reviews, and personalized recommendations to enhance your viewing experience. Join our community of movie enthusiasts and never miss out on the best films. Whether you're a casual viewer or a hardcore cinephile, Movie Watcher has something for everyone. Start your cinematic journey with us today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairoFont.className} min-h-screen relative bg-background text-primary-white antialiased`}
      >
        <SessionProvider>
          <Header />

          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            className={"text-xs text-nowrap font-bold px-4"}
          />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
