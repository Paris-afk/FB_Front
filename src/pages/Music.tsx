import * as React from "react";
import "../css/wall/style.css";

// Key for storing liked songs in localStorage
const MUSIC_KEY = "facebook_clone_liked_music";

// A fixed set of music tracks (public domain/creative commons or simulated)
const MUSIC_TRACKS = [
  {
    id: "track1",
    title: "Nocturne op.9 No.2",
    artist: "Frédéric Chopin",
    album: "Chopin: Nocturnes",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Chopin%2C_by_Wodzinska.JPG/220px-Chopin%2C_by_Wodzinska.JPG",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "track2",
    title: "Gymnopédie No.1",
    artist: "Erik Satie",
    album: "Satie: Gymnopédies",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Erik_Satie_by_Suzanne_Valadon_1892_-_cropped.jpg/220px-Erik_Satie_by_Suzanne_Valadon_1892_-_cropped.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "track3",
    title: "Für Elise",
    artist: "Ludwig van Beethoven",
    album: "Beethoven: Piano Classics",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/220px-Beethoven.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "track4",
    title: "Clair de Lune",
    artist: "Claude Debussy",
    album: "Debussy: Suite bergamasque",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Claude_Debussy_ca_1908%2C_by_F%C3%A9lix_Nadar.jpg/220px-Claude_Debussy_ca_1908%2C_by_F%C3%A9lix_Nadar.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "track5",
    title: "The Entertainer",
    artist: "Scott Joplin",
    album: "Joplin: Piano Rags",
    cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Scott_Joplin_19072.jpg/220px-Scott_Joplin_19072.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

const Music: React.FC = () => {
  // Load liked tracks from localStorage or initialize
  const [likedTracks, setLikedTracks] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(MUSIC_KEY);
    if (saved) return JSON.parse(saved);
    return [];
  });
  // Show feedback message when liking a track
  const [likedTrackId, setLikedTrackId] = React.useState<string | null>(null);

  // Save liked tracks to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(MUSIC_KEY, JSON.stringify(likedTracks));
  }, [likedTracks]);

  // Handle like track
  const handleLikeTrack = (trackId: string) => {
    if (!likedTracks.includes(trackId)) {
      setLikedTracks((prev) => [...prev, trackId]);
      setLikedTrackId(trackId);
      setTimeout(() => setLikedTrackId(null), 2000);
    }
  };

  // Handle unlike track
  const handleUnlikeTrack = (trackId: string) => {
    setLikedTracks((prev) => prev.filter((id) => id !== trackId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#1877f2" }}>Musique</h2>
      <div className="row">
        {MUSIC_TRACKS.map((track) => (
          <div className="col-md-6 col-lg-4 mb-4" key={track.id}>
            <div className="card shadow-sm h-100 d-flex flex-column" style={{ borderRadius: 12 }}>
              <div className="d-flex align-items-center p-2" style={{ gap: 16 }}>
                <img
                  src={track.cover}
                  alt={track.artist}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                />
                <div className="text-start">
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{track.title}</div>
                  <div style={{ fontSize: 13, color: "#65676b" }}>Artiste : {track.artist}</div>
                  <div style={{ fontSize: 13, color: "#65676b" }}>Album : {track.album}</div>
                </div>
              </div>
              <div className="card-body pt-2 pb-2 d-flex flex-column justify-content-between" style={{ minHeight: 80 }}>
                <audio controls style={{ width: "100%" }}>
                  <source src={track.audio} type="audio/mpeg" />
                  Votre navigateur ne supporte pas l'audio HTML5.
                </audio>
                <div className="mt-2 d-flex flex-column gap-1">
                  {likedTracks.includes(track.id) ? (
                    <>
                      <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13, minHeight: 28 }}>
                        {likedTrackId === track.id ? "Vous aimez ce morceau" : "Déjà aimé"}
                      </div>
                      <button
                        className="btn btn-light btn-sm w-100"
                        style={{ border: "1px solid #ddd", color: "#65676b", fontWeight: 600 }}
                        onClick={() => handleUnlikeTrack(track.id)}
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
                        onClick={() => handleLikeTrack(track.id)}
                      >
                        Aimer le morceau
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

export default Music;
