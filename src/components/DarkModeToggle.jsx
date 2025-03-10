import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle({ user, setUser }) {
  const toggleDarkMode = () => {
    setUser({ ...user, settings: { darkMode: !user.settings.darkMode } });
  };

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-bold text-sm transition-colors ${
          user.settings.darkMode ? "text-yellow-400" : "text-blue-600"
        }`}
      >
        {user.settings.darkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <button
        onClick={toggleDarkMode}
        className={`relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            user.settings.darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {user.settings.darkMode ? (
            <FaMoon className="text-yellow-400 mx-auto mt-1" />
          ) : (
            <FaSun className="text-blue-600 mx-auto mt-1" />
          )}
        </div>
      </button>
    </div>
  );
}

export default DarkModeToggle;
