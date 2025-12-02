import React, { useEffect, useState } from "react";
import fallbackVideos from "./data/videos";
import VideoCard from "./components/VideoCard";

type Video = {
  id: string;
  title: string;
  channel: string;
  views?: string;
  duration?: string;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://react-vid-app.vercel.app/api/videos?q=`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const items: any[] = Array.isArray(data)
          ? data
          : data.videos ?? data.items ?? data.results ?? [];
        const mapped = items.map(mapApiItem);
        if (mounted) setVideos(mapped.slice(0, 8));
      } catch (err: any) {
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
  }, []);

  return (
    <main className="post-feed container">
      <h1 className="feed-title">Home</h1>

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
