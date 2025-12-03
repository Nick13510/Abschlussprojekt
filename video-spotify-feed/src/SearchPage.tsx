import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function SearchPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [mediaLinks, setMediaLinks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onCreatePost = async (data: any) => {
    const postPayload = {
      content: data.content,
      mediaLinks: mediaLinks,
    };

    const response = await fetch("https://react-vid-app.vercel.app/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postPayload),
    });

    const resultData = await response.json();
    console.log("Post created:", resultData);
    navigate("/feed");
  };

  const searchYoutube = async () => {
    if (!searchQuery) return;
    const response = await fetch(
      "https://react-vid-app.vercel.app/api/videos?q=" + searchQuery,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = await response.json();
    setYoutubeResults(data.videos);
  };

  const addMediaToPost = (video: any) => {
    const mediaLink = {
      source: "youtube",
      id: video.videoId,
    };
    setMediaLinks([...mediaLinks, mediaLink]);
  };

  const inputStyle = {
    width: "300px",
    marginBottom: "10px",
    border: "1px solid black",
    padding: "5px",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Youtube Suche und Post erstellen</h1>

      <form
        onSubmit={handleSubmit(onCreatePost)}
        style={{ marginBottom: "20px" }}
      >
        <div>
          <label>Text für den Post:</label>
          <br />
          <input {...register("content")} style={inputStyle} />
        </div>

        <div>
          <h3>Medialinks im Post:</h3>
          {mediaLinks.map((link, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid #ccc", marginBottom: "5px" }}
            >
              Quelle: {link.source}, ID: {link.id}
            </div>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Posten
        </button>
      </form>

      <hr />

      <h2>Youtube Suche</h2>
      <input
        type="text"
        placeholder="Suchbegriff"
        style={inputStyle}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={() => searchYoutube()}
        style={{ marginLeft: "5px" }}
      >
        Suche
      </button>

      <div>
        {youtubeResults.map((video) => (
          <div
            key={video.id}
            style={{
              border: "1px solid #ccc",
              padding: "5px",
              margin: "5px 0",
            }}
          >
            <img src={video.thumbnailUrl} alt={video.title} width="120" />
            <br />
            <strong>{video.title}</strong>
            <br />
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Video ansehen
            </a>
            <br />
            <button onClick={() => addMediaToPost(video)}>
              Zu Post hinzufügen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
