import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER FROM BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);

        // 🔐 if token invalid → logout
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔄 LOADING UI
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ color: "white", padding: "20px" }}>
          Loading profile...
        </div>
      </>
    );
  }

  // ❌ USER NOT FOUND
  if (!user) {
    return (
      <>
        <Navbar />
        <div style={{ color: "white", padding: "20px" }}>
          User not found
        </div>
      </>
    );
  }

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="dashboard-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* PROFILE CONTENT */}
        <div className="feed">

          <div className="profile-page">

            <div className="profile-header">
              Your Profile
            </div>

            {/* MAIN PROFILE CARD */}
            <div className="profile-card large">

              {/* AVATAR */}
              <div className="profile-card-avatar">
                {user.username
                  ? user.username.charAt(0).toUpperCase()
                  : "U"}
              </div>

              {/* NAME */}
              <div className="profile-card-name">
                {user.username}
              </div>

              {/* BIO (can be dynamic later) */}
              <div className="profile-card-bio">
                Indie producer • Mumbai <br />
                Looking for collabs
              </div>

              {/* STATS */}
              <div className="profile-stats">
                <div className="stat">
                  <div className="stat-num">12</div>
                  <div className="stat-label">Posts</div>
                </div>

                <div className="stat">
                  <div className="stat-num">4</div>
                  <div className="stat-label">Collabs</div>
                </div>

                <div className="stat">
                  <div className="stat-num">238</div>
                  <div className="stat-label">Fans</div>
                </div>
              </div>

              {/* EDIT PROFILE BUTTON */}
              <button
                className="edit-profile-btn"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}