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
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://mnggamingcafe.in",
    "url": "https://mnggamingcafe.in",
    "telephone": businessInfo.phone,
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessInfo.rating.toString(),
      "reviewCount": businessInfo.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": openingHoursSpec
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
