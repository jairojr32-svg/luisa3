import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "Is it safe to fly in a hot air balloon?",
      a: "Absolutely. Safety is our highest priority. Our aircraft is commercially certified and operated according to rigorous international standards, led by a highly experienced multilingual pilot certified in both Europe and Brazil, with decades of experience in ballooning and high-altitude operations. We use world-class equipment, advanced weather systems, premium communication technology, state-of-the-art balloon safety systems, and supplemental oxygen always available onboard when needed. Every flight is carefully evaluated according to weather conditions. If conditions are not ideal, we simply will not fly — your experience will be rescheduled or fully refunded."
    },
    {
      q: "How high do the balloons fly?",
      a: "Flight altitude varies according to weather, wind conditions, and operational safety. Each flight is unique and carefully adapted to provide the most extraordinary experience while maintaining the highest safety standards."
    },
    {
      q: "What happens if the weather is not suitable?",
      a: "Safety always comes first. Balloon flights are entirely weather-dependent, and every flight is carefully evaluated using professional meteorological analysis and operational systems. Our launch location has been carefully studied and selected, fortunately allowing for very strong flight consistency throughout the year. However, if conditions are not considered ideal for a safe and exceptional experience, the flight may be postponed or canceled. In this case, guests may choose to reschedule their experience or receive a full refund."
    },
    {
      q: "Is the flight private?",
      a: "We offer different experience options. Our Luxury Flight is a curated shared experience where families and couples always fly in their own dedicated basket compartments — we never mix unrelated guests. For complete privacy, guests may choose our Exclusive Flight, where the entire balloon is reserved exclusively for their group."
    },
    {
      q: "Will I share the space with strangers?",
      a: "Privacy is one of the defining features of the Salar Balloons experience. Unlike most balloon operations around the world — where unrelated guests typically share the same basket compartment — our Luxury Flight offers dedicated private compartments for couples, families, and private groups. We never mix unrelated guests within the same compartment, creating a far more spacious, comfortable, and premium experience. For complete privacy, our Exclusive Flight offers the entire balloon reserved exclusively for you and your guests, creating a fully private and personalized experience above Salar de Uyuni."
    },
    {
      q: "How many people are inside the balloon?",
      a: "The number of guests depends on the type of experience selected. Our balloon was specially designed oversized to provide exceptional comfort, privacy, and space for every guest. Unlike traditional balloon operations, each basket compartment accommodates only one to a maximum of three guests belonging to the same family or private group. Whether traveling as a couple or with loved ones, every experience is thoughtfully designed to feel spacious, intimate, and exceptionally premium."
    },
    {
      q: "How long does the experience last?",
      a: "The complete Salar Balloons experience typically lasts between three to four hours, including hotel pickup, the sunrise balloon inflation experience, brunch in the salt flats, the balloon flight, champagne celebration, return transportation, and breakfast. The balloon flight itself lasts approximately one hour, depending on weather, and operational conditions to ensure the safest and most exceptional experience possible."
    },
    {
      q: "What is included in the experience?",
      a: "Depending on your selected package, experiences may include: Hotel pickup & return, Sunrise balloon inflation experience, Lounge area with seating and umbrellas, Premium brunch, Balloon flight over Salar de Uyuni, Champagne celebration (with non-alcoholic options), Special souvenir gift, Beautiful post-flight breakfast, and Professional photos & videos. Please refer to your selected experience for specific inclusions."
    },
    {
      q: "Do I need any special physical preparation?",
      a: "No special preparation is generally required. However, due to the altitude of Salar de Uyuni, we recommend allowing time to acclimatize before your experience. Guests with medical concerns should consult their doctor prior to travel."
    },
    {
      q: "Will altitude affect me?",
      a: "Salar de Uyuni is located at high altitude, and some guests may experience mild effects related to altitude. Our operations are carefully designed with this environment in mind, and our aircraft is equipped with supplemental oxygen systems if needed. We also recommend staying hydrated and acclimatizing before your flight."
    },
    {
      q: "Can children fly?",
      a: "Yes — children are welcome. For safety reasons, guests must be at least 12 years old and a minimum of 1.20 meters (3 ft 11 in) tall to participate in the experience. If you have any questions, our team will be happy to assist."
    },
    {
      q: "Can older adults fly?",
      a: "In many cases, yes. Hot air ballooning is generally a smooth and gentle experience. However, guests should be able to stand for the duration of the flight and comfortably enter and exit the basket. If you have any concerns, our team will be happy to help determine suitability."
    },
    {
      q: "Can pregnant guests fly?",
      a: "For safety reasons, we generally do not recommend balloon flights during pregnancy. Please contact our team for personalized guidance."
    },
    {
      q: "What should I wear?",
      a: "We recommend comfortable clothing suitable for cold early morning temperatures. Temperatures in Salar de Uyuni at sunrise are typically cold, averaging between 0°C and 8°C (32°F to 46°F) depending on the season, so we strongly recommend wearing warm layered clothing, a jacket, comfortable closed shoes, sunglasses, and dressing appropriately for cool conditions."
    },
    {
      q: "What time do flights happen?",
      a: "Flights typically take place at sunrise, when weather and wind conditions are generally most favorable and the landscapes of Salar de Uyuni are at their most spectacular. Exact timing varies according to season and weather."
    },
    {
      q: "Can I take photos and videos?",
      a: "Absolutely. In fact, we encourage it. Additionally, professional photos and videos are included in your experience so you can fully enjoy the moment while we help preserve the memories."
    },
    {
      q: "Can I propose during the flight?",
      a: "Yes — and it is truly unforgettable. Our Exclusive Flight is perfect for proposals, anniversaries, and extraordinary celebrations. We can also help personalize special moments upon request."
    },
    {
      q: "Do you offer private experiences?",
      a: "Yes. Our Exclusive Flight offers a completely private balloon experience reserved entirely for you and your guests. Custom experiences may also be available upon request."
    },
    {
      q: "What languages do you speak?",
      a: "Our multilingual team is able to assist guests in multiple languages to ensure a smooth and premium experience."
    },
    {
      q: "How far in advance should I book?",
      a: "We strongly recommend booking as early as possible. Availability is limited and flights operate with intentionally restricted guest numbers to maintain exclusivity and comfort."
    },
    {
      q: "Why choose Salar Balloons?",
      a: "Because this is not simply a balloon flight. It is an ultra-premium, carefully curated experience designed to deliver extraordinary moments in one of the most breathtaking landscapes on Earth — with exceptional safety, comfort, privacy, and attention to detail."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black py-24 md:py-40 px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">CUSTOMER DESK</span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#111] uppercase font-medium">
            Everything You Need to Know
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Find answers to the most common questions about your Salar Balloons experience.
          </p>
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="border-t border-black/10 pt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="border-b border-black/5 pb-4 transition-all">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="font-serif text-base md:text-lg text-black group-hover:text-black transition-colors duration-300 font-medium">
                    {faq.q}
                  </span>
                  <span className="text-xs shrink-0 ml-4 font-bold text-black/40 group-hover:text-black">
                    {isOpen ? "✕" : "＋"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs md:text-sm text-[#555] leading-relaxed pb-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ASSISTANCE BANNER */}
        <div className="bg-black/5 rounded-[2rem] p-8 md:p-12 text-center space-y-6">
          <h3 className="font-serif text-xl md:text-2xl text-black uppercase">Still Have Questions?</h3>
          <p className="text-xs md:text-sm text-[#555] max-w-lg mx-auto leading-relaxed">
            Our luxury private concierges are available 24/7 to provide personalized assistance, explain custom routes, and accommodate special flight requests.
          </p>
          <div>
            <a href="#contact" className="inline-block px-8 py-3 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all">
              Speak With Our Team
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
