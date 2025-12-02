<<<<<<< HEAD
import React from "react";

type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  publishedAt?: string;
};

export default function VideoCard({ video }: { video: Video }) {
  return (
    <li className="video-item">
      <div className="video-thumb-wrap">
        <img className="video-thumb" src={video.thumbnail} alt={video.title} />
        <span className="duration">{video.duration}</span>
      </div>
      <div className="video-meta">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">
          {video.channel} • {video.views}
        </p>
        <p className="video-published">{video.publishedAt}</p>
      </div>
    </li>
  );
}
=======
>>>>>>> 12bc6246428a09feebe62f4d28fbc7b43bafb9c9
