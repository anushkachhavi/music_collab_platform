import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN HANDLER
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        username,
        password,
      });

      // ✅ store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      // ✅ redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-wrap">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="waveform">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="wave-bar"></div>
          ))}
        </div>

        <div className="login-headline">
          Collaborate.<br />
          Create.<br />
          <span>Perform.</span>
        </div>

        <div className="login-sub">
          Find your people. Share your sound. Build your identity as an artist.
        </div>

        <div className="login-badges">
          <div className="badge-tag">🎸 Guitarists</div>
          <div className="badge-tag">🎹 Producers</div>
          <div className="badge-tag">🎤 Vocalists</div>
          <div className="badge-tag">🥁 Drummers</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          {/* LOGO */}
          <div className="login-logo">
            <div className="logo-icon">🎵</div>
            <div className="logo-text">MusicCollab</div>
          </div>

          <div className="login-title">Welcome back</div>
          <div className="login-welcome-sub">
            Sign in to your creative space
          </div>

          {/* USERNAME */}
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              className="input-field"
              placeholder="@yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          {/* 🔥 NEW USER SECTION (FIXED) */}
          <div className="login-footer">
            New here?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Create account →
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}