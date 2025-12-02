import React from "react";

type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  publishedAt: string;
};

export default function VideoCard({ video }: { video: Video }) {
  return (
    <article className="video-card">
      <div className="thumb-wrap">
        <img src={video.thumbnail} alt={video.title} className="thumb" />
        <span className="duration">{video.duration}</span>
      </div>
      <div className="meta">
        <h3 className="title">{video.title}</h3>
        <p className="channel">
          {video.channel} • {video.views}
        </p>
        <p className="published">{video.publishedAt}</p>
      </div>
    </article>
  );
}
