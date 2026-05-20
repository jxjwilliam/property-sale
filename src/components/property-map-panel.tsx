import { listing } from "@/config/listing";

export function PropertyMapPanel() {
  return (
    <div className="map-info-panel">
      <div className="map-info-split">
        <div className="map-info-address">
          <p className="map-info-kicker">{listing.building}</p>
          <p className="map-info-address-line">{listing.address}</p>
        </div>

        <div className="map-info-listings">
          <p className="map-info-kicker">Listings</p>
          <div className="map-info-listing-links">
            <a
              href={listing.realtorCaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Realtor.ca
            </a>
            <a
              href={listing.sellVanHomesUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on SellVanHomes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
