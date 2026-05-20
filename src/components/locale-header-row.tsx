"use client";

import { Tag } from "lucide-react";
import { useLocale } from "@/i18n/provider";
import { LanguageSwitcher } from "./language-switcher";

export function LocaleHeaderRow() {
  const { messages } = useLocale();

  return (
    <div className="locale-header-row">
      <LanguageSwitcher />
      <span className="sale-pill">
        <Tag size={12} strokeWidth={2} aria-hidden="true" />
        {messages.salePill}
      </span>
    </div>
  );
}
