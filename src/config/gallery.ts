import { listing } from "./listing";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";


const phoneFiles = [
  "phone__Weixin Image_20260518190536_13_1.jpg",
  "phone__Weixin Image_20260518190540_14_1.jpg",
  "phone__Weixin Image_20260518190543_15_1.jpg",
  "phone__Weixin Image_20260518190547_16_1.jpg",
  "phone__Weixin Image_20260518190550_17_1.jpg",
];

const realtorNumbers = [
  1, 2, 11, 12, 13, 14,
  ...Array.from({ length: 7 }, (_, i) => 19 + i),
  ...Array.from({ length: 21 }, (_, i) => 27 + i),
];

export interface GalleryGroup {
  key: string;
  label: string;
  description: string;
  files: string[];
}

export interface GalleryImage {
  id: string;
  fileName: string;
  url: string;
  source: string;
  caption: string;
  subcaption: string;
}

export interface GalleryStat {
  value: string;
  label: string;
}

export const galleryGroups: GalleryGroup[] = [
  {
    key: "all",
    label: "All",
    description: "Every frame in the upload set",
    files: [
          "phone__Weixin Image_20260518190536_13_1.jpg",
          "phone__Weixin Image_20260518190540_14_1.jpg",
          "phone__Weixin Image_20260518190543_15_1.jpg",
          "phone__Weixin Image_20260518190547_16_1.jpg",
          "phone__Weixin Image_20260518190550_17_1.jpg",
          "scraped-media__linkedin__image-001.jpg",
          "scraped-media__matterport__image-001.jpg",
          "scraped-media__realtor-ca__image-001.jpg",
          "scraped-media__realtor-ca__image-002.jpg",
          "scraped-media__realtor-ca__image-011.jpg",
          "scraped-media__realtor-ca__image-012.jpg",
          "scraped-media__realtor-ca__image-013.jpg",
          "scraped-media__realtor-ca__image-014.jpg",
          "scraped-media__realtor-ca__image-019.jpg",
          "scraped-media__realtor-ca__image-020.jpg",
          "scraped-media__realtor-ca__image-021.jpg",
          "scraped-media__realtor-ca__image-022.jpg",
          "scraped-media__realtor-ca__image-023.jpg",
          "scraped-media__realtor-ca__image-024.jpg",
          "scraped-media__realtor-ca__image-025.jpg",
          "scraped-media__realtor-ca__image-026.jpg",
          "scraped-media__realtor-ca__image-027.jpg",
          "scraped-media__realtor-ca__image-028.jpg",
          "scraped-media__realtor-ca__image-029.jpg",
          "scraped-media__realtor-ca__image-030.jpg",
          "scraped-media__realtor-ca__image-031.jpg",
          "scraped-media__realtor-ca__image-032.jpg",
          "scraped-media__realtor-ca__image-033.jpg",
          "scraped-media__realtor-ca__image-034.jpg",
          "scraped-media__realtor-ca__image-035.jpg",
          "scraped-media__realtor-ca__image-036.jpg",
          "scraped-media__realtor-ca__image-037.jpg",
          "scraped-media__realtor-ca__image-038.jpg",
          "scraped-media__realtor-ca__image-039.jpg",
          "scraped-media__realtor-ca__image-040.jpg",
          "scraped-media__realtor-ca__image-041.jpg",
          "scraped-media__realtor-ca__image-042.jpg",
          "scraped-media__realtor-ca__image-043.jpg",
          "scraped-media__realtor-ca__image-044.jpg",
          "scraped-media__realtor-ca__image-045.jpg",
          "scraped-media__realtor-ca__image-046.jpg",
          "scraped-media__realtor-ca__image-047.jpg",
          "scraped-media__rew-ca__image-001.jpeg",
          "scraped-media__rew-ca__image-002.jpeg",
          "scraped-media__rew-ca__image-003.jpeg",
          "scraped-media__rew-ca__image-004.jpeg",
          "scraped-media__rew-ca__image-005.jpeg",
          "scraped-media__rew-ca__image-006.jpeg",
          "scraped-media__rew-ca__image-007.jpeg",
          "scraped-media__rew-ca__image-008.jpeg",
          "scraped-media__rew-ca__image-009.jpeg",
          "scraped-media__rew-ca__image-010.jpeg",
          "scraped-media__rew-ca__image-011.jpeg",
          "scraped-media__rew-ca__image-012.jpeg",
          "scraped-media__rew-ca__image-013.jpeg",
          "scraped-media__rew-ca__image-014.jpeg",
          "scraped-media__rew-ca__image-015.jpeg",
          "scraped-media__rew-ca__image-016.jpeg",
          "scraped-media__rew-ca__image-017.jpeg",
          "scraped-media__rew-ca__image-018.jpeg",
          "scraped-media__rew-ca__image-019.jpeg",
          "scraped-media__rew-ca__image-020.jpeg",
          "scraped-media__rew-ca__image-021.jpeg",
          "scraped-media__rew-ca__image-022.jpeg",
          "scraped-media__rew-ca__image-023.jpeg",
          "scraped-media__rew-ca__image-024.jpeg",
          "scraped-media__rew-ca__image-025.jpeg",
          "scraped-media__rew-ca__image-026.jpeg",
          "scraped-media__rew-ca__image-027.jpeg",
          "scraped-media__rew-ca__image-028.jpeg",
          "scraped-media__rew-ca__image-029.jpeg",
          "scraped-media__rew-ca__image-030.jpeg",
          "scraped-media__rew-ca__image-031.jpeg",
          "scraped-media__rew-ca__image-032.jpeg",
          "scraped-media__rew-ca__image-033.jpeg",
          "scraped-media__rew-ca__image-034.jpeg"
    ],
  },
  {
    key: "phone",
    label: "Phone",
    description: "Mobile captures",
    files: [
          "phone__Weixin Image_20260518190536_13_1.jpg",
          "phone__Weixin Image_20260518190540_14_1.jpg",
          "phone__Weixin Image_20260518190543_15_1.jpg",
          "phone__Weixin Image_20260518190547_16_1.jpg",
          "phone__Weixin Image_20260518190550_17_1.jpg"
    ],
  },
  {
    key: "matterport",
    label: "Matterport",
    description: "3D tour preview",
    files: [
          "scraped-media__matterport__image-001.jpg"
    ],
  },
  {
    key: "realtor",
    label: "Realtor.ca",
    description: "MLS listing photos",
    files: [
          "scraped-media__realtor-ca__image-001.jpg",
          "scraped-media__realtor-ca__image-002.jpg",
          "scraped-media__realtor-ca__image-011.jpg",
          "scraped-media__realtor-ca__image-012.jpg",
          "scraped-media__realtor-ca__image-013.jpg",
          "scraped-media__realtor-ca__image-014.jpg",
          "scraped-media__realtor-ca__image-019.jpg",
          "scraped-media__realtor-ca__image-020.jpg",
          "scraped-media__realtor-ca__image-021.jpg",
          "scraped-media__realtor-ca__image-022.jpg",
          "scraped-media__realtor-ca__image-023.jpg",
          "scraped-media__realtor-ca__image-024.jpg",
          "scraped-media__realtor-ca__image-025.jpg",
          "scraped-media__realtor-ca__image-026.jpg",
          "scraped-media__realtor-ca__image-027.jpg",
          "scraped-media__realtor-ca__image-028.jpg",
          "scraped-media__realtor-ca__image-029.jpg",
          "scraped-media__realtor-ca__image-030.jpg",
          "scraped-media__realtor-ca__image-031.jpg",
          "scraped-media__realtor-ca__image-032.jpg",
          "scraped-media__realtor-ca__image-033.jpg",
          "scraped-media__realtor-ca__image-034.jpg",
          "scraped-media__realtor-ca__image-035.jpg",
          "scraped-media__realtor-ca__image-036.jpg",
          "scraped-media__realtor-ca__image-037.jpg",
          "scraped-media__realtor-ca__image-038.jpg",
          "scraped-media__realtor-ca__image-039.jpg",
          "scraped-media__realtor-ca__image-040.jpg",
          "scraped-media__realtor-ca__image-041.jpg",
          "scraped-media__realtor-ca__image-042.jpg",
          "scraped-media__realtor-ca__image-043.jpg",
          "scraped-media__realtor-ca__image-044.jpg",
          "scraped-media__realtor-ca__image-045.jpg",
          "scraped-media__realtor-ca__image-046.jpg",
          "scraped-media__realtor-ca__image-047.jpg"
    ],
  },
  {
    key: "rew",
    label: "REW.ca",
    description: "Market listing set",
    files: [
          "scraped-media__rew-ca__image-001.jpeg",
          "scraped-media__rew-ca__image-002.jpeg",
          "scraped-media__rew-ca__image-003.jpeg",
          "scraped-media__rew-ca__image-004.jpeg",
          "scraped-media__rew-ca__image-005.jpeg",
          "scraped-media__rew-ca__image-006.jpeg",
          "scraped-media__rew-ca__image-007.jpeg",
          "scraped-media__rew-ca__image-008.jpeg",
          "scraped-media__rew-ca__image-009.jpeg",
          "scraped-media__rew-ca__image-010.jpeg",
          "scraped-media__rew-ca__image-011.jpeg",
          "scraped-media__rew-ca__image-012.jpeg",
          "scraped-media__rew-ca__image-013.jpeg",
          "scraped-media__rew-ca__image-014.jpeg",
          "scraped-media__rew-ca__image-015.jpeg",
          "scraped-media__rew-ca__image-016.jpeg",
          "scraped-media__rew-ca__image-017.jpeg",
          "scraped-media__rew-ca__image-018.jpeg",
          "scraped-media__rew-ca__image-019.jpeg",
          "scraped-media__rew-ca__image-020.jpeg",
          "scraped-media__rew-ca__image-021.jpeg",
          "scraped-media__rew-ca__image-022.jpeg",
          "scraped-media__rew-ca__image-023.jpeg",
          "scraped-media__rew-ca__image-024.jpeg",
          "scraped-media__rew-ca__image-025.jpeg",
          "scraped-media__rew-ca__image-026.jpeg",
          "scraped-media__rew-ca__image-027.jpeg",
          "scraped-media__rew-ca__image-028.jpeg",
          "scraped-media__rew-ca__image-029.jpeg",
          "scraped-media__rew-ca__image-030.jpeg",
          "scraped-media__rew-ca__image-031.jpeg",
          "scraped-media__rew-ca__image-032.jpeg",
          "scraped-media__rew-ca__image-033.jpeg",
          "scraped-media__rew-ca__image-034.jpeg"
    ],
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description: "Social listing photos",
    files: [
          "scraped-media__linkedin__image-001.jpg"
    ],
  }
];

const titleMap: Record<string, string> = {
  phone: "Phone capture",
  matterport: "Matterport tour",
  realtor: "Realtor.ca listing photo",
  rew: "REW.ca listing photo",
};

export const statsData: GalleryStat[] = [
  { value: listing.price, label: "Asking price" },
  { value: `${listing.beds} + ${listing.baths}`, label: "Beds · baths" },
  { value: `${listing.sqft} sq ft`, label: "Interior" },
  { value: `MLS® ${listing.mls}`, label: "Listing ID" },
];

function imageUrl(fileName: string): string {
  return `${R2_BASE}/${encodeURIComponent(fileName)}`;
}

export function getGroup(key: string): GalleryGroup {
  return galleryGroups.find((g) => g.key === key) ?? galleryGroups[0];
}

export function buildItems(group: GalleryGroup): GalleryImage[] {
  return group.files.map((fileName, index) => {
    const source = group.label;
    const title = titleMap[group.key] ?? group.label;
    return {
      id: `${group.key}-${index}`,
      fileName,
      url: imageUrl(fileName),
      source,
      caption: `${title} ${String(index + 1).padStart(2, "0")}`,
      subcaption: fileName.replace(/^.*__/, "").replace(/_/g, " "),
    };
  });
}

export function getFilteredItems(filterKey: string): GalleryImage[] {
  return buildItems(getGroup(filterKey));
}
