export default function VideoCard(props) {
  const video = props.video;
  return (
    <article className="video-card">
      <div className="thumb-wrap">
        <img src={video.thumbnailUrl} alt={video.title} className="thumb" />
      </div>
      <div className="meta">
        <h3 className="title">{video.title}</h3>
        <p className="channel">{video.channelTitle}</p>
        {video.publishedAt && <p className="published">{video.publishedAt}</p>}
      </div>
    </article>
  );
}
