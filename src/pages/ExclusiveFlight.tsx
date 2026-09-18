export default function ExclusiveFlight() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">FLIGHTS • EXCLUSIVE CONFIGURATION</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            The Balloon. Entirely Yours.
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            A fully private balloon experience designed exclusively for you and your guests above the breathtaking landscapes of Salar de Uyuni.
          </p>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-colors">
              Reserve Exclusive Flight
            </a>
          </div>
        </div>

        {/* ABOUT THE EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-black/10 pt-24">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">TAILORED AROUND YOU</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              A Journey Designed Around You
            </h2>
          </div>
          <div className="lg:col-span-7 text-xs md:text-sm text-[#555] space-y-6 leading-relaxed">
            <p>
              The Exclusive Flight offers complete privacy and personalization for those seeking the most extraordinary way to experience Salar de Uyuni.
            </p>
            <p>
              From romantic escapes to family adventures and milestone celebrations, the entire balloon is reserved exclusively for you and your selected guests. Whether traveling as a couple, with family, or celebrating something unforgettable, every moment is designed around your experience.
            </p>
            <p>
              Enjoy the freedom of flying privately above one of the most surreal landscapes on Earth — at your own pace, with ultimate comfort and exclusivity.
            </p>
          </div>
        </div>

        {/* COMPREHENSIVE JOURNEY */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">THE EXPERIENCE DYNAMICS</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              Exclusive Inclusions
            </h2>
            <p className="text-xs text-[#555]">
              Enjoy all premium amenities of our signature experience, fully customized for you and your select group.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Entire balloon reserved exclusively for your group",
              "Fully private and personalized flight",
              "Personalized pace and tailored atmosphere",
              "Custom gourmet catering and butler-style details",
              "Ideal for proposals, anniversaries & milestone events",
              "Luxury private pickup and seamless return transfers",
              "Sunrise balloon inflation & exclusive lounge seating",
              "Spectacular hot air balloon flight above Salar de Uyuni",
              "Bespoke champagne celebration on the salt flats",
              "Exclusive premium souvenir gifts",
              "All professional high-resolution media included"
            ].map((inclusion, idx) => (
              <div key={idx} className="flex gap-4 items-center border-b border-black/5 pb-4">
                <span className="font-serif text-xs font-bold text-black">✦</span>
                <span className="text-xs md:text-sm text-black/80 font-semibold">{inclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PERFECT FOR SECTION */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 h-[400px] rounded-[2rem] overflow-hidden border border-black/5">
            <img src="/Fotos melhores /696563429.jpg" alt="Proposal in Salar" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-6 space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">IDEAL CANDIDATES</span>
            <h2 className="font-serif text-3xl md:text-4xl text-black uppercase">Perfect For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs md:text-sm font-semibold text-black/85 uppercase tracking-wider">
              {[
                "Couples seeking ultimate privacy",
                "Families & private groups",
                "Marriage proposals",
                "Honeymoon trips",
                "Luxury private celebrations",
                "VIP & corporate travelers"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffab40] rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">BESPOKE DESIGN</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Create a Once-in-a-Lifetime Private Experience
          </h2>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-12 py-5 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all shadow-md">
              Book Exclusive Flight
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
