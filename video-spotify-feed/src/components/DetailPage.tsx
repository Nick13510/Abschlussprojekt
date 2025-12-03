import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://react-vid-app.vercel.app/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fehler beim Laden des Videos");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Lade Video...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Video nicht gefunden</p>;

  return (
    <div className="video-detail">
      <h1>{post.title}</h1>
      <p>Kanal: {post.channelTitle}</p>
      <p>Veröffentlicht am: {post.publishedAt}</p>
      <p>{post.description}</p>
    </div>
  );
}

export default DetailPage;
