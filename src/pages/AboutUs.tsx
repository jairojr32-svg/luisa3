export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">ABOUT US</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            Born from a Dream That Once Felt Impossible
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            A dream more than a decade in the making — to create the most extraordinary balloon experience on Earth in one of the world’s most iconic landscapes.
          </p>
        </div>

        {/* IMAGE SPLIT / OUR STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-lg border border-black/5">
            <img 
              src="/Fotos melhores /ps1.jpg" 
              alt="The Dream Above the Flats" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">OUR STORY</span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
              The Story Behind Salar Balloons
            </h2>
            <div className="text-xs md:text-sm text-[#555] space-y-6 leading-relaxed">
              <p>
                Salar Balloons was born from a dream that, for many years, seemed almost impossible.
              </p>
              <p>
                For more than a decade, one vision lived in our minds: to create the most extraordinary hot air balloon experience in the world, set above one of the planet’s most breathtaking and iconic landscapes — Salar de Uyuni.
              </p>
              <p className="font-serif text-lg md:text-xl italic text-black/80 my-8 py-4 border-y border-black/5">
                “Magic happens.”
              </p>
              <p>
                Because, time and time again, magic truly did happen — through the right people, impossible opportunities, and moments that reminded us this dream was meant to exist.
              </p>
              <p>
                Today, that dream becomes reality. Salar Balloons was created with one clear mission: to offer unforgettable experiences designed with extraordinary care, where every detail has been thoughtfully crafted to create one of the finest balloon journeys in the world.
              </p>
              <p>
                More than offering flights, we aspire to create lifelong memories in one of the most awe-inspiring places on Earth.
              </p>
            </div>
          </div>
        </div>

        {/* MISSION & LEGACY */}
        <div className="border-t border-black/10 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">OUR PURPOSE</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
              Creating Experiences. Leaving a Legacy.
            </h2>
          </div>
          <div className="lg:col-span-8 text-xs md:text-sm text-[#555] space-y-6 leading-relaxed">
            <p>
              Salar Balloons was built not only to create extraordinary moments for our guests, but also to leave a meaningful and lasting legacy in the region.
            </p>
            <p>
              We believe tourism can transform communities. Our commitment goes beyond offering exceptional experiences — we aim to create opportunities, generate employment, support local development, and contribute positively to the future of Salar de Uyuni and its surrounding communities.
            </p>
            <p>
              At the same time, we are deeply committed to helping elevate Bolivia as a world-class travel destination, showcasing its extraordinary beauty to an international audience and helping position the country among the world’s most remarkable places to explore.
            </p>
            <p>
              For this operation, we have brought together some of the very best expertise in hot air ballooning and high-altitude operations from around the world — ensuring exceptional standards, safety, and excellence in every detail.
            </p>
          </div>
        </div>

        {/* MEET THE TEAM */}
        <div className="border-t border-black/10 pt-24 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">FOUNDERS & PARTNERS</span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#111] uppercase">The People Behind the Dream</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LUIZA FERRARI */}
            <div className="border border-black/5 rounded-[2rem] p-6 xs:p-8 md:p-12 bg-white/40 hover:border-black/20 transition-all space-y-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0 border border-black/5 mx-auto md:mx-0">
                <img src="/Fotos melhores /LUIZA_FERRARI.PNG" alt="Luiza Ferrari" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl uppercase font-semibold text-black">Luiza Ferrari</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black">Co-Founder</span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  Luiza Ferrari is a Brazilian skydiver, extreme sports multi-athlete, explorer, and specialist in extraordinary projects in remote and exotic locations.
                </p>
                <p className="text-xs text-[#555] leading-relaxed">
                  With years of experience in ballooning, adventure expeditions, and high-complexity operations, Luísa envisioned Salar Balloons as the realization of a long-held dream: to create the most spectacular balloon experience in the world. Driven by passion, she helped bring to life a project once considered nearly impossible.
                </p>
              </div>
            </div>

            {/* MARCO ANTONIO */}
            <div className="border border-black/5 rounded-[2rem] p-6 xs:p-8 md:p-12 bg-white/40 hover:border-black/20 transition-all space-y-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0 border border-black/5 mx-auto md:mx-0">
                <img src="/Fotos melhores /MARCO_ANTONIO_RODRIGUES.PNG" alt="Marco Antônio" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl uppercase font-semibold text-black">Marco Antônio</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black">Co-Founder</span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  Brazilian entrepreneur and co-creator of Salar Balloons, Marco Antônio believed in the vision from the beginning and played an essential role in transforming an ambitious dream into reality.
                </p>
                <p className="text-xs text-[#555] leading-relaxed">
                  His dedication and partnership helped make one of the most extraordinary tourism projects in Bolivia possible.
                </p>
              </div>
            </div>

            {/* JUAN GABRIEL */}
            <div className="border border-black/5 rounded-[2rem] p-6 xs:p-8 md:p-12 bg-white/40 hover:border-black/20 transition-all space-y-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0 border border-black/5 mx-auto md:mx-0">
                <img src="/Fotos melhores /JUAN_GABRIEL_QUESADA.PNG" alt="Juan Gabriel" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl uppercase font-semibold text-black">Juan Gabriel</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black">Local Partner</span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  Owner of Hidalgo Tours and the iconic Palacio de Sal, Juan Gabriel is Salar Balloons’ local strategic partner and one of the key people who helped make this project possible.
                </p>
                <p className="text-xs text-[#555] leading-relaxed">
                  With deep regional expertise and a strong commitment to tourism development in Bolivia, his partnership plays a fundamental role in delivering an exceptional guest experience.
                </p>
              </div>
            </div>

            {/* CHRISTIAN KALOUSDIAN */}
            <div className="border border-black/5 rounded-[2rem] p-6 xs:p-8 md:p-12 bg-white/40 hover:border-black/20 transition-all space-y-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0 border border-black/5 mx-auto md:mx-0">
                <img src="/Fotos melhores /CHRISTIAN_KALOUSDIAN.PNG" alt="Christian Kalousdian" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl uppercase font-semibold text-black">Christian Kalousdian</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black">Technical Director, Balloon Designer & Chief Pilot</span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  Christian Kalousdian is the certified designer of our balloon, chief pilot, and the technical force behind Salar Balloons’ operational excellence.
                </p>
                <p className="text-xs text-[#555] leading-relaxed">
                  A highly experienced multilingual pilot certified in both Europe and Brazil, Christian brings decades of expertise in ballooning, aviation safety, and high-altitude flight operations. His technical knowledge and operational leadership ensure absolute safety.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL SECTION */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">A DREAM REALIZED</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            More Than a Company. A Dream Brought to Life.
          </h2>
          <p className="text-[#555] text-xs md:text-sm leading-relaxed">
            Built with passion, resilience, and a belief that extraordinary things are possible, Salar Balloons invites you to experience one of the most breathtaking journeys on Earth.
          </p>
          <div className="pt-4">
            <a href="#contact" className="inline-block px-10 py-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-black/80 transition-all">
              Start Planning Your Experience
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
