import React from "react";
import videos from "./data/videos";
import VideoCard from "./components/VideoCard";

export default function PostFeed() {
  return (
    <main className="post-feed container">
      <h1 className="feed-title">Recommended</h1>
      <div className="grid videos-grid">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </main>
  );
}
