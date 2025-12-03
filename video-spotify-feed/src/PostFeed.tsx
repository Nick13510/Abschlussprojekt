import { useEffect, useState } from "react";

import PostCard from "./components/PostCard";
import { NavLink } from "react-router";

export default function PostFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://react-vid-app.vercel.app/api/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        <link href="/components/DetailPage" />;
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load videos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="post-feed container">
      <h1 className="feed-title">Home</h1>
      <NavLink to="/Register" end></NavLink>

      {loading && <p>Loading videos…</p>}
      {error && (
        <p style={{ color: "#ff002bff" }}>Failed to load videos: {error}</p>
      )}

      <div className="videos-grid">
        {posts.map((v) => (
          <div key={v.id}>
            <PostCard post={v} />
            <a href={`/detail/${v.id}`}>
              <button>Details</button>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
