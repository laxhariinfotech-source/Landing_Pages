import "./ImageGrid.css";
import { galleryImages } from "../../data/galleryImages";
import ImageCard from "./ImageCard";

export default function ImageGrid() {
  return (
    <section className="gallery-section">

      {/* HEADER */}
      <div className="gallery-header">
        <h2>Latest Charts</h2>
        
      </div>

      {/* GRID */}
      <div className="image-grid">
        {galleryImages.map((img) => (
          <ImageCard key={img.id} data={img} />
        ))}
      </div>

    </section>
  );
}
