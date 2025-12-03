import { useEffect, useState } from "react";

import PostCard from "./components/PostCard";
import { NavLink } from "react-router";

export default function PostFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) return;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://react-vid-app.vercel.app/api/videos?q=${encodeURIComponent(
          searchTerm
        )}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data)
          ? data
          : data.videos ?? data.items ?? data.results ?? [];
        setPosts(items);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load videos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchTerm]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchTerm(query.trim());
  }

  return (
    <main className="post-feed container">
      <h1 className="feed-title">Home</h1>
      <NavLink to="/Register" end></NavLink>
      <form
        onSubmit={onSubmit}
        className="search-form"
        style={{ marginBottom: 12 }}
      >
        <input
          aria-label="Search videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="search-input"
          style={{ padding: "8px", width: "calc(100% - 110px)", maxWidth: 420 }}
        />
        <button className="btn" style={{ marginLeft: 8 }} type="submit">
          Search
        </button>
      </form>

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
