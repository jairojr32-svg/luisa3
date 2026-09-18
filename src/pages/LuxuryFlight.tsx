export default function LuxuryFlight() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">FLIGHTS • LUXURY CONFIGURATION</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            Shared, Yet Exceptionally Private
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            An ultra-premium shared balloon experience designed for travelers who seek comfort, exclusivity, and breathtaking views above Salar de Uyuni.
          </p>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors">
              Reserve Your Flight
            </a>
          </div>
        </div>

        {/* ABOUT THE EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-black/10 pt-24">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">REDEFINING SHARED FLIGHTS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              About the Experience
            </h2>
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-[#555] space-y-6 leading-relaxed">
            <p>
              Unlike traditional balloon experiences, our Luxury Flight redefines shared ballooning with elevated comfort, privacy, and exclusivity.
            </p>
            <p>
              While the experience is shared, privacy remains at the center of every detail. We never mix unrelated guests within the same basket compartment, allowing couples and families to enjoy their own dedicated space throughout the journey.
            </p>
            <p>
              Whether traveling as a couple, with children, or alongside loved ones, every guest enjoys a spacious and intimate experience designed for comfort above one of the world’s most extraordinary landscapes.
            </p>
          </div>
        </div>

        {/* YOUR JOURNEY */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">THE INCLUSIONS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              Your Journey
            </h2>
            <p className="text-xs text-[#555]">
              Every single detail of your expedition is curated to provide a seamless, premium flow from hotel pickup to return.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Luxury hotel pickup",
              "Sunrise balloon inflation experience",
              "Lounge area with umbrellas & premium seating",
              "Sunrise brunch in the salt flats",
              "Safety briefing with multilingual pilot",
              "Spectacular balloon flight above Salar de Uyuni",
              "Champagne celebration after landing (alcoholic & non-alcoholic options available)",
              "Exclusive souvenir gift",
              "Transportation back to your hotel",
              "Beautiful breakfast experience after the flight",
              "Professional photos & cinematic videos included"
            ].map((inclusion, idx) => (
              <div key={idx} className="flex gap-4 items-center border-b border-black/5 pb-4">
                <span className="font-serif text-xs font-bold text-black/30">✓</span>
                <span className="text-xs md:text-sm text-black/80 font-medium">{inclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* THE PREMIUM DIFFERENCE & PERFECT FOR */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Differences */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl uppercase font-semibold text-black">The Premium Difference</h3>
            <ul className="space-y-4 text-xs md:text-sm text-[#555] list-disc pl-5 leading-relaxed">
              <li>Dedicated private basket compartments for couples, families, or private groups</li>
              <li>No mixing with unrelated guests inside your compartment</li>
              <li>Spacious ultra-premium aircraft</li>
              <li>Highly experienced multilingual pilot (European & Brazilian certified)</li>
              <li>Internationally certified aircraft and state-of-the-art technology</li>
              <li>Supplemental oxygen system onboard if needed</li>
              <li>Professional media (photos and videos) fully included</li>
            </ul>
          </div>

          {/* Perfect For */}
          <div className="space-y-8 bg-black/5 rounded-[2rem] p-10">
            <h3 className="font-serif text-2xl uppercase font-semibold text-black">Perfect For</h3>
            <div className="grid grid-cols-2 gap-6 text-xs md:text-sm font-semibold text-black/80 uppercase tracking-wider">
              {[
                "Couples",
                "Families",
                "Private groups",
                "Luxury travelers",
                "Honeymooners",
                "Special Celebrations"
              ].map((perf, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#ffab40] rounded-full" />
                  <span>{perf}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">SECURE YOUR SEAT</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Experience Salar de Uyuni in Extraordinary Comfort
          </h2>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-12 py-5 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all shadow-md">
              Book Luxury Flight
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
