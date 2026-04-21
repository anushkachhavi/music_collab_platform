import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", {
        username,
        password,
      });

      alert("Registered successfully!");

      // ✅ go back to login
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-right">
        <div className="login-card">

          <div className="login-logo">
            <div className="logo-icon">🎵</div>
            <div className="logo-text">MusicCollab</div>
          </div>

          <div className="login-title">Create Account</div>
          <div className="login-welcome-sub">
            Join the music community 🚀
          </div>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              className="input-field"
              placeholder="@yourname"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleRegister}>
            Register →
          </button>

          {/* 🔁 Back to login */}
          <div className="login-footer">
            Already have an account?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/")}
            >
              Sign in →
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}