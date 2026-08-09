import React, { useState } from 'react';
import { Phone, MessageSquare, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { BusinessInfo } from '../../types';
import { db } from '../../services/storage';

interface ContactSectionProps {
  businessInfo: BusinessInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ businessInfo }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const existing = db.getMessages();
    const newMsg = {
      id: `msg_${Date.now()}`,
      name,
      phone,
      email: email || undefined,
      message,
      status: 'unread' as const,
      createdAt: new Date().toISOString(),
    };

    db.saveMessages([newMsg, ...existing]);
    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const cleanPhone = businessInfo.phone.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi MNG Gaming Cafe, I would like to enquire about a gaming session.')}`;

  return (
    <section id="contact" className="relative py-24 bg-dark-950 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-cyan mb-3">
            <MessageSquare className="h-4 w-4" /> Get In Touch
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            READY TO <span className="text-neon-cyan">GAME?</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Have questions about sessions, events, or reservations? Contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Quick Contact Buttons */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-8 shadow-2xl space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                Direct Contact Actions
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect instantly with the MNG Gaming Cafe desk in Dilsukhnagar.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neon-green py-3.5 text-xs font-bold uppercase text-dark-950 shadow-neon-green hover:scale-105 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  <span>CALL NOW ({businessInfo.phone})</span>
                </a>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold uppercase text-white hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
                >
                  <MessageSquare className="h-4 w-4 text-neon-cyan" />
                  <span>WHATSAPP US</span>
                </a>

                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 text-xs font-bold uppercase text-slate-300 hover:text-white transition-all"
                >
                  <Navigation className="h-4 w-4 text-neon-purple" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-8 shadow-2xl">
            <h3 className="font-heading text-xl font-bold uppercase text-white mb-6">
              Send An Enquiry
            </h3>

            {submitted ? (
              <div className="rounded-2xl border border-neon-green/30 bg-neon-green/10 p-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-10 w-10 text-neon-green" />
                <h4 className="font-bold text-white uppercase text-sm">Your Message Has Been Sent!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for contacting MNG Gaming Cafe. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-xl bg-neon-green px-4 py-2 text-xs font-bold uppercase text-dark-950"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your Message or Gaming Request *"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-dark-950 shadow-neon-cyan hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
