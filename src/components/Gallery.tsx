import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  uploaded_by_name: string;
  uploaded_at: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/gallery/photos/');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          setError('Failed to load photos');
        }
      } catch (err) {
        setError('Error loading photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Event <span className="text-accent">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing moments from our workshops, hackathons, and community events.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading photos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 aspect-square min-h-[300px]"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-bold text-xl mb-1">{photo.title}</h3>
                    <p className="text-sm opacity-90">{photo.description}</p>
                    <p className="text-xs opacity-75 mt-2">
                      By {photo.uploaded_by_name} • {new Date(photo.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/gallery')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            📷 View all photos from BITSA events and activities
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
