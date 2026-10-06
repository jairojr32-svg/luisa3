import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 'Luxury Flight',
    dates: '',
    guests: '',
    occasion: '',
    hotel: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate luxury booking request submission
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa]/75 backdrop-blur-md text-black px-5 xs:px-6 sm:px-12 md:px-24 transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-32 pt-24 md:pt-40">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">SECURE YOUR BOOKING</span>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-[#111] uppercase font-medium leading-tight">
            Your Extraordinary Journey Begins Here
          </h1>
          <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Our team is here to help you design an unforgettable experience above the breathtaking landscapes of Salar de Uyuni.
          </p>
        </div>

        {/* SPLIT LAYOUT: FORM & DIRECT CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-black/10 pt-24 items-start">
          
          {/* FORM COLUMN */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">TAILOR-MADE REQUEST</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase leading-tight">
                Let Us Create Your Experience
              </h2>
              <p className="text-xs md:text-sm text-[#555] leading-relaxed max-w-xl">
                Whether you are planning a once-in-a-lifetime journey, a special celebration, a private flight, or simply have questions, our team would be delighted to assist you. Every experience is thoughtfully curated to ensure an exceptional journey from beginning to end.
              </p>
            </div>

            {submitted ? (
              <div className="bg-black/5 rounded-[2rem] p-12 text-center space-y-4 border border-black/10 animate-fade-in">
                <span className="text-3xl">✦</span>
                <h3 className="font-serif text-2xl uppercase text-black">Request Received</h3>
                <p className="text-xs md:text-sm text-[#555] max-w-md mx-auto leading-relaxed">
                  Thank you for sharing your desires with us. A private travel concierge has been assigned to your request and will contact you within the next 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                      placeholder="Luiza Ferrari"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                      placeholder="client@luxurytravel.com"
                    />
                  </div>

                  {/* Preferred Experience */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Preferred Experience</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm cursor-pointer"
                    >
                      <option value="Luxury Flight">Luxury Flight (Shared Compartment)</option>
                      <option value="Exclusive Flight">Exclusive Flight (100% Private)</option>
                      <option value="Special Locations">Special Locations Experience</option>
                      <option value="Custom Project">Special Projects & Custom Inquiries</option>
                    </select>
                  </div>

                  {/* Travel Dates */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Desired Travel Dates</label>
                    <input 
                      type="text" 
                      name="dates" 
                      required
                      value={formData.dates}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                      placeholder="e.g., October 2026 or Specific Dates"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Number of Guests</label>
                    <input 
                      type="number" 
                      name="guests" 
                      required
                      min="1"
                      value={formData.guests}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                      placeholder="2"
                    />
                  </div>

                  {/* Special Occasion */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Special Occasion (Optional)</label>
                    <input 
                      type="text" 
                      name="occasion" 
                      value={formData.occasion}
                      onChange={handleChange}
                      className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                      placeholder="Proposal, Anniversary, Honeymoon, etc."
                    />
                  </div>
                </div>

                {/* Hotel Plans */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Hotel / Travel Plans (Optional)</label>
                  <input 
                    type="text" 
                    name="hotel" 
                    value={formData.hotel}
                    onChange={handleChange}
                    className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                    placeholder="Palacio de Sal, Luna Salada, etc."
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Your Desires & Messages</label>
                  <textarea 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-transparent border-b border-black/15 py-3 focus:outline-none focus:border-black transition-colors text-sm resize-none" 
                    placeholder="Describe how you envision your experience..."
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="px-12 py-5 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ffab40] hover:text-black transition-all shadow-md w-full sm:w-auto"
                  >
                    Start Planning Your Experience
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* DIRECT CONTACT COLUMN */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 bg-black/5 rounded-[2rem] p-8 md:p-12 border border-black/5">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">DIRECT COMMUNICATIONS</span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#111] uppercase leading-tight">
                Speak With Our Team
              </h2>
              <p className="text-xs text-[#555] leading-relaxed">
                For immediate personalized assistance, VIP requests, media productions, or urgent booking inquiries, please connect with us directly.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* WhatsApp */}
              <div className="flex items-center gap-6 border-b border-black/5 pb-6">
                <span className="text-2xl shrink-0">💬</span>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 block">WHATSAPP CONCIERGE</span>
                  <a href="https://wa.me/5531982352679" target="_blank" rel="noreferrer" className="font-sans font-semibold text-sm md:text-base text-black hover:text-black transition-colors">
                    +55 31 98235 2679
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-6">
                <span className="text-2xl shrink-0">✉</span>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 block">EMAIL ENQUIRIES</span>
                  <a href="mailto:hello@salarballoons.com" className="font-sans font-semibold text-sm md:text-base text-black hover:text-black transition-colors">
                    hello@salarballoons.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FINAL HERO CTA */}
        <div className="border-t border-black/10 pt-24 text-center max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">AWAITING YOUR CONVERSATION</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#111] uppercase leading-tight">
            Extraordinary Experiences Begin with a Conversation
          </h2>
          <p className="text-[#555] text-xs md:text-sm leading-relaxed">
            We look forward to welcoming you to one of the most extraordinary places on Earth.
          </p>
        </div>

      </div>
    </div>
  );
}
