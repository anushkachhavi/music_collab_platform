import { FaHeart, FaCommentDots } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";

export default function PostCard({ user, role, time, caption }) {
  return (
    <div className="post-card">
      {/* HEADER */}
      <div className="post-header">
        <div className="post-avatar">{user[0]}</div>

        <div>
          <div className="post-user">{user}</div>
          <div className="post-meta">
            🎸 {role.toUpperCase()} • {time}
          </div>
        </div>
      </div>

      {/* CAPTION */}
      <p className="post-caption">{caption}</p>

      {/* WAVEFORM */}
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