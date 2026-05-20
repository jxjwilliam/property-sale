"use client";

import { galleryGroups } from "@/config/gallery";
import { listing } from "@/config/listing";
import { Gallery } from "@/components/gallery";
import { HeroPromos, HeroSalePill, HeroStats } from "@/components/hero-promo-cards";
import { ContactBlock } from "@/components/contact-block";
import { FaqSection } from "@/components/faq-section";
import { InquiryForm } from "@/components/inquiry-form";
import { PropertyMapPanel } from "@/components/property-map-panel";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const googleMapsEmbedUrl = GOOGLE_MAPS_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${encodeURIComponent(listing.addressShort)}`
  : `https://www.google.com/maps?q=${encodeURIComponent(listing.addressShort)}&output=embed`;

export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-label="Property listing gallery">
        <div className="title-block">
          <HeroSalePill />
          <p className="kicker">
            {listing.neighbourhood} · MLS® {listing.mls} · Built {listing.yearBuilt}
          </p>
          <h1>Holland Park corner condo — Unit {listing.unit}</h1>
          {listing.lede.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="lede">
              {paragraph}
            </p>
          ))}
          <ul className="hero-highlights" aria-label="Property highlights">
            {listing.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <HeroPromos />
          <HeroStats />
        </div>

        <Gallery groups={galleryGroups} />
      </section>

      <section className="inquiry-section mt-10 space-y-6">
        <div className="inquiry-layout grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="map-column">
            <iframe
              title="Google Map for the property"
              src={googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-embed w-full border-0"
              allowFullScreen
            />
            <PropertyMapPanel />
          </div>

          <div className="inquiry-card flex h-full min-h-0 flex-col rounded-2xl border border-line bg-card shadow-lg">
            <div className="inquiry-card-body">
              <p className="mb-4 text-xs uppercase tracking-[0.24em] font-bold text-accent">
                Request a showing
              </p>
              <h3 className="inquiry-card-title font-serif tracking-tight text-foreground m-0 mb-6">
                Send a showing request
              </h3>
              <InquiryForm id="inquiry-form" />
              <ContactBlock />
            </div>
          </div>
        </div>

        <FaqSection />
      </section>
    </main>
  );
}
