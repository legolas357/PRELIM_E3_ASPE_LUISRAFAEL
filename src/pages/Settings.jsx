import React from "react";

function Settings({ user, setUser }) {
  const toggleDarkMode = () => {
    setUser((prevUser) => ({
      ...prevUser,
      settings: { ...prevUser.settings, darkMode: !prevUser.settings.darkMode },
    }));
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "80vh",
        backgroundColor: user.settings.darkMode ? "#121212" : "#f8f9fa",
        color: user.settings.darkMode ? "#f8f9fa" : "#121212",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2 style={{ color: user.settings.darkMode ? "#0dcaf0" : "#007bff" }}>
        Settings
      </h2>

      <button
        className="btn d-flex align-items-center px-3 py-2 mt-2"
        style={{
          backgroundColor: user.settings.darkMode ? "#0dcaf0" : "#007bff",
          color: "white",
          borderRadius: "10px",
          fontWeight: "bold",
          transition: "all 0.3s",
        }}
        onClick={toggleDarkMode}
      >
        {user.settings.darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Settings;
