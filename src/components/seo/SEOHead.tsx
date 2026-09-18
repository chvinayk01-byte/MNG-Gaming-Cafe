import React from 'react';
import { BusinessInfo, BusinessDayHours } from '../../types';

interface SEOHeadProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({ businessInfo, businessHours }) => {
  // Convert business hours to Schema.org openingHoursSpecification
  const openingHoursSpec = businessHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": h.day,
    "opens": h.openTime,
    "closes": h.closeTime,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "https://schema.org/EntertainmentBusiness",
    "name": "MNG Gaming Cafe",
    "description": "MNG Gaming Cafe in Dilsukhnagar, Hyderabad. Explore gaming, PS5, PC gaming, snooker, board games, pricing, location and more.",
    "image": "https://mnggamingcafe.in/images/mng_lounge_interior.jpg",
    "@id": "https://mnggamingcafe.in/",
    "url": "https://mnggamingcafe.in/",
    "telephone": "+91 81433 44336",
    "priceRange": "₹100 - ₹700",
    "hasMap": businessInfo.googleMapsUrl,
    "sameAs": [
      businessInfo.googleMapsUrl
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House No. 7-49, Konark Theatre Lane, Opposite Satyanarayana Swamy Temple, Gaddiannaram, Madhura Puri Colony",
      "addressLocality": "Dilsukhnagar, Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500070",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.3666612,
      "longitude": 78.5253429
    },
    "openingHoursSpecification": openingHoursSpec,
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PC Gaming Battle Stations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Console & PS5 Lounge Gaming"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Snooker & Pool Table"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Board Games Zone"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
