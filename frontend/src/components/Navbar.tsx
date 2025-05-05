import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Github } from "lucide-react"; // Shadcn icon import
import ThemeToggle from "./ThemeToggle"; // ✅ import the new ThemeToggle component

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path: string) =>
    `relative rounded-full px-4 py-2 font-medium transition-all duration-300 ease-in-out
    ${
      currentPath === path
        ? "bg-black text-white"
        : "text-muted-foreground hover:text-black hover:bg-muted dark:hover:text-white dark:hover:bg-muted"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full bg-white dark:bg-background z-50 h-20 flex justify-between items-center px-4 md:px-10 transition-colors duration-300">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="DzHate-logo.png" className="h-14 md:h-20 w-auto" alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/">
          <Button
            variant="ghost"
            className={`${linkClass(
              "/"
            )} text-xs md:text-base px-3 py-1.5 md:px-4 md:py-2`}
          >
            Detect
          </Button>
        </Link>

        <Link to="/insights">
          <Button
            variant="ghost"
            className={`${linkClass(
              "/insights"
            )} text-xs md:text-base px-3 py-1.5 md:px-4 md:py-2`}
          >
            Insights
          </Button>
        </Link>

        <Link to="/hate_api">
          <Button
            variant="ghost"
            className={`${linkClass(
              "/hate_api"
            )} text-xs md:text-base px-3 py-1.5 md:px-4 md:py-2`}
          >
            API
          </Button>
        </Link>

        {/* GitHub Button */}
        <Link to="https://github.com/YoBa0/hate-speech-detection" target="_blank">
          <Button
            variant="ghost"
            className={`text-xs md:text-base px-3 py-1.5 md:px-4 md:py-2 text-muted-foreground hover:text-black hover:bg-muted dark:hover:text-white dark:hover:bg-muted`}
          >
            <Github className="mr-2" size={18} />
            <p className=" hidden md:inline">GitHub</p>
          </Button>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
