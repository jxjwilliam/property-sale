import type { ListingCopy } from "./types";
import type { Locale } from "./types";

const copy: Record<Locale, ListingCopy> = {
  en: {
    lede: [
      "Welcome to Holland Park by Century City—a brand-new 2025 corner residence in the heart of Surrey City Centre. This 2 bed, 2 bath home offers 829 sq ft of bright, open living with floor-to-ceiling windows and views toward the mountains and Holland Park.",
      "Never lived in, with modern finishings, air conditioning, in-suite laundry, and one secured underground parking stall. You're one block from King George SkyTrain, directly across from Surrey City Centre Mall, and minutes from T&T, Holland Park, SFU Surrey, and KPU.",
    ],
    highlights: [
      "Corner unit · brand new · never occupied",
      "Floor-to-ceiling windows · mountain & park outlook",
      "A/C · in-suite washer/dryer · balcony",
      "Fitness centre · concierge · bike room · guest amenities",
      "1 block to SkyTrain · central Surrey downtown",
    ],
  },
  "zh-Hans": {
    lede: [
      "欢迎了解 Century City 荷兰公园——位于素里市中心核心的2025年全新豪华住宅。两卧两卫，829平方英尺，通高落地窗，可赏山景与荷兰公园绿意。",
      "全新未入住，现代装修，配备空调、室内洗衣及一个地下产权车位。距乔治国王天车站约一个街区，对面即素里市中心商场，步行可达 T&T、荷兰公园、SFU 素里校区及 KPU。",
    ],
    highlights: [
      "豪华单位 · 全新 · 从未入住",
      "通高落地窗 · 山景与公园视野",
      "空调 · 室内洗衣 · 阳台",
      "健身中心 · 礼宾 · 自行车房 · 宾客设施",
      "距天车一站街区 · 素里市中心核心",
    ],
  },
  "zh-Hant": {
    lede: [
      "歡迎了解 Century City 荷蘭公園——位於素里市中心核心的2025年全新轉角住宅。兩房兩衛，829平方呎，通高落地窗，可賞山景與荷蘭公園綠意。",
      "全新未入住，現代裝修，配備冷氣、室內洗衣及一個地下產權車位。距喬治國王天車站約一個街區，對面即素里市中心商場，步行可達 T&T、荷蘭公園、SFU 素里校區及 KPU。",
    ],
    highlights: [
      "轉角單位 · 全新 · 從未入住",
      "通高落地窗 · 山景與公園視野",
      "冷氣 · 室內洗衣 · 陽台",
      "健身中心 · 禮賓 · 單車房 · 賓客設施",
      "距天車一站街區 · 素里市中心核心",
    ],
  },
};

export function getListingCopy(locale: Locale): ListingCopy {
  return copy[locale];
}
