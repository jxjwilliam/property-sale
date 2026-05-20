export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sources?: { label: string; href: string }[];
};

/** Buyer FAQs — listing facts from MLS/scrape data; BC policy notes are general guidance only. */
export const buyerFaq: FaqItem[] = [
  {
    id: "price-mls",
    question: "What is the asking price and MLS® number?",
    answer:
      "The home is listed at $649,900 (CAD), MLS® R3109998, status Active. Price and availability can change—confirm with the listing agent before making an offer.",
    sources: [
      { label: "Realtor.ca listing", href: "https://www.realtor.ca/real-estate/29590014/808-13573-98a-avenue-surrey" },
      { label: "SellVanHomes", href: "https://www.sellvanhomes.ca/listing/r3109998-13573-98a-avenue-808-surrey-bc-v3t-4a4/" },
    ],
  },
  {
    id: "strata-fees",
    question: "What are the monthly strata fees and what do they cover?",
    answer:
      "Strata maintenance is about $594 per month (sources vary slightly; verify on the Form B). Per listing data, fees commonly include gas, heat, hot water, building management, grounds care, and snow removal. A locker is included. Always review the strata documents for the exact allocation and any special levies.",
    sources: [
      { label: "BC Financial Services Authority — strata basics", href: "https://www.bcfsa.ca/" },
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
      { label: "BC PTT calculator", href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax" },
    ],
  },
  {
    id: "gst-new",
    question: "Does GST apply on a 2025 condo?",
    answer:
      "New or substantially renovated residential property can be subject to GST in BC. Primary-residence purchasers may qualify for rebates; investors and non-residents face different rules. Your lawyer and accountant should confirm GST status, rebate eligibility, and the net price before you remove subjects.",
    sources: [
      { label: "Canada Revenue Agency — housing rebates", href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/gst-hst-rebates/new-housing-rebate.html" },
    ],
  },
  {
    id: "due-diligence",
    question: "What should I review before making an offer?",
    answer:
      "Typical BC buyer due diligence includes: approved financing, property disclosure statement (PDS), strata Form B (information certificate), bylaws and rules, meeting minutes (2 years), financial statements, depreciation report, insurance summary, parking/storage assignment, and a professional inspection if desired. Your REALTOR® coordinates document access through the listing brokerage.",
    sources: [
      { label: "Real Estate Council of BC — buying a home", href: "https://www.recbc.ca/licensee-resources/buying-a-home" },
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
      "Carter Lozinski (listing agent) and Frederick Trudeau are with Heller Murch Realty. The owner can also be reached directly for questions. All are licensed under BC’s real estate framework; verify current licence status on the BCFSA public register if you wish.",
    sources: [
      { label: "BCFSA licensee search", href: "https://www.bcfsa.ca/industry-resources/consumer-resources/find-a-licensed-professional" },
    ],
  },
  {
    id: "disclaimer",
    question: "Is this legal or tax advice?",
    answer:
      "No. This FAQ summarizes public listing information and common BC buyer topics. Strata fees, bylaws, taxes, and availability can change. Confirm all material facts with Carter Lozinski, your lawyer or notary, lender, and accountant before you contract to purchase.",
  },
];
