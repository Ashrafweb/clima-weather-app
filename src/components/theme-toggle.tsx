import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex justify-center items-center cursor-pointer transition-transform duration-500 ${
        isDark ? "rotate-180" : "rotate-0"
      }`}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? (
        <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />
      ) : (
        <Moon className='h-6 w-6 rotate-0 transition-all' />
      )}
    </div>
  );
}

export default ThemeToggle;
