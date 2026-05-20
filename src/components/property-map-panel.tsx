"use client";

import { listing } from "@/config/listing";
import { useLocale } from "@/i18n/provider";

export function PropertyMapPanel() {
  const { messages } = useLocale();
  const m = messages.map;

  return (
    <div className="map-info-panel">
      <div className="map-info-split">
        <div className="map-info-address">
          <p className="map-info-kicker">{listing.building}</p>
          <p className="map-info-address-line">{listing.address}</p>
        </div>

        <div className="map-info-listings">
          <p className="map-info-kicker">{m.listings}</p>
          <div className="map-info-listing-links">
            <a href={listing.realtorCaUrl} target="_blank" rel="noopener noreferrer">
              {m.realtorCa}
            </a>
            <a href={listing.sellVanHomesUrl} target="_blank" rel="noopener noreferrer">
              {m.sellVanHomes}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
