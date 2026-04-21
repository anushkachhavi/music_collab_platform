import { useEffect, useState } from "react";
import API from "../api/axios";

export default function RightPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("User fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="right-panel">
        <div className="profile-card">Loading...</div>
      </div>
    );
  }

  // ❌ Fallback if user not found
  if (!user) {
    return (
      <div className="right-panel">
        <div className="profile-card">User not found</div>
      </div>
    );
  }

  return (
    <div className="right-panel">

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-card-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-card-name">{user.username}</div>

        <div className="profile-card-bio">
          Indie producer • Mumbai <br />
          Looking for collabs
        </div>

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

        <button className="edit-profile-btn">Edit Profile</button>
      </div>

      {/* SUGGESTED USERS */}
      <div className="suggested-section">
        <div className="section-header">Suggested</div>

        {[
          { initials: "PR", name: "Priya Rajan", role: "🎻 Violinist" },
          { initials: "KS", name: "Karan Shah", role: "🎹 Keys" },
          { initials: "AM", name: "Ananya M.", role: "🎤 Vocalist" },
          { initials: "DS", name: "Dev Saxena", role: "🎸 Bass" },
          { initials: "NP", name: "Nina Patel", role: "🥁 Percussion" },
        ].map((u, i) => (
          <div className="suggested-user" key={i}>
            <div
              className="s-avatar"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              {u.initials}
            </div>

            <div className="s-info">
              <div className="s-name">{u.name}</div>
              <div className="s-role">{u.role}</div>
            </div>

            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

    </div>
  );
}