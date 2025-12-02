import React, { useEffect, useState } from "react";
import fallbackVideos from "./data/videos";
import VideoCard from "./components/VideoCard";

type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  publishedAt?: string;
};

function mapApiItem(item: any): Video {
  const id = item.id ?? item.videoId ?? item._id ?? String(Math.random());
  const title = item.title ?? item.name ?? "Untitled";
  const channel = item.channel ?? item.channelName ?? item.author ?? "Unknown";
  const views = item.views ?? item.viewCount ?? item.viewsText ?? "";
  const duration = item.duration ?? item.length ?? item.time ?? "";
  const thumbnail =
    item.thumbnail ??
    item.thumbnailUrl ??
    item.thumbnails?.[0] ??
    `https://picsum.photos/seed/${encodeURIComponent(id)}/480/270`;
  const publishedAt =
    item.publishedAt ?? item.published ?? item.publishedAtText ?? "";
  return { id, title, channel, views, duration, thumbnail, publishedAt };
}

export default function PostFeed() {
  const [videos, setVideos] = useState<Video[]>(() =>
    fallbackVideos.slice(0, 5)
  );
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const q = encodeURIComponent(searchTerm ?? "");
        const url = `https://react-vid-app.vercel.app/api/videos?q=<search>}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const items: any[] = Array.isArray(data)
          ? data
          : data.videos ?? data.items ?? data.results ?? [];
        const mapped = items.map(mapApiItem);
        if (mounted) setVideos(mapped.slice(0, 5));
      } catch (err: any) {
        // fallback to local data on error
        if (mounted) {
          setError(err?.message ?? "Failed to load videos");
          setVideos(fallbackVideos.slice(0, 5));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [searchTerm]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchTerm(query.trim());
  }

  return (
    <main className="post-feed container">
      <h1 className="feed-title">Recommended</h1>

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

      <ul className="video-list">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </ul>
    </main>
  );
}
