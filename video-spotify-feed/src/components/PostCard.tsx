export default function PostCard(props) {
  const post = props.post;
  return (
    <article className="video-card">
      <div className="thumb-wrap">
        <img src={post.thumbnailUrl} alt={post.content} className="thumb" />
      </div>
      <div className="meta">
        <h3 className="title">{post.content}</h3>
      </div>
      AC
    </article>
  );
}
