import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";

import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="bg-white dark:bg-background transition-colors duration-300">
      <Navbar />
      <main className="mt-20  bg-white dark:bg-background transition-colors duration-300">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
