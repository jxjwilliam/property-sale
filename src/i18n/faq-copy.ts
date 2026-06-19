import type { Locale } from "./types";

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  sources?: { label: string; href: string }[];
};

export type FaqCopy = {
  kicker: string;
  title: string;
  intro: string;
  items: FaqEntry[];
};

const REALTOR_CA =
  "https://www.realtor.ca/real-estate/29590014/808-13573-98a-avenue-surrey";
const SELLVAN =
  "https://www.sellvanhomes.ca/listing/r3109998-13573-98a-avenue-808-surrey-bc-v3t-4a4/";

const faqByLocale: Record<Locale, FaqCopy> = {
  en: {
    kicker: "Buyer questions",
    title: "Frequently asked questions",
    intro:
      "Common topics for this Surrey City Centre condo sale—pricing, strata, location, and BC purchase basics. Not legal or tax advice.",
    items: [
      {
        id: "price-mls",
        question: "What is the asking price and MLS® number?",
        answer:
          "The home is listed at $649,900 (CAD), MLS® R3109998, status Active. Price and availability can change—confirm with the listing agent before making an offer.",
        sources: [
          { label: "Realtor.ca listing", href: REALTOR_CA },
          { label: "SellVanHomes", href: SELLVAN },
        ],
      },
      {
        id: "strata-fees",
        question: "What are the monthly strata fees and what do they cover?",
        answer:
          "Strata maintenance is about $594 per month (sources vary slightly; verify on the Form B). Per listing data, fees commonly include gas, heat, hot water, building management, grounds care, and snow removal. A locker is included. Always review the strata documents for the exact allocation and any special levies.",
        sources: [
          {
            label: "BC Financial Services Authority — strata basics",
            href: "https://www.bcfsa.ca/",
          },
        ],
      },
      {
        id: "new-never-occupied",
        question: "Is this a new home? Has anyone lived in the unit?",
        answer:
          "Holland Park by Century City was built circa 2025. Marketing describes this corner unit as brand new and never occupied, with modern finishings, air conditioning, in-suite laundry, and floor-to-ceiling windows.",
      },
      {
        id: "pets-rentals",
        question: "Are pets or rentals allowed?",
        answer:
          "Strata bylaws allow pets and rentals with restrictions (wording on MLS: “Pets Allowed w/ Rest.” and “Rentals Allwd w/ Restrctns”). You must review the current bylaws and any pending rule changes before you buy—restrictions can affect resale and investment use.",
      },
      {
        id: "parking-locker",
        question: "How much parking and storage is included?",
        answer:
          "The unit includes one secured underground parking stall and a locker. Confirm stall number and any EV or visitor-parking rules in the strata package.",
      },
      {
        id: "location-transit",
        question: "How close is transit, shopping, and parks?",
        answer:
          "The building is in Surrey City Centre (Whalley), about one block from King George SkyTrain, across from Surrey Central / City Centre Mall, and near Holland Park, T&T, SFU Surrey, and KPU. Walk Score data from listing feeds rates the area as somewhat walkable for errands.",
      },
      {
        id: "ptt",
        question: "What is BC property transfer tax (PTT) on a purchase at this price?",
        answer:
          "BC charges property transfer tax on most residential sales. For a $649,900 home, the general PTT is roughly 1% on the first $200,000, 2% on the portion up to $2,000,000, and 3% above that—about $11,998 before exemptions. First-time home buyer and other exemptions may reduce this; additional PTT may apply on certain foreign or corporate purchases. Use the provincial calculator and speak with your notary or lawyer.",
        sources: [
          {
            label: "BC PTT calculator",
            href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax",
          },
        ],
      },
      {
        id: "gst-new",
        question: "Does GST apply on a 2025 condo?",
        answer:
          "New or substantially renovated residential property can be subject to GST in BC. Primary-residence purchasers may qualify for rebates; investors and non-residents face different rules. Your lawyer and accountant should confirm GST status, rebate eligibility, and the net price before you remove subjects.",
        sources: [
          {
            label: "Canada Revenue Agency — housing rebates",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-rebates/new-housing-rebate.html",
          },
        ],
      },
      {
        id: "due-diligence",
        question: "What should I review before making an offer?",
        answer:
          "Typical BC buyer due diligence includes: approved financing, property disclosure statement (PDS), strata Form B (information certificate), bylaws and rules, meeting minutes (2 years), financial statements, depreciation report, insurance summary, parking/storage assignment, and a professional inspection if desired. Your REALTOR® coordinates document access through the listing brokerage.",
        sources: [
          {
            label: "Real Estate Council of BC — buying a home",
            href: "https://www.recbc.ca/licensee-resources/buying-a-home",
          },
        ],
      },
      {
        id: "offer-closing",
        question: "How do offers and closing work in BC?",
        answer:
          "Offers are usually written on a Contract of Purchase and Sale with subjects (financing, inspection, strata review, etc.) and a deposit held in trust by the brokerage. Completion dates are negotiated; you will need a BC lawyer or notary for conveyancing, title registration, and PTT filing. Allow time for your lender’s appraisal and insurer’s requirements on strata properties.",
      },
      {
        id: "who-represents",
        question: "Who is the listing team?",
        answer:
          "Carter Lozinski (listing agent) and Frederick Trudeau are with Heller Murch Realty. Contact Carter for showing requests and listing questions. All are licensed under BC’s real estate framework; verify current licence status on the BCFSA public register if you wish.",
        sources: [
          {
            label: "BCFSA licensee search",
            href: "https://www.bcfsa.ca/industry-resources/consumer-resources/find-a-licensed-professional",
          },
        ],
      },
      {
        id: "disclaimer",
        question: "Is this legal or tax advice?",
        answer:
          "No. This FAQ summarizes public listing information and common BC buyer topics. Strata fees, bylaws, taxes, and availability can change. Confirm all material facts with Carter Lozinski, your lawyer or notary, lender, and accountant before you contract to purchase.",
      },
    ],
  },
  "zh-Hans": {
    kicker: "买家常见问题",
    title: "常见问题",
    intro:
      "关于素里市中心这套公寓的挂牌价、物业费、位置及 BC 省购房基础知识。不构成法律或税务建议。",
    items: [
      {
        id: "price-mls",
        question: "挂牌价和 MLS® 编号是多少？",
        answer:
          "房源挂牌价 $649,900（加元），MLS® R3109998，状态为 Active（在售）。价格与可售状态可能变动——出价前请向挂牌经纪确认。",
        sources: [
          { label: "Realtor.ca 房源", href: REALTOR_CA },
          { label: "SellVanHomes", href: SELLVAN },
        ],
      },
      {
        id: "strata-fees",
        question: "每月物业费多少？包含哪些项目？",
        answer:
          "物业管理费约每月 $594（不同来源略有差异，请以 Form B 为准）。根据挂牌信息，费用通常包含燃气、暖气、热水、楼宇管理、园区维护及除雪等；含一个储物柜。请务必查阅物业文件，确认具体分摊及是否有特别摊款。",
        sources: [
          { label: "BC 金融服务管理局 — 分层物业简介", href: "https://www.bcfsa.ca/" },
        ],
      },
      {
        id: "new-never-occupied",
        question: "是新房吗？是否有人入住过？",
        answer:
          "Holland Park by Century City 约建于 2025 年。营销资料称本全新豪华单位为全新、从未入住，配备现代装修、空调、室内洗衣及通高落地窗。",
      },
      {
        id: "pets-rentals",
        question: "可以养宠物或出租吗？",
        answer:
          "物业附例允许养宠物和出租，但有限制（MLS 表述为 “Pets Allowed w/ Rest.” 及 “Rentals Allwd w/ Restrctns”）。购买前须查阅现行附例及待决规则变更——限制可能影响转售或投资用途。",
      },
      {
        id: "parking-locker",
        question: "包含多少车位和储物？",
        answer:
          "含一个地下产权车位及一个储物柜。车位编号、电动车及访客停车规则请在物业资料中确认。",
      },
      {
        id: "location-transit",
        question: "交通、购物和公园方便吗？",
        answer:
          "位于素里市中心（Whalley），距乔治国王天车站约一个街区，对面为 Surrey Central / 市中心商场，邻近荷兰公园、T&T、SFU 素里校区及 KPU。挂牌数据中的 Walk Score 显示日常办事步行便利性中等。",
      },
      {
        id: "ptt",
        question: "以此价格购买，BC 省产权转让税（PTT）是多少？",
        answer:
          "BC 省大多数住宅交易需缴纳产权转让税。对 $649,900 的房产，一般税率为前 $200,000 按 1%、至 $2,000,000 部分按 2%、超出部分按 3% 计算——豁免前约 $11,998。首次购房者等可能享受减免；部分外籍或公司购买可能适用额外税率。请使用省政府计算器并咨询公证人或律师。",
        sources: [
          {
            label: "BC 省 PTT 计算器",
            href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax",
          },
        ],
      },
      {
        id: "gst-new",
        question: "2025 年公寓是否需要缴纳 GST？",
        answer:
          "BC 省新建或实质性翻新的住宅可能适用 GST。自住买家或符合新房退税条件；投资者及非居民适用不同规则。请在解除条件前由律师和会计师确认 GST 状态、退税资格及净价。",
        sources: [
          {
            label: "加拿大税务局 — 住房退税",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-rebates/new-housing-rebate.html",
          },
        ],
      },
      {
        id: "due-diligence",
        question: "出价前应审查哪些材料？",
        answer:
          "BC 买家常见尽职调查包括：贷款预批、物业披露声明（PDS）、物业 Form B（信息证明）、附例与规章、两年会议纪要、财务报表、折旧报告、保险摘要、车位/储物分配，以及（如需要）专业验房。您的经纪通过挂牌经纪公司协调文件获取。",
        sources: [
          { label: "BC 房地产委员会 — 购房指南", href: "https://www.recbc.ca/licensee-resources/buying-a-home" },
        ],
      },
      {
        id: "offer-closing",
        question: "BC 省出价与过户流程是怎样的？",
        answer:
          "出价通常采用《买卖合约》，可附条件（贷款、验房、审阅物业文件等），定金由经纪公司信托持有。过户日协商确定；需 BC 律师或公证人办理产权过户、登记及 PTT 申报。请预留贷款评估及分层物业保险要求的时间。",
      },
      {
        id: "who-represents",
        question: "挂牌团队是谁？",
        answer:
          "Carter Lozinski（挂牌经纪）与 Frederick Trudeau 隶属 Heller Murch Realty。看房预约及房源问题请优先联系 Carter。相关人员均持 BC 房地产牌照；可在 BCFSA 公开名册核实当前执照状态。",
        sources: [
          {
            label: "BCFSA 持牌人查询",
            href: "https://www.bcfsa.ca/industry-resources/consumer-resources/find-a-licensed-professional",
          },
        ],
      },
      {
        id: "disclaimer",
        question: "这是法律或税务建议吗？",
        answer:
          "不是。本 FAQ 仅汇总公开挂牌信息及 BC 买家常见话题。物业费、附例、税费及可售状态可能变更。签约前请向 Carter Lozinski、您的律师或公证人、贷款机构及会计师核实所有重要事实。",
      },
    ],
  },
  "zh-Hant": {
    kicker: "買家常見問題",
    title: "常見問題",
    intro:
      "關於素里市中心這套公寓的開價、物業費、位置及 BC 省購房基礎知識。不構成法律或稅務建議。",
    items: [
      {
        id: "price-mls",
        question: "開價和 MLS® 編號是多少？",
        answer:
          "房源開價 $649,900（加元），MLS® R3109998，狀態為 Active（在售）。價格與可售狀態可能變動——出價前請向掛牌經紀確認。",
        sources: [
          { label: "Realtor.ca 房源", href: REALTOR_CA },
          { label: "SellVanHomes", href: SELLVAN },
        ],
      },
      {
        id: "strata-fees",
        question: "每月物業費多少？包含哪些項目？",
        answer:
          "物業管理費約每月 $594（不同來源略有差異，請以 Form B 為準）。根據掛牌資訊，費用通常包含燃氣、暖氣、熱水、樓宇管理、園區維護及除雪等；含一個儲物櫃。請務必查閱物業文件，確認具體分攤及是否有特別攤款。",
        sources: [
          { label: "BC 金融服務管理局 — 分層物業簡介", href: "https://www.bcfsa.ca/" },
        ],
      },
      {
        id: "new-never-occupied",
        question: "是新房嗎？是否有人入住過？",
        answer:
          "Holland Park by Century City 約建於 2025 年。營銷資料稱本轉角單位為全新、從未入住，配備現代裝修、冷氣、室內洗衣及通高落地窗。",
      },
      {
        id: "pets-rentals",
        question: "可以養寵物或出租嗎？",
        answer:
          "物業附例允許養寵物和出租，但有限制（MLS 表述為 “Pets Allowed w/ Rest.” 及 “Rentals Allwd w/ Restrctns”）。購買前須查閱現行附例及待決規則變更——限制可能影響轉售或投資用途。",
      },
      {
        id: "parking-locker",
        question: "包含多少車位和儲物？",
        answer:
          "含一個地下產權車位及一個儲物櫃。車位編號、電動車及訪客停車規則請在物業資料中確認。",
      },
      {
        id: "location-transit",
        question: "交通、購物和公園方便嗎？",
        answer:
          "位於素里市中心（Whalley），距喬治國王天車站約一個街區，對面為 Surrey Central / 市中心商場，鄰近荷蘭公園、T&T、SFU 素里校區及 KPU。掛牌數據中的 Walk Score 顯示日常辦事步行便利性中等。",
      },
      {
        id: "ptt",
        question: "以此價格購買，BC 省產權轉讓稅（PTT）是多少？",
        answer:
          "BC 省大多數住宅交易需繳納產權轉讓稅。對 $649,900 的房產，一般稅率為首 $200,000 按 1%、至 $2,000,000 部分按 2%、超出部分按 3% 計算——豁免前約 $11,998。首次購房者等可能享受減免；部分外籍或公司購買可能適用額外稅率。請使用省政府計算器並諮詢公證人或律師。",
        sources: [
          {
            label: "BC 省 PTT 計算器",
            href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax",
          },
        ],
      },
      {
        id: "gst-new",
        question: "2025 年公寓是否需要繳納 GST？",
        answer:
          "BC 省新建或實質性翻新的住宅可能適用 GST。自住買家或符合新房退稅條件；投資者及非居民適用不同規則。請在解除條件前由律師和會計師確認 GST 狀態、退稅資格及淨價。",
        sources: [
          {
            label: "加拿大稅務局 — 住房退稅",
            href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-rebates/new-housing-rebate.html",
          },
        ],
      },
      {
        id: "due-diligence",
        question: "出價前應審查哪些材料？",
        answer:
          "BC 買家常見盡職調查包括：貸款預批、物業披露聲明（PDS）、物業 Form B（資訊證明）、附例與規章、兩年會議紀要、財務報表、折舊報告、保險摘要、車位/儲物分配，以及（如需要）專業驗房。您的經紀透過掛牌經紀公司協調文件取得。",
        sources: [
          { label: "BC 房地產委員會 — 購房指南", href: "https://www.recbc.ca/licensee-resources/buying-a-home" },
        ],
      },
      {
        id: "offer-closing",
        question: "BC 省出價與過戶流程是怎樣的？",
        answer:
          "出價通常採用《買賣合約》，可附條件（貸款、驗房、審閱物業文件等），訂金由經紀公司信託持有。過戶日協商確定；需 BC 律師或公證人辦理產權過戶、登記及 PTT 申報。請預留貸款評估及分層物業保險要求的時間。",
      },
      {
        id: "who-represents",
        question: "掛牌團隊是誰？",
        answer:
          "Carter Lozinski（掛牌經紀）與 Frederick Trudeau 隸屬 Heller Murch Realty。看房預約及房源問題請優先聯絡 Carter。相關人員均持 BC 房地產牌照；可在 BCFSA 公開名冊核實當前執照狀態。",
        sources: [
          {
            label: "BCFSA 持牌人查詢",
            href: "https://www.bcfsa.ca/industry-resources/consumer-resources/find-a-licensed-professional",
          },
        ],
      },
      {
        id: "disclaimer",
        question: "這是法律或稅務建議嗎？",
        answer:
          "不是。本 FAQ 僅匯總公開掛牌資訊及 BC 買家常見話題。物業費、附例、稅費及可售狀態可能變更。簽約前請向 Carter Lozinski、您的律師或公證人、貸款機構及會計師核實所有重要事實。",
      },
    ],
  },
};

export function getFaqCopy(locale: Locale): FaqCopy {
  return faqByLocale[locale] ?? faqByLocale.en;
}
