import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { FaUser, FaHome, FaCog } from "react-icons/fa";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function NavBar({ darkMode }) {
  const location = useLocation();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } p-3`}
    >
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/"></Link>
        <div className="nav-links d-flex align-items-center">
          <Link
            className={`nav-item nav-link ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            <FaHome className="me-2" /> Home
          </Link>
          <Link
            className={`nav-item nav-link ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            to="/profile"
          >
            <FaUser className="me-2" /> Profile
          </Link>
          <Link
            className={`nav-item nav-link ${
              location.pathname === "/settings" ? "active" : ""
            }`}
            to="/settings"
          >
            <FaCog className="me-2" /> Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {
      name: "ENTER YOUR NAME",
      tempName: "ENTER YOUR NAME", // Prevents auto-save while typing
      profilePic: "",
      settings: { darkMode: false },
    };
    return savedSettings;
  });

  useEffect(() => {
    if (user.settings.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("userSettings", JSON.stringify(user));
  }, [user.settings.darkMode]); // Only update when dark mode changes

  return (
    <Router>
      <div className="app-container">
        <NavBar darkMode={user.settings.darkMode} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <div className="profile-container">
                  <div
                    className="profile-card"
                    style={{
                      background: user.settings.darkMode ? "#222" : "#fff",
                      color: user.settings.darkMode ? "#fff" : "#000",
                    }}
                  >
                    {/* Profile Picture */}
                    <label htmlFor="profile-pic" className="profile-circle">
                      <img
                        src={
                          user.profilePic || "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="profile-image"
                      />
                    </label>
                    <input
                      type="file"
                      id="profile-pic"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const updatedUser = {
                              ...user,
                              profilePic: event.target.result,
                            };
                            setUser(updatedUser);
                            localStorage.setItem(
                              "userSettings",
                              JSON.stringify(updatedUser)
                            ); // Save image to local storage
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />

                    {/* Name Editing */}
                    <h2>{user.name}</h2>
                    <input
                      type="text"
                      value={user.tempName}
                      onChange={(e) =>
                        setUser({ ...user, tempName: e.target.value })
                      }
                      className="name-input"
                    />
                    <button
                      className="save-btn"
                      onClick={() => {
                        const updatedUser = { ...user, name: user.tempName };
                        setUser(updatedUser);
                        localStorage.setItem(
                          "userSettings",
                          JSON.stringify(updatedUser)
                        ); // Save name only on click
                        alert("Profile updated!");
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              }
            />
            <Route
              path="/settings"
              element={<Settings user={user} setUser={setUser} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
