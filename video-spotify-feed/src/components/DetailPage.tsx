import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://react-vid-app.vercel.app/api/posts/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fehler beim Laden:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Lädt...</p>;
  }

  if (!post) {
    return <p>Video nicht gefunden</p>;
  }

  return (
    <div>
      <h1>ID:{post.id}</h1>
      <p>user id: {post.user_id}</p>
      <p>Veröffentlicht: {post.created_at}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default DetailPage;
