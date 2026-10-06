export default function Experience() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION with Background */}
        <div className="relative text-center flex items-center justify-center min-h-[70vh] py-24 md:py-32">
          <div className="absolute inset-0 z-0">
            <img 
              src="/IMG_3644.PNG" 
              alt="Experience Salar de Uyuni" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 px-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">THE EXPERIENCE</span>
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-white uppercase font-medium leading-tight">
              More than a balloon flight. An unforgettable expedition.
            </h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              An extraordinary balloon experience above the breathtaking landscapes of Salar de Uyuni — where every detail is designed to create the experience of a lifetime.
            </p>
          </div>
        </div>

        {/* SECTION 2: THE JOURNEY (Timeline) */}
        <div className="border-t border-black/10 pt-24 space-y-16 px-5 xs:px-6 sm:px-12 md:px-24">
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
                  desc: "Arriving at our private launch site, guests are welcomed into an elegant sunrise setting with lounge seating, comfortable poufs, and shaded umbrellas overlooking the balloon inflation experience."
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
                  desc: "Lift gently into the sky for an extraordinary hot air balloon journey above the breathtaking landscapes of Salar de Uyuni."
                },
                {
                  num: "06",
                  title: "Champagne Celebration & Souvenir",
                  desc: "Upon landing, celebrate the moment with a special champagne toast, honoring an unforgettable journey above Salar de Uyuni."
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
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32 h-fit">
              <div className="h-[350px] rounded-none overflow-hidden shadow-md border border-black/5">
                <img src="/Fotos melhores /ps2.jpg" alt="Balloon rising" className="w-full h-full object-cover" />
              </div>
              <div className="h-[250px] rounded-none overflow-hidden shadow-md border border-black/5">
                <img src="/1 - SALAR/AdobeStock_1893032822.jpeg" alt="Salar Brunch" className="w-full h-full object-cover" />
              </div>
              <div className="h-[250px] rounded-none overflow-hidden shadow-md border border-black/5">
                  <img src="/Experiencia Salar Balloons/166685875-2.jpg" alt="Balloon in the sky" className="w-full h-full object-cover" />
              </div>
              <div className="h-[350px] rounded-none overflow-hidden shadow-md border border-black/5">
                  <img src="/Experiencia Salar Balloons/DeWatermark.ai_1739838463005.png" alt="Detailed view" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: CHOOSE YOUR EXPERIENCE */}
        <div className="border-t border-black/10 pt-24 space-y-16 px-5 xs:px-6 sm:px-12 md:px-24">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">CHOOSE YOUR EXPERIENCE</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#111] uppercase font-medium">
              Tailored Experiences for Extraordinary Journeys
            </h2>
            <p className="text-xs md:text-sm text-[#555]">
              Choose the experience that best matches the way you want to explore Salar de Uyuni.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { 
                title: "Luxury Flight",
                bg: "/1 - SALAR/7E66BD85-1EED-4B07-8516-32FA296B5FF1_2.PNG",
                link: "#luxury-flight",
                cta: "Discover Luxury"
              },
              { 
                title: "Exclusive Flight",
                bg: "/1 - SALAR/61C18353-D6D0-405D-A480-732F1B14FAF8.PNG",
                link: "#exclusive-flight",
                cta: "Explore Exclusive"
              },
              { 
                title: "Special Locations",
                bg: "/1 - SALAR/2D6A17FC-C073-4365-8E61-27C6D6B3BC66_2.PNG",
                link: "#special-locations",
                cta: "View Locations"
              }
            ].map((card) => (
              <a 
                key={card.title}
                href={card.link}
                className="group relative block h-[80vh] max-h-[700px] rounded-none overflow-hidden border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]"
              >
                <img 
                  src={card.bg} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                  <h3 className="font-serif text-3xl md:text-4xl uppercase font-semibold">{card.title}</h3>
                  <div className="mt-4 inline-block text-xs font-bold tracking-widest uppercase border border-white px-6 py-2 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                    {card.cta}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FINAL CONVERSION SECTION */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8 px-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">RESERVE YOUR JOURNEY</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Ready to Experience Salar de Uyuni Like Never Before?
          </h2>
          <p className="text-[#555] text-xs md:text-sm leading-relaxed">
            Discover one of the world’s most extraordinary balloon experiences and create memories designed to last a lifetime.
          </p>
          <div className="pt-4">
            <a 
              href="https://wa.me/5531982352679"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all"
            >
              Book Your Experience
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
