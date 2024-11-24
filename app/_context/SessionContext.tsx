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
}

const sessionContext = createContext<SessionContextType | undefined>(undefined);

function SessionProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userDetails: Models.User<Models.Preferences> =
          await account.get();
        setLoggedInUser(userDetails);
      } catch {
        setLoggedInUser(null); // Ensure it's `null` if not authenticated
      }
    }
    fetchUser();
  }, []);

  return (
    <sessionContext.Provider value={{ loggedInUser, setLoggedInUser }}>
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
