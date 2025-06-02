import * as React from "react";
import "../css/wall/style.css";

// Key for storing liked photos in localStorage
const PHOTOS_KEY = "facebook_clone_liked_photos";

// Generate a fixed set of photos only once (using Lorem Picsum)
function getInitialPhotos() {
  const saved = localStorage.getItem("facebook_clone_initial_photos");
  if (saved) return JSON.parse(saved);
  const photos = Array.from({ length: 15 }).map((_, i) => ({
    id: `photo_${i}`,
    url: `https://picsum.photos/seed/photo${i}/400/300`,
    title: `Photo #${i + 1}`,
    author: `Auteur ${i + 1}`,
  }));
  localStorage.setItem("facebook_clone_initial_photos", JSON.stringify(photos));
  return photos;
}

const Photos: React.FC = () => {
  const allPhotos = getInitialPhotos();
  // Load liked photos from localStorage or initialize
  const [likedPhotos, setLikedPhotos] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(PHOTOS_KEY);
    if (saved) return JSON.parse(saved);
    return [];
  });
  // Show feedback message when liking a photo
  const [likedPhotoId, setLikedPhotoId] = React.useState<string | null>(null);

  // Save liked photos to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(likedPhotos));
  }, [likedPhotos]);

  // Handle like photo
  const handleLikePhoto = (photoId: string) => {
    if (!likedPhotos.includes(photoId)) {
      setLikedPhotos((prev) => [...prev, photoId]);
      setLikedPhotoId(photoId);
      setTimeout(() => setLikedPhotoId(null), 2000);
    }
  };

  // Handle unlike photo
  const handleUnlikePhoto = (photoId: string) => {
    setLikedPhotos((prev) => prev.filter((id) => id !== photoId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#1877f2" }}>Photos</h2>
      <div className="row">
        {allPhotos.map((photo) => (
          <div className="col-md-4 mb-4" key={photo.id}>
            <div className="card shadow-sm h-100 d-flex flex-column" style={{ borderRadius: 12 }}>
              <img
                src={photo.url}
                className="card-img-top"
                alt={photo.title}
                style={{ height: 180, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <div className="card-body text-center p-2 d-flex flex-column justify-content-between" style={{ minHeight: 120 }}>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: 16 }}>{photo.title}</h5>
                  <div style={{ fontSize: 13, color: "#65676b", marginBottom: 8 }}>
                    <span>Auteur : {photo.author}</span>
                  </div>
                </div>
                <div className="mt-auto d-flex flex-column gap-1">
                  {likedPhotos.includes(photo.id) ? (
                    <>
                      <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13, minHeight: 28 }}>
                        {likedPhotoId === photo.id ? "Vous aimez cette photo" : "Déjà aimée"}
                      </div>
                      <button
                        className="btn btn-light btn-sm w-100"
                        style={{ border: "1px solid #ddd", color: "#65676b", fontWeight: 600 }}
                        onClick={() => handleUnlikePhoto(photo.id)}
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
                        onClick={() => handleLikePhoto(photo.id)}
                      >
                        Aimer la photo
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

export default Photos;
