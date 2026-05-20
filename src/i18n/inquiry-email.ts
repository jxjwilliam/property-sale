import { listing } from "@/config/listing";
import { isLocale, type Locale } from "./types";

export type InquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  showingDate?: string;
  preferredTime?: string;
  message?: string;
};

type EmailTemplate = { subject: string; html: string };

const dash = "—";

function row(label: string, value: string) {
  return `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">${label}</td><td style="padding:8px;border:1px solid #ddd">${value}</td></tr>`;
}

function buildTable(
  labels: Record<string, string>,
  payload: InquiryPayload,
): string {
  const preferred = payload.preferredTime?.trim() || dash;
  const phone = payload.phone?.trim() || dash;
  const showingDate = payload.showingDate?.trim() || dash;
  const message = payload.message?.trim() || dash;

  return `
    <table style="border-collapse:collapse;width:100%;max-width:500px">
      ${row(labels.name, payload.name)}
      ${row(labels.email, payload.email)}
      ${row(labels.phone, phone)}
      ${row(labels.showingDate, showingDate)}
      ${row(labels.preferredTime, preferred)}
      ${row(labels.message, message)}
    </table>
  `;
}

const templates: Record<Locale, { subject: string; heading: string; labels: Record<string, string> }> = {
  en: {
    subject: `Showing request — 808-13573 98A Ave (MLS ${listing.mls})`,
    heading: "New showing request",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      showingDate: "Showing date",
      preferredTime: "Preferred time",
      message: "Message",
    },
  },
  "zh-Hans": {
    subject: `看房预约 — 808-13573 98A Ave（MLS ${listing.mls}）`,
    heading: "新的看房预约",
    labels: {
      name: "姓名",
      email: "电子邮箱",
      phone: "电话",
      showingDate: "看房日期",
      preferredTime: "偏好时段",
      message: "留言",
    },
  },
  "zh-Hant": {
    subject: `看房預約 — 808-13573 98A Ave（MLS ${listing.mls}）`,
    heading: "新的看房預約",
    labels: {
      name: "姓名",
      email: "電子郵箱",
      phone: "電話",
      showingDate: "看房日期",
      preferredTime: "偏好時段",
      message: "留言",
    },
  },
};

export function getInquiryEmailTemplate(
  localeInput: unknown,
  payload: InquiryPayload,
): EmailTemplate {
  const locale = isLocale(localeInput) ? localeInput : "en";
  const t = templates[locale];
  return {
    subject: t.subject,
    html: `<h2>${t.heading}</h2>${buildTable(t.labels, payload)}`,
  };
}
