import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fehler beim Laden:", error);
        setLoading(false);
      });
  }, [id]);

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
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-sm btn-primary">Öffnen</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPage;
