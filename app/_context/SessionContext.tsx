"use client";
import { Models } from "appwrite";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { account } from "../_lib/appwrite";

interface SessionContextType {
  loggedInUser: Models.User<Models.Preferences> | null;
  setLoggedInUser: (user: Models.User<Models.Preferences> | null) => void;
  loading: boolean;
}

const sessionContext = createContext<SessionContextType | undefined>(undefined);

function SessionProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading

  useEffect(() => {
    async function fetchUser() {
      try {
        const userDetails = await account.get();
        setLoggedInUser(userDetails);
      } catch {
        setLoggedInUser(null);
      } finally {
        setLoading(false); // ✅ Done
      }
    }

    fetchUser();
  }, []);

  return (
    <sessionContext.Provider
      value={{ loggedInUser, setLoggedInUser, loading }} // ✅ Include loading
    >
      {children}
    </sessionContext.Provider>
  );
}

function useSession() {
  const context = useContext(sessionContext);
  if (!context) throw new Error("Context is outside provider!");
  return context;
}

export { SessionProvider, useSession };
