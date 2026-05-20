"use client";

import { galleryGroups, statsData } from "@/config/gallery";
import { listing } from "@/config/listing";
import { Gallery } from "@/components/gallery";
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
          <span className="sale-pill">For sale</span>
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

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a href="#inquiry-form" className="promo-card block hover:bg-muted/30">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-1">
                Request a showing
              </p>
              <p className="text-sm text-muted-foreground">Schedule a private walkthrough.</p>
            </a>
            <div className="promo-card">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-1">
                {listing.price}
              </p>
              <p className="text-sm text-muted-foreground">
                {listing.status} · Strata {listing.strataFee}
              </p>
            </div>
            <a
              href={listing.matterportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="promo-card block hover:bg-muted/30"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-1">
                Virtual tour
              </p>
              <p className="text-sm text-muted-foreground">Matterport 3D walkthrough</p>
            </a>
          </div>

          <div className="stats">
            {statsData.map((stat) => (
              <div key={stat.label} className="stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Gallery groups={galleryGroups} />
      </section>

      <section className="mt-10 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="map-column">
            <iframe
              title="Google Map for the property"
              src={googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-136 w-full border-0 sm:h-152 lg:h-176"
              allowFullScreen
            />
            <PropertyMapPanel />
          </div>

          <div className="flex h-full min-h-0 flex-col rounded-2xl border border-line bg-card shadow-lg p-6 sm:p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] font-bold text-accent">
              Request a showing
            </p>
            <h3 className="font-serif text-2xl tracking-tight text-foreground m-0 mb-6">
              Send a showing request
            </h3>
            <InquiryForm id="inquiry-form" />
            <ContactBlock />
          </div>
        </div>

        <FaqSection />
      </section>
    </main>
  );
}
