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

  // protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // fetch posts
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

  // CREATE POST
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

  // DELETE POST
  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);

      // remove from UI instantly
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

          {/* CREATE POST BOX */}
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

          {/* POSTS */}
          {posts.length === 0 ? (
            <div>No posts yet</div>
          ) : (
            posts.map((p) => (
              <PostCard
                key={p.id}
                user={p.user}
                role={p.role}
                time={p.time}
                caption={p.caption}
                onDelete={() => handleDelete(p.id)} // IMPORTANT
                isOwner={
                  p.user === localStorage.getItem("username")
                } // optional
              />
            ))
          )}
        </div>

        <RightPanel />
      </div>
    </>
  );
}