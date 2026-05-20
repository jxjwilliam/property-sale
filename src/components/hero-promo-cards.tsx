"use client";

import {
  BedDouble,
  Rotate3d,
  CalendarCheck,
  CircleDollarSign,
  Hash,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import { listing } from "@/config/listing";
import { useLocale } from "@/i18n/provider";

const STAT_ICONS: Record<string, LucideIcon> = {
  askingPrice: CircleDollarSign,
  bedsBaths: BedDouble,
  interior: Maximize2,
  listingId: Hash,
};

function HeroIconBox({
  icon: Icon,
  className = "promo-card-icon",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span className={className} aria-hidden="true">
      <Icon
        size={18}
        strokeWidth={className.includes("stat-icon") ? 2 : 1.75}
        className="hero-icon-glyph"
      />
    </span>
  );
}

function PromoCard({
  href,
  icon,
  title,
  description,
  external,
}: {
  href?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  external?: boolean;
}) {
  const body = (
    <>
      <HeroIconBox icon={icon} />
      <div className="promo-card-body">
        <p className="hero-accent text-xs uppercase tracking-[0.2em] mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="promo-card block hover:bg-muted/30"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {body}
      </a>
    );
  }

  return <div className="promo-card">{body}</div>;
}

export function HeroPromos() {
  const { messages } = useLocale();
  const p = messages.promos;

  return (
    <div className="hero-promos mt-6 grid gap-3">
      <PromoCard
        href="#inquiry-form"
        icon={CalendarCheck}
        title={p.showingTitle}
        description={p.showingDesc}
      />
      <PromoCard
        icon={CircleDollarSign}
        title={listing.price}
        description={p.statusLine}
      />
      <PromoCard
        href={listing.matterportUrl}
        icon={Rotate3d}
        title={p.virtualTourTitle}
        description={p.virtualTourDesc}
        external
      />
    </div>
  );
}

export function HeroStats() {
  const { messages } = useLocale();
  const s = messages.stats;

  const stats = [
    { key: "askingPrice", value: listing.price, label: s.askingPrice },
    { key: "bedsBaths", value: `${listing.beds} + ${listing.baths}`, label: s.bedsBaths },
    { key: "interior", value: `${listing.sqft} sq ft`, label: s.interior },
    { key: "listingId", value: `MLS® ${listing.mls}`, label: s.listingId },
  ];

  return (
    <div className="stats">
      {stats.map((stat) => {
        const Icon = STAT_ICONS[stat.key] ?? Hash;
        return (
          <div key={stat.key} className="stat">
            <HeroIconBox icon={Icon} className="stat-icon" />
            <div className="stat-body">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
