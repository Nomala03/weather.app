import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import type { Theme } from "../types";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    const root = document.documentElement;
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const wantDark = theme === "dark" || (theme === "system" && sysDark);
    root.classList.toggle("dark", wantDark);
  }, [theme]);

  return { theme, setTheme };
}
