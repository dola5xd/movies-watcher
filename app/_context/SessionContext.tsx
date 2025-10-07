"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { account } from "../_lib/appwrite";
import { Models } from "appwrite";

interface SessionContextType {
  loggedInUser: Models.User<Models.Preferences> | null;
  loading: boolean;
  setLoggedInUser: Dispatch<
    SetStateAction<Models.User<Models.Preferences> | null>
  >;
}

const SessionContext = createContext<SessionContextType>({
  loggedInUser: null,
  loading: true,
  setLoggedInUser: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try to get current Appwrite session user
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error: any) {
        // If no session, just stay logged out (no crash)
        if (error?.code === 401 || error?.response?.code === 401) {
          console.info("No Appwrite session — user is a guest.");
          setLoggedInUser(null);
        } else {
          console.error("Appwrite account.get() error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedInUser, loading, setLoggedInUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
