import { useEffect, useState } from "react";

import PostCard from "./components/PostCard";

export default function PostFeed() {
  const [posts, setPosts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [, setSearchTerm] = useState("");

  useEffect(() => {
    async function load() {}
    load();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Searching for:", query);
    setSearchTerm(query.trim());
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://react-vid-app.vercel.app/api/videos?q=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      <link href="/components/DetailPage" />;
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      console.log(data);
      setPosts(data.videos);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load videos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="post-feed container">
      <h1 className="feed-title">Home</h1>

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
          style={{ padding: "8px", width: 500, maxWidth: 500 }}
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
          </div>
        ))}
      </div>
    </main>
  );
}
