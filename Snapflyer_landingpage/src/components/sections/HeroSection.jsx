import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Pool of real flyer images from /templates/
const flyerImages = [
  '/templates/summer-party.jpeg',
  '/templates/grand-opening.jpeg',
  '/templates/music-festival.jpeg',
  '/templates/flash-sale.jpeg',
  '/templates/beauty-salon.png',
  '/templates/makeup-artist.png',
  '/templates/scholarship.png',
  '/templates/basketball.png',
  '/templates/car-rent.png',
  '/templates/car-wash.png',
  '/templates/festival-invite.png',
  '/templates/yoga-workshop.jpeg',
  '/templates/networking.jpeg',
  '/templates/holiday-special.jpeg',
  '/templates/winter-sale.jpeg',
];

// Fan layout: 3 cards, each showing a different image that cycles independently
const fanLayout = [
  { top: '10%',  left: '2%',   rotate: '-14deg', zIndex: 1, delay: 0    },
  { top: '3%',   left: '30%',  rotate: '0deg',   zIndex: 3, delay: 1500 },
  { top: '10%',  left: '58%',  rotate: '14deg',  zIndex: 2, delay: 800  },
];

// Shuffle to get 3 distinct starting images
function pickThree() {
  const shuffled = [...flyerImages].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

export default function HeroSection() {
  const [cardImages, setCardImages] = useState(pickThree);
  const [fadingCard, setFadingCard] = useState(null); // index of card currently fading

  useEffect(() => {
    // Cycle each card image in sequence every 2.5 s
    let usedIndex = 3; // we already used 0-2 from the initial pick

    const interval = setInterval(() => {
      const cardIndex = Math.floor(Math.random() * 3);
      const nextImage = flyerImages[usedIndex % flyerImages.length];
      usedIndex++;

      setFadingCard(cardIndex);
      setTimeout(() => {
        setCardImages((prev) => {
          const next = [...prev];
          next[cardIndex] = nextImage;
          return next;
        });
        setFadingCard(null);
      }, 400); // fade-out duration
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">
        {/* Left — Copy */}
        <div className="hero-copy" data-reveal="slide-right">
          <h1>Make Stunning Flyers in Minutes</h1>
          <p className="hero-subtitle">
            Design professional flyers for any event, business, or occasion. No design skills needed.
          </p>
          <div className="hero-buttons">
            <a href="https://snapflyer-ai-demo.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow btn-lg" id="hero-cta-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} />
              <span>Create with AI</span>
              <span className="hero-ai-cta-badge" style={{ position: 'relative', top: 'auto', right: 'auto', transform: 'none', marginLeft: '4px' }}>New</span>
            </a>
            <a href="#templates" className="btn btn-outline btn-lg" id="hero-cta-secondary">
              Browse Templates
            </a>
          </div>
        </div>

        {/* Right — Fan of 3 rotating flyer image cards */}
        <div className="hero-visual" data-reveal="slide-left">
          <div className="hero-cards-fan">
            {fanLayout.map((card, i) => (
              <div
                key={i}
                className={`hero-card hero-card-img animate-float${i === 1 ? '-delay' : i === 2 ? '-delay-2' : ''} ${fadingCard === i ? 'fading' : ''}`}
                style={{
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.rotate})`,
                  zIndex: card.zIndex,
                  backgroundImage: `url(${cardImages[i]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
                role="img"
                aria-label={`Flyer template preview ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
