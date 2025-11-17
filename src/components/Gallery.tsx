import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      title: "Hackathon 2024",
      description: "Teams collaborating on innovative projects",
      gridClass: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Workshop Session",
      description: "Learning new technologies together",
      gridClass: "md:col-span-1",
    },
    {
      title: "Award Ceremony",
      description: "Celebrating our winners",
      gridClass: "md:col-span-1",
    },
    {
      title: "Tech Talk",
      description: "Industry experts sharing insights",
      gridClass: "md:col-span-1",
    },
    {
      title: "Team Building",
      description: "BITSA community gathering",
      gridClass: "md:col-span-2",
    },
    {
      title: "Coding Session",
      description: "Students working on projects",
      gridClass: "md:col-span-1",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.gridClass} relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 aspect-square md:aspect-auto min-h-[250px]`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h3 className="font-bold text-xl mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>📷 Photos from BITSA events and activities</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
