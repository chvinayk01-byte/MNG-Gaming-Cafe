import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface FAQSectionProps {
  businessInfo: BusinessInfo;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ businessInfo }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where is MNG Gaming Cafe located in Hyderabad?",
      answer: "MNG Gaming Cafe is located at House No. 7-49, Konark Theatre Lane, opposite Satyanarayana Swamy Temple, Gaddiannaram, Madhura Puri Colony, Dilsukhnagar, Hyderabad, Telangana 500070."
    },
    {
      question: "What gaming options are available at MNG Gaming Cafe?",
      answer: "We offer high-performance PC Gaming battle stations with 144Hz/240Hz displays, PlayStation 5 (PS5) & PS5 Pro sofa console lounges, professional snooker & pool table facilities, and tabletop board games like Chess and Jenga."
    },
    {
      question: "How much does gaming cost at MNG Gaming Cafe?",
      answer: "PC Gaming starts at ₹150 per hour (with discounted 3-hour, 5-hour, 8-hour, and full-day passes). PS5 single player is ₹150/hr, double player is ₹200/hr, and PS5 Pro is ₹200/hr. Snooker & pool table is ₹200/hr, and board games are ₹100/hr."
    },
    {
      question: "What are MNG Gaming Cafe opening hours?",
      answer: "MNG Gaming Cafe is open Monday through Saturday from 10:00 AM to 10:00 PM, and on Sunday from 12:00 PM to 6:00 PM."
    },
    {
      question: "How can I contact MNG Gaming Cafe?",
      answer: `You can reach MNG Gaming Cafe directly by calling or messaging on WhatsApp at ${businessInfo.phone} (+91 81433 44336) or by visiting our cafe in Dilsukhnagar near Konark Theatre Lane.`
    }
  ];

  // FAQPage JSON-LD Schema for Rich Google Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="relative py-24 bg-[#132128] border-t border-[#c8d8e4]/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            FREQUENTLY ASKED <span className="text-[#52ab98]">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]">
            Everything you need to know about gaming, pricing, location, and operating hours at MNG Gaming Cafe.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#c8d8e4]/15 bg-[#0e181c] overflow-hidden transition-all duration-300 hover:border-[#52ab98]/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-heading text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#52ab98] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#52ab98]/20' : ''}`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-[#c8d8e4] leading-relaxed">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Box */}
        <div className="mt-12 rounded-2xl border border-[#c8d8e4]/15 bg-white/5 p-6 text-center backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-heading text-base font-extrabold text-white">Have more questions?</h4>
            <p className="text-xs text-[#c8d8e4]/80 mt-0.5">Chat directly with the MNG Gaming Cafe desk in Dilsukhnagar.</p>
          </div>

          <a
            href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20have%20a%20question.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-5 py-3 text-xs font-bold uppercase text-white shadow-teal-glow hover:scale-105 transition-all shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
