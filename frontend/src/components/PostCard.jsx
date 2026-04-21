import { FaHeart, FaCommentDots, FaTrash } from "react-icons/fa";

export default function PostCard({
  id,          
  user,
  role,
  time,
  caption,
  onDelete,
  isOwner
}) {
  return (
    <div className="post-card">

      {/* HEADER */}
      <div className="post-header">
        <div className="post-avatar">
          {user ? user[0].toUpperCase() : "U"}
        </div>

        <div style={{ flex: 1 }}>
          <div className="post-user">{user}</div>
          <div className="post-meta">
            🎸 {role?.toUpperCase()} • {time}
          </div>
        </div>

        {/* DELETE BUTTON */}
        {isOwner && (
          <button
            onClick={() => onDelete(id)}
            style={{
              background: "transparent",
              color: "#ff4d4d",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
            title="Delete post"
          >
            <FaTrash />
          </button>
        )}
      </div>

      {/* CAPTION */}
      <p className="post-caption">{caption}</p>

      {/* WAVEFORM (UI ONLY) */}
      <div className="wave-box">
        <div className="play-btn">▶</div>

        <div className="waveform-bars">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="bar"></div>
          ))}
        </div>

        <span className="track-time">2:34</span>
      </div>

      {/* ACTIONS */}
      <div className="post-actions">
        <div className="action-btn">
          <FaHeart /> 124
        </div>

        <div className="action-btn">
          <FaCommentDots /> 18
        </div>

        <div className="collab-btn">
          🤝 Collab
        </div>
      </div>
    </div>
  );
}