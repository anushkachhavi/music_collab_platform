import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Fetch logged-in user (SAFE VERSION)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.warn("Using fallback user");

        // ✅ fallback (VERY IMPORTANT FOR DEMO)
        setUser({
          username: localStorage.getItem("username") || "User"
        });
      }
    };

    fetchUser();
  }, []);

  // 🔐 Logout (clean + reliable)
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // hard reload (safer than navigate)
  };

  return (
    <div className="navbar">

      {/* LEFT: LOGO */}
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <span className="logo-icon">🎵</span>
        <span className="logo-text">MusicCollab</span>
      </div>

      {/* CENTER: SEARCH */}
      <div className="nav-center">
        <input
          className="nav-search"
          placeholder="Search musicians, genres..."
        />
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* NAV LINKS */}
        <div className="nav-links">
          <span
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Feed
          </span>

          <span
            className={location.pathname === "/explore" ? "active" : ""}
            onClick={() => navigate("/explore")}
          >
            Explore
          </span>

          <span
            className={location.pathname === "/profile" ? "active" : ""}
            onClick={() => navigate("/profile")}
          >
            Profile
          </span>
        </div>

        {/* USER SECTION */}
        {user ? (
          <div className="nav-user">
            <div
              className="nav-avatar"
              title={user.username}
              onClick={() => navigate("/profile")}
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="nav-loading">...</div>
        )}

      </div>
    </div>
  );
}