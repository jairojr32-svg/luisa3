export default function SpecialLocations() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">FLIGHTS • SEASONAL SPECIALS</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            Rare Places. Extraordinary Flights.
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            A collection of exclusive balloon journeys taking place in carefully selected extraordinary locations and limited dates.
          </p>
          <div className="pt-4">
            <a 
  href="https://wa.me/5531982352679"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors"
>
  Explore Upcoming Flights
</a>
          </div>
        </div>

        {/* ABOUT THE EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-black/10 pt-24">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">FOR THOSE SEEKING THE UNIQUE</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              For Those Seeking the Extraordinary
            </h2>
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-[#555] space-y-6 leading-relaxed">
            <p>
              Our Special Locations Experiences are designed for travelers seeking rare moments few will ever experience.
            </p>
            <p>
              Available only on selected dates, these exclusive journeys take place in unique and breathtaking locations carefully chosen for exceptional scenery, atmosphere, and unforgettable perspectives.
            </p>
            <p>
              Each experience is different, rare, and intentionally limited. Each location and itinerary may vary according to season and destination.
            </p>
          </div>
        </div>

        {/* WHAT TO EXPECT */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">UNCOMPROMISING STANDARDS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              What to Expect
            </h2>
            <p className="text-xs text-[#555]">
              Every single Special Location expedition operates under the signature Salar Balloons luxury standard.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Luxury transportation & specialized transfers",
              "Exclusive high-end sunrise setup",
              "Premium gourmet brunch in the landscape",
              "Spacious, commercially certified aircraft",
              "Decades of experience under our chief multilingual pilot",
              "Bespoke champagne celebration & unique souvenir gifts",
              "Professional high-definition photos and videos fully included",
              "Personalized, white-glove luxury concierge service"
            ].map((inclusion, idx) => (
              <div key={idx} className="flex gap-4 items-center border-b border-black/5 pb-4">
                <span className="font-serif text-xs font-bold text-black">✴</span>
                <span className="text-xs md:text-sm text-black/80 font-medium">{inclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LIMITED AVAILABILITY BOX */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">RESTRICTED SEATS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase">Extraordinary Moments, Limited Availability</h2>
            <p className="text-xs md:text-sm text-[#555] leading-relaxed">
              Due to complex logistics, highly specific weather windows, and a strict emphasis on absolute exclusivity, these flights are offered only on selected dates each year.
            </p>
            <p className="text-xs md:text-sm text-[#555] leading-relaxed">
              We highly encourage interested guests and collectors of fine journeys to inquire and reserve well in advance.
            </p>
          </div>
          <div className="h-[350px] rounded-[2rem] overflow-hidden shadow-lg border border-black/5">
            <img src="/1 - SALAR/AdobeStock_1547751690.jpeg" alt="Special Flight Location" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">SARTORIAL EXPEDITION</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Discover Extraordinary Places Few Will Ever See
          </h2>
          <div className="pt-4">
            <a 
  href="https://wa.me/5531982352679"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-12 py-5 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all shadow-md"
>
  View Available Experiences
</a>
          </div>
        </div>

      </div>
    </div>
  );
}
