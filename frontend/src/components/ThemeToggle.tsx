import { useTheme } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button"; // Import Shadcn's Button

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost" // Optional: Set the variant to 'ghost' for a clean, unfilled button style
      size="icon" // Makes the button size fit the icon
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" /> // Sun icon for light theme
      ) : (
        <Moon className="h-5 w-5" /> // Moon icon for dark theme
      )}
    </Button>
  );
};

export default ThemeToggle;
