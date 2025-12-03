import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://react-vid-app.vercel.app/api/posts/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fehler beim Laden:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => [...prev, commentText]);
    setCommentText("");
  };

  if (loading) {
    return <p className="text-center mt-10">Lädt...</p>;
  }

  if (!post) {
    return (
      <p className="text-center mt-10 text-red-500">Video nicht gefunden</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Post Details</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {post.medialinks.map((medialink: any, index: number) => (
          <div key={index} className="card bg-base-200 w-full shadow-sm">
            <div className="card-body">
              <h3 className="card-title">{medialink.source}</h3>
              <p>Veröffentlicht: {post.created_at}</p>

              <a
                href={medialink.url}
                className="text-blue-500 underline mb-2 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {medialink.url}
              </a>

              <iframe
                width="300"
                height="200"
                src={medialink.url}
                className="rounded"
                title={`media-${index}`}
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-base-200 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Kommentare</h3>

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Schreibe einen Kommentar..."
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>

        <button className="btn btn-primary mt-2" onClick={handleAddComment}>
          Absenden
        </button>

        <div className="mt-4 space-y-2">
          {comments.length === 0 && (
            <p className="text-gray-500">Noch keine Kommentare.</p>
          )}

          {comments.map((comment, i) => (
            <div key={i} className="p-2 bg-base-300 rounded">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
