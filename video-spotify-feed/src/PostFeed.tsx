import { useEffect, useState } from "react";

import VideoCard from "./components/VideoCard";

export default function PostFeed() {
  const [videos, setVideos] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function load() {
      console.log(searchTerm);
      if (searchTerm === "") {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://react-vid-app.vercel.app/api/videos?q=" + searchTerm,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        console.log(data.videos);
        setVideos(data.videos);
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
        <p style={{ color: "#b00020" }}>Failed to load videos: {error}</p>
      )}

      <div className="videos-grid">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </main>
  );
}
