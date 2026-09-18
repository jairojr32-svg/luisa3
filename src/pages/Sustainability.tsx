export default function Sustainability() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-36">
        
        {/* HERO SECTION */}
        <div className="space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none">
                <span>( 05 // 06 )</span>
                <span className="w-8 h-[1px] bg-black/15"></span>
                <span>PRESERVATION & LEGACY</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c5a880] font-sans">
                20°11'52"S 67°28'30"W • ALTITUDE 3,656M
              </span>
            </div>
            
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-light leading-tight tracking-tight">
              Protecting What Makes <br />
              <span className="font-serif italic font-normal text-black/50">Salar de Uyuni</span> <br />
              Extraordinary
            </h1>
            
            <p className="text-black/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-light">
              We believe extraordinary places deserve to be celebrated and protected. Our mission is to create once-in-a-lifetime journeys in perfect harmony with the landscape, local communities, and heritage that define this unique place on Earth.
            </p>
          </div>
        </div>

        {/* OUR PHILOSOPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-black/5 pt-28">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none">
              <span>( ETHOS )</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase font-light leading-tight tracking-tight">
              Luxury with <br />
              <span className="font-serif italic font-normal text-black/50">Purpose</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="text-[13px] md:text-sm text-black/65 space-y-6 leading-relaxed font-light">
              <p>
                Salar de Uyuni is one of the most extraordinary and breathtaking environments on Earth — a natural masterpiece of endless salt flats, pristine mirror reflections, and deep silence unlike anywhere else in the world. 
              </p>
              <p>
                Operating in this delicate and highly unique landscape fills us with a profound sense of stewardship. From our very first concept, the vision was absolute: to build a world-class luxury aviation experience that exists in perfect alignment with the natural ecology of Uyuni.
              </p>
              <p>
                Hot air ballooning is inherently a low-impact and clean form of flight. It allows guests to drift silently above the surreal white plains, capturing magnificent angles from the sky while leaving the ground completely untouched, ensuring its preservation for future generations.
              </p>
            </div>
            
            <div className="border-t border-black/5 pt-8">
              <p className="font-serif text-lg md:text-xl italic text-[#c5a880] leading-relaxed">
                "Because true luxury honors and elevates the places that inspire it."
              </p>
            </div>
          </div>
        </div>

        {/* COMMITMENT TO SUSTAINABILITY */}
        <div className="border-t border-black/5 pt-28 space-y-20">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none">
              <span>( ENVIRONMENT )</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase font-light leading-tight tracking-tight">
              Protecting Nature <br />
              <span className="font-serif italic font-normal text-black/50">by Celebrating It</span>
            </h2>
            <p className="text-black/65 text-xs md:text-sm leading-relaxed font-light">
              We believe the world's most spectacular ecosystems are best preserved when they are valued, respected, and shared in their purest form. Our operational practices are meticulously planned to minimize impact, keeping the Altiplano pristine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Preserving Natural Beauty",
                desc: "We are committed to helping preserve the extraordinary landscapes of Salar de Uyuni in their most authentic and untouched form."
              },
              {
                num: "02",
                title: "Respect for the Environment",
                desc: "Every experience is thoughtfully designed to exist in harmony with the surrounding landscape, leaving zero traces."
              },
              {
                num: "03",
                title: "Tourism as Preservation",
                desc: "We believe responsible tourism helps create long-term value around protecting extraordinary natural places and funding preservation."
              },
              {
                num: "04",
                title: "Celebrating What Makes Salar Unique",
                desc: "Our mission is to share the beauty of Salar de Uyuni with the world while helping preserve the authenticity that makes it unlike anywhere else."
              },
              {
                num: "05",
                title: "A Long-Term Commitment",
                desc: "Protecting and valuing this extraordinary place will always remain at the heart of everything we do, in every single flight decision."
              },
              {
                num: "06",
                title: "Protecting What We Love",
                desc: "The long-term preservation of Salar de Uyuni and the wider Altiplano ecosystem will always remain one of our highest priorities."
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group border border-black/5 rounded-[2.2rem] p-10 bg-white/30 backdrop-blur-md hover:bg-white/60 hover:border-black/15 hover:shadow-[0_15px_35px_rgba(0,0,0,0.015)] transition-all duration-500 cursor-pointer flex flex-col justify-between h-[230px]"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-xs italic text-[#c5a880]">{item.num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover:bg-[#c5a880] group-hover:scale-125 transition-all duration-500" />
                  </div>
                  <h3 className="font-sans font-semibold text-[14px] md:text-[15px] tracking-wide text-[#111] uppercase group-hover:text-[#c5a880] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-black/65 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMUNITY & SOCIAL IMPACT */}
        <div className="border-t border-black/5 pt-28 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none">
                <span>( COMMUNITY )</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase font-light leading-tight tracking-tight">
                Growing Together <br />
                <span className="font-serif italic font-normal text-black/50">with the Community</span>
              </h2>
              <div className="text-black/65 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                <p>
                  At Salar Balloons, we believe luxury tourism can and must be a transformative force. Our vision goes far beyond creating spectacular flights; we aim to foster long-term prosperity, pride, and value for the local communities who call the Uyuni region home.
                </p>
                <p>
                  Through training, direct employment, and local sourcing of goods, we strive to build a sustainable socioeconomic cycle that respects and celebrates regional identity.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10 lg:pl-6">
            <h3 className="font-serif text-xl uppercase font-light text-black tracking-wide border-b border-black/5 pb-4">
              How We <span className="font-serif italic font-normal text-black/50">Support</span> the Community
            </h3>
            
            <div className="space-y-8">
              {[
                {
                  idx: "01",
                  title: "Supporting Local Artisans",
                  desc: "We proudly value local craftsmanship by sourcing gifts, souvenirs, and selected food products from regional artisans whenever possible, creating direct micro-economic support."
                },
                {
                  idx: "02",
                  title: "Local Employment & Training",
                  desc: "We are committed to hiring, training, and empowering local talent — creating opportunities for long-term professional growth, hospitality excellence, and aviation expertise."
                },
                {
                  idx: "03",
                  title: "Community Inclusion (Weekly Flights)",
                  desc: "We believe local communities should experience the wonder of their own home. Through weekly community flights, we provide residents the opportunity to see their majestic salt flats from the sky."
                },
                {
                  idx: "04",
                  title: "Strengthening Local Tourism",
                  desc: "By bringing high-end international visibility to Salar de Uyuni and Bolivia, we help elevate the regional hospitality standards and create lasting economic opportunities."
                },
                {
                  idx: "05",
                  title: "Investing in Local Development",
                  desc: "We continuously seek and fund meaningful civic initiatives, ensuring our presence supports local infrastructure and social development."
                }
              ].map((item, index) => (
                <div key={index} className="group flex items-start space-x-6 pb-6 border-b border-black/5 last:border-b-0 cursor-pointer">
                  <span className="font-serif text-xs italic text-[#c5a880] pt-1 transition-all duration-300 group-hover:scale-110">
                    [ {item.idx} ]
                  </span>
                  <div className="space-y-2">
                    <h4 className="font-sans font-semibold text-xs md:text-sm uppercase text-black tracking-wider group-hover:text-[#c5a880] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-black/65 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOURISM AS TRANSFORMATION */}
        <div className="border-t border-black/5 pt-28 text-center max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none mb-1">
              <span>( VISION )</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase font-light leading-tight tracking-tight">
              Tourism as a Force <br />
              <span className="font-serif italic font-normal text-black/50">for Transformation</span>
            </h2>
            <p className="text-black/60 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-light">
              We believe that luxury travel, when designed responsibly, has the power to elevate communities, protect ecosystems, and inspire travelers to hold a deeper reverence for our planet. By bringing international adventurers to Uyuni, we aim to champion Bolivia's sustainable tourism future.
            </p>
          </div>

          <p className="text-black/80 font-serif text-sm md:text-base italic max-w-2xl mx-auto leading-relaxed border-t border-black/5 pt-12">
            "To protect this extraordinary place, celebrate its people, and create a future where conscious travel becomes a source of pride, prosperity, and positive transformation."
          </p>
        </div>

        {/* FINAL MESSAGE */}
        <div className="border-t border-black/5 pt-28 text-center max-w-2xl mx-auto space-y-6 pb-12">
          <h3 className="font-serif text-2xl uppercase font-light text-black tracking-wide">
            Extraordinary Experiences. <span className="font-serif italic font-normal text-black/50">Meaningful Legacy.</span>
          </h3>
          <p className="text-black/60 text-xs md:text-sm leading-relaxed font-light">
            At Salar Balloons, preservation, respect, and community are not secondary checklists — they are the core foundation of our entire mission, guiding every flight we take.
          </p>
        </div>

      </div>
    </div>
  );
}
