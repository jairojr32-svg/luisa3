export default function Experience() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">THE EXPERIENCE</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            More than a balloon flight. An unforgettable expedition.
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            An extraordinary balloon experience above the breathtaking landscapes of Salar de Uyuni — where every detail is designed to create the experience of a lifetime.
          </p>
        </div>

        {/* SECTION 2: THE JOURNEY (Timeline) */}
        <div className="border-t border-black/10 pt-24 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">CHOREOGRAPHED ADVENTURE</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#111] uppercase">
              An Extraordinary Journey from Beginning to End
            </h2>
            <p className="text-xs md:text-sm text-[#555] leading-relaxed max-w-xl">
              Every experience is thoughtfully designed from beginning to end — blending comfort, exclusivity, breathtaking scenery, and unforgettable moments in the heart of Salar de Uyuni.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Timeline Steps Column */}
            <div className="lg:col-span-7 space-y-12">
              {[
                {
                  num: "01",
                  title: "Luxury Hotel Pickup",
                  desc: "Your journey begins with private transportation directly from your hotel, allowing you to relax while the landscapes of the Bolivian Altiplano slowly awaken before sunrise."
                },
                {
                  num: "02",
                  title: "Sunrise Lounge in the Salt Flats",
                  desc: "Arriving at our private launch site, guests are welcomed into an elegant sunrise setting with lounge seating, comfortable poufs, and shaded umbrellas overlooking the balloon inflation experience. Relax, take extraordinary photographs, and witness the magic as the balloon slowly rises against one of the world’s most surreal landscapes."
                },
                {
                  num: "03",
                  title: "Sunrise Brunch Experience",
                  desc: "As the first light touches the salt flats, enjoy a carefully curated brunch experience featuring delicious food and beverages while surrounded by endless horizons."
                },
                {
                  num: "04",
                  title: "Safety Briefing & Boarding",
                  desc: "Before takeoff, guests receive a detailed safety briefing from our highly experienced multilingual pilot, ensuring maximum comfort and confidence before boarding."
                },
                {
                  num: "05",
                  title: "A Spectacular Flight Above Salar de Uyuni",
                  desc: "Lift gently into the sky for an extraordinary hot air balloon journey above the breathtaking landscapes of Salar de Uyuni. From endless white horizons to dramatic textures and surreal perspectives, each flight reveals the salt flats in a way few people will ever experience."
                },
                {
                  num: "06",
                  title: "Champagne Celebration & Souvenir",
                  desc: "Upon landing, celebrate the moment with a special champagne toast — with both alcoholic and non-alcoholic options available — honoring an unforgettable journey above Salar de Uyuni. As a lasting memory of the experience, guests also receive a special keepsake to remember this extraordinary adventure."
                },
                {
                  num: "07",
                  title: "Luxury Breakfast & Return",
                  desc: "Guests are comfortably transported back to their hotel, where a beautiful breakfast experience awaits to conclude the morning in style."
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-8 border-b border-black/5 pb-8">
                  <span className="font-serif text-lg font-bold text-black/30 pt-1">{step.num}</span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg md:text-xl text-black font-semibold uppercase">{step.title}</h3>
                    <p className="text-xs md:text-sm text-[#555] leading-relaxed max-w-xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Images Column */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="h-[350px] rounded-[2rem] overflow-hidden shadow-md border border-black/5">
                <img src="/Fotos melhores /ps2.jpg" alt="Balloon rising" className="w-full h-full object-cover" />
              </div>
              <div className="h-[250px] rounded-[2rem] overflow-hidden shadow-md border border-black/5">
                <img src="/1 - SALAR/AdobeStock_1893032822.jpeg" alt="Salar Brunch" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE ULTRA-PREMIUM DIFFERENCE */}
        <div className="border-t border-black/10 pt-24 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">THE STANDARDS</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#111] uppercase font-medium">
              Designed for Ultimate Comfort & Exclusivity
            </h2>
            <p className="text-xs md:text-sm text-[#555]">
              Every detail of our operation is built to deliver one of the most premium balloon experiences in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Private Family Compartments",
                desc: "Unlike traditional balloon flights, we never mix unrelated guests inside the same basket compartment. Couples, families, and private groups enjoy their own dedicated space for greater comfort, privacy, and an elevated luxury experience."
              },
              {
                title: "Spacious Premium Aircraft",
                desc: "Our oversized balloon basket offers exceptional comfort, generous space, and an intimate atmosphere designed for a truly premium journey."
              },
              {
                title: "Included Professional Media",
                desc: "Your memories deserve more than phone pictures. Professional photos and cinematic videos are included to beautifully capture every unforgettable moment of your experience."
              },
              {
                title: "Decades of Pilot Experience",
                desc: "Fly with a highly experienced multilingual pilot certified in both Brazil and Europe, with decades of professional ballooning experience."
              },
              {
                title: "Internationally Certified",
                desc: "Our balloon and operational standards meet rigorous international certification and safety requirements."
              },
              {
                title: "State-of-the-Art Tech",
                desc: "Our balloon is equipped with world-class technology and premium equipment, carefully sourced from different countries to deliver the highest standards in safety, performance, and comfort."
              },
              {
                title: "Supplemental Oxygen",
                desc: "For additional comfort and safety at high altitude, supplemental oxygen systems are available onboard whenever necessary."
              }
            ].map((diff, idx) => (
              <div key={idx} className="border border-black/5 rounded-[2rem] p-8 bg-white/40 space-y-4 hover:border-black/20 hover:shadow-lg transition-all">
                <h3 className="font-serif text-lg font-semibold uppercase text-black">{diff.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: CHOOSE YOUR EXPERIENCE */}
        <div className="border-t border-black/10 pt-24 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">CHOOSE YOUR EXPERIENCE</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#111] uppercase font-medium">
              Tailored Experiences for Extraordinary Journeys
            </h2>
            <p className="text-xs md:text-sm text-[#555]">
              Choose the experience that best matches the way you want to explore Salar de Uyuni.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LUXURY FLIGHT */}
            <div className="border border-black/10 rounded-[2rem] p-6 xs:p-8 md:p-12 flex flex-col justify-between bg-white/50 min-h-[500px] h-auto pb-8 hover:border-[#ffab40] hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black">SHARED / PRIVATE COUPE</span>
                <h3 className="font-serif text-3xl text-black font-semibold uppercase">Luxury Flight</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  Shared, yet exceptionally private. A refined balloon experience where privacy always comes first. Families, couples or groups fly in their own dedicated basket compartments — never mixed with unrelated guests. Perfect for couples, families, and travelers seeking comfort, exclusivity, and breathtaking views.
                </p>
              </div>
              <div>
                <a href="#luxury-flight" className="block text-center w-full py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors">
                  Discover Luxury Flight
                </a>
              </div>
            </div>

            {/* EXCLUSIVE FLIGHT */}
            <div className="border border-black/10 rounded-[2rem] p-6 xs:p-8 md:p-12 flex flex-col justify-between bg-white/50 min-h-[500px] h-auto pb-8 hover:border-[#ffab40] hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black">100% PRIVATE CHARTER</span>
                <h3 className="font-serif text-3xl text-black font-semibold uppercase">Exclusive Flight</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  The balloon, entirely yours. A completely private experience designed exclusively for you and your guests. Whether celebrating a special occasion, traveling with family, or simply seeking the ultimate luxury experience, your flight is fully personalized for unforgettable moments.
                </p>
              </div>
              <div>
                <a href="#exclusive-flight" className="block text-center w-full py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors">
                  Explore Exclusive Flight
                </a>
              </div>
            </div>

            {/* SPECIAL LOCATIONS */}
            <div className="border border-black/10 rounded-[2rem] p-6 xs:p-8 md:p-12 flex flex-col justify-between bg-white/50 min-h-[500px] h-auto pb-8 hover:border-[#ffab40] hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black">SEASONAL / RARE DESTINATIONS</span>
                <h3 className="font-serif text-3xl text-black font-semibold uppercase">Special Locations</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  Rare places. Exceptional moments. Available only on selected dates, these exclusive flights take place in extraordinary and carefully selected locations across the region. Created for travelers seeking rare adventures and once-in-a-lifetime perspectives.
                </p>
              </div>
              <div>
                <a href="#special-locations" className="block text-center w-full py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors">
                  View Special Flights
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CONVERSION SECTION */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">RESERVE YOUR JOURNEY</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Ready to Experience Salar de Uyuni Like Never Before?
          </h2>
          <p className="text-[#555] text-xs md:text-sm leading-relaxed">
            Discover one of the world’s most extraordinary balloon experiences and create memories designed to last a lifetime.
          </p>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all">
              Book Your Experience
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
