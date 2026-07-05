import { createContext, useCallback, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { getThemePalette } from "@/constants/theme";
import { readThemeMode, writeThemeMode } from "@/storage/theme";
import type { ThemeMode, ThemePalette } from "@/types/theme";

interface ThemeContextValue {
  themeMode: ThemeMode;
  colors: ThemePalette;
  isDark: boolean;
  isReady: boolean;
  setThemeMode: (themeMode: ThemeMode) => Promise<void>;
  toggleThemeMode: () => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadThemeMode() {
      const storedThemeMode = await readThemeMode();

      if (isMounted) {
        if (storedThemeMode) {
          setThemeModeState(storedThemeMode);
        }

        setIsReady(true);
      }
    }

    void loadThemeMode();

    return () => {
      isMounted = false;
    };
  }, []);

  const setThemeMode = useCallback(async (nextThemeMode: ThemeMode) => {
    setThemeModeState(nextThemeMode);
    await writeThemeMode(nextThemeMode);
  }, []);

  const toggleThemeMode = useCallback(async () => {
    const nextThemeMode = themeMode === "light" ? "dark" : "light";
    await setThemeMode(nextThemeMode);
  }, [setThemeMode, themeMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      colors: getThemePalette(themeMode),
      isDark: themeMode === "dark",
      isReady,
      setThemeMode,
      toggleThemeMode,
    }),
    [isReady, setThemeMode, themeMode, toggleThemeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
