"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../_lib/appwrite";

interface SessionContextType {
  loggedInUser: any | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  loggedInUser: null,
  loading: true,
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error: any) {
        // 401 just means no active session, so we silently ignore it
        if (error?.code !== 401) {
          console.error("Error fetching Appwrite user:", error);
        }
        setLoggedInUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedInUser, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
