import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import PostCard from "../components/PostCard";

export default function Dashboard() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");

  // 🔒 protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // 📥 fetch posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✨ DUMMY POSTS (ALWAYS visible)
  const dummyPosts = [
    {
      id: "d1",
      username: "Arjun Khanna",
      role: "🎸 Guitarist",
      content: "Looking for a vocalist for my indie track 🎶",
      time: "2h ago",
    },
    {
      id: "d2",
      username: "Sneha Rao",
      role: "🎹 Producer",
      content: "Just finished a Bollywood EDM remix 🔥",
      time: "5h ago",
    },
    {
      id: "d3",
      username: "Maya Venugopal",
      role: "🎤 Vocalist",
      content: "Looking for a guitarist to finish my track 🌙",
      time: "1d ago",
    },
    {
      id: "d4",
      username: "Rohan Kulkarni",
      role: "🥁 Drummer",
      content: "Dropped new drum loops pack 🥁 Free for collabs!",
      time: "2d ago",
    },
  ];

  // 🚀 ALWAYS combine real + dummy
  const postsToShow = [...posts, ...dummyPosts];

  // ➕ CREATE POST
  const handlePost = async () => {
    if (!caption.trim()) {
      alert("Write something first");
      return;
    }

    try {
      await API.post("/posts", {
        caption,
        user: localStorage.getItem("username"),
        role: "Artist",
      });

      setCaption("");
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  // 🗑 DELETE POST
  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="feed">

          {/* 📝 CREATE POST BOX */}
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              background: "#111",
              borderRadius: "10px",
            }}
          >
            <textarea
              placeholder="What's on your mind? 🎵"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                resize: "none",
              }}
            />

            <button
              onClick={handlePost}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "purple",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Post 🚀
            </button>
          </div>

          {/* 📢 POSTS */}
          {postsToShow.map((p) => (
            <PostCard
              key={p.id}
              user={p.user || p.username}
              role={p.role}
              time={p.time}
              caption={p.caption || p.content}
              onDelete={() => handleDelete(p.id)}
              isOwner={
                p.user && p.user === localStorage.getItem("username")
              }
            />
          ))}

        </div>

        <RightPanel />
      </div>
    </>
  );
}