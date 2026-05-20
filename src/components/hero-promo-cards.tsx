import {
  BedDouble,
  Rotate3d,
  CalendarCheck,
  CircleDollarSign,
  Hash,
  Maximize2,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { statsData } from "@/config/gallery";
import { listing } from "@/config/listing";

const STAT_ICONS: Record<string, LucideIcon> = {
  "Asking price": CircleDollarSign,
  "Beds · baths": BedDouble,
  Interior: Maximize2,
  "Listing ID": Hash,
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

export function HeroSalePill() {
  return (
    <span className="sale-pill">
      <Tag size={12} strokeWidth={2} aria-hidden="true" />
      For sale
    </span>
  );
}

export function HeroPromos() {
  return (
    <div className="hero-promos mt-6 grid gap-3">
      <PromoCard
        href="#inquiry-form"
        icon={CalendarCheck}
        title="Request a showing"
        description="Schedule a private walkthrough."
      />
      <PromoCard
        icon={CircleDollarSign}
        title={listing.price}
        description={`${listing.status} · Strata ${listing.strataFee}`}
      />
      <PromoCard
        href={listing.matterportUrl}
        icon={Rotate3d}
        title="Virtual tour"
        description="Matterport 3D walkthrough"
        external
      />
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="stats">
      {statsData.map((stat) => {
        const Icon = STAT_ICONS[stat.label] ?? Hash;
        return (
          <div key={stat.label} className="stat">
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
