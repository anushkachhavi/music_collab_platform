import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/dashboard", icon: "🏠" },
    { name: "Explore", path: "/explore", icon: "🔍" },
    { name: "My Uploads", path: "/uploads", icon: "🎵" },
    { name: "Messages", path: "/messages", icon: "💬" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo" onClick={() => navigate("/dashboard")}>
        <span className="logo-icon">🎵</span>
        <span className="logo-text">MusicCollab</span>
      </div>

      {/* MENU TITLE */}
      <div className="menu-title">MENU</div>

      {/* MENU ITEMS */}
      <div className="menu-list">
        {menu.map((item) => (
          <div
            key={item.name}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}