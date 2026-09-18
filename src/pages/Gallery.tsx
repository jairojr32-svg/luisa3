import { useState } from 'react';

export default function Gallery() {
  const categories = [
    { id: 'all', name: 'ALL IMAGES' },
    { id: 'flight', name: 'THE FLIGHT EXPERIENCE' },
    { id: 'lounge', name: 'SUNRISE LOUNGE' },
    { id: 'landscape', name: 'THE LANDSCAPE' },
    { id: 'breakfast', name: 'BREAKFAST' },
    { id: 'celebrations', name: 'CELEBRATIONS' },
    { id: 'cinematic', name: 'CINEMATIC MOMENTS' }
  ];

  const items = [
    {
      src: "/1 - SALAR/7E66BD85-1EED-4B07-8516-32FA296B5FF1_2.PNG",
      alt: "Balloon Flight over Uyuni",
      cat: "flight",
      title: "Silent Drift",
      desc: "Floating above the infinite salt flat"
    },
    {
      src: "/1 - SALAR/AdobeStock_680985457.jpeg",
      alt: "Cinematic Balloon Sky",
      cat: "flight",
      title: "Majestic Ascent",
      desc: "Rising against the pastel sunrise"
    },
    {
      src: "/Fotos melhores /331431160.jpg",
      alt: "Aerial balloon view",
      cat: "flight",
      title: "Aerial Perspectives",
      desc: "A view reserved for the heavens"
    },
    {
      src: "/Fotos melhores /ps2.jpg",
      alt: "Balloon inflation process",
      cat: "lounge",
      title: "The Inflation Ritual",
      desc: "Watching the giant envelope come alive"
    },
    {
      src: "/Fotos melhores /Imagem 23-07-2026 às 19.54.jpg",
      alt: "Elegant table setup",
      cat: "lounge",
      title: "Sunrise Lounge Setup",
      desc: "Comfort and warm drinks on the salt"
    },
    {
      src: "/1 - SALAR/AdobeStock_194205507.jpeg",
      alt: "Sunrise breakfast setup",
      cat: "lounge",
      title: "Morning Gathering",
      desc: "Choreographed welcome before boarding"
    },
    {
      src: "/1 - SALAR/AdobeStock_852407920.jpeg",
      alt: "Salt flats at night stars",
      cat: "landscape",
      title: "Surreal Mirroring",
      desc: "Infinite white textures of Salar de Uyuni"
    },
    {
      src: "/1 - SALAR/AdobeStock_165183283.jpeg",
      alt: "Stunning reflective flat",
      cat: "landscape",
      title: "Prismatic Horizons",
      desc: "Where earth meets the heavens"
    },
    {
      src: "/1 - SALAR/AdobeStock_910682930.jpeg",
      alt: "Andean mountains view",
      cat: "landscape",
      title: "Andean Backdrop",
      desc: "Volcanic fields framing the flight coordinates"
    },
    {
      src: "/Experiencia Salar Balloons/Snapinst.app_444485847_843359851167119_158335465410395033_n_1080.jpg",
      alt: "Gourmet plate service",
      cat: "breakfast",
      title: "Sartorial Plating",
      desc: "Fully-catered, warm gourmet breakfast"
    },
    {
      src: "/Fotos melhores /Imagem 23-07-2026 às 19.53.jpg",
      alt: "Champagne toast",
      cat: "celebrations",
      title: "The Aeronaut's Toast",
      desc: "Premium French champagne post-landing"
    },
    {
      src: "/Fotos melhores /Imagem 23-07-2026 às 19.52.jpg",
      alt: "Couples celebration",
      cat: "celebrations",
      title: "Intimate Milestones",
      desc: "Unforgettable proposals and anniversaries"
    },
    {
      src: "/Fotos melhores /571490205.jpg",
      alt: "Professional portrait Luiza",
      cat: "cinematic",
      title: "Luiza Ferrari Portrait",
      desc: "Professional crew media coverage"
    },
    {
      src: "/Fotos melhores /PALACIO.webp",
      alt: "Palacio de Sal reflection",
      cat: "cinematic",
      title: "Palacio de Sal Reflection",
      desc: "Stunning architecture, beautiful details"
    }
  ];

  const [activeCat, setActiveCat] = useState('all');

  const filteredItems = activeCat === 'all' 
    ? items 
    : items.filter(item => item.cat === activeCat);

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">THE PORTFOLIO</span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#111] uppercase font-medium">
            Some Experiences Must Be Seen to Be Believed
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            A visual journey through one of the world’s most extraordinary balloon experiences — above the breathtaking landscapes of Salar de Uyuni.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 border-y border-black/5 py-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
                activeCat === cat.id 
                  ? 'bg-black text-white' 
                  : 'border border-black/10 text-black/60 hover:text-black hover:border-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* MASONRY/GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01]"
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <span className="text-[9px] font-bold uppercase tracking-widest text-black mb-2">{item.cat}</span>
                <h3 className="font-serif text-2xl uppercase font-medium">{item.title}</h3>
                <p className="text-xs text-white/70 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="border-t border-black/10 pt-24 text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-2xl uppercase font-semibold text-black">Ready to Experience It for Yourself?</h3>
          <p className="text-xs md:text-sm text-[#555] leading-relaxed">
            Some experiences are simply too extraordinary to remain only in photographs.
          </p>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all">
              Start Planning Your Journey
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
