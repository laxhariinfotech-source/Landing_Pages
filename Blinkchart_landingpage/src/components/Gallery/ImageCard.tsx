import { useState, useEffect } from "react";
import "./ImageCard.css";
import type { GalleryImage } from "../../data/galleryImages";

type Props = {
  data: GalleryImage;
};

export default function ImageCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  // ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* CARD */}
      <div className="card clean" onClick={() => setOpen(true)}>
        <div className="image-wrap">
          <img src={data.src} alt={data.title} />
        </div>
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={data.src} alt={data.title} />
          </div>
        </div>
      )}
    </>
  );
}