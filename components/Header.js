"use client";

import { useState, useEffect, useRef } from "react";
import { Roboto } from "next/font/google";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify-icons/mdi/github";
import menuIcon from "@iconify-icons/mdi/menu";
import closeIcon from "@iconify-icons/mdi/close";
import moonIcon from "@iconify-icons/mdi/moon-waning-crescent";
import sunIcon from "@iconify-icons/mdi/weather-sunny";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

// Configure the font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

// Define navigation links
const navLinks = [
  { url: "/", text: "Home" },
  { url: "/about", text: "About" },
  { url: "/contact", text: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Load initial theme from cookie or default to light mode
  useEffect(() => {
    const theme = Cookies.get("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close menu on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => setMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle dark mode and save preference in cookies
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    Cookies.set("theme", newTheme, { expires: 365 }); // Save theme in cookie for 1 year
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full px-6 py-1 md:py-0.5 z-50 w-[90%] md:w-[95%] md:max-w-[1400px] ${roboto.variable}`}
    >
      <div className="flex justify-between items-center">
        {/* Header Title */}
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap">
          My Portfolio
        </h1>

        {/* Navigation Links */}
        <nav
          ref={menuRef}
          className={`absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 shadow-md rounded-lg md:static md:flex md:items-center md:justify-center md:gap-6 md:bg-transparent md:shadow-none md:rounded-none ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-6 space-y-2 md:space-y-0 text-base md:text-lg text-gray-800 dark:text-gray-200 px-4 md:px-0">
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className="block py-2 text-center hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons Section */}
        <div className="flex items-center space-x-4 text-gray-800 dark:text-gray-200">
          {/* Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            <Icon icon={isDarkMode ? sunIcon : moonIcon} className="text-xl md:text-2xl" />
          </button>

          {/* GitHub Icon */}
          <a
            href="https://github.com/your-github-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          >
            <Icon icon={githubIcon} className="text-xl md:text-2xl" />
          </a>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            ref={buttonRef}
            className="md:hidden text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon={menuOpen ? closeIcon : menuIcon} className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
