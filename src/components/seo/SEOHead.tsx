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
    "name": businessInfo.name,
    "alternateName": ["MNG Gaming Cafe Dilsukhnagar", "MNG Esports & Gaming Lounge"],
    "description": "Premier gaming cafe in Dilsukhnagar, Hyderabad offering high-FPS Esports PC stations, PS5 Pro lounge, snooker table, and board games.",
    "keywords": "gaming cafe, gaming cafe near me, gaming cafe in hyderabad, gaming cafe dilsukhnagar, best gaming cafe in hyderabad, ps5 gaming cafe hyderabad, pc gaming cafe near me, MNG Gaming Cafe",
    "image": "https://mnggamingcafe.in/images/mng_lounge_interior.jpg",
    "@id": "https://mnggamingcafe.in",
    "url": "https://mnggamingcafe.in",
    "telephone": businessInfo.phone,
    "priceRange": "₹100 - ₹700",
    "hasMap": businessInfo.googleMapsUrl,
    "sameAs": [
      businessInfo.googleMapsUrl
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House No. 7-49, Konark Theatre Lane, opposite Satyanarayana Swamy Temple, Gaddiannaram, Madhura Puri Colony",
      "addressLocality": "Dilsukhnagar, Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500070",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessInfo.coordinates.lat,
      "longitude": businessInfo.coordinates.lng
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Dilsukhnagar, Hyderabad"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Gaddiannaram"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kothapet"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Malakpet"
      },
      {
        "@type": "AdministrativeArea",
        "name": "LB Nagar"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessInfo.rating.toString(),
      "reviewCount": businessInfo.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": openingHoursSpec,
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "High-FPS PC Gaming Battle Station"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PS5 & PS5 Pro Lounge Gaming"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Snooker and Pool Table Session"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Board Games Zone (Chess, Jenga)"
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
