"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";

type ScreenContextType = {
  isSmallScreen: boolean;
  isMobile: boolean;
};

const ScreenContext = createContext<ScreenContextType>({
  isSmallScreen: false,
  isMobile: false,
});

// ✅ Custom hook for media queries with SSR-safe fallback
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    // Avoid hydration mismatch: default false until client mounts
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Immediate sync
    setMatches(media.matches);

    // Modern browsers
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener?.("change", handler);

    // Legacy fallback
    // @ts-ignore
    media.addListener?.(handler);

    return () => {
      media.removeEventListener?.("change", handler);
      // @ts-ignore
      media.removeListener?.(handler);
    };
  }, [query]);

  return matches;
}

export function ScreenProvider({ children }: { children: ReactNode }) {
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  //  Memoize to avoid re-renders when values don’t change
  const value = useMemo(
    () => ({ isSmallScreen, isMobile }),
    [isSmallScreen, isMobile]
  );

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}

export function useScreen() {
  return useContext(ScreenContext);
}
