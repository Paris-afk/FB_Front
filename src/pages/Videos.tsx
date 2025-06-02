import * as React from "react";
import "../css/wall/style.css";

// Key for storing liked videos in localStorage
const VIDEOS_KEY = "facebook_clone_liked_videos";

// A fixed set of YouTube video data (public domain or creative commons)
const YOUTUBE_VIDEOS = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    channel: "Rick Astley",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "3JZ_D3ELwOQ",
    title: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
    channel: "Mark Ronson",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
  },
  {
    id: "L_jWHffIx5E",
    title: "Coolio - Gangsta's Paradise (feat. L.V.) [Official Music Video]",
    channel: "Coolio",
    thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    channel: "Luis Fonsi",
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
  },
  {
    id: "fRh_vgS2dFE",
    title: "Justin Bieber - Sorry (PURPOSE : The Movement)",
    channel: "Justin Bieber",
    thumbnail: "https://img.youtube.com/vi/fRh_vgS2dFE/hqdefault.jpg",
  },
  {
    id: "hT_nvWreIhg",
    title: "OneRepublic - Counting Stars",
    channel: "OneRepublic",
    thumbnail: "https://img.youtube.com/vi/hT_nvWreIhg/hqdefault.jpg",
  },
];

const Videos: React.FC = () => {
  // Load liked videos from localStorage or initialize
  const [likedVideos, setLikedVideos] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(VIDEOS_KEY);
    if (saved) return JSON.parse(saved);
    return [];
  });
  // Show feedback message when liking a video
  const [likedVideoId, setLikedVideoId] = React.useState<string | null>(null);

  // Save liked videos to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(likedVideos));
  }, [likedVideos]);

  // Handle like video
  const handleLikeVideo = (videoId: string) => {
    if (!likedVideos.includes(videoId)) {
      setLikedVideos((prev) => [...prev, videoId]);
      setLikedVideoId(videoId);
      setTimeout(() => setLikedVideoId(null), 2000);
    }
  };

  // Handle unlike video
  const handleUnlikeVideo = (videoId: string) => {
    setLikedVideos((prev) => prev.filter((id) => id !== videoId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#1877f2" }}>Vidéos</h2>
      <div className="row">
        {YOUTUBE_VIDEOS.map((video) => (
          <div className="col-md-4 mb-4" key={video.id}>
            <div className="card shadow-sm h-100 d-flex flex-column" style={{ borderRadius: 12 }}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.thumbnail}
                  className="card-img-top"
                  alt={video.title}
                  style={{ height: 180, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
              </a>
              <div className="card-body text-center p-2 d-flex flex-column justify-content-between" style={{ minHeight: 180 }}>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: 16 }}>{video.title}</h5>
                  <div style={{ fontSize: 13, color: "#65676b", marginBottom: 8 }}>
                    <span>Chaîne : {video.channel}</span>
                  </div>
                </div>
                <div className="mt-auto d-flex flex-column gap-1">
                  {likedVideos.includes(video.id) ? (
                    <>
                      <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13, minHeight: 28 }}>
                        {likedVideoId === video.id ? "Vous aimez cette vidéo" : "Déjà aimée"}
                      </div>
                      <button
                        className="btn btn-light btn-sm w-100"
                        style={{ border: "1px solid #ddd", color: "#65676b", fontWeight: 600 }}
                        onClick={() => handleUnlikeVideo(video.id)}
                      >
                        Ne plus aimer
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ minHeight: 28 }}></div>
                      <button
                        className="btn btn-primary btn-sm w-100 mb-2"
                        style={{ background: "#e7f3ff", color: "#1877f2", border: "none", fontWeight: 600 }}
                        onClick={() => handleLikeVideo(video.id)}
                      >
                        Aimer la vidéo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
