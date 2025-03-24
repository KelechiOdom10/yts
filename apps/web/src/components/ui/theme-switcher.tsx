import { IconMoon, IconSun } from "justd-icons";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
export function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSwitchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="outline"
      size="square-petite"
      aria-label="Switch theme"
      onPress={handleSwitchTheme}
    >
      <IconSun
        className={twMerge(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark"
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
      <IconMoon
        className={twMerge(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        )}
      />
    </Button>
  );
}
