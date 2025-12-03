import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function PostCreatePage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [mediaLinks, setMediaLinks] = useState<any[]>([]);

  const onCreatePost = async (data: any) => {
    console.log("Post create data from form:", data);
    console.log("With medialinks:", mediaLinks);
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

  const searchYoutube = async (searchFieldValue: string) => {
    console.log(searchFieldValue);
    const response = await fetch(
      "https://react-vid-app.vercel.app/api/videos?q=" + searchFieldValue,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    setYoutubeResults(data.videos);
    console.log("Youtube search results:", data);
  };

  function addMediaToPost(video: any) {
    console.log(video);
    const mediaLink = {
      source: "youtube",
      id: video.videoId,
    };
    setMediaLinks([...mediaLinks, mediaLink]);
  }

  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit(onCreatePost)}
        className="flex gap-2 flex-col bg-amber-100 p-4 rounded-md"
      >
        <div>
          <label>Content</label>
          <input {...register("content")} className="input" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Medialinks added to Post:</h3>
          {mediaLinks.map((medialink, index) => (
            <div key={index} className="border-b border-gray-300 p-2">
              <p>
                Source: {medialink.source}, ID: {medialink.id}
              </p>
            </div>
          ))}
        </div>
        <div>
          <input type="submit" className="btn" value="Posten" />
        </div>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />

        {/* AB HIER IST DIE YOUTUBE SUCHE */}
        <div>
          <h3 className="font-bold text-lg">Suchen nach Youtube!</h3>
          <div>
            <input
              type="text"
              placeholder="Type here"
              id="youtube-search"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn"
              onClick={() =>
                searchYoutube(document.getElementById("youtube-search")?.value)
              }
            >
              Suche
            </button>
          </div>
          {youtubeResults?.map((video) => (
            <div key={video.id} className="border-b border-gray-300 p-2">
              <img src={video.thumbnailUrl} alt={video.title} />
              <p>{video.title}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                className="btn"
                rel="noreferrer"
              >
                Link zum Video
              </a>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => addMediaToPost(video)}
              >
                Add to Post
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default PostCreatePage;
